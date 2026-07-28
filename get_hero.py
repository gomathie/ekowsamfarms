import urllib.request
import os
from PIL import Image

# Candidate Pexels high-res poultry hero image URLs
hero_urls = [
    "https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=1920"
]

out_jpg = "public/images/hero-bg.jpg"
out_webp = "public/images/hero-bg.webp"

for i, url in enumerate(hero_urls):
    try:
        print(f"Trying hero image {i+1}: {url}")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req).read()
        with open(out_jpg, 'wb') as f:
            f.write(data)
        
        # Convert to WebP
        img = Image.open(out_jpg)
        img.save(out_webp, 'WEBP', quality=85)
        os.remove(out_jpg)
        
        size_kb = os.path.getsize(out_webp) / 1024
        print(f"Successfully downloaded and converted hero image to WebP: {out_webp} ({size_kb:.1f} KB)")
        break
    except Exception as e:
        print(f"Failed to fetch hero image {i+1}: {e}")
