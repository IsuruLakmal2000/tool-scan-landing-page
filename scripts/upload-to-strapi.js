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

  const targetArg = process.argv.slice(2).find(arg => !arg.startsWith('--'));
  const mdFileName = targetArg || 'what-tool-is-this-identification-guide.md';
  const mdPath = path.isAbsolute(mdFileName) ? mdFileName : path.join(projectDir, mdFileName);

  if (!fs.existsSync(mdPath)) {
    console.error(`Error: Markdown file not found at ${mdPath}`);
    process.exit(1);
  }

  console.log(`Reading markdown file from ${mdPath}...`);
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  const lines = mdContent.split('\n');

  // Parse Title from line 1: "# Title"
  let title = '';
  if (lines[0] && lines[0].startsWith('# ')) {
    title = lines[0].substring(2).trim();
  } else {
    title = path.basename(mdPath, '.md');
  }

  // Parse content starting from line 7 onwards (after metadata lines)
  const bodyContent = lines.slice(6).join('\n').trim();
  console.log('Parsing markdown body to Strapi Blocks JSON...');
  const blocksContent = parseMarkdownToBlocks(bodyContent);

  const fileSlug = path.basename(mdPath, '.md');

  const metadataMap = {
    'what-tool-is-this-identification-guide': {
      slug: 'what-tool-is-this-identification-guide',
      excerpt: 'Struggling to identify an unknown or mystery tool? Learn the 5 most reliable ways to identify any tool instantly, from maker\'s marks to AI-powered computer vision.',
      date: '2026-06-12',
      author: 'ToolScan Team',
      keywords: ['tool identification', 'identify tools', 'mystery tools', 'ToolScan app', 'workshop safety'],
      relatedPostIds: ['8', '9', '1']
    },
    'how-to-identify-mystery-tools-estate-sales': {
      slug: 'how-to-identify-mystery-tools-estate-sales',
      excerpt: 'Stumbled upon an unknown tool in a garage or estate sale? Follow this practical forensic guide to classify mystery hand tools by trade, marks, and mechanics—or identify them instantly with ToolScan.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['identify mystery tools', 'unknown tools in garage', 'estate sale tools', 'tool identification', 'vintage tool value'],
      relatedPostIds: ['6', '1', '9']
    },
    'unusual-hand-tools-and-their-uses': {
      slug: 'unusual-hand-tools-and-their-uses',
      excerpt: 'Explore 8 of the strangest specialty hand tools ever forged, from basin wrenches to Cleco aviation pliers. Learn what they do and why human craftsmanship engineered them.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['weird tools and their uses', 'unusual hand tools', 'specialty hand tools', 'ToolScan app', 'vintage craftsmanship'],
      relatedPostIds: ['6', '8', '1']
    },
    'types-of-pliers-identification-guide': {
      slug: 'types-of-pliers-identification-guide',
      excerpt: 'Confused between linesman, slip-joint, or tongue-and-groove pliers? Discover the 12 essential types of pliers, their mechanical anatomy, and when to use each one.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['types of pliers', 'plier identification guide', 'pliers guide', 'hand tool identification', 'ToolScan app'],
      relatedPostIds: ['3', '6', '11']
    },
    'complete-guide-to-wrench-types': {
      slug: 'complete-guide-to-wrench-types',
      excerpt: 'Master every wrench profile from combination spanners to ratcheting sockets, Torx keys, and flare nut wrenches. Learn sizing standards and avoid rounded bolt heads.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['types of wrenches guide', 'wrench sizes and types', 'socket sizes', 'Torx wrenches', 'ToolScan app'],
      relatedPostIds: ['7', '3', '10']
    },
    'essential-plumbing-tools-for-homeowners': {
      slug: 'essential-plumbing-tools-for-homeowners',
      excerpt: 'Stop calling expensive emergency plumbers for basic leaks. Discover the 8 essential plumbing tools every homeowner needs for sink, pipe, and P-trap repairs.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['basic plumbing tools', 'tools for sink repair', 'plumbing tools guide', 'basin wrench', 'ToolScan app'],
      relatedPostIds: ['3', '11', '10']
    },
    'electrical-hand-tools-safety-guide': {
      slug: 'electrical-hand-tools-safety-guide',
      excerpt: 'Master essential electrical hand tools and safety precautions. Learn what 1,000V insulated ratings mean and how to safely strip, cut, and test wiring.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['basic electrical hand tools', 'insulated tools for beginners', 'electrical safety tools', 'wire strippers', 'ToolScan app'],
      relatedPostIds: ['4', '10', '3']
    },
    'beginner-woodworking-tools-guide': {
      slug: 'beginner-woodworking-tools-guide',
      excerpt: 'Skip the expensive stationary machinery. Discover the essential hand planes, marking gauges, chisels, and pull saws you need to build fine furniture and carpentry projects.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['woodworking tools for beginners', 'essential carpentry tools', 'hand plane setup', 'Ryoba saw', 'ToolScan app'],
      relatedPostIds: ['5', '1', '3']
    },
    'automotive-specialty-tools-guide': {
      slug: 'automotive-specialty-tools-guide',
      excerpt: 'Upgrade your mechanical game beyond standard sockets. Discover the 10 automotive specialty tools professional technicians use for engine, brake, and suspension repair.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['automotive specialty tools', 'car mechanic tools list', 'OBD scanner', 'spark plug socket', 'ToolScan app'],
      relatedPostIds: ['7', '11', '10']
    },
    'impact-driver-vs-cordless-drill': {
      slug: 'impact-driver-vs-cordless-drill',
      excerpt: 'Confused between an impact driver and a cordless drill? Learn the mechanical differences between rotational hammer strikes and continuous torque, and when to use each one.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['impact driver vs drill', 'when to use an impact driver', 'cordless drill guide', 'power tool comparison', 'ToolScan app'],
      relatedPostIds: ['3', '11', '4']
    },
    'japanese-pull-saws-vs-western-push-saws': {
      slug: 'japanese-pull-saws-vs-western-push-saws',
      excerpt: 'Discover why Japanese pull saws cut faster, cleaner, and with less physical effort than Western push saws. Learn about Ryoba, Dozuki, and Kataba blade geometries.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['japanese pull saw vs western saw', 'ryoba saw guide', 'dozuki saw', 'hand saw comparison', 'ToolScan app'],
      relatedPostIds: ['14', '1', '5']
    },
    'channel-locks-vs-pipe-wrench': {
      slug: 'channel-locks-vs-pipe-wrench',
      excerpt: 'Avoid crushed brass and rounded pipe fittings. Compare tongue-and-groove pliers with heavy-duty pipe wrenches, their tooth mechanics, and when to use each one.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['channel locks vs pipe wrench', 'tongue and groove pliers', 'pipe wrench guide', 'plumbing tools', 'ToolScan app'],
      relatedPostIds: ['12', '11', '10']
    },
    'cold-chisel-vs-wood-chisel-differences': {
      slug: 'cold-chisel-vs-wood-chisel-differences',
      excerpt: 'Avoid shattered blades and flying steel shards. Learn the vital metallurgy, bevel angles, and hammer requirements separating cold chisels from wood chisels.',
      date: '2026-11-06',
      author: 'Isuru',
      keywords: ['cold chisel vs wood chisel', 'metal cutting chisel', 'chisel sharpening', 'workshop safety', 'ToolScan app'],
      relatedPostIds: ['4', '14', '8']
    }
  };

  const meta = metadataMap[fileSlug] || {
    slug: fileSlug,
    excerpt: `A comprehensive guide on ${title}`,
    date: new Date().toISOString().split('T')[0],
    author: 'Isuru',
    keywords: ['tool identification', 'ToolScan app'],
    relatedPostIds: ['6', '1']
  };

  // Construct payload structure for Strapi
  const payload = {
    data: {
      title,
      slug: meta.slug,
      excerpt: meta.excerpt,
      content: blocksContent, // Sending blocks JSON array instead of markdown string
      date: meta.date,
      author: meta.author,
      keywords: meta.keywords,
      relatedPostIds: meta.relatedPostIds,
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
