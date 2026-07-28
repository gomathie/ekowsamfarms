import urllib.request
import re
from collections import Counter

try:
    req = urllib.request.Request("https://ekowsamfarms.com/", headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    # Extract hex colors
    hex_colors = re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', html)
    hex_counter = Counter(c.lower() for c in hex_colors)
    
    print("Top HEX colors:")
    for color, count in hex_counter.most_common(10):
        print(f"{color}: {count}")
except Exception as e:
    print("Error:", e)
