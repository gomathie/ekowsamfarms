import urllib.request
import os
import subprocess

# Download logo
logo_url = "https://ekowsamfarms.com/wp-content/uploads/2026/02/cropped-ES-LOGO-3.png"
req = urllib.request.Request(logo_url, headers={'User-Agent': 'Mozilla/5.0'})
data = urllib.request.urlopen(req).read()
with open('public/images/logo.png', 'wb') as f:
    f.write(data)
print(f"Downloaded logo: {len(data)/1024:.1f} KB")

# Get Pexels images for blog posts / gallery (free stock poultry images)
pexels_images = {
    "hero-chicken": "https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "blog-chicken": "https://images.pexels.com/photos/1769279/pexels-photo-1769279.jpeg?auto=compress&cs=tinysrgb&w=800",
    "blog-eggs": "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800",
    "blog-supply": "https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg?auto=compress&cs=tinysrgb&w=800",
    "gallery-farm": "https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=800",
    "gallery-processing": "https://images.pexels.com/photos/6152257/pexels-photo-6152257.jpeg?auto=compress&cs=tinysrgb&w=800",
    "about-farm": "https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=800",
}

for name, url in pexels_images.items():
    filepath = f"public/images/{name}.jpg"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req).read()
        with open(filepath, 'wb') as f:
            f.write(data)
        print(f"[OK] {name}.jpg ({len(data)/1024:.1f} KB)")
    except Exception as e:
        print(f"[FAIL] {name}: {e}")

# Convert all non-webp images to webp using cwebp if available, or ffmpeg, or just keep them
# Try to use Python Pillow if available
try:
    from PIL import Image
    has_pillow = True
    print("\nUsing Pillow for WebP conversion")
except ImportError:
    has_pillow = False
    print("\nPillow not available, trying cwebp...")

img_dir = "public/images"
for fname in os.listdir(img_dir):
    fpath = os.path.join(img_dir, fname)
    if not os.path.isfile(fpath):
        continue
    if fname.endswith('.webp'):
        continue
    
    base = os.path.splitext(fname)[0]
    webp_path = os.path.join(img_dir, f"{base}.webp")
    
    if has_pillow:
        try:
            img = Image.open(fpath)
            img.save(webp_path, 'WEBP', quality=85)
            os.remove(fpath)
            size_kb = os.path.getsize(webp_path) / 1024
            print(f"[CONVERTED] {fname} -> {base}.webp ({size_kb:.1f} KB)")
        except Exception as e:
            print(f"[FAIL] {fname}: {e}")
    else:
        # Try cwebp
        result = subprocess.run(['cwebp', '-q', '85', fpath, '-o', webp_path], capture_output=True, text=True)
        if result.returncode == 0:
            os.remove(fpath)
            size_kb = os.path.getsize(webp_path) / 1024
            print(f"[CONVERTED] {fname} -> {base}.webp ({size_kb:.1f} KB)")
        else:
            print(f"[SKIP] {fname} (no converter available)")

print("\n--- Final images ---")
for fname in sorted(os.listdir(img_dir)):
    fpath = os.path.join(img_dir, fname)
    size_kb = os.path.getsize(fpath) / 1024
    print(f"  {fname} ({size_kb:.1f} KB)")
