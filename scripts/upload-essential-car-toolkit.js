const fs = require('fs');
const path = require('path');

// Helper to parse env file manually
function parseEnv(envPath) {
  if (!fs.existsSync(envPath)) {
    return {};
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      env[key] = value.trim();
    }
  });
  return env;
}

function parseTextModifiers(text, modifiers = {}) {
  const results = [];
  let remaining = text;
  
  // Regex to match first occurrence of Link, Bold, or Italic
  const regex = /(\[(.*?)\]\((.*?)\)|\*\*(.*?)\*\*|\*(.*?)\*)/;
  
  let match = regex.exec(remaining);
  while (match) {
    const index = match.index;
    
    // Add preceding text with current modifiers
    if (index > 0) {
      results.push({
        type: 'text',
        text: remaining.substring(0, index),
        ...modifiers
      });
    }
    
    if (match[2] !== undefined && match[3] !== undefined) {
      // Link: [Text](url)
      results.push({
        type: 'link',
        url: match[3],
        children: parseTextModifiers(match[2], modifiers)
      });
    } else if (match[4] !== undefined) {
      // Bold: **text**
      results.push(...parseTextModifiers(match[4], { ...modifiers, bold: true }));
    } else if (match[5] !== undefined) {
      // Italic: *text*
      results.push(...parseTextModifiers(match[5], { ...modifiers, italic: true }));
    }
    
    remaining = remaining.substring(index + match[0].length);
    match = regex.exec(remaining);
  }
  
  if (remaining.length > 0) {
    results.push({
      type: 'text',
      text: remaining,
      ...modifiers
    });
  }
  
  return results;
}

// Function to parse a line of text into Strapi inline formatting blocks
function parseInline(text) {
  const cleanText = text.replace(/\r/g, '');
  if (!cleanText) {
    return [{ type: 'text', text: '' }];
  }
  return parseTextModifiers(cleanText);
}

// Function to parse the whole markdown body into Strapi Blocks JSON
function parseMarkdownToBlocks(mdBody) {
  const lines = mdBody.split('\n');
  const blocks = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Handle horizontal rules
    if (line === '---') {
      blocks.push({
        type: 'paragraph',
        children: [{ type: 'text', text: '' }]
      });
      continue;
    }

    // Handle headings: #, ##, ###, ####, #####, ######
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      blocks.push({
        type: 'heading',
        level: level,
        children: parseInline(headingText)
      });
      continue;
    }

    // Handle list items: - item or * item
    const listMatch = line.match(/^[-*]\s+(.*)$/);
    if (listMatch) {
      const itemText = listMatch[1];
      blocks.push({
        type: 'list',
        format: 'unordered',
        children: [
          {
            type: 'list-item',
            children: parseInline(itemText)
          }
        ]
      });
      continue;
    }

    // Empty lines represent paragraph separators
    if (line === '') {
      blocks.push({
        type: 'paragraph',
        children: [{ type: 'text', text: '' }]
      });
      continue;
    }

    // Standard paragraph
    blocks.push({
      type: 'paragraph',
      children: parseInline(line)
    });
  }

  return blocks;
}

