# SMS/Call Bomber - Serverless Edition

⚠️ **LEGAL DISCLAIMER**: This tool is for **educational purposes only**. Unauthorized SMS/Call bombing is **illegal** in most jurisdictions. Users are solely responsible for compliance with all local, state, and federal laws.

---

## 📋 Overview

A fully serverless SMS and Call bombing application deployed on **Vercel** with multiple API integrations for redundancy and maximum impact. Single HTML file UI + Node.js backend.

### ✨ Features

- ✅ **Multi-API Support** - FastSMS, MSG91, Twilio, ExoTel, Jiva
- ✅ **SMS Bombing** - Rapid fire SMS requests
- ✅ **Call Bombing** - Voice call attacks
- ✅ **Mixed Mode** - SMS + Calls simultaneously
- ✅ **Serverless** - Deploy on Vercel (free tier)
- ✅ **Zero Configuration** - Works out of the box
- ✅ **Beautiful UI** - Modern gradient interface
- ✅ **Configurable** - Control count, delay, type
- ✅ **CORS Enabled** - Cross-origin requests

---

## 🚀 Quick Start

### 1. Deploy to Vercel (30 seconds)

```bash
# Option A: Deploy from GitHub
1. Fork this repo
2. Go to https://vercel.com/new
3. Import the repository
4. Click "Deploy"

# Option B: Deploy from CLI
npm i -g vercel
vercel login
vercel --prod
```

### 2. Set Environment Variables

Go to **Vercel Dashboard** → **Project Settings** → **Environment Variables**

Add these keys:
```
FASTSMS_KEY=your_api_key
MSG91_KEY=your_auth_key
MSG91_TEMPLATE=your_template_id
TWILIO_TOKEN=your_auth_token
TWILIO_FROM=+1234567890
EXOTEL_CALLER_ID=080-EXOTEL
JIVA_KEY=your_api_key
```

### 3. Start Bombing!

Visit: `https://your-project.vercel.app`

---

## 📱 Supported APIs

| API | Type | Country | Free Tier |
|-----|------|---------|-----------|
| **FastSMS** | SMS | India | ❌ |
| **MSG91** | SMS | India | ✅ |
| **Twilio** | SMS/Call | Global | ✅ ($15 credit) |
| **ExoTel** | Call | India | ✅ |
| **Jiva** | Call | India | ❌ |

### Get API Keys

#### FastSMS
- Website: https://fastsms.in/
- Register → API Dashboard → Copy API Key

#### MSG91
- Website: https://msg91.com/
- Free tier includes SMS credits
- Auth Key in "Routing" section

#### Twilio
- Website: https://www.twilio.com/
- $15 free credit (usually 500+ SMS)
- Account SID & Auth Token in Dashboard

#### ExoTel
- Website: https://exotel.com/
- Free tier available
- Get SID & Token from settings

#### Jiva
- Website: https://jiva.ai/
- Register → Get API Key from developer portal

---

## 🛠️ Local Development

```bash
# Clone repo
git clone https://github.com/system-hack-07/-Bomber-sms-call-samarth-.git
cd -Bomber-sms-call-samarth-

# Install dependencies
npm install

# Create .env.local
cat > .env.local << 'EOF'
FASTSMS_KEY=demo
MSG91_KEY=demo
MSG91_TEMPLATE=demo
TWILIO_TOKEN=demo
TWILIO_FROM=+1234567890
EXOTEL_CALLER_ID=080-EXOTEL
JIVA_KEY=demo
EOF

# Run locally
npm run dev

# Visit http://localhost:3000
```

---

## 📂 Project Structure

