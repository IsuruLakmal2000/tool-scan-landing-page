import qs from 'qs';

export const STARPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface StrapiBlogPost {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // content is now stored as Rich Text (Markdown) which returns a string
    date: string;
    author: string;
    keywords: string[]; // JSON field in Strapi comes as parsed JSON usually, or logic needed
    relatedPostIds: string[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

interface StrapiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
    try {
        // Merge default and user options
        const mergedOptions = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            ...options,
        };

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${STARPI_API_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

        // Trigger API call
        const response = await fetch(requestUrl, mergedOptions);

        // Handle response
        if (!response.ok) {
            console.error(response.statusText);
            // throw new Error(`An error occurred please try again`); 
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred please try again`);
    }
}

export async function getBlogPosts() {
    const data = await fetchAPI('/blog-posts', {
        sort: ['date:desc'],
        pagination: {
            pageSize: 100,
        },
    });

    if (!data?.data) return [];

    return data.data.map((post: any) => ({
        id: post.id.toString(),
        ...post
    }));
}

export async function getBlogPostBySlug(slug: string) {
    const data = await fetchAPI('/blog-posts', {
        filters: {
            slug: {
                $eq: slug,
            },
        },
        populate: '*', // Populate relations if needed
    });

    if (!data?.data || data.data.length === 0) {
        return null;
    }

    const post = data.data[0];
    return {
        id: post.id.toString(),
        ...post
    };
}