async function run() {
  const projectDir = path.resolve(__dirname, '..');
  const env = parseEnv(path.join(projectDir, '.env.local'));

  const apiUrl = env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const apiToken = env.STRAPI_API_TOKEN;

  if (!apiToken) {
    console.error('Error: STRAPI_API_TOKEN not found in .env.local');
    process.exit(1);
  }

  const mdPath = path.join(projectDir, 'essential-car-toolkit.md');
  if (!fs.existsSync(mdPath)) {
    console.error(`Error: Markdown file not found at ${mdPath}`);
    process.exit(1);
  }

  console.log(`Reading markdown file from ${mdPath}...`);
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const lines = mdContent.split('\n');

  // Parse front-matter and identify start of body
  let frontMatterEndIndex = -1;
  let hasFrontMatter = false;
  
  if (lines[0] && lines[0].trim() === '---') {
    hasFrontMatter = true;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i] && lines[i].trim() === '---') {
        frontMatterEndIndex = i;
        break;
      }
    }
  }

  let title = '';
  let slug = 'essential-car-toolkit';
  let excerpt = '';
  let date = '2026-06-23';
  let author = 'ToolScan Team';
  let keywords = [];

  if (hasFrontMatter && frontMatterEndIndex !== -1) {
    const frontMatterLines = lines.slice(1, frontMatterEndIndex);
    frontMatterLines.forEach(line => {
      const match = line.match(/^([\w-]+):\s*(.*)$/);
      if (match) {
        const key = match[1];
        let val = match[2].trim();
        if (key === 'title') {
          // Remove the " | ToolScan" part of the title if present, to avoid redundancy in <h1>
          title = val.replace(/\s*\|\s*ToolScan$/, '');
        } else if (key === 'meta-description') {
          excerpt = val;
        } else if (key === 'meta-keywords') {
          keywords = val.split(',').map(k => k.trim());
        } else if (key === 'author') {
          author = val;
        } else if (key === 'date') {
          date = val;
        }
      }
    });
  } else {
    console.error('Error: Could not parse front-matter from Markdown file.');
    process.exit(1);
  }

  // Determine body content start
  let bodyStartIndex = frontMatterEndIndex + 1;
  while (bodyStartIndex < lines.length && lines[bodyStartIndex].trim() === '') {
    bodyStartIndex++;
  }
  
  // If first element in body is the H1 title, skip it since title is uploaded separately
  if (bodyStartIndex < lines.length && lines[bodyStartIndex].trim().startsWith('# ')) {
    console.log(`Skipping H1 title line in body: "${lines[bodyStartIndex].trim()}"`);
    bodyStartIndex++;
  }

  const bodyContent = lines.slice(bodyStartIndex).join('\n').trim();
  console.log('Parsing markdown body to Strapi Blocks JSON...');
  const blocksContent = parseMarkdownToBlocks(bodyContent);

  // Related posts can default to ['1', '2', '3'] as in upload-to-strapi.js
  const relatedPostIds = ['1', '2', '3'];

  // Construct payload structure for Strapi
  const payload = {
    data: {
      title,
      slug,
      excerpt,
      content: blocksContent,
      date,
      author,
      keywords,
      relatedPostIds,
      publishedAt: new Date().toISOString()
    }
  };

  // Check for dry-run CLI argument
  const isDryRun = process.argv.includes('--dry-run');
  if (isDryRun) {
    console.log('\n--- [DRY RUN] Parsed Payload ---');
    console.log(JSON.stringify(payload, null, 2));
    console.log('--------------------------------\n');
    console.log('Dry run completed. Parsed successfully.');
    return;
  }

  // 1. Query and delete the old duplicate/broken post if it exists
  const queryUrl = `${apiUrl}/api/blog-posts?filters[slug][$eq]=${slug}`;
  console.log(`Querying existing post to delete at: ${queryUrl}`);
  try {
    const queryRes = await fetch(queryUrl, {
      headers: {
        'Authorization': `Bearer ${apiToken}`
      }
    });
    if (queryRes.ok) {
      const queryData = await queryRes.json();
      if (queryData.data && queryData.data.length > 0) {
        for (const existingPost of queryData.data) {
          const deleteIdentifier = existingPost.documentId || existingPost.id;
          const deleteUrl = `${apiUrl}/api/blog-posts/${deleteIdentifier}`;
          console.log(`Deleting existing post (${deleteIdentifier}) at: ${deleteUrl}`);
          const delRes = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${apiToken}`
            }
          });
          console.log(`Delete Status: ${delRes.status} ${delRes.statusText}`);
        }
      } else {
        console.log('No existing post found with this slug. Skipping deletion.');
      }
    } else {
      console.warn('Warning: Failed to query existing posts.', queryRes.statusText);
    }
  } catch (err) {
    console.warn('Warning: Error checking/deleting existing posts:', err.message);
  }

  // 2. Upload the new post
  console.log(`Sending new post to Strapi: ${apiUrl}/api/blog-posts`);
  console.log(`Title: "${title}"`);
  console.log(`Slug: "${slug}"`);

  try {
    const res = await fetch(`${apiUrl}/api/blog-posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log(`Status: ${res.status} ${res.statusText}`);

    if (res.ok) {
      console.log('Success! Blog post uploaded and published successfully in Strapi CMS.');
      console.log('Response details:', JSON.stringify(data, null, 2));
    } else {
      console.error('Error response from Strapi:', JSON.stringify(data, null, 2));
      process.exit(1);
    }
  } catch (err) {
    console.error('Network or fetch error:', err);
    process.exit(1);
  }
}

run();
