import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PublicTracking.css';
import logo from '../images/Forexshipping.png';
import deliveryImg from '../images/Delivery.png';

const Services = () => {
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
            <a href="/services" className="active">Services</a>
            <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a>
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
          </div>
          <div className="nav-actions">
            <button className="ship-now-btn">Ship Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section services-hero" style={{ background: 'radial-gradient(circle at 20% 40%, #1e40af 0%, #0a1128 100%)', color: 'white', padding: '8rem 5%' }}>
        <div className="hero-inner" style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div className="hero-left">
            <h1 className="hero-title" style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800' }}>
              Borderless Forex & <br/> Shipping Solutions
            </h1>
            <p className="hero-sub" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', marginBottom: '2.5rem' }}>
              Seamlessly move documents, parcels, and high-value shipments worldwide with speed, security, and full transparency.
            </p>
            <button className="track-submit-btn" style={{ background: 'white', color: '#1e40af', fontWeight: '700' }}>
              Get Instant Quote →
            </button>
          </div>
          <div className="hero-right" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={deliveryImg} alt="Delivery Services" style={{ width: '100%', maxWidth: '550px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} />
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section style={{ padding: '8rem 5%', background: '#ffffff' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>Our Forex Shipping Services</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Purpose-built solutions to simplify cross-border forex and logistics operations.</p>
          </div>

          <div className="stats-grid" style={{ gap: '2rem' }}>
            <div className="service-card-premium" style={{ border: '1px solid #e2e8f0', padding: '3rem 2.5rem', borderRadius: '20px', transition: 'all 0.3s' }}>
              <div style={{ width: '50px', height: '50px', background: '#eff6ff', color: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Global Express Shipping</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>Fast, reliable international shipping across 220+ countries with priority customs clearance.</p>
            </div>

            <div className="service-card-premium" style={{ border: '1px solid #e2e8f0', padding: '3rem 2.5rem', borderRadius: '20px', transition: 'all 0.3s' }}>
              <div style={{ width: '50px', height: '50px', background: '#eff6ff', color: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Time-Critical Deliveries</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>Guaranteed timelines for urgent documents and parcels with real-time tracking.</p>
            </div>

            <div className="service-card-premium" style={{ border: '1px solid #e2e8f0', padding: '3rem 2.5rem', borderRadius: '20px', transition: 'all 0.3s' }}>
              <div style={{ width: '50px', height: '50px', background: '#eff6ff', color: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Secure & Compliant</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>End-to-end shipment security, insurance coverage, and full regulatory compliance.</p>
            </div>

            <div className="service-card-premium" style={{ border: '1px solid #e2e8f0', padding: '3rem 2.5rem', borderRadius: '20px', transition: 'all 0.3s' }}>
              <div style={{ width: '50px', height: '50px', background: '#eff6ff', color: '#2563eb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#0f172a' }}>Customized Logistics</h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>Tailored shipping solutions for businesses, eCommerce sellers, and individuals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ship Smarter CTA Section */}
      <section style={{ background: '#ff5b1a', padding: '5rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>Ship Smarter. Go Global Faster.</h2>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>Experience reliable international forex shipping backed by compliance, technology, and expert support.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="ship-now-btn" style={{ background: '#0a1128', boxShadow: 'none' }}>Start Shipping</button>
            <button className="ship-now-btn" style={{ background: 'transparent', border: '2px solid white', boxShadow: 'none' }}>Contact Sales</button>
          </div>
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

export default Services;
