import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TPHFr47TWg5hV8';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'BjSKbtk9FqJKlnS7AV1qGyoI';

    if (!keyId || !keySecret) {
      return res.status(401).json({ error: 'Razorpay API credentials missing' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { amount, currency = 'INR', receipt } = body;

    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount)) {
      return res.status(400).json({ error: 'Invalid amount provided' });
    }

    // Convert amount in Rupees to paise (1 INR = 100 paise). Minimum: 100 paise (₹1).
    const amountInPaise = Math.round(parsedAmount * 100);

    if (amountInPaise < 100) {
      return res.status(400).json({ error: 'Minimum amount must be at least ₹1 (100 paise)' });
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const options = {
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: receipt || `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ 
      error: 'Failed to create Razorpay order',
      details: error.message || error 
    });
  }
}
