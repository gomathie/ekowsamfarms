import re

with open('/Users/admin/.gemini/antigravity-ide/brain/1e27204e-cbbc-4899-a692-a0d4db2ef55c/.system_generated/steps/38/content.md', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove style, script, and meta tags
html = re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL)
html = re.sub(r'<script.*?>.*?</script>', '', html, flags=re.DOTALL)
html = re.sub(r'<meta.*?>', '', html, flags=re.DOTALL)
html = re.sub(r'<link.*?>', '', html, flags=re.DOTALL)

from html.parser import HTMLParser
class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.text = []
    def handle_data(self, d):
        self.text.append(d)
    def get_data(self):
        return ''.join(self.text)

s = MLStripper()
s.feed(html)
text = s.get_data()
text = re.sub(r'\n\s*\n', '\n', text)
text = re.sub(r'\t+', ' ', text)

with open('/Users/admin/Downloads/ekow-sam-farms/scraped_text.txt', 'w', encoding='utf-8') as f:
    f.write(text)
print('Done.')
