export const articlePart1 = `
Building a website is not always a clean process.

Sometimes the client gives you a perfectly organized Google Drive folder containing their logo, photographs, service descriptions, brand guidelines and every other asset you need.

Sometimes they do not.

The website may be outdated.
The previous developer may be unreachable.
The original photographs may no longer exist on the client's computer.
The marketing person who managed the content may have left the company.

And yet hundreds of genuine business photographs may already be publicly available on the company's Instagram profile.

That creates a practical problem:

> **How do you turn years of publicly available social media content into an organized, optimized website asset library without manually saving hundreds of individual photographs?**

We recently encountered exactly this type of situation.

The project involved roughly 800 images that needed to be collected, reviewed, organized and eventually prepared for search-friendly website use.

Saving hundreds of images manually would have been slow and error-prone.

Instead, we created a workflow around:

**Public Instagram Profile → Bulk Download → Media Cleanup → Classification → Keyword Mapping → Image SEO → WebP/AVIF Conversion → Website Integration**

Modern AI development tools make the second half of this workflow especially interesting.

Tools such as ChatGPT, Codex, Cursor and Google Antigravity can help developers inspect large media libraries, generate scripts, organize files, create metadata and modify website code at a scale that would previously have required a significant amount of repetitive manual work. Google describes Antigravity as an agentic development environment capable of working across the editor, terminal and browser, which makes this type of multi-step development workflow particularly well suited to agent-assisted execution.

This guide explains the complete process.

## Quick Summary

| Stage | Goal | Typical Tool |
| :--- | :--- | :--- |
| **1. Confirm rights and source** | Make sure the media can legitimately be reused | Client approval / project records |
| **2. Download public media** | Retrieve existing public posts in bulk | Instaloader |
| **3. Preserve originals** | Keep an untouched source archive | File system / backup |
| **4. Inventory assets** | Understand exactly what was downloaded | Python / CSV |
| **5. Remove duplicates** | Reduce unnecessary files | Python |
| **6. Classify images** | Group photographs by service/topic | AI + scripts |
| **7. Map keywords** | Connect assets to relevant pages | Semrush + SEO research |
| **8. Rename files** | Create descriptive filenames | Python |
| **9. Convert formats** | Reduce image weight | WebP / AVIF |
| **10. Generate alt text** | Describe relevant images accurately | AI + human review |
| **11. Place images** | Add relevant media to website pages | AI coding agent / CMS |
| **12. Validate** | Check accessibility, performance and SEO | Browser / SEO tools |

![Workflow for turning public Instagram media into SEO-ready website images](https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80)

## 1. Why This Problem Happens During Real Website Projects

Website development is often described as if every project begins with perfect inputs.

Reality is different.

Consider a furniture company that has been operating for several years.

Its Instagram account may contain:
- completed bedroom projects;
- wardrobes;
- TV units;
- kitchens;
- sofas;
- office furniture;
- interior projects;
- installation photographs;
- before-and-after images;
- customer projects;
- workshop photographs.

Those images may represent years of useful business history.

But the website developer may receive only a logo and a phone number.

The media technically exists.
It simply does not exist in a usable website library.

Manually opening 800 Instagram posts, downloading individual images, renaming them and determining where they belong can consume an enormous amount of time.

That is where automation becomes useful.

## 2. Public Does Not Automatically Mean Free to Reuse

There is an important distinction before discussing the technical process.

A photograph being publicly visible does not automatically transfer copyright or usage rights.

The safest use case is therefore one where:
- you are working for the business that owns the profile;
- the client has authorized you to reuse its media;
- your organization owns the media;
- or you otherwise have legitimate permission to reuse the material.

This guide is about retrieving publicly accessible material for legitimate website-development and archival workflows.

It is not about bypassing private accounts, authentication requirements or access controls.

You should also preserve provenance where practical.

For a professional client project, an image inventory can include:

\`\`\`text
Original filename | Original post date | Source profile | Source post URL | Local filename | Usage status | Rights/approval status | Target page | Alt text
\`\`\`

That small amount of documentation becomes extremely valuable when a project grows.

## 3. Why Bulk Downloading Is Better Than Manual Saving

Imagine a profile containing 800 usable photographs.

If manually processing each photograph takes only 30 seconds:

**800 × 30 seconds = 24,000 seconds (6.67 hours)**

That equals more than 6.5 hours just to perform a repetitive download operation.

And downloading is only the beginning.

You still need to:
- inspect the images;
- identify duplicates;
- classify them;
- rename them;
- resize them;
- compress them;
- determine which pages need them;
- create alt text;
- upload them;
- add them to the website.

Automation should handle repetitive operations so humans can focus on decisions.

That is the fundamental principle behind this workflow.

## 4. The Tool We Used: Instaloader

Instaloader is an open-source command-line utility for retrieving Instagram media.

Its documentation provides a straightforward command for downloading the pictures and videos associated with a public profile:

\`\`\`bash
instaloader PROFILE
\`\`\`

Instaloader creates a directory for the target profile and can download the profile picture, posts and associated media. Its documentation also provides options for things such as Reels, filename patterns, post filtering and incremental updates.

That makes it useful when the goal is not:
*"Save this one photograph."*
but instead:
*"Create a local archive of the media currently available from this public business profile."*

![Instaloader downloading public Instagram posts in Windows PowerShell](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80)

## 5. Installing Python on Windows

The following workflow was performed on Windows PowerShell.

First verify Python:

\`\`\`powershell
python --version
\`\`\`

You should receive something similar to:
\`Python 3.13.x\`

Now verify pip:

\`\`\`powershell
pip --version
\`\`\`

If both commands work, install Instaloader:

\`\`\`powershell
python -m pip install instaloader
\`\`\`

Alternatively:

\`\`\`powershell
pip install instaloader
\`\`\`

Using \`python -m pip\` is usually preferable when multiple Python installations exist because it makes the Python environment being used more explicit.

## 6. Downloading a Public Instagram Profile Without Logging In

Once Instaloader is installed, use:

\`\`\`powershell
python -m instaloader PUBLIC_USERNAME
\`\`\`

Replace \`PUBLIC_USERNAME\` with the username of the public profile.

For example:
\`python -m instaloader examplebusiness\`

If retrieval works, output should begin appearing in PowerShell:

\`\`\`text
Stored ID ... for profile examplebusiness.
Downloading profile examplebusiness
examplebusiness\\2026-07-18_15-46-00_UTC_profile_pic.jpg
Retrieving posts from profile examplebusiness.
[1] examplebusiness\\2026-08-26_05-21-22_UTC.jpg
[2] examplebusiness\\2026-08-07_12-39-44_UTC_1.jpg
[3] examplebusiness\\2026-08-07_12-39-44_UTC_2.jpg
\`\`\`

That is the point at which you know media retrieval is actually working.

Instaloader's official documentation confirms that public profiles are supported as targets and that downloaded media is saved inside a directory corresponding to the target profile.

## 7. Where Are the Downloaded Instagram Images Saved?

Suppose PowerShell currently shows:

\`\`\`text
PS C:\\Users\\YourName>
\`\`\`

and you execute:
\`python -m instaloader examplebusiness\`

Instaloader will normally create:

\`\`\`text
C:\\Users\\YourName\\examplebusiness\\
\`\`\`

Inside it you may find:
\`2026-08-26_05-21-22_UTC.jpg\`, \`2026-08-07_12-39-44_UTC_1.jpg\`, \`2026-08-07_12-39-44_UTC_2.jpg\`, \`2026-07-18_15-46-00_UTC_profile_pic.jpg\`...

There may also be caption or metadata files depending on the selected options.

Do not immediately rename or overwrite this original folder.
Make a copy.

A better architecture is:

\`\`\`text
client-media/
├── 01-original-instagram/
├── 02-working/
├── 03-classified/
├── 04-webp/
└── 05-production/
\`\`\`

Preserving original assets gives you a recovery point if something goes wrong later.

![Folder structure for organizing downloaded website images](https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80)

## 8. Downloading Reels

Instaloader also documents a \`--reels\` option.

For example:

\`\`\`powershell
python -m instaloader --reels PUBLIC_USERNAME
\`\`\`

Whether you actually need Reels depends on the website.

For many service-business projects, videos can be useful for:
- project galleries;
- before/after sections;
- social-proof sections;
- hero backgrounds;
- short project showcases.

But do not automatically place dozens of heavy videos on a website.
Retrieving an asset and publishing an asset are two separate decisions.

## 9. The Business-Profile Error We Encountered

During our workflow, the standard Instaloader installation encountered a particularly confusing error on a professional/business profile:

\`\`\`text
400 Bad Request
Asset asset://laser.provider/ig_business_category_subvertical has been deleted. You cannot use this schema
\`\`\`

This was not caused by an incorrect Python installation.

It was related to a change on Instagram's side affecting the profile endpoint used by Instaloader for certain professional/business accounts.

The issue has been documented by Instaloader users, including reports against version 4.15.3.

An upstream Instaloader pull request subsequently introduced a fallback using Instagram's mobile feed endpoint for anonymous profile resolution and post pagination. The PR specifically describes both the business-profile HTTP 400 problem and anonymous pagination failures.

This is useful context because sometimes:
- \`pip install instaloader\` is correct,
- Python is correct,
- the username is correct,
- and yet the request still fails because the external platform has changed.

That distinction matters when debugging modern integrations.

## 10. The Temporary Fix That Worked

*Important: This section is time-sensitive. Check the current Instaloader release before publishing or updating this article.*

At the time of this workflow, the relevant fix existed in an open Instaloader pull request rather than the standard stable package.

We first removed the normal version:

\`\`\`powershell
python -m pip uninstall instaloader -y
\`\`\`

Then installed the patched branch:

\`\`\`powershell
python -m pip install --no-cache-dir --force-reinstall "https://github.com/alimony/instaloader/archive/refs/heads/fix-business-profile-fetching.zip"
\`\`\`

Then tested again:

\`\`\`powershell
python -m instaloader PUBLIC_USERNAME
\`\`\`

The download started successfully.

An interesting detail is that \`python -m instaloader --version\` may still report \`4.15.3\` because development patches do not necessarily change the package's visible version number.

### Security note
An unreleased branch should not be treated exactly like a stable PyPI package.
For production environments:
- review the upstream pull request;
- verify the repository and branch;
- ideally pin a known commit;
- remove the temporary patch once an official release includes the fix.

That is standard dependency hygiene.

## 11. What If PowerShell Says py Points to the Wrong Python?

Another issue we encountered illustrates a common Windows problem.

A command such as:
\`py -m pip uninstall instaloader\`
may fail with:
\`Unable to create process using "C:\\...\\Python314\\python.exe" The system cannot find the file specified.\`

Yet \`python\` may work perfectly.

This usually means the Windows py launcher is referencing an older or removed Python installation.

Check:

\`\`\`powershell
where.exe python
where.exe pip
python --version
python -m pip --version
\`\`\`

If those correctly point to the active Python installation, simply use \`python -m pip ...\` instead of \`py -m pip ...\`.

There is no reason to turn a small environment-path problem into a reinstall-everything problem.

![Checking Python and pip paths in Windows PowerShell](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)

## 12. Downloading the Images Is Only 20% of the Job

This is where the workflow becomes much more interesting.

Suppose you now have 800 images.

Technically, you succeeded.
Practically, you still have a mess.

A folder containing:
\`2025-03-01_UTC.jpg\`, \`2025-03-04_UTC.jpg\`, \`2025-03-09_UTC_1.jpg\`, \`2025-03-09_UTC_2.jpg\`...

does not tell your development team:
- which photographs show wardrobes;
- which show bedrooms;
- which show kitchens;
- which should appear on the homepage;
- which should appear on the interior design page;
- which are duplicates;
- which are too small;
- which should never be published;
- which correspond to a high-value search keyword.

This is where asset intelligence becomes more important than asset collection.

## 13. Build an Image Inventory Before Optimizing Anything

For a large library, create a CSV or database containing one row per asset.

A useful structure is:

| Field | Purpose |
| :--- | :--- |
| \`original_file\` | Original downloaded filename |
| \`new_file\` | Final SEO filename |
| \`format\` | JPG / PNG / WebP / AVIF |
| \`width\` / \`height\` | Image dimensions |
| \`size_kb\` | File size |
| \`source\` | Original source |
| \`post_date\` | Original date |
| \`category\` | Kitchen / Wardrobe / Bedroom etc. |
| \`service\` | Target service |
| \`location\` | Location if legitimately known |
| \`keyword_cluster\` | Relevant SEO topic |
| \`target_page\` | Destination website page |
| \`alt_text\` | Accessible description |
| \`caption\` | Optional display caption |
| \`rights_status\` | Approved / Review |
| \`publish\` | Yes / No |

Once this exists, 800 random images become a structured content dataset.

## 14. This Is Where AI Coding Tools Change the Workflow

Historically, a developer might write several scripts manually:
- Script 1 → Read files
- Script 2 → Resize images
- Script 3 → Convert images
- Script 4 → Rename files
- Script 5 → Create manifest
- Script 6 → Update website imports

Today, an agentic coding tool can help orchestrate much more of that workflow.

For example:
1. Scan \`/assets/source\`.
2. Create an inventory.
3. Detect image dimensions.
4. Identify duplicates.
5. Categorize the media.
6. Convert approved images to WebP.
7. Generate a manifest.
8. Update the relevant website pages.
9. Verify that no broken references were introduced.

Google describes Antigravity's agents as capable of working across the editor, terminal and browser rather than only suggesting code inside an editor. OpenAI similarly describes Codex as expanding beyond isolated coding tasks into broader workflows used by developers as well as analysts, marketers and other professional roles.

The important change is not simply: *AI writes Python.*
It is: **AI can help manage an entire sequence of related development operations.**

![AI-assisted workflow for organizing and optimizing hundreds of images](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

## 15. Convert Heavy Images to WebP

Website photographs should not automatically be published using whatever file Instagram originally provided.

A photograph may be much larger than the size required by its website container. Publishing unnecessarily heavy media increases page weight.

A simple Python workflow can convert JPG/PNG files to WebP.

Install Pillow:
\`python -m pip install pillow\`

Example:

\`\`\`python
from pathlib import Path
from PIL import Image

source = Path("02-working")
destination = Path("04-webp")
destination.mkdir(exist_ok=True)

for file in source.glob("*"):
    if file.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    with Image.open(file) as image:
        image.thumbnail((1800, 1800))
        output = destination / f"{file.stem}.webp"
        image.save(output, "WEBP", quality=82, method=6)
        print(f"Converted: {file.name} → {output.name}")
\`\`\`

Do not blindly use the same dimensions and compression level for every project. A 400-pixel card image and a 1920-pixel hero image have different requirements.

The better workflow is:
**Image purpose → Required dimensions → Compression → Final output**
not:
*Every image → 1920 px*

## 16. Do Not Confuse Image SEO With Keyword Stuffing

Suppose your target keyword is:
\`custom wardrobes in Dubai\`

A bad workflow would rename 100 images:
- \`custom-wardrobes-dubai-1.webp\`
- \`custom-wardrobes-dubai-2.webp\`
- \`custom-wardrobes-dubai-3.webp\`
- \`custom-wardrobes-dubai-4.webp\`

and give every image:
\`alt="custom wardrobes Dubai best custom wardrobes Dubai"\`

That is not intelligent optimization. A better approach is to describe the actual photograph:
- \`floor-to-ceiling-white-wardrobe.webp\`
- \`walnut-sliding-door-wardrobe.webp\`
- \`built-in-bedroom-wardrobe-with-mirror.webp\`
- \`custom-corner-wardrobe-storage.webp\`

Possible alt text:
> *"Floor-to-ceiling white built-in wardrobe with upper storage cabinets"*
or:
> *"Walnut sliding-door wardrobe installed in a modern bedroom"*

The page itself establishes the broader topical and geographical context. The image description should primarily describe the image.

## 17. Keyword Research Should Determine the Website Architecture First

Do not begin by asking:
*"Which keyword should I put into these 800 filenames?"*

Begin with:
*"Which pages should this website have?"*

That requires keyword and intent research.

For example:

\`\`\`text
Custom Furniture
├── Custom Wardrobes
├── TV Units
├── Bedroom Furniture
├── Office Furniture
├── Kitchen Cabinets
└── Interior Fit-Out
\`\`\`

Then determine relevant commercial searches for each service. Then map images to those pages.

The sequence should be:
**Keyword Research ↓ Search Intent ↓ Page Architecture ↓ Content Requirements ↓ Image Requirements ↓ Image Classification**

Semrush's current keyword-research guidance similarly recommends understanding existing rankings, discovering related searches and organizing keywords into clusters rather than treating every phrase as an isolated keyword.

*For the complete research workflow, read our upcoming guide to Semrush keyword research and keyword clustering.*

## 18. Map Every Important Image to a Page

Imagine keyword research produces these commercial clusters:

| Cluster | Target Page |
| :--- | :--- |
| **Custom wardrobes** | \`/custom-wardrobes/\` |
| **Bedroom furniture** | \`/bedroom-furniture/\` |
| **TV units** | \`/tv-units/\` |
| **Office furniture** | \`/office-furniture/\` |
| **Custom kitchens** | \`/kitchens/\` |
| **Interior design** | \`/interior-design/\` |

AI classification can now help select relevant media for each destination.

Instead of:
*Homepage → random Instagram images*
you get:
- Wardrobe page → wardrobe project photographs
- Kitchen page → kitchen projects
- Office page → office installations
- Interior page → completed interior work

That produces a much more coherent website.

## 19. Give Every Image a Purpose

An image should generally serve one of several purposes:

- **Proof:** Shows that the company genuinely performs the service.
- **Explanation:** Helps the visitor understand a product or process.
- **Differentiation:** Shows craftsmanship, scale, materials or design capability.
- **Conversion:** Supports a CTA by reducing uncertainty.
- **Trust:** Shows real projects, real staff, real installations or real facilities.
- **Visual navigation:** Helps visitors quickly distinguish between different services.

The question is therefore not:
*Can we add 800 photographs?*
It is:
**Which 80 photographs will make the website more useful?**

The remaining images can still be retained in your library for galleries, future location pages, case studies or social campaigns.

## 20. Use a Selection Score

For very large libraries, assign every photograph a simple score:
- Image Quality (1–5)
- Service Relevance (1–5)
- Uniqueness (1–5)
- Commercial Value (1–5)
- Visual Appeal (1–5)

**Maximum: 25 points**

You might decide:
- **20–25:** Priority website image
- **15–19:** Gallery/case-study candidate
- **10–14:** Archive
- **Below 10:** Do not publish

This turns an emotional selection process into a repeatable editorial system. AI can assist with the first classification; humans should approve the final result.

## 21. Build a Media Manifest

One of the best things you can create for an AI-managed website is a media manifest (\`media-manifest.json\`):

\`\`\`json
[
  {
    "file": "walnut-sliding-wardrobe.webp",
    "category": "wardrobes",
    "page": "/custom-wardrobes/",
    "alt": "Walnut sliding-door wardrobe installed in a modern bedroom",
    "width": 1400,
    "height": 1050
  },
  {
    "file": "modern-white-tv-unit.webp",
    "category": "tv-units",
    "page": "/tv-units/",
    "alt": "Modern white wall-mounted TV unit with storage cabinets",
    "width": 1400,
    "height": 1050
  }
]
\`\`\`

Now your website agent does not need to guess what every image represents. It receives structured information. This dramatically reduces accidental misuse.

## 22. Let the AI Agent Work From the Manifest, Not Random Files

A bad prompt is:
*"Add these 800 images to my site and optimize them."*

A much stronger prompt is:
> *"Read media-manifest.json. For each service page, use only images whose page field matches that route. Use the supplied alt text. Select no more than six gallery images unless the component is specifically a gallery. Preserve aspect ratio. Do not use the same image as the primary image on multiple service pages. Maintain lazy loading below the fold. Verify every asset path after implementation."*

This moves AI from improvisation to controlled execution.

## 23. Image SEO Is Part of a Bigger Local SEO System

For a local service business, genuine project photographs can strengthen the website because they help communicate:
- what the company actually does;
- the type of projects it completes;
- its quality of work;
- its service range;
- its experience.

But images alone will not make a local business rank.

The broader system still includes:
**Service Pages + Location Relevance + Google Business Profile + Reviews + Internal Linking + Technical SEO + Content + Authority + Conversion**

We explain this broader acquisition framework in our guide to [local SEO and Google Ads for service businesses](/blog/local-seo-google-ads-service-business), where we cover service architecture, search intent, landing pages, Google Business Profile optimization and revenue-focused measurement.

## 24. Example: Turning 800 Instagram Images Into a Website Library

Here is what the complete project might look like:

- **Starting point:** 800 downloaded media files
- **Stage 1 — Archive:** 800 originals preserved
- **Stage 2 — Technical filtering:** Remove duplicates, very small files, broken images, irrelevant screenshots, unusable graphics (800 → 690)
- **Stage 3 — AI classification:** Categories: Wardrobes (170), Bedrooms (105), TV Units (95), Kitchens (80), Office Furniture (65), Interior Work (90), Other (85)
- **Stage 4 — Human review:** Select the strongest (690 → 220 approved photographs)
- **Stage 5 — Production optimization:** Convert JPG/PNG → WebP/AVIF. Resize for Hero, Card, Gallery, Thumbnail
- **Stage 6 — Page allocation:** Homepage (12), Wardrobe Page (18), Bedroom Page (15), TV Unit Page (15), Kitchen Page (16), Office Page (14), Interior Page (18), Project Galleries (112)

Now you no longer have 800 disconnected files. You have a structured visual content library supporting your website architecture.

![Turning hundreds of unorganized images into categorized website assets](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80)

## 25. AI Can Also Help Generate Image Alt Text — But Review It

Alt text has an accessibility purpose. It should communicate useful information about an image when the image cannot be perceived.

AI vision can dramatically accelerate the first draft when hundreds of images exist.

For example, AI may see an image and generate:
*A modern wooden wardrobe with three sliding doors*

A human who understands the project might improve it to:
*Walnut sliding-door wardrobe with mirrored center panel installed in a bedroom*

The second description contains useful details because the reviewer actually knows what is visible.

Do not force geographical keywords into alt text when the image does not communicate anything geographical. Do not turn alt text into a keyword container.

## 26. Preserve Context From Instagram Captions

Instagram captions can occasionally provide extremely useful information.

For example:
*Completed villa wardrobe project in [location]*

may tell you:
- project type;
- product;
- location;
- material;
- customer requirement.

Rather than discarding caption data immediately, preserve it during the archive stage. Later, it can help with project classification, case studies, captions, portfolio pages and content research.

Treat it as source material that may require verification.

## 27. Create Case Studies From Strong Image Groups

An interesting side effect of collecting historical media is that you may discover complete project sequences:
- Image 1 → Empty room
- Image 2 → Initial frame
- Image 3 → Installation
- Image 4 → Doors fitted
- Image 5 → Finished wardrobe

That should not necessarily become five random gallery photographs. It could become:
**Custom Wardrobe Installation — Project Case Study**

A strong project case study can explain the requirement, the design, materials, challenges, installation, and finished result.

## 28. Do Not Publish Hundreds of Near-Identical Gallery Pages

Automation makes content creation easier. That does not mean every possible page should exist.

If an AI agent can create 300 gallery pages in ten minutes, that does not mean those pages provide value. A scalable content system still requires editorial standards.

Before generating a page, ask:
- Does this page target a genuinely distinct user need?
- Does it contain unique information?
- Does it have enough useful visual evidence?
- Does it deserve to exist independently?
- Can we maintain it?

AI reduces production cost. It does not eliminate the need for judgment.

## 29. Create a Repeatable Pipeline

The strongest version of this workflow is not a one-time script. It is a reusable pipeline:

\`\`\`text
/media-pipeline/
├── source/
├── archive/
├── processed/
├── production/
├── manifests/
├── scripts/
│   ├── inventory.py
│   ├── duplicates.py
│   ├── resize.py
│   ├── convert_webp.py
│   └── validate.py
└── reports/
\`\`\`

Then document:
**01 Download → 02 Archive → 03 Inventory → 04 Review → 05 Classify → 06 Map → 07 Optimize → 08 Publish → 09 Validate**

The next client project becomes much faster.

## 30. Updating an Existing Instagram Archive

You may not want to download the entire profile every time.

Instaloader documents options including \`--fast-update\` and \`--latest-stamps\` for maintaining local copies more efficiently.

This means your workflow could eventually become:
- **Initial migration:** Full archive
- **Monthly update:** New media only

That can support ongoing website galleries or project portfolios. However, avoid aggressive automation against external platforms. Rate limits and platform behavior can change.

## 31. Common Problems

| Problem | Likely Cause | Next Action |
| :--- | :--- | :--- |
| **instaloader not recognized** | Scripts folder/path issue | Use \`python -m instaloader\` |
| **py references missing Python** | Broken Windows launcher mapping | Use active python executable |
| **Business profile returns HTTP 400** | Instagram endpoint/platform change | Check current Instaloader issues/releases |
| **429 Too Many Requests** | Rate limiting | Stop requests and allow cooldown |
| **Lower-quality public image** | Anonymous retrieval limitations | Decide whether authenticated legitimate workflow is appropriate |
| **Hundreds of confusing files** | No inventory | Build CSV/JSON manifest |
| **Website becomes slow** | Images uploaded without resizing | Generate production sizes |
| **SEO filenames look spammy** | Keyword stuffing | Use descriptive filenames |
| **AI puts wrong image on page** | No media mapping | Use structured manifest |
| **Duplicate photographs appear everywhere** | No editorial rules | Add reuse/selection constraints |

## 32. A Better Way to Think About AI-Assisted SEO

AI SEO should not mean:
*Ask ChatGPT to insert keywords.*

A more powerful model is:
**Research ↓ Structure ↓ Automation ↓ Human Review ↓ Implementation ↓ Measurement**

AI is especially powerful in the middle. It can:
- process large file inventories;
- generate code;
- extract patterns;
- restructure datasets;
- produce metadata drafts;
- modify website components;
- validate repetitive technical work.

Humans remain responsible for strategy, factual accuracy, permissions, customer relevance and final editorial decisions.

## 33. The Complete Workflow

Here is the entire system in one view:

**Client Website Project ↓ Existing Assets Missing ↓ Authorized Public Instagram Profile ↓ Instaloader ↓ Original Media Archive ↓ Python Inventory ↓ Duplicate / Quality Filtering ↓ AI Visual Classification ↓ Semrush Keyword Research ↓ Service + Search Intent Mapping ↓ Image-to-Page Mapping ↓ Human Approval ↓ SEO-Friendly Filenames ↓ Accurate Alt Text ↓ Resize ↓ WebP / AVIF ↓ Media Manifest ↓ Antigravity / Codex / AI Coding Agent ↓ Website Integration ↓ Performance + Accessibility Review ↓ Production**

![Complete Instagram image download and SEO optimization workflow](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80)
`;

