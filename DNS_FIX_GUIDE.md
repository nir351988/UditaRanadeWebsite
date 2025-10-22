# 🔧 DNS Configuration Fix for uditaranade.com

## 🚨 Problem Identified

Your domain `uditaranade.com` is currently pointing to **GitHub Pages** instead of **Netlify**.

**Current DNS (Wrong):**
- IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- These are GitHub Pages IPs, causing 404 errors

**Working URL:**
- ✅ https://uditaranade.netlify.app (Works perfectly!)

---

## ✅ Solution: Update DNS to Point to Netlify

You need to update your DNS records at your domain registrar (where you bought uditaranade.com).

### Option 1: Use Netlify DNS (Recommended - Easiest)

#### Steps:
1. **Go to Netlify Dashboard:** https://app.netlify.com/sites/uditaranade/settings/domain
2. **Click "Add custom domain"** or manage existing domain
3. **Follow Netlify's instructions** to update nameservers at your registrar
4. **Netlify will provide nameservers** like:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

#### At Your Domain Registrar:
1. Log in to your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find DNS/Nameserver settings
3. Replace existing nameservers with Netlify's nameservers
4. Save changes

**Propagation Time:** 24-48 hours (but usually 1-2 hours)

---

### Option 2: Use Netlify's Load Balancer IP (Quick Fix)

If you want to keep your current registrar's DNS, update these records:

#### DNS Records to Update:

**Delete these GitHub Pages records:**
```
A    @    185.199.108.153
A    @    185.199.109.153
A    @    185.199.110.153
A    @    185.199.111.153
```

**Add Netlify's Load Balancer IP:**
```
A    @    75.2.60.5
```

**Add CNAME for www (optional):**
```
CNAME    www    uditaranade.netlify.app
```

#### Step-by-Step:
1. **Log in** to your domain registrar
2. **Go to DNS Management** for uditaranade.com
3. **Delete all A records** pointing to 185.199.x.x
4. **Add new A record:**
   - Type: `A`
   - Name: `@` (or leave blank for root domain)
   - Value: `75.2.60.5`
   - TTL: `3600` (or automatic)
5. **Save changes**

**Propagation Time:** 1-4 hours (faster than Option 1)

---

### Option 3: Use CNAME with apex domain (if supported)

Some modern DNS providers (Cloudflare, DNS Made Easy) support ALIAS/ANAME records:

```
ALIAS    @    uditaranade.netlify.app
CNAME    www  uditaranade.netlify.app
```

---

## 🔍 How to Check Your Domain Registrar

Don't know where your domain is registered? Check here:
- **WHOIS Lookup:** https://whois.domaintools.com/uditaranade.com
- Look for "Registrar" field

Common Registrars:
- GoDaddy
- Namecheap
- Google Domains
- Hostinger
- Bluehost
- Domain.com

---

## ✅ Verify Configuration

After updating DNS, wait 1-2 hours and verify:

### Command Line Check:
```powershell
# Check DNS resolution
nslookup uditaranade.com

# Should show:
# Address: 75.2.60.5 (Netlify IP)
```

### Online Tools:
- https://dnschecker.org/ - Check global DNS propagation
- https://mxtoolbox.com/SuperTool.aspx - DNS lookup tool

### Browser Test:
- Open https://uditaranade.com
- Should show your website (not 404)

---

## 🚀 Quick Reference

| Service | Status | URL |
|---------|--------|-----|
| Netlify Subdomain | ✅ Working | https://uditaranade.netlify.app |
| Custom Domain | ❌ Wrong DNS | https://uditaranade.com (404) |
| Local Test | ✅ Working | http://localhost:8080 |

**Netlify Site ID:** `a291b316-a7b2-4f2c-9cc4-0c980e1c8c17`

---

## 📝 Detailed Instructions by Registrar

### GoDaddy
1. Log in to GoDaddy
2. Go to "My Products" → "Domains"
3. Click on uditaranade.com
4. Click "DNS" or "Manage DNS"
5. Find A records with 185.199.x.x IPs
6. Delete all GitHub Pages A records
7. Add new A record: `75.2.60.5`
8. Save changes

### Namecheap
1. Log in to Namecheap
2. Go to "Domain List"
3. Click "Manage" next to uditaranade.com
4. Go to "Advanced DNS" tab
5. Find A records with 185.199.x.x IPs
6. Delete all GitHub Pages A records
7. Add new A record: `75.2.60.5`
8. Save changes

### Google Domains / Squarespace Domains
1. Log in to Google Domains
2. Click on uditaranade.com
3. Go to "DNS" section
4. Click "Manage custom records"
5. Find A records with 185.199.x.x IPs
6. Delete all GitHub Pages A records
7. Add new A record: `75.2.60.5`
8. Save changes

### Cloudflare (if using)
1. Log in to Cloudflare
2. Select uditaranade.com
3. Go to "DNS" tab
4. Find A records with 185.199.x.x IPs
5. Delete all GitHub Pages A records
6. Add new A record: `75.2.60.5`
7. Ensure "Proxy status" is ON (orange cloud)
8. Save changes

---

## ⚠️ Important Notes

1. **Don't panic during propagation** - Your site might be intermittently available
2. **Clear browser cache** - Force refresh with Ctrl+F5
3. **Test in incognito mode** - Avoids cache issues
4. **Use phone data** - Test from different network
5. **Wait 24-48 hours** - Maximum propagation time

---

## 🆘 Troubleshooting

### Still seeing 404 after DNS update?

**1. Clear DNS cache on your computer:**
```powershell
# Windows
ipconfig /flushdns

# Verify new IP
nslookup uditaranade.com
```

**2. Check DNS propagation globally:**
- Visit: https://www.whatsmydns.net/#A/uditaranade.com
- Should show `75.2.60.5` worldwide

**3. Verify in Netlify Dashboard:**
- Go to: https://app.netlify.com/sites/uditaranade/settings/domain
- Check if domain shows "Netlify DNS" or custom DNS
- Look for SSL certificate status (should be "Netlify DNS" with green checkmark)

**4. Force HTTPS redirect:**
- In Netlify: Settings → Domain management → HTTPS
- Enable "Force HTTPS" option

---

## 📞 Need Help?

**Netlify Support:**
- https://answers.netlify.com/
- Email: support@netlify.com

**DNS Lookup Tools:**
- https://dnschecker.org/
- https://mxtoolbox.com/
- https://www.whatsmydns.net/

---

## ✅ Expected Result After Fix

Once DNS is updated correctly:
- ✅ https://uditaranade.com → Your website loads
- ✅ https://www.uditaranade.com → Your website loads
- ✅ Automatic HTTPS with SSL certificate
- ✅ Fast loading via Netlify CDN
- ✅ No more 404 errors

---

**Current Status:**
- 🟢 Website code: Perfect
- 🟢 Netlify deployment: Working
- 🔴 DNS configuration: **Needs update** (pointing to wrong server)

**Action Required:** Update DNS records at your domain registrar to point to Netlify instead of GitHub Pages.
