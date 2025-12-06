import Link from "next/link";
import { getBlogPosts, StrapiBlogPost } from "@/lib/strapi";

export const dynamic = 'force-dynamic'; // Prevent static caching to ensure new posts appear

export default async function BlogListing() {
    let posts: StrapiBlogPost[] = [];
    try {
        posts = await getBlogPosts();
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }

    return (
        <div className="container" style={{ padding: '120px 20px 60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.02em' }}>ToolScan Blog</h1>
                <p style={{ fontSize: '20px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Insights, guides, and news about tool identification and maintenance.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '40px'
            }}>
                {posts.map((post) => (
                    <article key={post.id} style={{
                        border: '1px solid #eee',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        backgroundColor: '#fff'
                    }}>
                        <div style={{ padding: '30px' }}>
                            <div style={{ fontSize: '14px', color: '#999', marginBottom: '12px', fontWeight: '500' }}>
                                {post.date}
                            </div>
                            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', lineHeight: '1.4' }}>
                                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: '#000' }}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>
                                {post.excerpt}
                            </p>
                            <Link href={`/blog/${post.slug}`} style={{
                                textDecoration: 'none',
                                color: '#000',
                                fontWeight: '600',
                                fontSize: '15px',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}>
                                Read Article →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
