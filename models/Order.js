import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Generate unique tracking ID in format FXS-XXXXXXXXXXXX
const generateTrackingId = () => {
  const uuid = uuidv4().replace(/-/g, '').substring(0, 12).toUpperCase();
  return `FXS-${uuid}`;
};

const orderSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      unique: true,
      index: true,
      default: generateTrackingId
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    customState: {
      type: String,
      trim: true,
      default: null
    },
    productName: {
      type: String,
      required: true,
      enum: [
        'iPhone 17',
        'iPhone 17 Pro',
        'iPhone 17 Pro Max',
        'iPhone Air',
        'Apple Watch Series 11',
        'Apple Watch Ultra 3',
        'Apple Watch SE (3rd generation)',
        'AirPods Pro 3',
        'AirPods 4 (ANC)',
        'AirPods 4',
        'AirPods Max (2nd generation)',
        'HomePod mini',
        'MacBook Pro (M5)',
        'MacBook Air (M3 / M4)',
        'Mac mini (M4)',
        'Mac Studio',
        'iMac',
        'iPad Pro 11-inch',
        'iPad Pro 13-inch',
        'iPad Air',
        'iPad mini',
        'iPad (standard)',
        'Apple TV 4K',
        'Apple Vision Pro',
        'MagSafe Charger',
        'Magic Keyboard',
        'EarPods',
        'Apple Pencil'
      ]
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    companyName: {
      type: String,
      required: true,
      default: 'PMIUSA'
    },
    shippingFromAddress: {
      type: String,
      required: true,
      default: 'Miami, FL 80095 SW 87th Avenue, Suite 777 Miami, Florida 33176'
    },
    status: {
      type: String,
      enum: [
        // machine values
        'pending',
        'pickup_scheduled',
        'origin_scan',
        'processed_at_hub',
        'transshipment',
        'discharged_at_port',
        'gate_in_out',
        'blank_sailing',
        'held_in_customs',
        'under_assessment',
        'boe_filed',
        'customs_cleared',
        'awaiting_duties_payment',
        'in_transit',
        'arrived_destination_hub',
        'out_for_delivery',
        'delivery_attempted',
        'delivered',
        'cancelled',
        // legacy/display values (keep for compatibility)
        'Pending',
        'Pickup Scheduled / Pending Pickup',
        'Origin Scan / Arrived at Facility',
        'Processed at Hub',
        'Transshipment',
        'Discharged at Port',
        'Gate-In / Gate-Out',
        'Blank Sailing',
        'Held in Customs / Pending Customs',
        'Under Assessment',
        'Bill of Entry (BOE) Filed',
        'Customs Cleared / International Shipment Release',
        'Awaiting Payment of Duties',
        'In Transit',
        'Arrived at Destination Hub',
        'Out for Delivery',
        'Delivery Attempted',
        'Delivered',
        'Cancelled'
      ],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Ensure tracking ID is unique before saving
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    let trackingId = generateTrackingId();
    let exists = true;

    // Keep generating until we get a unique tracking ID
    while (exists) {
      exists = await mongoose.model('Order').findOne({ trackingId });
      if (!exists) {
        this.trackingId = trackingId;
      } else {
        trackingId = generateTrackingId();
      }
    }
  }
  next();
});

export default mongoose.model('Order', orderSchema);
