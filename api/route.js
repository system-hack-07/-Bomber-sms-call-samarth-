const axios = require('axios');

// Multiple SMS/Call APIs for redundancy
const SMS_APIS = [
    {
        name: 'FastSMS',
        url: 'https://api.fastsms.in/send',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        buildPayload: (phone) => ({
            phone: formatPhone(phone),
            message: 'OTP: 123456',
            apikey: process.env.FASTSMS_KEY || 'demo'
        })
    },
    {
        name: 'MSG91',
        url: 'https://api.msg91.com/apiv5/flow/',
        method: 'POST',
        headers: { 'authkey': process.env.MSG91_KEY || 'demo' },
        buildPayload: (phone) => ({
            mobiles: formatPhone(phone),
            template_id: process.env.MSG91_TEMPLATE || 'demo'
        })
    },
    {
        name: 'Twilio',
        url: 'https://api.twilio.com/2010-04-01/Accounts/demo/Messages.json',
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`demo:${process.env.TWILIO_TOKEN || 'demo'}`).toString('base64')
        },
        buildPayload: (phone) => ({
            From: process.env.TWILIO_FROM || '+1234567890',
            To: formatPhone(phone),
            Body: 'Verification Code: 123456'
        })
    }
];

const CALL_APIS = [
    {
        name: 'ExoTelAPI',
        url: 'https://api.exotel.com/v1/Accounts/demo/Calls/connect.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        buildPayload: (phone) => ({
            From: process.env.EXOTEL_CALLER_ID || '080-EXOTEL',
            To: formatPhone(phone),
            CallerId: process.env.EXOTEL_CALLER_ID || '080-EXOTEL'
        })
    },
    {
        name: 'JivaAPI',
        url: 'https://jivaapi.com/send-call',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        buildPayload: (phone) => ({
            phone: formatPhone(phone),
            duration: 30,
            apikey: process.env.JIVA_KEY || 'demo'
        })
    }
];

// Format phone number to standard format
function formatPhone(phone) {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        cleaned = '91' + cleaned;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        // Already has country code
    }
    return '+' + cleaned;
}

// Send SMS via random API
async function sendSMS(phone) {
    const api = SMS_APIS[Math.floor(Math.random() * SMS_APIS.length)];
    
    try {
        const payload = api.buildPayload(phone);
        const response = await axios({
            method: api.method,
            url: api.url,
            headers: api.headers,
            data: payload,
            timeout: 5000
        });
        
        return { success: true, api: api.name, status: response.status };
    } catch (error) {
        console.error(`SMS API ${api.name} failed:`, error.message);
        return { success: false, api: api.name, error: error.message };
    }
}

// Send Call via random API
async function sendCall(phone) {
    const api = CALL_APIS[Math.floor(Math.random() * CALL_APIS.length)];
    
    try {
        const payload = api.buildPayload(phone);
        const response = await axios({
            method: api.method,
            url: api.url,
            headers: api.headers,
            data: payload,
            timeout: 5000
        });
        
        return { success: true, api: api.name, status: response.status };
    } catch (error) {
        console.error(`Call API ${api.name} failed:`, error.message);
        return { success: false, api: api.name, error: error.message };
    }
}

// Main handler
module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { phone, type } = req.body;

    // Validation
    if (!phone || !type) {
        return res.status(400).json({ error: 'Missing phone or type' });
    }

    if (!['sms', 'call', 'mixed'].includes(type)) {
        return res.status(400).json({ error: 'Invalid type' });
    }

    try {
        let results = [];

        if (type === 'sms' || type === 'mixed') {
            const smsResult = await sendSMS(phone);
            results.push(smsResult);
        }

        if (type === 'call' || type === 'mixed') {
            const callResult = await sendCall(phone);
            results.push(callResult);
        }

        const successCount = results.filter(r => r.success).length;
        
        res.status(200).json({
            success: successCount > 0,
            phone: phone,
            type: type,
            results: results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Handler error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
};
