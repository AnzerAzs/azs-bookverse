# 🚀 Deployment Guide - AZS BookVerse

## Quick Start Deployments

### 1️⃣ **Vercel (Recommended)**

Vercel is the easiest and fastest way to deploy.

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

✅ **Benefits**: Automatic deployments on git push, free tier, CDN included

### 2️⃣ **Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

✅ **Benefits**: Easy setup, form handling, serverless functions

### 3️⃣ **GitHub Pages**

1. Update `vite.config.js`:
```javascript
export default {
  base: '/AZS-BookVerse/',  // Your repo name
  // ... rest of config
}
```

2. Deploy:
```bash
npm run build
# Commit dist folder and push to gh-pages branch
```

### 4️⃣ **Docker + Any Server**

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### 5️⃣ **AWS Amplify**

```bash
# Install Amplify CLI
npm i -g @aws-amplify/cli

# Configure
amplify configure

# Deploy
amplify publish
```

## Environment Variables

Create `.env` file for sensitive data:

```env
VITE_API_URL=https://api.example.com
VITE_AD_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Optimization

1. **Enable Gzip Compression**: Configure on your server
2. **Use CDN**: Serve assets globally
3. **Minify Assets**: Already done by Vite
4. **Lazy Load Images**: Add `loading="lazy"` to img tags

## Monitoring

- **Vercel Analytics**: Built-in
- **Google Analytics**: Add to `index.html`
- **Sentry**: Error tracking

## Security

✅ HTTPS enabled on all platforms
✅ CSP headers configured
✅ No sensitive data in frontend
✅ XSS protection enabled

---

Choose the platform that best fits your needs!
