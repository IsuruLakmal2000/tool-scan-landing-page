import Link from 'next/link';
import Image from 'next/image';
import SmartDownloadButton from './SmartDownloadButton';

export default function Header() {
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
                <Link href="/" style={{ fontSize: '24px', fontWeight: '800', color: '#000000', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Image src="/assets/appicon.jpg" alt="ToolScan Icon" width={40} height={40} style={{ borderRadius: '10px' }} />
                    ToolScan
                </Link>
                <nav>
                    <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }}>
                        <li><Link href="/" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', fontSize: '15px' }}>Home</Link></li>
                        <li><Link href="/blog" style={{ textDecoration: 'none', color: '#666', fontWeight: '500', fontSize: '15px' }}>Blog</Link></li>
                        <li>
                            <SmartDownloadButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
