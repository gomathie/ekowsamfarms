import urllib.request
import os
import subprocess
import json

# Create output directory
os.makedirs('public/images', exist_ok=True)

# Load scraped URLs
with open('scraped_images.json') as f:
    urls = json.load(f)

downloaded = {}
for i, url in enumerate(urls):
    ext = url.split('.')[-1].split('?')[0].lower()
    if ext not in ('jpg', 'jpeg', 'png', 'webp'):
        ext = 'jpg'
    filename = f"scraped_{i}.{ext}"
    filepath = f"public/images/{filename}"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req).read()
        with open(filepath, 'wb') as f:
            f.write(data)
        size_kb = len(data) / 1024
        print(f"[OK] {filename} ({size_kb:.1f} KB) <- {url}")
        downloaded[url] = filepath
    except Exception as e:
        print(f"[FAIL] {url}: {e}")

# Now convert all to WebP using sips (macOS built-in)
print("\n--- Converting to WebP ---")
for url, filepath in downloaded.items():
    basename = os.path.splitext(os.path.basename(filepath))[0]
    webp_path = f"public/images/{basename}.webp"
    
    if filepath.endswith('.webp'):
        # Already webp, just rename/copy
        if filepath != webp_path:
            os.rename(filepath, webp_path)
        print(f"[ALREADY WEBP] {webp_path}")
        downloaded[url] = webp_path
        continue
    
    try:
        # Use sips on macOS to convert
        result = subprocess.run(
            ['sips', '-s', 'format', 'webp', filepath, '--out', webp_path],
            capture_output=True, text=True
        )
        if result.returncode == 0:
            # Remove original
            os.remove(filepath)
            size_kb = os.path.getsize(webp_path) / 1024
            print(f"[CONVERTED] {webp_path} ({size_kb:.1f} KB)")
            downloaded[url] = webp_path
        else:
            print(f"[SIPS FAIL] {filepath}: {result.stderr}")
    except Exception as e:
        print(f"[CONVERT FAIL] {filepath}: {e}")

# Save mapping
with open('image_mapping.json', 'w') as f:
    json.dump(downloaded, f, indent=2)

print(f"\nDone! Downloaded and converted {len(downloaded)} images.")
print("\nMapping:")
for url, path in downloaded.items():
    print(f"  {url}")
    print(f"    -> {path}")
