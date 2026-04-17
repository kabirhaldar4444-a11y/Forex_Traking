import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrder } from '../services/auth';
import '../styles/Dashboard.css';
import { STATUSES } from '../constants';
import logo from '../images/Forexshipping.png';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, searchType, filterOrders]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data.orders);
    } catch (err) {
      console.error(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  }, []);

  const filterOrders = useCallback(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter(order => {
      const tid = (order.trackingId || '').toLowerCase();
      const cname = (order.customerName || '').toLowerCase();
      const phone = (order.phone || '').toLowerCase();
      const email = (order.email || '').toLowerCase();

      switch (searchType) {
        case 'trackingId': return tid.includes(term);
        case 'customer': return cname.includes(term);
        case 'phone': return phone.includes(term);
        case 'email': return email.includes(term);
        default: return tid.includes(term) || cname.includes(term) || email.includes(term) || phone.includes(term);
      }
    });
    setFilteredOrders(filtered);
  }, [orders, searchTerm, searchType]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/orders/${orderId}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          fetchOrders();
        } else {
          alert('Failed to delete order');
        }
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrder(orderId, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => (o.status || '').toLowerCase() === 'pending').length,
    in_transit: orders.filter(o => (o.status || '').toLowerCase().includes('transit') || (o.status || '').toLowerCase() === 'in_transit').length,
    delivered: orders.filter(o => (o.status || '').toLowerCase() === 'delivered').length
  };

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
          <button className="sidebar-link active" onClick={() => navigate('/dashboard')}>
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
          <h1>Logistics Overview</h1>
          <div className="user-badge">
            <div className="user-avatar">{user.name ? user.name[0].toUpperCase() : 'A'}</div>
            <span className="user-name">Admin: {user.name}</span>
          </div>
        </header>

        {/* Stats Section */}
        <section className="dashboard-stats-row">
          <div className="premium-stat-card">
            <div className="card-icon indigo">📦</div>
            <div className="card-info">
              <h3>Total Orders</h3>
              <p className="number">{stats.total}</p>
            </div>
          </div>
          <div className="premium-stat-card">
            <div className="card-icon orange">⏳</div>
            <div className="card-info">
              <h3>Pending</h3>
              <p className="number">{stats.pending}</p>
            </div>
          </div>
          <div className="premium-stat-card">
            <div className="card-icon blue">🚚</div>
            <div className="card-info">
              <h3>In Transit</h3>
              <p className="number">{stats.in_transit}</p>
            </div>
          </div>
          <div className="premium-stat-card">
            <div className="card-icon green">✅</div>
            <div className="card-info">
              <h3>Delivered</h3>
              <p className="number">{stats.delivered}</p>
            </div>
          </div>
        </section>

        {/* Orders Table Card */}
        <div className="dashboard-section-card">
          <div className="section-header">
            <h2>Tracked Shipments</h2>
            <button className="nav-btn solid" onClick={() => navigate('/create-order')} style={{ padding: '10px 20px', borderRadius: '12px' }}>+ Create Order</button>
          </div>

          <div className="search-bar-premium">
            <div className="search-field">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search by name, ID or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="search-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="all">Global Search</option>
              <option value="trackingId">Tracking ID</option>
              <option value="customer">Customer</option>
              <option value="phone">Phone Number</option>
              <option value="email">Email</option>
            </select>
          </div>

          <div className="premium-table-container">
            {loading ? (
              <div className="no-data-msg">Initializing dashboard data...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="no-data-msg">No shipments found matching your criteria.</div>
            ) : (
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Tracking ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Destination</th>
                    <th>Product / Qty</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order._id}>
                      <td><span className="tracking-id-badge">{order.trackingId}</span></td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{order.email}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: '#6366f1' }}>
                           <span style={{ fontSize: '1rem' }}>📞</span> {order.phone}
                        </div>
                      </td>
                      <td>{order.state === 'Others' ? order.customState : order.state}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{order.productName}</div>
                        <div style={{ fontSize: '0.85rem' }}>Qty: {order.quantity}</div>
                      </td>
                      <td>
                        <select 
                          className="status-dropdown-modern"
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          {STATUSES.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <div className="action-btns-modern">
                          <button className="mini-action-btn" title="Edit" onClick={() => navigate(`/edit-order/${order._id}`)}>✏️</button>
                          <button className="mini-action-btn delete" title="Delete" onClick={() => handleDeleteOrder(order._id)}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
