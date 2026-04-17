import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { INDIAN_STATES, PRODUCTS, STATUSES } from '../constants';
import '../styles/Dashboard.css';
import logo from '../images/Forexshipping.png';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    state: '',
    customState: '',
    productName: '',
    quantity: 1,
    status: 'Pending',
    companyName: '',
    shippingFromAddress: ''
  });

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const order = data.order || {};
        setFormData({
          customerName: order.customerName || '',
          email: order.email || '',
          phone: order.phone || '',
          deliveryAddress: order.deliveryAddress || '',
          state: order.state || '',
          customState: order.customState || '',
          productName: order.productName || '',
          quantity: order.quantity || 1,
          status: order.status || '',
          companyName: order.companyName || '',
          shippingFromAddress: order.shippingFromAddress || ''
        });
      } else {
        setError('Failed to load order');
      }
    } catch (err) {
      setError('Error loading order');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccess('Order updated successfully');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to update order');
      }
    } catch (err) {
      setError('Error updating order');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <div className="no-data-msg">Fetching shipment details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className="dashboard-nav-sidebar">
        <div className="sidebar-header">
           <div className="sidebar-brand">
             <img src={logo} alt="Logo" className="logo" />
             <span className="name">FOREXSHIPPING</span>
           </div>
        </div>
        
        <div className="sidebar-links">
          <button className="sidebar-link" onClick={() => navigate('/dashboard')}>
            <span>📊</span> Dashboard
          </button>
          <button className="sidebar-link" onClick={() => navigate('/create-order')}>
            <span>➕</span> New Shipment
          </button>
          <button className="sidebar-link" onClick={() => navigate('/')}>
            <span>🌐</span> Public Portal
          </button>
        </div>

        <div className="sidebar-footer">
          <button className="logout-btn-sidebar" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">
        <header className="dashboard-top-header">
          <h1>Edit Shipment : {id.slice(-8).toUpperCase()}</h1>
          <div className="user-badge">
            <div className="user-avatar">{user.name ? user.name[0].toUpperCase() : 'A'}</div>
            <span className="user-name">Admin: {user.name}</span>
          </div>
        </header>

        <div className="dashboard-section-card" style={{ maxWidth: '900px' }}>
          <div className="section-header">
            <h2>Modify Order Details</h2>
            {success && <div style={{ color: '#059669', fontWeight: 700 }}>{success}</div>}
            {error && <div style={{ color: '#dc2626', fontWeight: 700 }}>{error}</div>}
          </div>

          <form onSubmit={handleSubmit} className="premium-form">
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px' }}>
              <div className="premium-input-wrap">
                <label>Customer Full Name *</label>
                <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} required />
              </div>
              <div className="premium-input-wrap">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="premium-input-wrap">
                <label>Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="premium-input-wrap">
                <label>Destination State *</label>
                <select name="state" value={formData.state} onChange={handleInputChange} required>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {formData.state === 'Others' && (
                <div className="premium-input-wrap">
                  <label>Specify State *</label>
                  <input type="text" name="customState" value={formData.customState} onChange={handleInputChange} required />
                </div>
              )}
              <div className="premium-input-wrap" style={{ gridColumn: 'span 2' }}>
                <label>Delivery Address *</label>
                <input type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={handleInputChange} required />
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Package & Status</h3>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.5fr 1fr', gap: '25px', marginBottom: '40px' }}>
              <div className="premium-input-wrap">
                <label>Product Name *</label>
                <select name="productName" value={formData.productName} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="premium-input-wrap">
                <label>Qty *</label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="1" required />
              </div>
              <div className="premium-input-wrap">
                <label>Update Status *</label>
                <select name="status" value={formData.status} onChange={handleInputChange} required>
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Origin Update</h3>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '40px' }}>
              <div className="premium-input-wrap">
                <label>Origin Company *</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} required />
              </div>
              <div className="premium-input-wrap">
                <label>Origin Address *</label>
                <input type="text" name="shippingFromAddress" value={formData.shippingFromAddress} onChange={handleInputChange} required />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
               <button type="submit" className="nav-btn solid" style={{ padding: '15px 40px', borderRadius: '14px', fontSize: '1rem' }} disabled={submitting}>
                 {submitting ? 'Updating...' : 'Save Changes'}
               </button>
               <button type="button" className="nav-btn outline" onClick={() => navigate('/dashboard')} style={{ padding: '15px 30px', borderRadius: '14px', color: '#1e1b4b', borderColor: '#e2e8f0' }}>Back to Dashboard</button>
            </div>
          </form>
        </div>
      </main>

      <style>{`
        .premium-input-wrap { display: flex; flex-direction: column; gap: 8px; }
        .premium-input-wrap label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; }
        .premium-input-wrap input, .premium-input-wrap select { 
          padding: 12px 18px; 
          border-radius: 12px; 
          border: 1px solid #e2e8f0; 
          background: #f8fafc; 
          font-weight: 600; 
          color: #1e1b4b; 
          outline: none; 
          transition: all 0.2s;
        }
        .premium-input-wrap input:focus, .premium-input-wrap select:focus { border-color: #6366f1; background: white; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1); }
      `}</style>
    </div>
  );
};

export default EditOrder;
