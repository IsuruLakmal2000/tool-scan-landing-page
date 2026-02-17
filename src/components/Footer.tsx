import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#f9f9f9', padding: '80px 0 40px', marginTop: 'auto', borderTop: '1px solid #eee' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '60px' }}>
                    <div>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.02em' }}>ToolScan</h3>
                        <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>
                            Your personal workshop assistant. Identify, learn, and master any tool with AI.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><Link href="#" style={{ color: '#666', fontSize: '15px' }}>Features</Link></li>
                            <li><Link href="#" style={{ color: '#666', fontSize: '15px' }}>Download</Link></li>
                            <li><Link href="/blog" style={{ color: '#666', fontSize: '15px' }}>Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li><Link href="/privacy-policy" style={{ color: '#666', fontSize: '15px', textDecoration: 'none' }}>Privacy Policy</Link></li>
                            <li><Link href="/terms-of-use" style={{ color: '#666', fontSize: '15px', textDecoration: 'none' }}>Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '30px', textAlign: 'center' }}>
                    <p style={{ color: '#999', fontSize: '13px' }}>
                        © {new Date().getFullYear()} ToolScan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
