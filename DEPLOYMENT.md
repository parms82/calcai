# CalcAI Deployment Guide
### Complete record of deployment steps for calcai.in

---

## 1. Pre-Deployment Setup

### Domain
- **Registrar**: GoDaddy
- **Domain**: `calcai.in`
- **Protection**: WHOIS Privacy enabled (recommended)

### GitHub Repository
- **Account**: parms82 (personal GitHub account)
- **Repo**: https://github.com/parms82/calcai
- **Branch**: main

### Project Structure
```
calcai/
├── frontend/          ← React + Vite app (deployed to Netlify)
├── backend/           ← FastAPI (kept locally, not deployed)
├── netlify/
│   └── functions/     ← Serverless Python functions
│       ├── ask-ai.py        ← AI assistant endpoint
│       ├── create-lead.py   ← Lead capture endpoint
│       ├── track-click.py   ← Affiliate click tracking
│       ├── health.py        ← Health check
│       └── requirements.txt
├── netlify.toml       ← Netlify build config
└── .gitignore
```

---

## 2. GitHub Setup

### Initial Push
```powershell
cd "E:\FinCal AI\fincalcai"
git init
git config user.name "Your Personal Name"
git config user.email "your-personal@gmail.com"
git add .
git commit -m "Initial commit - CalcAI financial calculator portal"
git branch -M main
git remote add origin https://parms82@github.com/parms82/calcai.git
git push -u origin main
```

### Switching GitHub Accounts (work → personal)
If the wrong GitHub account is cached on Windows:
```powershell
# Clear cached credentials
cmdkey /delete:LegacyGeneric:target=git:https://github.com

# Set remote URL with personal username explicitly
git remote set-url origin https://parms82@github.com/parms82/calcai.git
```
When git prompts for password — enter your **Personal Access Token** (not password).
Generate token at: GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic) → check `repo` scope.

### .gitignore (critical — add before first push)
The `.gitignore` at project root excludes:
- `node_modules/` — npm packages (auto-installed by Netlify)
- `backend/.venv/` — Python virtual environment
- `frontend/dist/` — build output (Netlify builds this)
- `.env` files — secrets
- `__pycache__/` — Python cache

---

## 3. Netlify Deployment

### Account
- **URL**: https://app.netlify.com
- **Sign up**: Use personal GitHub account for one-click repo import

### Connect Repository
1. Netlify Dashboard → **Add new site → Import from Git**
2. Connect GitHub → select `parms82/calcai`
3. Netlify auto-detects `netlify.toml` settings:

### Build Settings (from netlify.toml)
| Setting | Value |
|---|---|
| Base directory | `frontend` |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Functions directory | `../netlify/functions` |

### Environment Variables
Set in: Netlify → Site configuration → Environment variables

| Variable | Value | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Activates AI assistant on all calculators |
| `SUPABASE_URL` | (optional) | Lead/click database |
| `SUPABASE_ANON_KEY` | (optional) | Lead/click database |

> **Note**: Deploy works without any env vars. AI shows a friendly stub message until key is added.

### API Routing (netlify.toml redirects)
```
/api/ai/ask           → /.netlify/functions/ask-ai
/api/leads            → /.netlify/functions/create-lead
/api/affiliates/click → /.netlify/functions/track-click
/health               → /.netlify/functions/health
/*                    → /index.html  (React SPA fallback)
```

### Deploy URL
- **Netlify preview**: `https://calcai-in.netlify.app`
- **Production**: `https://calcai.in`

---

## 4. Domain Connection (GoDaddy → Netlify)

### Steps
1. Netlify → Site configuration → Domain management → **Add a domain**
2. Enter `calcai.in` → Netlify shows required DNS records
3. GoDaddy → My Products → DNS next to `calcai.in`
4. Delete default GoDaddy parking `A` record
5. Add DNS records from Netlify:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `75.2.60.5` (Netlify load balancer) |
| `CNAME` | `www` | `calcai-in.netlify.app` |

6. SSL certificate auto-activates within 10 minutes (Let's Encrypt, free)

**DNS propagation time**: 5–30 minutes

---

## 5. Google Search Console

### Verification
1. Go to: https://search.google.com/search-console
2. Add property → URL prefix → `https://calcai.in`
3. Verify using **HTML file** method:
   - Download verification file (e.g. `google4191b0ad3674faf4.html`)
   - Place in `frontend/public/` folder
   - Commit and push to GitHub → Netlify auto-deploys
   - Click Verify in Search Console

```powershell
git add frontend/public/google4191b0ad3674faf4.html
git commit -m "Add Google Search Console verification file"
git push origin main
```

### Sitemap Submission
1. Search Console → left sidebar → **Sitemaps**
2. Enter `sitemap.xml` → click **Submit**
3. Status shows "Success" after Google fetches it
4. If "Couldn't fetch" → wait 2–3 hours → click Resubmit

**Sitemap URL**: `https://calcai.in/sitemap.xml`
**Pages indexed**: 14 (homepage, 8 calculators, blog index, 3 articles, pricing)

---

## 6. Bing Webmaster Tools

### Verification
1. Go to: https://www.bing.com/webmasters
2. Add site → `https://calcai.in`
3. Download XML verification file (`BingSiteAuth.xml`)
4. Place in `frontend/public/` folder
5. Commit and push → click Verify

```powershell
git add frontend/public/BingSiteAuth.xml
git commit -m "Add Bing Webmaster Tools verification file"
git push origin main
```

### Sitemap Submission
Same as Google — submit `https://calcai.in/sitemap.xml`

---

## 7. How to Deploy Future Changes

Any code change follows this flow:
```
Edit code locally → git commit → git push → Netlify auto-deploys (2 min)
```

```powershell
cd "E:\FinCal AI\fincalcai"
git add .
git commit -m "Description of what changed"
git push origin main
```

Netlify detects the push and rebuilds automatically. No manual action needed.

---

## 8. Revenue Activation Checklist

### Do Immediately
- [ ] Add `ANTHROPIC_API_KEY` in Netlify env vars → activates AI assistant
- [ ] Apply for Google AdSense at google.com/adsense (takes 2–4 weeks approval)
- [ ] Sign up as Groww affiliate at groww.in/partner
- [ ] Sign up as HDFC Bank affiliate (for loan calculators)

### After AdSense Approval
- [ ] Replace `VITE_ADSENSE_CLIENT` and slot IDs in Netlify env vars
- [ ] Ads go live automatically (AdSlot component is already in place)

### Month 2
- [ ] Write 2 more blog articles
- [ ] Check Search Console for ranking keywords
- [ ] Share site in Indian finance communities

---

## 9. Key URLs

| Resource | URL |
|---|---|
| Live site | https://calcai.in |
| GitHub repo | https://github.com/parms82/calcai |
| Netlify dashboard | https://app.netlify.com |
| Google Search Console | https://search.google.com/search-console |
| Bing Webmaster Tools | https://www.bing.com/webmasters |
| Sitemap | https://calcai.in/sitemap.xml |
| robots.txt | https://calcai.in/robots.txt |
| API health check | https://calcai.in/health |

---

*Deployed: June 2026 | Stack: React + Vite + Tailwind + Netlify Functions*
