import urllib.request
import re
import os
import json

# Scrape all image URLs from ekowsamfarms.com
url = "https://ekowsamfarms.com/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Find all image sources
img_patterns = [
    r'<img[^>]+src=["\']([^"\']+)["\']',
    r'background-image:\s*url\(["\']?([^"\')\s]+)["\']?\)',
    r'data-bg=["\']([^"\']+)["\']',
    r'data-src=["\']([^"\']+)["\']',
]

all_urls = set()
for pattern in img_patterns:
    matches = re.findall(pattern, html, re.IGNORECASE)
    for m in matches:
        if m.startswith('data:'):
            continue
        if m.startswith('//'):
            m = 'https:' + m
        elif m.startswith('/'):
            m = 'https://ekowsamfarms.com' + m
        all_urls.add(m)

# Filter to only actual content images (skip tiny icons, svgs, etc)
content_images = []
for u in sorted(all_urls):
    # Skip known non-content
    if any(skip in u.lower() for skip in ['.svg', 'favicon', 'logo-', 'icon-', 'gravatar', 'wp-emoji', 'smilies']):
        continue
    content_images.append(u)

print(f"Found {len(content_images)} content images:")
for i, img in enumerate(content_images):
    print(f"  [{i}] {img}")

# Save to JSON for the next step
with open('scraped_images.json', 'w') as f:
    json.dump(content_images, f, indent=2)
