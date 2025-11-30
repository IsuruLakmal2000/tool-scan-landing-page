'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SmartDownloadButton from './SmartDownloadButton';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    return (
        <header style={{
            padding: '20px 0',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            zIndex: 100,
            borderBottom: '1px solid #f0f0f0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" onClick={closeMenu} style={{ fontSize: '24px', fontWeight: '800', color: '#000000', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 102, position: 'relative' }}>
                    <Image src="/assets/appicon.jpg" alt="ToolScan Icon" width={40} height={40} style={{ borderRadius: '10px' }} />
                    ToolScan
                </Link>

                {/* Desktop Navigation */}
                <nav className="desktop-only">
                    <ul className="header-nav-list">
                        <li><Link href="/" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', fontSize: '15px' }}>Home</Link></li>
                        <li><Link href="/blog" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', fontSize: '15px' }}>Blog</Link></li>
                        <li>
                            <SmartDownloadButton />
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={`mobile-menu-btn mobile-only ${isMenuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Mobile Navigation Overlay */}
                {isMenuOpen && (
                    <div className="mobile-nav-overlay">
                        <nav>
                            <ul className="mobile-nav-list">
                                <li><Link href="/" onClick={closeMenu} className="mobile-nav-link">Home</Link></li>
                                <li><Link href="/blog" onClick={closeMenu} className="mobile-nav-link">Blog</Link></li>
                                <li onClick={closeMenu}>
                                    <SmartDownloadButton />
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
