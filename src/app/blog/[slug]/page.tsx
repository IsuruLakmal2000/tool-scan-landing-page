import Link from "next/link";
import { notFound } from "next/navigation";
import StoreButton from "@/components/StoreButton";
import { getBlogPostBySlug, getBlogPosts, StrapiBlogPost } from "@/lib/strapi";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const AUTHOR_PROFILE = {
    name: 'Isuru',
    profilePath: '/authors/isuru',
    profileUrl: 'https://www.toolidentification.app/authors/isuru',
    websiteUrl: 'https://i5uru.me/',
    xUrl: 'https://x.com/I5uru1',
};

const normalizeAuthorName = (author?: string) => {
    if (!author) return AUTHOR_PROFILE.name;
    return author.trim().toLowerCase() === 'toolscan team' ? AUTHOR_PROFILE.name : author;
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    const authorName = normalizeAuthorName(post.author);
    const isProfileAuthor = authorName === AUTHOR_PROFILE.name;
    const authorProfileUrl = isProfileAuthor ? AUTHOR_PROFILE.profileUrl : undefined;

    return {
        title: post.title,
        description: post.excerpt,
        authors: authorProfileUrl ? [{ name: authorName, url: authorProfileUrl }] : [{ name: authorName }],
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            ...(authorProfileUrl ? { authors: [authorProfileUrl] } : {}),
        },
    };
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const authorName = normalizeAuthorName(post.author);
    const isProfileAuthor = authorName === AUTHOR_PROFILE.name;
    const authorProfilePath = isProfileAuthor ? AUTHOR_PROFILE.profilePath : undefined;
    const authorProfileUrl = isProfileAuthor ? AUTHOR_PROFILE.profileUrl : undefined;

    // Fetch all posts to find related ones. 
    // Ideally usage a backend filter if relation is stored in Strapi, but manual filtering 
    // based on the ID array approach from original code is preserved here for now if 'relatedPostIds' exists.
    // If 'relatedPostIds' is an array of IDs from Strapi:
    const allPosts = await getBlogPosts();
    const relatedPosts = allPosts.filter((p: StrapiBlogPost) => post.relatedPostIds?.includes(p.id));

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: new Date(post.date).toISOString(),
        author: isProfileAuthor ? {
            '@type': 'Person',
            name: authorName,
            url: authorProfileUrl,
            sameAs: [AUTHOR_PROFILE.websiteUrl, AUTHOR_PROFILE.xUrl],
        } : {
            '@type': 'Person',
            name: authorName,
        },
        url: `https://www.toolidentification.app/blog/${slug}`,
    };

    return (
        <div>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="container" style={{ padding: '120px 20px 60px', maxWidth: '800px' }}>
                <Link href="/blog" style={{ textDecoration: 'none', color: '#666', fontSize: '14px', marginBottom: '24px', display: 'inline-block' }}>
                    ← Back to Blog
                </Link>

                <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', gap: '16px', color: '#666', fontSize: '14px', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '40px', flexWrap: 'wrap' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>
                        {authorProfilePath ? (
                            <Link href={authorProfilePath} style={{ color: '#666', textDecoration: 'none' }}>
                                {authorName}
                            </Link>
                        ) : (
                            authorName
                        )}
                    </span>
                </div>




                <div
                    style={{ fontSize: '18px', lineHeight: '1.8', color: '#333' }}
                    className="strapi-content"
                >
                    <BlocksRenderer content={post.content} />
                </div>

                {isProfileAuthor && (
                    <div style={{ marginTop: '50px', padding: '24px', borderRadius: '14px', border: '1px solid #eee', backgroundColor: '#fafafa' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>About the author</div>
                        <p style={{ color: '#555', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
                            Isuru writes practical guides on tool identification, safe usage, and maintenance, with a focus on AI-assisted learning.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <Link href={AUTHOR_PROFILE.profilePath} style={{ color: '#111', fontWeight: '600', textDecoration: 'none' }}>View profile</Link>
                            <a href={AUTHOR_PROFILE.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#111', fontWeight: '600', textDecoration: 'none' }}>Website</a>
                            <a href={AUTHOR_PROFILE.xUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#111', fontWeight: '600', textDecoration: 'none' }}>X (Twitter)</a>
                        </div>
                    </div>
                )}

                <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>Ready to identify your tools?</h3>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <StoreButton store="app-store" href="https://apps.apple.com/lk/app/toolscan-tool-identifier/id6751974282" />
                        <StoreButton store="play-store" variant="light" href="https://play.google.com/store/apps/details?id=com.circular.tool_identifier_app&hl=en" />
                    </div>
                </div>
            </article>

            {relatedPosts.length > 0 && (
                <section style={{ backgroundColor: '#fafafa', padding: '80px 0' }}>
                    <div className="container">
                        <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '40px' }}>Related Articles</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                            {relatedPosts.map((related: StrapiBlogPost) => (
                                <Link key={related.id} href={`/blog/${related.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', border: '1px solid #eee', height: '100%', transition: 'transform 0.2s' }}>
                                        <h4 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>{related.title}</h4>
                                        <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>{related.excerpt}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
