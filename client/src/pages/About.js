import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PublicTracking.css';
import logo from '../images/Forexshipping.png';
import aboutImg from '../images/aboutPage.png';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="public-tracking-wrapper">
      {/* Navigation */}
      <nav className="public-nav">
        <div className="nav-container">
          <div className="logo-section">
            <div className="brand">
              <img src={logo} alt="ForexShipping" className="site-logo" />
              <div className="brand-text">
                <span className="brand-name">FOREXSHIPPING</span>
                <span className="brand-tagline">GLOBAL FREIGHT SOLUTIONS</span>
              </div>
            </div>
          </div>
          <div className="nav-links">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <a href="/services" onClick={(e) => { e.preventDefault(); navigate('/services'); }}>Services</a>
            <a href="/about" className="active">About</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
          </div>
          <div className="nav-actions">
            <button className="ship-now-btn">Ship Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="about-hero" style={{ background: 'radial-gradient(circle at 30% 20%, #1e40af 0%, #0a1128 100%)', padding: '8rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', maxWidth: '900px', marginBottom: '1.5rem' }}>
            Powering Global Trade <br/>
            <span style={{ color: '#60a5fa' }}>Through Intelligent Shipping</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', maxWidth: '650px', lineHeight: '1.6' }}>
            Forex Shipping is built to move businesses forward — combining technology, operational 
            excellence, and global reach to deliver shipments faster, safer, and smarter.
          </p>
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section style={{ padding: '4rem 5%', background: '#f8fafc', marginTop: '-4rem' }}>
        <div className="stats-grid" style={{ maxWidth: '1300px', margin: '0 auto', gap: '2rem' }}>
          {[
            { n: '120+', d: 'COUNTRIES SERVED' },
            { n: '10M+', d: 'ANNUAL SHIPMENTS' },
            { n: '450+', d: 'LOGISTICS PARTNERS' },
            { n: '99.2%', d: 'CUSTOMER SATISFACTION' }
          ].map((s, i) => (
            <div key={i} className="stat-card" style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0052FF', marginBottom: '8px' }}>{s.n}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', letterSpacing: '1px' }}>{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section style={{ padding: '8rem 5%', background: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>Who We Are</h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Forex Shipping is a technology-driven global logistics company designed for modern commerce. 
              We help enterprises and growing businesses move goods across borders with precision, 
              transparency, and speed.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8' }}>
              Our platform integrates smart routing, real-time tracking, customs intelligence, 
              and a worldwide partner network to eliminate friction from international shipping.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={aboutImg} alt="Logistics Center" style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section style={{ background: '#0a1128', padding: '8rem 5%', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4rem' }}>What Drives Us</h2>
        <div className="stats-grid" style={{ maxWidth: '1300px', margin: '0 auto', gap: '1.5rem' }}>
          {['Reliability', 'Speed', 'Transparency', 'Innovation'].map((v, i) => (
            <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '2.5rem', borderRadius: '16px', textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.5rem' }}>{v}</h4>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                We design every process to consistently deliver dependable, measurable outcomes for our customers.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section style={{ padding: '8rem 5%', background: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '4rem' }}>Our Journey</h2>
          <div className="timeline-items" style={{ paddingLeft: '20px' }}>
            {[
              { year: '2011', text: 'Company founded with a global-first logistics vision' },
              { year: '2016', text: 'Expanded cross-border shipping across major trade lanes' },
              { year: '2022', text: 'Launched intelligent tracking & analytics platform' },
              { year: '2026', text: 'Serving enterprises across 120+ countries' }
            ].map((item, index) => (
              <div key={index} className="timeline-step" style={{ gap: '3rem', marginBottom: '3rem' }}>
                <div className="step-marker active" style={{ width: '20px', height: '20px' }}></div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0052FF', marginBottom: '5px' }}>{item.year}</div>
                  <p style={{ color: '#64748b', fontSize: '1.05rem' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ship Without Limits CTA */}
      <section style={{ background: '#2563eb', padding: '5rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800' }}>Ready to Ship Without Limits?</h2>
          <button style={{ background: 'white', color: '#2563eb', padding: '1rem 2rem', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Talk to Our Experts</button>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="subscribe-section">
        <div className="subscribe-container">
          <div className="subscribe-content">
            <div className="subscribe-text">
              <h2>Ready to streamline your <span className="highlight">global supply chain?</span></h2>
              <p>Join 5,000+ businesses receiving our weekly logistics insights.</p>
            </div>
            <div className="subscribe-form">
              <input type="email" placeholder="Enter your email" className="email-input" />
              <button className="subscribe-submit-btn">
                Subscribe <span className="btn-icon">🚀</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="brand">
              <img src={logo} alt="ForexShipping" className="footer-logo" />
              <span className="footer-brand-name">FOREXSHIPPING</span>
            </div>
            <p className="footer-brand-desc">
              Global logistics leader specializing in complex freight solutions, 
              real-time tracking, and end-to-end supply chain management.
            </p>
          </div>
          <div className="footer-link-col">
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#fleet">Our Fleet</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#news">News</a></li>
            </ul>
          </div>
          <div className="footer-link-col">
            <h4>SERVICES</h4>
            <ul>
              <li><a href="#ocean">Ocean Freight</a></li>
              <li><a href="#air">Air Freight</a></li>
              <li><a href="#warehouse">Warehousing</a></li>
              <li><a href="#customs">Customs</a></li>
            </ul>
          </div>
          <div className="footer-link-col">
            <h4>SUPPORT</h4>
            <ul>
              <li><a href="#help">Tracking Help</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-info">
            <span>📍 881 Logistics Way, Port Terminal NY</span>
            <span className="info-sep">|</span>
            <span>✉️ operations@forexshipping.in</span>
          </div>
          <div className="footer-copyright">
            © 2026 Forex Shipping Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
