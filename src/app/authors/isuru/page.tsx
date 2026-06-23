import type { Metadata } from "next";
import Link from "next/link";

const AUTHOR_PROFILE = {
    name: "Isuru",
    profilePath: "/authors/isuru",
    profileUrl: "https://www.toolidentification.app/authors/isuru",
    websiteUrl: "https://i5uru.me/",
    xUrl: "https://x.com/I5uru1",
};

export const metadata: Metadata = {
    title: "Isuru | ToolScan",
    description: "Isuru writes practical guides on tool identification, safe usage, and maintenance with a focus on AI-assisted learning.",
    alternates: {
        canonical: AUTHOR_PROFILE.profilePath,
    },
    openGraph: {
        title: "Isuru | ToolScan",
        description: "Isuru writes practical guides on tool identification, safe usage, and maintenance with a focus on AI-assisted learning.",
        url: AUTHOR_PROFILE.profileUrl,
        type: "profile",
    },
};

export default function AuthorProfilePage() {
    return (
        <div className="container" style={{ padding: "120px 20px 80px", maxWidth: "820px" }}>
            <Link href="/blog" style={{ textDecoration: "none", color: "#666", fontSize: "14px", marginBottom: "24px", display: "inline-block" }}>
                ← Back to Blog
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <h1 style={{ fontSize: "42px", fontWeight: "800", letterSpacing: "-0.02em" }}>{AUTHOR_PROFILE.name}</h1>
                <p style={{ color: "#444", fontSize: "18px", lineHeight: "1.7" }}>
                    Isuru writes practical guides on tool identification, safe usage, and maintenance, with a focus on AI-assisted learning.
                </p>

                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "4px" }}>
                    <a href={AUTHOR_PROFILE.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#111", fontWeight: "600", textDecoration: "none" }}>
                        Website
                    </a>
                    <a href={AUTHOR_PROFILE.xUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#111", fontWeight: "600", textDecoration: "none" }}>
                        X (Twitter)
                    </a>
                </div>
            </div>

            <div style={{ marginTop: "40px", paddingTop: "24px", borderTop: "1px solid #eee" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "12px" }}>About the author</h2>
                <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.7" }}>
                    This profile is linked from ToolScan blog posts to provide author transparency and help readers follow Isuru's work.
                </p>
            </div>
        </div>
    );
}