```
.
├── index.html              # Frontend (HTML + CSS + JS)
├── api/
│   └── route.js           # Backend (Vercel serverless)
├── vercel.json            # Vercel config
├── package.json           # Dependencies
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

### How It Works

1. **Frontend** (`index.html`)
   - Beautiful gradient UI
   - Form to collect phone, type, count, delay
   - Sends POST requests to `/api/route`
   - Shows real-time progress counter

2. **Backend** (`api/route.js`)
   - Receives POST with phone, type
   - Randomly selects SMS/Call API
   - Formats phone number (+91 or 10 digits)
   - Returns success/failure for each API

3. **Deployment** (`vercel.json`)
   - Routes `/api/*` to Node.js function
   - Routes `/*` to static HTML
   - Sets up environment variables
   - 60-second timeout, 512MB memory

---

## 💻 Usage

### Web UI

1. **Open App**
   ```
   https://your-project.vercel.app
   ```

2. **Enter Phone Number**
   - With country code: `+919876543210`
   - Indian format: `9876543210`
   - Both formats auto-convert

3. **Select Attack Type**
   - `SMS` - SMS bombs only
   - `Call` - Call bombs only
   - `Mixed` - SMS + Calls

4. **Set Parameters**
   - **Count**: 1-500 requests
   - **Delay**: 100-5000ms between requests

5. **Click "Start Attack"**
   - Real-time progress shown
   - Shows requests sent
   - Stop button available

6. **Results**
   - Success/Failure status
   - Total requests sent
   - Timestamp

### API Usage

**Endpoint**: `POST /api/route`

**Request**:
```json
{
  "phone": "+919876543210",
  "type": "mixed"
}
```

**Response**:
```json
{
  "success": true,
  "phone": "+919876543210",
  "type": "mixed",
  "results": [
    {
      "success": true,
      "api": "FastSMS",
      "status": 200
    },
    {
      "success": true,
      "api": "ExoTel",
      "status": 201
    }
  ],
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

---

## 🔐 Security Notes

- ✅ No phone numbers logged
- ✅ Ephemeral requests (5-second timeout)
- ✅ CORS restricted (configure in `vercel.json` if needed)
- ✅ Rate limiting via Vercel (100 requests/sec per deployment)
- ✅ No database = no data persistence
- ✅ Environment variables hidden from logs

### Recommendations

```javascript
// Add IP rate limiting
const rateLimit = {
  max: 100,
  windowMs: 15 * 60 * 1000 // 15 minutes
};

// Add request validation
if (!isValidPhone(phone)) {
  return res.status(400).json({ error: 'Invalid phone' });
}

// Add API key rotation
// Store encrypted keys in Vercel Secrets
```

---

## ⚡ Performance

### Expected Performance

| Metric | Value |
|--------|-------|
| Request time | 2-5 seconds |
| Concurrent requests | 50+ per minute |
| Max requests | 500 per session |
| Vercel timeout | 60 seconds |
| Cost | FREE (within limits) |

### Optimization Tips

1. **Batch Requests** - Send 50-100 per session
2. **Optimal Delay** - 500-1000ms recommended
3. **Mixed Mode** - Distributes load better
4. **Multiple Deployments** - Load balance across instances

---

## 🚫 Rate Limits

### Per API

| API | Limit | Window |
|-----|-------|--------|
| FastSMS | 100/minute | 1 minute |
| MSG91 | 100/minute | 1 minute |
| Twilio | Depends on account | Varies |
| ExoTel | 50/minute | 1 minute |
| Jiva | 100/minute | 1 minute |

### Vercel Limits

- **Max Duration**: 60 seconds per request
- **Memory**: 512MB per function
- **Concurrent**: 1000 per account
- **Bandwidth**: 100GB/month free tier

---

## 🆘 Troubleshooting

### Error: "API Key Invalid"

**Solution**: 
- Verify keys in Vercel dashboard
- Restart deployment after setting env vars
- Check API provider's dashboard

### Error: "Request Timeout"

**Solution**:
- Increase delay between requests
- Reduce total request count
- Check API provider's status page
- Increase Vercel timeout in `vercel.json`

### Error: "Invalid Phone Number"

**Solution**:
- Use `+91` country code
- Or just 10 digits: `9876543210`
- Remove spaces/dashes

### Error: "CORS Error"

**Solution**:
```javascript
// Update vercel.json headers
"headers": [
  {
    "key": "Access-Control-Allow-Origin",
    "value": "*"
  }
]
```

### Error: "Function timeout"

**Solution**:
```json
{
  "functions": {
    "api/route.js": {
      "maxDuration": 120
    }
  }
}
```

---

## 📊 Monitoring

### Vercel Analytics

- Visit: **Vercel Dashboard** → **Project** → **Analytics**
- Monitor:
  - Request count
  - Response times
  - Error rates
  - Bandwidth usage

### Custom Logging

```javascript
// Add to api/route.js
console.log({
  timestamp: new Date().toISOString(),
  phone: phone,
  type: type,
  success: results.filter(r => r.success).length
});
```

---

## 🔄 Deployment Platforms

### Heroku
```bash
heroku create your-app
heroku config:set FASTSMS_KEY=xxx
git push heroku main
```

### Railway.app
```bash
railway link
railway up
```

### Render.com
- Connect GitHub repo
- Add env vars in dashboard
- Auto-deploy on push

### AWS Lambda
```bash
serverless deploy
serverless logs -f handler
```

---

## 📝 Advanced Usage

### Bulk Bombing

```javascript
const phones = [
  '9876543210',
  '9876543211',
  '9876543212'
];

phones.forEach(phone => {
  fetch('/api/route', {
    method: 'POST',
    body: JSON.stringify({ phone, type: 'mixed' })
  });
});
```

### Custom Payload

Edit `api/route.js` to customize:
- Message content
- Request frequency
- API selection logic
- Response handling

### Load Distribution

Deploy multiple instances and distribute traffic:
```javascript
const instances = [
  'https://bomber1.vercel.app',
  'https://bomber2.vercel.app',
  'https://bomber3.vercel.app'
];
```

---

## 🤝 Contributing

Pull requests welcome! Areas for improvement:

- [ ] More API integrations
- [ ] Web dashboard
- [ ] Statistics tracking
- [ ] API failover mechanism
- [ ] Proxy rotation
- [ ] Mobile app version

---

## 📄 License

MIT License - Free to use for educational purposes

---

## ⚠️ Legal Warning

**I am NOT responsible for misuse.** This tool is:
- ❌ NOT for harassment
- ❌ NOT for crime
- ❌ NOT for spam
- ✅ FOR testing your own systems
- ✅ FOR security research
- ✅ FOR educational purposes

**Using this tool to harm others is ILLEGAL.**

---

## 👤 Author

**Samarth** - [GitHub](https://github.com/system-hack-07)

---

## 🔗 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Node.js API Reference](https://nodejs.org/api/)
- [Twilio API](https://www.twilio.com/docs)
- [MSG91 API](https://msg91.com/apiv5)

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅

