# Mercury - AI Investment Intelligence

AI-powered stock analysis platform providing real-time market data and intelligent investment insights.

## 🚀 Features

- **Real-Time Stock Data**: Powered by Financial Modeling Prep API
- **AI Analysis**: Claude-powered investment insights
- **Global Stock Support**: US, India, UK, and European markets
- **Smart Currency Detection**: Automatic currency symbol display
- **Modern UI**: Clean, responsive design

## 📦 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Manual Deployment

You can also deploy via the Vercel dashboard:
1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

## 🔑 API Keys Required

1. **FMP API Key**: Get from [financialmodelingprep.com](https://financialmodelingprep.com)
2. **Claude API Key**: Get from [console.anthropic.com](https://console.anthropic.com)

Configure these in the app's Settings modal after deployment.

## 🛠️ Local Development

### React Landing Page
```bash
npm install
npm run dev
```

### Standalone App
Simply open `mercury_app.html` in your browser.

## 📂 Project Structure

```
mercury/
├── src/              # React landing page source
├── dist/             # Build output
├── mercury_app.html  # Standalone stock analysis app
├── index.html        # React entry point
├── vercel.json       # Vercel configuration
└── package.json      # Dependencies
```

## 🌐 URLs After Deployment

- **Landing Page**: `https://your-app.vercel.app/`
- **Stock App**: `https://your-app.vercel.app/app`

## 📝 License

MIT
