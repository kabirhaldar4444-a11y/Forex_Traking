import React, { useState, useRef } from 'react';
import { STATUSES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { getOrderByTrackingId } from '../services/auth';
import '../styles/PublicTracking.css';
import logo from '../images/Forexshipping.png';
import shippingImg from '../images/Shipping.png';

const PublicTracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setLoading(true);
    setSearched(true);

    try {
      if (!trackingId.trim()) {
        setError('Please enter a tracking ID');
        setLoading(false);
        return;
      }

      const response = await getOrderByTrackingId(trackingId);
      setOrder(response.data.order);
      setTimeout(() => {
        orderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    } catch (err) {
      setError(err.response?.data?.message || 'Tracking ID not found');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return '#666';
    const key = String(status).toLowerCase();
    const colorMap = {
      pending: '#ff9800',
      pickup_scheduled: '#ff9800',
      origin_scan: '#2196f3',
      processed_at_hub: '#2196f3',
      transshipment: '#6f42c1',
      discharged_at_port: '#0b4fff',
      gate_in_out: '#0b4fff',
      blank_sailing: '#9e9e9e',
      held_in_customs: '#ff9800',
      under_assessment: '#ff9800',
      boe_filed: '#ff6b2d',
      customs_cleared: '#4caf50',
      awaiting_duties_payment: '#ff9800',
      in_transit: '#2196f3',
      arrived_destination_hub: '#2196f3',
      out_for_delivery: '#f5a623',
      delivery_attempted: '#ff9800',
      delivered: '#4caf50',
      cancelled: '#f44336'
    };

    return colorMap[key] || '#666';
  };

  const getStatusLabel = (status) => {
    if (!status) return '';
    const match = STATUSES.find(s => s.value === status || s.value === String(status).toLowerCase());
    if (match) return match.label;
    return String(status).replace(/_/g, ' ').toUpperCase();
  };

  const orderRef = useRef(null);

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
            <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Contact</a>
          </div>
          <div className="nav-actions">
            <button className="ship-now-btn">Ship Now</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ background: 'radial-gradient(circle at 70% 30%, #1e40af 0%, #0a1128 100%)', color: 'white', overflow: 'hidden' }}>
        <div className="hero-inner">
          <div className="hero-left">
            <span className="hero-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#60a5fa', border: 'none' }}>⚡ Live Shipment Tracking</span>
            <h1 className="hero-title" style={{ color: 'white' }}>
              Global Logistics <br/>
              <span style={{ color: '#60a5fa' }}>Reimagined.</span>
            </h1>
            <p className="hero-sub" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Experience the next generation of freight management with our 
              intelligent tracking system and nationwide delivery network.
            </p>
            
            <div className="hero-tracker-box">
              <div className="tracker-label">TRACKING ID</div>
              <div className="tracker-input-group">
                <input
                  type="text"
                  placeholder="ENTER TRACKING ID (e.g., FXS-XXXXXX)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                  className="tracking-input"
                />
                <button type="button" className="track-submit-btn" onClick={handleSearch}>
                  <span className="btn-icon">🔍</span> {loading ? '...' : 'TRACK'}
                </button>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image-container">
              <img src={shippingImg} alt="Shipping Logistics" className="main-hero-img" />
              <div className="live-status-card">
                <div className="status-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="status-data">
                  <span className="data-label">Live Shipments</span>
                  <span className="data-value">12,840+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-header">
            <h2>Global Reach, Unwavering Trust</h2>
            <h3>FOREXSHIPPING by the Numbers</h3>
            <div className="red-divider"></div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div className="stat-number">5 Bn+</div>
              <div className="stat-desc">Parcels delivered worldwide</div>
              <div className="stat-underline"></div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <div className="stat-number">150+</div>
              <div className="stat-desc">Countries Served</div>
              <div className="stat-underline blue"></div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <div className="stat-number">100K+</div>
              <div className="stat-desc">Businesses served</div>
              <div className="stat-underline red"></div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <div className="stat-number">100K+</div>
              <div className="stat-desc">Businesses Empowered</div>
              <div className="stat-underline red"></div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <div className="stat-number">9.8 Mn+</div>
              <div className="stat-desc">TEU's Shipped infrastructure covered</div>
              <div className="stat-underline red"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section (Only shows when searched) */}
      {searched && (
        <section className="results-section" ref={orderRef}>
          <div className="results-container">
            {error && <div className="error-alert">{error}</div>}
            {order ? (
              <div className="order-details-card">
                <div className="order-header">
                  <div className="order-title-group">
                    <h3>ORDER DETAILS</h3>
                    <p className="tracking-id-display">{order.trackingId}</p>
                  </div>
                  <div className="order-status-group">
                    <span 
                      className="status-pill"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                    <span className="status-date-text">
                      Created: {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="details-grid-alt">
                  <div className="detail-box">
                    <h4>CUSTOMER</h4>
                    <p className="primary-text">{order.customerName}</p>
                    <p className="secondary-text">{order.email}</p>
                    {order.phone && <p className="secondary-text">{order.phone}</p>}
                  </div>

                  <div className="detail-box">
                    <h4>DELIVERY ADDRESS</h4>
                    <p className="primary-text">{order.deliveryAddress}</p>
                    <p className="secondary-text">{order.state === 'Others' ? order.customState : order.state}, India</p>
                  </div>

                  <div className="detail-box">
                    <h4>SHIPPED FROM</h4>
                    <p className="primary-text">{order.companyName}</p>
                    <p className="secondary-text">{order.shippingFromAddress || 'Miami, FL 80095 SW 87th Avenue, Miami, Florida'}</p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <h4>SHIPMENT TIMELINE</h4>
                  <div className="timeline-items">
                    <div className="timeline-step">
                      <div className="step-marker completed"></div>
                      <div className="step-info">
                        <p className="step-status">{order.status === 'pending' ? 'PICKUP SCHEDULED' : 'ORDER CREATED'}</p>
                        <p className="step-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {order.status !== 'pending' &&
                      (new Date(order.updatedAt).toDateString() !== new Date(order.createdAt).toDateString()) && (
                      <div className="timeline-step">
                        <div className="step-marker active"></div>
                        <div className="step-info">
                          <p className="step-status">IN TRANSIT</p>
                          <p className="step-date">{new Date(order.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}

                    {order.status === 'delivered' && (
                      <div className="timeline-step">
                        <div className="step-marker finished"></div>
                        <div className="step-info">
                          <p className="step-status">DELIVERED</p>
                          <p className="step-date">{new Date(order.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : !loading && !error && (
              <div className="no-results-msg">
                <p>No order found with tracking ID: <strong>{trackingId}</strong></p>
              </div>
            )}
          </div>
        </section>
      )}

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

export default PublicTracking;

