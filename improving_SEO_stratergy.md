# The Complete SEO & AI Discovery Strategy

This document explains exactly how search engines (like Google) and AI crawlers (like ChatGPT and Perplexity) discover, read, and rank `adityac.codes`. 

---

## 1. The Core Concepts

### What actually is a "Bot"?
A "bot" (or crawler/spider) is just a script running on a massive server owned by a company (like Google or OpenAI). It is not an AI with a brain. It is simply a script running a giant loop that does this:
1. Download a webpage.
2. Save the text into a database.
3. Find all the `<a href="...">` links on that page.
4. Add those new links to a queue and visit them next.

Google's bot is called **Googlebot**. OpenAI's bot is called **GPTBot**.

### How does `adityac.codes` get onto the Internet?
When deployed to Vercel, the code is placed on a server that is turned on 24/7. When you buy a domain, DNS acts as the internet's phonebook, pointing `adityac.codes` to Vercel's server. However, at this point, Google does not know the site exists. It must be "discovered".

### How Discovery Works
Google discovers your website in two ways:
1. **Links from other places:** If you put `https://adityac.codes` on your LinkedIn or GitHub, Googlebot scans your GitHub, sees the new link, and visits it.
2. **Google Search Console:** You can manually submit your site to Google, explicitly telling them you exist.

---

## 2. The 4 Pillars of Discovery

When a bot arrives at `adityac.codes`, it looks for files in a very specific order. Here is how we configured the site to give bots exactly what they want.

### A. `robots.txt` (The Security Guard)
Before looking at any HTML, the bot requests `robots.txt`. 
- **What it does:** It tells bots whether they are allowed to look at the site.
- **Our Strategy:** We use `User-agent: *` (which means "All bots") and `Allow: /` (which means "you can enter"). This is a permission slip. It contains **zero** data about Aditya Chauhan.

### B. `sitemap.xml` (The Map)
At the bottom of `robots.txt`, we link to `sitemap.xml`.
- **What it does:** It is a literal map of all the pages you own on your domain.
- **Our Strategy:** Since this is a Single Page Application (SPA), we just give it the homepage. 
  - `<changefreq>daily</changefreq>` tells Google to check back every day. 
  - `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` is the XML Namespace—it tells Googlebot to use the official sitemap dictionary to understand our tags.

*(Note: The sitemap does **not** list your external GitHub/LinkedIn links. It only maps the house you own).*

### C. `JSON-LD` (The ID Card for Google)
Once inside the house, Googlebot downloads `index.html`. 
- **What it does:** Google Search is a strict database. It struggles to read messy React HTML. `JSON-LD` (JavaScript Object Notation for Linked Data) is a block of code in the `<head>` that hands Google a perfectly formatted dictionary.
- **Our Strategy:** We give Google an exact `@type: "Person"` dictionary. 
- **How Google finds your GitHub:** We use the `"sameAs"` array in the JSON-LD. This explicitly screams to Google: *"The person who owns this website is the exact SAME person who owns this GitHub and LeetCode."* This links your profiles together in Google's brain.

### D. `llms.txt` (The AI Resume)
AI bots (like ChatGPT, Claude, and Perplexity) are fundamentally different from Google.
- **What it does:** AI models prefer to read plain, conversational text (Markdown) rather than structured JSON databases. 
- **Our Strategy:** The AI community created a new standard where their bots look for `/llms.txt`. When a recruiter asks Perplexity about "Aditya Chauhan NIT Jalandhar", the Perplexity bot grabs this `.txt` file. Because we put all your heavy-hitting stats in there (LeetCode Knight 1961, CGPA 8.56, Accenture Intern), the AI reads it perfectly and spits out a highly impressive summary to the recruiter.

---

## 3. The Vercel Deployment Flow

How does all this get from your laptop to a user's screen?
1. **The Build Step:** Vercel runs `npm run build`. It compiles your React `.tsx` files into `.js` and `.css`, and puts them in a `dist/` folder along with everything from your `public/` folder (like `robots.txt` and images).
2. **The Request:** A user visits `adityac.codes`. Vercel's Edge Network immediately serves them the static `index.html` from the `dist/` folder.
3. **Fetching the JS:** The browser reads `index.html`, sees the `<script>` tag for your React code, and requests the JavaScript file from Vercel.
4. **Rendering:** Once the JS is downloaded, React boots up in the browser and paints your glassmorphism UI onto the screen.

---

## Summary
By combining `robots.txt` (permission), `sitemap.xml` (location), `JSON-LD` (Google database), and `llms.txt` (AI context), the portfolio is perfectly optimized to be discovered, read, and highly ranked by both traditional search engines and the new wave of AI chatbots.
