import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import StoreButton from "@/components/StoreButton";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} - ToolScan Blog`,
        description: post.excerpt,
        keywords: post.keywords
    };
}

export default async function BlogPost({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = blogPosts.filter(p => post.relatedPostIds.includes(p.id));

    return (
        <div>
            <article className="container" style={{ padding: '120px 20px 60px', maxWidth: '800px' }}>
                <Link href="/blog" style={{ textDecoration: 'none', color: '#666', fontSize: '14px', marginBottom: '24px', display: 'inline-block' }}>
                    ← Back to Blog
                </Link>

                <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '24px', lineHeight: '1.2', letterSpacing: '-0.02em' }}>
                    {post.title}
                </h1>

                <div style={{ display: 'flex', gap: '16px', color: '#666', fontSize: '14px', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '40px' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                </div>

                <div
                    style={{ fontSize: '18px', lineHeight: '1.8', color: '#333' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

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
                            {relatedPosts.map(related => (
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
