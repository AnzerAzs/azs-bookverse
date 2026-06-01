# 🤖 GitHub Actions - Automatic Deployments Guide

## 📚 What is GitHub Actions?

GitHub Actions is **free** automation that:
- ✅ Automatically builds your code on every push
- ✅ Runs tests automatically
- ✅ Deploys to GitHub Pages automatically
- ✅ No manual commands needed
- ✅ Sends notifications on failures

---

## 🎯 How It Works

```
You push code to GitHub
        ↓
GitHub Actions triggers (automatic)
        ↓
Installs dependencies (npm ci)
        ↓
Builds project (npm run build)
        ↓
Runs tests (optional)
        ↓
Deploys to GitHub Pages (automatic)
        ↓
Your site is LIVE ✅
```

---

## 🚀 Setup Automatic Deployments (2 Minutes)

### **Step 1: Create Workflow File**

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: 🚀 Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      # Step 1: Checkout code
      - name: 📥 Checkout code
        uses: actions/checkout@v3
      
      # Step 2: Setup Node.js
      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      # Step 3: Install dependencies
      - name: 📦 Install dependencies
        run: npm ci
      
      # Step 4: Run linter (optional)
      - name: 🔍 Lint code
        run: npm run lint --if-present || echo "No linter configured"
      
      # Step 5: Build
      - name: 🏗️ Build project
        run: npm run build
      
      # Step 6: Deploy to GitHub Pages
      - name: 🌐 Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
      
      # Step 7: Comment on PR
      - name: 💬 Comment on Pull Request
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Build successful! Deploy preview ready after merge to main.'
            })
```

### **Step 2: Push to GitHub**

```bash
# Add the workflow file
git add .github/workflows/deploy.yml

# Commit
git commit -m "Add GitHub Actions automatic deployment"

# Push
git push origin main
```

### **Step 3: Watch It Deploy!**

1. Go to your GitHub repo
2. Click **Actions** tab
3. Watch the workflow run in real-time
4. After success ✅, your site auto-deploys!

---

## 📊 Workflow Explained

### **What Each Section Does:**

```yaml
on:
  push:
    branches:
      - main          # Trigger when pushing to main
  pull_request:
    branches:
      - main          # Also trigger on PR creation
```

```yaml
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest  # Run on Ubuntu machine (free)
```

```yaml
      - name: 📥 Checkout code
        uses: actions/checkout@v3  # Download your code
```

```yaml
      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'        # Use Node 18
          cache: 'npm'              # Cache node_modules
```

```yaml
      - name: 📦 Install dependencies
        run: npm ci                 # Clean install (like npm install)
```

```yaml
      - name: 🏗️ Build project
        run: npm run build          # Build for production
```

```yaml
      - name: 🌐 Deploy to GitHub Pages
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}  # Auto-generated
          publish_dir: ./dist                         # Deploy dist folder
```

---

## ✨ Advanced Features

### **Add Tests to Your Workflow**

```yaml
      - name: 🧪 Run tests
        run: npm test -- --coverage
```

### **Send Slack Notifications**

```yaml
      - name: 💬 Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "❌ Deployment failed for ${{ github.repository }}"
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### **Send Email Notifications**

```yaml
      - name: 📧 Send email notification
        if: failure()
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: "❌ Deployment Failed"
          to: your@email.com
          from: github-actions@azs-bookverse.com
          body: |
            Workflow failed!
            Repository: ${{ github.repository }}
            Branch: ${{ github.ref }}
            Commit: ${{ github.sha }}
```

### **Deploy to Multiple Platforms**

```yaml
      - name: 🚀 Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

      - name: 🚀 Deploy to Netlify
        run: netlify deploy --prod --auth ${{ secrets.NETLIFY_AUTH_TOKEN }} --dir=dist
```

### **Environment Variables in Actions**

```yaml
      - name: 🏗️ Build with environment variables
        env:
          VITE_STRIPE_PUBLIC_KEY: ${{ secrets.VITE_STRIPE_PUBLIC_KEY }}
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
        run: npm run build
```

---

## 🔐 Add Secrets to GitHub Actions

### **What are Secrets?**

Secrets are encrypted environment variables that GitHub Actions can use. Perfect for:
- API keys
- Database URLs
- Stripe keys
- Tokens

### **Add Secrets (2 Steps)**

**Step 1: Go to GitHub**
1. Your repo → **Settings**
2. **Secrets and variables** → **Actions**
3. Click **New repository secret**

**Step 2: Add Your Secrets**

