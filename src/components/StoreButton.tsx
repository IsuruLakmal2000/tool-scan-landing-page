"use client";

import React from 'react';

type StoreType = 'app-store' | 'play-store';

interface StoreButtonProps {
    store: StoreType;
    href?: string;
    variant?: 'dark' | 'light';
}

export default function StoreButton({ store, href = '#', variant = 'dark' }: StoreButtonProps) {
    const isDark = variant === 'dark';
    const bgColor = isDark ? '#000000' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#000000';
    const borderColor = isDark ? 'transparent' : '#e5e5e5';

    return (
        <a
            href={href}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: bgColor,
                color: textColor,
                padding: '8px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                border: `1px solid ${borderColor}`,
                transition: 'transform 0.2s ease, opacity 0.2s ease',
                minWidth: '160px',
                height: '52px'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
            }}
        >
            <span style={{ fontSize: '28px', marginRight: '12px' }}>
                {store === 'app-store' ? '' : '▶'}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>
                    {store === 'app-store' ? 'Download on the' : 'Get it on'}
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', letterSpacing: '0.3px' }}>
                    {store === 'app-store' ? 'App Store' : 'Google Play'}
                </span>
            </div>
        </a>
    );
}
