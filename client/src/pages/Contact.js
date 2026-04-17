import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PublicTracking.css';
import logo from '../images/Forexshipping.png';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setSubmitted(false);
    }, 3500);
  };

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
            <a href="/about" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>About</a>
            <a href="/contact" className="active">Contact</a>
          </div>
          <div className="nav-actions">
            <button className="ship-now-btn">Ship Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ background: 'radial-gradient(circle at 10% 20%, #1e40af 0%, #0a1128 100%)', padding: '8rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '800', lineHeight: '1.1', maxWidth: '800px', marginBottom: '1.5rem' }}>
            Let's Move Your Cargo <br/>
            <span style={{ color: '#60a5fa' }}>Across Borders, Effortlessly</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', lineHeight: '1.6' }}>
            Whether you're shipping globally, scaling operations, or need expert logistics advice — our team is ready to support you.
          </p>
        </div>
      </section>

      {/* Support Types Grid */}
      <section style={{ padding: '4rem 5%', background: '#f8fafc', marginTop: '-4rem' }}>
        <div className="stats-grid" style={{ maxWidth: '1300px', margin: '0 auto', gap: '2rem' }}>
          {[
            { title: 'Sales Enquiries', desc: 'Discuss pricing, solutions, and partnerships.' },
            { title: 'Shipment Support', desc: 'Get real-time help for active shipments.' },
            { title: 'Enterprise Solutions', desc: 'Custom logistics built for scale.' },
            { title: 'General Queries', desc: "Questions? We're here to help." }
          ].map((item, i) => (
            <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '10px' }}>{item.title}</h4>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section style={{ padding: '8rem 5%', background: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>Talk to Our Logistics Experts</h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8', marginBottom: '3rem' }}>
              Share your requirements and our specialists will get back to you with the most efficient shipping solution tailored to your needs.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Global Offices</h4>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>Asia • Middle East • Europe • North America</p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Availability</h4>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>24/7 Shipment Monitoring & Support</p>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '3rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
            <form onSubmit={handleSubmit}>
              {submitted && (
                <div style={{ background: '#ecfdf5', color: '#065f46', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: '700', textAlign: 'center' }}>
                  ✓ Enquiry Submitted Successfully
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', width: '100%' }} required />
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', width: '100%' }} required />
              </div>
              <input type="text" name="company" placeholder="Company Name" value={formData.company} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', width: '100%', marginBottom: '1rem' }} required />
              <textarea name="message" rows="4" placeholder="Tell us about your shipping needs" value={formData.message} onChange={handleInputChange} style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', width: '100%', marginBottom: '1.5rem', resize: 'none' }} required></textarea>
              <button type="submit" style={{ width: '100%', background: '#4f46e5', color: 'white', padding: '1rem', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s' }}>
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Dark Stats Row */}
      <section style={{ background: '#0a1128', padding: '5rem 5%', color: 'white' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '3rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4f46e5' }}>120+</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>Countries Served</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4f46e5' }}>10M+</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>Shipments Annually</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4f46e5' }}>99%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.5)', marginTop: '5px' }}>Customer Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Ready to Ship Smarter CTA */}
      <section style={{ background: '#2563eb', padding: '6rem 5%', color: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Ready to Ship Smarter?</h2>
          <p style={{ fontSize: '1.1rem', opacity: '0.9', marginBottom: '2.5rem' }}>Partner with Forex Shipping and experience seamless global logistics.</p>
          <button style={{ background: 'white', color: '#2563eb', padding: '1rem 2.5rem', borderRadius: '10px', fontWeight: '700', border: 'none', cursor: 'pointer' }}>Get Started Today</button>
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

export default Contact;