```
Name: VITE_STRIPE_PUBLIC_KEY
Value: pk_test_xxxxxxxxx
```

```
Name: VITE_API_URL
Value: https://your-api.railway.app
```

**Step 3: Use in Workflow**

```yaml
env:
  VITE_STRIPE_PUBLIC_KEY: ${{ secrets.VITE_STRIPE_PUBLIC_KEY }}
```

---

## 📈 Monitor Your Deployments

### **View Workflow Runs**

1. Go to your GitHub repo
2. Click **Actions** tab
3. See all workflow runs
4. Click a run to see details
5. View logs by clicking on a step

### **View Deployment Status**

```
✅ Success  - Deployed successfully
❌ Failed   - Build or deploy error
⏳ Running  - Currently deploying
⏹️ Cancelled - Workflow cancelled
```

---

## 🎯 Common Workflows to Add

### **Workflow 1: Build + Test + Deploy**

```yaml
name: Build, Test, Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
      
      - name: Deploy
        if: github.event_name == 'push'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### **Workflow 2: Deploy Preview on PR**

```yaml
name: Deploy Preview

on:
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      
      - name: Comment PR with preview
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Build successful!\nPreview: https://pr-${{ github.event.number }}.example.com'
            })
```

### **Workflow 3: Schedule Deployments**

```yaml
name: Scheduled Deployment

on:
  schedule:
    - cron: '0 0 * * *'  # Every day at midnight UTC

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

---

## 🛠️ Troubleshooting GitHub Actions

### **Workflow Not Triggering?**

```bash
# 1. Check branch name matches
# Should be "main" not "master"

# 2. Check YAML syntax (no tabs, 2 spaces)
# Use yamllint.com to validate

# 3. Check file location
# Must be: .github/workflows/deploy.yml

# 4. Commit and push workflow file first
git add .github/workflows/deploy.yml
git commit -m "Add workflow"
git push
```

### **Build Failing?**

```bash
# Check workflow logs:
# Actions tab → Click failed run → View logs

# Common issues:
# ❌ Node version mismatch
# ❌ Missing environment variables
# ❌ Dependencies not installed
# ❌ Build command incorrect
```

### **Deploy Failing?**

```bash
# Check GitHub Pages settings:
# Settings → Pages → Source: "GitHub Actions"

# Check GITHUB_TOKEN:
# Settings → Environments → production → secrets
```

---

## 📊 Workflow Status Badge

Add this to your `README.md` to show workflow status:

```markdown
[![Deploy](https://github.com/AnzerAzs/AZS-BookVerse/actions/workflows/deploy.yml/badge.svg)](https://github.com/AnzerAzs/AZS-BookVerse/actions/workflows/deploy.yml)
```

This shows a badge in your README:
- 🟢 Green = Latest deployment successful
- 🔴 Red = Latest deployment failed

---

## 🎯 Best Practices

### **✅ DO:**
- Use node version that matches your local version
- Cache dependencies (`cache: 'npm'`)
- Use `npm ci` instead of `npm install`
- Add descriptive step names
- Use meaningful commit messages
- Test before deploying

### **❌ DON'T:**
- Hardcode secrets in workflow files
- Use `npm install` (use `npm ci`)
- Deploy on every change (use branch filters)
- Forget to test your workflow locally
- Ignore workflow failures

---

## 🚀 Your Complete Setup

```bash
# 1. Create workflow file
mkdir -p .github/workflows
touch .github/workflows/deploy.yml

# 2. Add the deploy.yml content (see above)

# 3. Commit and push
git add .github/workflows/deploy.yml
git commit -m "🤖 Add GitHub Actions auto-deployment"
git push origin main

# 4. Watch it deploy!
# Go to Actions tab in GitHub
```

---

## ✨ What Happens Next

```
You push code
        ↓
GitHub sees the push
        ↓
GitHub Actions starts automatically
        ↓
Workflow runs all steps
        ↓
If successful: Deploy to GitHub Pages
        ↓
Your site updates automatically!
        ↓
No manual deployment needed! 🎉
```

---

## 📞 Getting Help

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Workflow Syntax**: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- **Marketplace**: https://github.com/marketplace?type=actions
- **Community**: https://github.com/community

---

## 🎊 You're Done!

Your AZS BookVerse now has **automatic deployments**! 🚀

Every time you push code:
- ✅ Automatically builds
- ✅ Automatically deploys
- ✅ Site updates instantly
- ✅ Zero manual work

**That's it! You're ready!** 🎉

Made with ❤️ by AZS Dev Team
