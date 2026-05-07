# Supabase Capacity Analysis
## Can Supabase Handle Another Website?

**Date:** May 6, 2026  
**Current Setup:** Heart Warriors + Wheels of Love  
**Question:** Can we add a 3rd website?

---

## ✅ YES! Supabase Can Handle It

Your current Supabase setup is **already configured** to support multiple websites using the `program` column approach. Adding a 3rd website is absolutely feasible.

---

## 📊 Current Database Structure

Your database uses a **multi-tenant architecture** with a `program` column:

```sql
-- Already implemented:
ALTER TABLE gallery ADD COLUMN program VARCHAR(50) DEFAULT 'heart-warriors';
ALTER TABLE posts ADD COLUMN program VARCHAR(50) DEFAULT 'heart-warriors';

-- Indexes for performance:
CREATE INDEX idx_gallery_program ON gallery(program);
CREATE INDEX idx_posts_program ON posts(program);
```

### Current Programs:
1. ✅ `heart-warriors` - Heart Warriors website
2. ✅ `wheels-of-love` - Wheels of Love website
3. 🆕 `[your-new-program]` - Ready to add!

---

## 🎯 Supabase Free Tier Limits

### Database Storage
- **Limit:** 500 MB
- **Current Usage:** ~5-10 MB (estimated for 2 sites)
- **Per Site:** ~2-5 MB average
- **3rd Site Impact:** +2-5 MB
- **Total After 3rd Site:** ~10-15 MB
- **Remaining:** ~485 MB (97% available) ✅

### Database Rows
- **Limit:** Unlimited on Free tier
- **Current:** ~100-500 rows (posts, gallery, etc.)
- **3rd Site Impact:** +100-500 rows
- **Status:** No concerns ✅

### API Requests
- **Limit:** 50,000 requests/month (Free tier)
- **Per Site:** ~5,000-10,000 requests/month
- **3 Sites:** ~15,000-30,000 requests/month
- **Status:** Well within limits ✅

### Bandwidth
- **Limit:** 5 GB/month (Free tier)
- **Current:** ~500 MB - 1 GB/month
- **3rd Site Impact:** +500 MB
- **Total:** ~1.5-2 GB/month
- **Status:** Comfortable ✅

### Storage (Files)
- **Limit:** 1 GB (Free tier)
- **Current:** ~50-100 MB (images/videos)
- **3rd Site Impact:** +50-100 MB
- **Total:** ~150-300 MB
- **Status:** Plenty of space ✅

### Concurrent Connections
- **Limit:** 60 connections (Free tier)
- **Per Site:** ~5-10 connections
- **3 Sites:** ~15-30 connections
- **Status:** No issues ✅

---

## 🏗️ How to Add a 3rd Website

### Step 1: Choose Program Name
Pick a unique identifier for your new program:
- Example: `senior-care`, `youth-program`, `nutrition-program`, etc.

### Step 2: Update Database Queries
All your API endpoints already support the `program` filter:

```javascript
// Example: Fetch posts for new program
const { data } = await supabase
  .from('posts')
  .select('*')
  .eq('program', 'your-new-program')
  .eq('status', 'published');
```

### Step 3: Clone Existing Project
1. Copy the `wheels-of-love` or `heart-warriors` folder
2. Rename it to your new program name
3. Update the `.env` file (same Supabase credentials)
4. Update `program` value in all API calls

### Step 4: Update Content
- Change branding (logo, colors, text)
- Update site settings
- Add initial content via admin panel

### Step 5: Deploy
- Push to GitHub
- Deploy to Vercel (free tier supports unlimited projects)
- Connect to same Supabase instance

---

## 📈 Scaling Considerations

### When to Upgrade Supabase?

**Free Tier is sufficient for:**
- ✅ 3-5 small websites
- ✅ ~1,000 posts total
- ✅ ~5,000 images/videos
- ✅ ~50,000 API requests/month
- ✅ ~100 concurrent users

**Consider Pro Tier ($25/month) when:**
- ❌ Storage exceeds 8 GB
- ❌ API requests exceed 500,000/month
- ❌ Need more than 120 concurrent connections
- ❌ Need daily backups
- ❌ Need priority support

### Current Capacity Estimate:
With your current usage patterns, you can comfortably run **5-7 websites** on the Free tier before hitting any limits.

---

## 🔒 Security Considerations

### Shared Database Benefits:
✅ Single source of truth  
✅ Easier to manage  
✅ Consistent data structure  
✅ Shared admin accounts (if desired)

### Data Isolation:
✅ `program` column ensures data separation  
✅ Row Level Security (RLS) policies can be program-specific  
✅ Each site only queries its own data

### Recommended RLS Update:
```sql
-- Update RLS policies to filter by program
CREATE POLICY "Public read published posts by program" ON posts
  FOR SELECT USING (status = 'published' AND program = current_setting('app.current_program'));
```

---

## 💰 Cost Breakdown

### Current Setup (Free Tier):
- **Supabase:** $0/month
- **Vercel:** $0/month (3 projects)
- **GitHub:** $0/month
- **Total:** $0/month ✅

### With 3rd Website:
- **Supabase:** $0/month (still within limits)
- **Vercel:** $0/month (unlimited projects on free tier)
- **GitHub:** $0/month
- **Total:** $0/month ✅

### Future Scaling (if needed):
- **Supabase Pro:** $25/month (8 GB storage, 5M requests)
- **Vercel Pro:** $20/month (optional, for team features)
- **Total:** $25-45/month

---

## 🎯 Recommendations

### For 3rd Website:
1. ✅ **Use the same Supabase instance** - No need for a new one
2. ✅ **Use the same database** - Already set up for multi-tenant
3. ✅ **Add program filter** - Just use a new `program` value
4. ✅ **Deploy to Vercel** - Free tier supports unlimited projects
5. ✅ **Share admin panel** - Or create a separate one

### Database Optimization:
```sql
-- Add your new program to the database
-- No schema changes needed, just start using:
INSERT INTO posts (title, content, program, ...) 
VALUES ('First Post', 'Content...', 'your-new-program', ...);
```

### Monitoring:
- Check Supabase dashboard for usage metrics
- Monitor API request count
- Watch storage growth
- Set up alerts at 80% capacity

---

## 🚀 Quick Start Checklist

- [ ] Choose program name (e.g., `senior-care`)
- [ ] Clone existing project folder
- [ ] Update `.env` with same Supabase credentials
- [ ] Update `program` value in all API calls
- [ ] Change branding (logo, colors, text)
- [ ] Test locally
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add initial content via admin panel
- [ ] Test data isolation (ensure only your program's data shows)

---

## ✅ Conclusion

**YES, Supabase can easily handle a 3rd website!**

Your current setup is designed for this exact scenario. The `program` column architecture allows you to add multiple websites without any database schema changes. You're currently using less than 5% of your Free tier limits, so you have plenty of room to grow.

### Summary:
- **Current Usage:** ~3% of Free tier capacity
- **After 3rd Site:** ~5% of Free tier capacity
- **Remaining Capacity:** Can support 4-5 more sites
- **Cost:** $0 (stays on Free tier)
- **Setup Time:** ~2-3 hours to clone and customize

**Go ahead and add your 3rd website! 🎉**

---

**Need Help?** Let me know what the new program is about, and I can help you set it up!
