"use client";

import { useEffect, useState } from 'react';

export default function SmartDownloadButton() {
    const [storeLink, setStoreLink] = useState('#download');

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        if (/android/i.test(userAgent)) {
            setStoreLink("https://play.google.com/store/apps/details?id=com.circular.tool_identifier_app&hl=en");
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            setStoreLink("https://apps.apple.com/lk/app/toolscan-tool-identifier/id6751974282");
        }
    }, []);

    return (
        <a
            href={storeLink}
            className="btn btn-primary"
            style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.2s ease'
            }}
        >
            Download App
        </a>
    );
}
