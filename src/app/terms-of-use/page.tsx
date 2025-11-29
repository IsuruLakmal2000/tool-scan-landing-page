export default function TermsOfUse() {
    return (
        <div className="container" style={{ padding: '120px 20px 60px', maxWidth: '800px' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '40px' }}>Terms of Use</h1>

            <div style={{ lineHeight: '1.8', color: '#333' }}>
                <p style={{ marginBottom: '20px' }}>Last updated: {new Date().toLocaleDateString()}</p>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
                    <p>
                        By downloading or using the ToolScan app, these terms will automatically apply to you – you should make sure therefore that you read them carefully before using the app.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>2. Intellectual Property</h2>
                    <p>
                        The app itself, and all the trade marks, copyright, database rights and other intellectual property rights related to it, still belong to us.
                        You are not allowed to copy, or modify the app, any part of the app, or our trademarks in any way.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>3. Use of the App</h2>
                    <p>
                        ToolScan is intended for informational and educational purposes. While we strive for high accuracy in tool identification,
                        we cannot guarantee 100% accuracy in all conditions. Always exercise caution and consult professional advice when using tools.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>4. Liability</h2>
                    <p>
                        We accept no liability for any loss, direct or indirect, you experience as a result of relying wholly on this functionality of the app.
                    </p>
                </section>

                <section style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>5. Changes to Terms</h2>
                    <p>
                        We reserve the right to make changes to the app or to charge for its services, at any time and for any reason.
                        We will never charge you for the app or its services without making it very clear to you exactly what you’re paying for.
                    </p>
                </section>
            </div>
        </div>
    );
}