export const articleFaqs = [
  {
    question: "Can you download a public Instagram profile without logging in?",
    answer: "Publicly accessible profile media can be retrieved using tools such as Instaloader in supported circumstances. Instaloader explicitly documents public profiles as supported targets. Platform behavior changes periodically, however, so anonymous access can break when Instagram changes its endpoints.",
  },
  {
    question: "Can Instaloader download an entire public profile?",
    answer: "Its normal profile target retrieves profile media rather than requiring you to save posts individually. Large profiles can still be affected by rate limits, endpoint changes or other platform restrictions.",
  },
  {
    question: "Do I need an Instagram username and password?",
    answer: "Not for the basic public-profile workflow described in this article. Some other features and private content require authentication.",
  },
  {
    question: "Why does Instaloader show the ig_business_category_subvertical error?",
    answer: "In 2026, Instagram changes caused web_profile_info to return an HTTP 400 server-side schema error for some professional/business accounts. The problem and a mobile-feed fallback have been discussed in the Instaloader project.",
  },
  {
    question: "Should every downloaded Instagram photograph be added to the website?",
    answer: "No. Download broadly if you need an archive. Publish selectively. The production website should contain photographs that support the page, demonstrate the service, improve trust or otherwise help the visitor.",
  },
  {
    question: "Should Instagram images be converted to WebP?",
    answer: "For website use, modern compressed formats such as WebP can substantially reduce unnecessary image payload compared with publishing large source files unchanged. The exact format, dimensions and quality settings should be determined by the website and browser requirements.",
  },
  {
    question: "Can AI create alt text for hundreds of photographs?",
    answer: "AI can generate useful first drafts at scale, but human review is recommended—particularly where the model cannot know project-specific facts such as material, location or product specification.",
  },
  {
    question: "Can ChatGPT, Codex or Antigravity organize hundreds of images?",
    answer: "They can assist developers in building and executing scripts, manifests and website integration workflows. Agentic coding environments are particularly useful when a task involves coordinated operations across files, terminal commands and source code.",
  },
  {
    question: "Is downloading a public photograph the same as having permission to republish it?",
    answer: "No. Public accessibility and content ownership are separate questions. Before republishing client or third-party material, establish appropriate permission or ownership.",
  },
];

export const articlePart2 = `
## 35. Final Takeaway

The interesting part of this workflow is not Instaloader.

Instaloader solves one specific problem: getting publicly accessible media into a local directory.

The larger opportunity is what happens afterward.

An unorganized folder containing 800 images has limited value.

An organized library containing:
**approved media + service categories + keyword clusters + page assignments + descriptive filenames + alt text + optimized formats + structured metadata**
is an entirely different asset.

Modern AI development tools make it possible to move from one state to the other much faster than before.

But the objective should never be automation for its own sake.

The objective is to build a better website:
**faster, more organized, more useful to visitors, easier to maintain and supported by real visual evidence of the business's work.**

That is where AI-assisted development and SEO become genuinely valuable.
`;
