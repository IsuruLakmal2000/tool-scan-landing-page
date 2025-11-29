export default function PrivacyPolicy() {
    return (
        <div className="container" style={{ padding: '120px 20px 60px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '40px' }}>Privacy Policy</h1>

            <div style={{ lineHeight: '1.8', color: '#333' }}>
                <p style={{ marginBottom: '20px' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>1. Introduction</h2>
                    <p>
                        Welcome to ToolScan ("we," "our," or "us"). We are committed to protecting your privacy.
                        This Privacy Policy explains how we handle your information when you use our mobile application, ToolScan.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>2. Data Collection</h2>
                    <p>
                        <strong>We do not collect, store, or share any personal data.</strong>
                    </p>
                    <p>
                        ToolScan is designed to function locally on your device or via secure, ephemeral processing for tool identification.
                        We do not require you to create an account, and we do not track your usage or location.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>3. Camera Usage</h2>
                    <p>
                        Our app requires access to your device's camera solely for the purpose of identifying tools.
                        Images captured are processed to provide you with information and are not stored on our servers or shared with third parties.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>4. Changes to This Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes.
                        We will notify you of any changes by posting the new Privacy Policy on this page.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>5. Contact Us</h2>
                    <p>
                        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
                    </p>
                </section>
            </div>
        </div>
    );
}
