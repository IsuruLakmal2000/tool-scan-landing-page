import Link from "next/link";
import Image from "next/image";
import StoreButton from "@/components/StoreButton";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '140px', paddingBottom: '140px', textAlign: 'center', overflow: 'hidden' }}>
        <div className="container">
          <h1 className="animate-fade-in-up hero-title">
            Identify Tools Instantly <br />
            <span style={{ color: '#666' }}>with AI Precision</span>
          </h1>
          <p className="animate-fade-in-up delay-100 hero-subtitle">
            Discover, recognize, and learn about hand tools instantly. Your personal workshop assistant in your pocket.
          </p>

          {/* Social Proof */}
          <div className="animate-fade-in-up delay-200" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {/* App Store Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', fontSize: '18px' }}>
                  <StarIcon /> 4.8
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>App Store</div>
                <div style={{ fontSize: '12px', color: '#888' }}>100 + ratings</div>
              </div>
            </div>

            {/* Google Play Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '700', fontSize: '18px' }}>
                  <StarIcon /> 4.7
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Google Play</div>
                <div style={{ fontSize: '12px', color: '#888' }}>100 + ratings</div>
              </div>
            </div>

            {/* Users Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#444' }}>
                  <UserIcon /> Loved by
                </div>
                <div style={{ fontSize: '18px', fontWeight: '800' }}>1k users</div>
                <div style={{ fontSize: '14px', color: '#666' }}>users</div>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-200" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <StoreButton store="app-store" href="https://apps.apple.com/lk/app/toolscan-tool-identifier/id6751974282" />
            <StoreButton store="play-store" variant="light" href="https://play.google.com/store/apps/details?id=com.circular.tool_identifier_app&hl=en" />
          </div>

          <div className="animate-scale-in delay-300 hero-phones-container">
            {/* Phone 1 (Left) */}
            <div className="hero-phone hero-phone-1">
              {/* Notch */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '30px', backgroundColor: '#000', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', zIndex: 2 }}></div>
              {/* Screen Content */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', position: 'relative' }}>
                <Image src="/assets/ss1.png" alt="ToolScan Screenshot 1" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* Phone 2 (Right) */}
            <div className="hero-phone hero-phone-2">
              {/* Notch */}
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '30px', backgroundColor: '#000', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', zIndex: 2 }}></div>
              {/* Screen Content */}
              <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', position: 'relative' }}>
                <Image src="/assets/ss2.png" alt="ToolScan Screenshot 2" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section" style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Identify any tool in seconds with our simple 4-step process.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            position: 'relative',
            marginTop: '60px'
          }}>
            <div className="animate-fade-in-up delay-100">
              <StepCard
                number="1"
                title="Point Camera"
                description="Open the app and point your camera at the tool you want to identify."
                icon={<CameraIcon />}
              />
            </div>
            <div className="animate-fade-in-up delay-200">
              <StepCard
                number="2"
                title="Capture Image"
                description="Snap a clear photo of the tool. Ensure good lighting for best results."
                icon={<ApertureIcon />}
              />
            </div>
            <div className="animate-fade-in-up delay-300">
              <StepCard
                number="3"
                title="AI Scan"
                description="Our advanced AI analyzes the image and matches it against our database."
                icon={<ScanIcon />}
              />
            </div>
            <div className="animate-fade-in-up delay-400">
              <StepCard
                number="4"
                title="Learn More"
                description="Get instant details, usage tips, and safety instructions."
                icon={<InfoIcon />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ backgroundColor: '#fafafa', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <h2 className="section-title">Why Choose ToolScan?</h2>
          <p className="section-subtitle">
            Advanced AI technology meets practical utility.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <FeatureCard
              title="AI Tool Recognition"
              description="Take a photo of any hand tool, and our advanced AI instantly identifies it with accuracy."
              icon={<SearchIcon />}
            />
            <FeatureCard
              title="Smart Tool Guide"
              description="Get step-by-step usage tips, safety instructions, and best practices for every tool."
              icon={<BookOpenIcon />}
            />
            <FeatureCard
              title="Comprehensive Database"
              description="From common hammers to rare specialty tools, access detailed information anytime."
              icon={<DatabaseIcon />}
            />
            <FeatureCard
              title="Educational Resource"
              description="Perfect for students, teachers, and DIY learners looking to improve tool knowledge."
              icon={<GraduationCapIcon />}
            />
            <FeatureCard
              title="Personal Workshop Assistant"
              description="Acts like a tool expert companion available anytime, anywhere in your pocket."
              icon={<UserIcon />}
            />
            <FeatureCard
              title="Beginner Friendly"
              description="Easy to use interface designed for DIY enthusiasts of all skill levels."
              icon={<SmileIcon />}
            />
          </div>
        </div>
      </section>

      {/* Key Features List */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title">Key Features</h2>
            <p className="section-subtitle">Everything you need to master your tools.</p>

            <div style={{ maxWidth: '800px', width: '100%' }}>
              <ul style={{ listStyle: 'none', display: 'grid', gap: '20px' }}>
                <ListItem text="Instant AI Tool Detection – Identify any tool by simply snapping a photo" />
                <ListItem text="Detailed Tool Insights – Learn functions, safe handling, and practical applications" />
                <ListItem text="Extensive Database – Covers all major hand tools and rare finds" />
                <ListItem text="Beginner-Friendly Design – Easy to use for all skill levels" />
                <ListItem text="Learn & Work Smarter – Enhance your projects with accurate tool knowledge" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="section" style={{ backgroundColor: '#000', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            Ready to Upgrade Your Toolbox?
          </h2>
          <p style={{ fontSize: '20px', opacity: 0.7, maxWidth: '600px', margin: '0 auto 48px' }}>
            Download ToolScan today and take the guesswork out of tool recognition!
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <StoreButton store="app-store" variant="light" href="https://apps.apple.com/lk/app/toolscan-tool-identifier/id6751974282" />
            <StoreButton store="play-store" variant="dark" href="https://play.google.com/store/apps/details?id=com.circular.tool_identifier_app&hl=en" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      border: '1px solid #eee',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }}>
      <div style={{
        marginBottom: '24px',
        color: '#000',
        backgroundColor: '#f5f5f5',
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{title}</h3>
      <p style={{ color: '#666', lineHeight: '1.6', fontSize: '15px' }}>{description}</p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      fontSize: '16px',
      padding: '20px',
      backgroundColor: '#fafafa',
      borderRadius: '12px',
      border: '1px solid #f0f0f0'
    }}>
      <span style={{
        marginRight: '16px',
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        border: '1px solid #e5e5e5'
      }}>
        <CheckIcon />
      </span>
      <span style={{ color: '#333' }}>{text}</span>
    </li>
  );
}

// Icons
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s 9-1.34 9-3V5"></path>
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function StepCard({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#000',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        marginBottom: '24px',
        position: 'relative',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        {icon}
        <div style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          width: '24px',
          height: '24px',
          backgroundColor: '#fff',
          border: '2px solid #000',
          borderRadius: '50%',
          color: '#000',
          fontSize: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {number}
        </div>
      </div>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>{title}</h3>
      <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}

function CameraIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  );
}

function ApertureIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
      <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
      <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
      <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
      <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
      <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
      <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
      <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
      <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
      <rect x="7" y="7" width="10" height="10" rx="2"></rect>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function SmileIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
      <line x1="9" y1="9" x2="9.01" y2="9"></line>
      <line x1="15" y1="9" x2="15.01" y2="9"></line>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ color: '#FFD700' }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}
