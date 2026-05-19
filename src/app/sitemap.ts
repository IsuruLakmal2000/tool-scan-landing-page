import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/strapi'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.toolidentification.app'

    let posts = [];
    try {
        posts = await getBlogPosts();
    } catch (error) {
        console.error("Failed to fetch posts for sitemap:", error);
    }

    const postEntries = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date || post.updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/authors/isuru`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        ...postEntries,
    ]
}
