import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/data/blogPosts'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.toolidentification.app'

    const posts = getBlogPosts();

    const postEntries = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
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
