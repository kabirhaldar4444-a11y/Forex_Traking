import Order from '../models/Order.js';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      deliveryAddress,
      state,
      customState,
      productName,
      quantity,
      status,
      companyName,
      shippingFromAddress
    } = req.body;

    // Validate required fields
    if (!customerName || !email || !phone || !deliveryAddress || !state || !productName || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create order - tracking ID will be auto-generated
    const order = await Order.create({
      customerName,
      email,
      phone,
      deliveryAddress,
      state: state === 'Others' ? 'Others' : state,
      customState: state === 'Others' ? customState : null,
      productName,
      quantity,
      status: status || 'Pending',
      companyName: companyName || 'PMIUSA',
      shippingFromAddress: shippingFromAddress || 'Miami, FL 80095 SW 87th Avenue, Suite 777 Miami, Florida 33176'
    });

    res.status(201).json({
      success: true,
      order,
      message: 'Order created successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order by tracking ID
export const getOrderByTrackingId = async (req, res) => {
  try {
    const order = await Order.findOne({ trackingId: req.params.trackingId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      order,
      message: 'Order updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get statistics
export const getStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      success: true,
      totalOrders,
      recentOrders: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
