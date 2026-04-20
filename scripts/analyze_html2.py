import re

with open('/Users/asiger/LitBuyFinds/screenshots/page_source.html', 'r', encoding='utf-8') as f:
    html = f.read()

# More links
links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL)
print(f'=== ALL LINKS ({len(links)} total) ===')
for href, text in links:
    clean_text = re.sub(r'<[^>]+>', '', text).strip()
    print(f'  href="{href[:80]}" text="{clean_text[:60]}"')

# Check for lazy loading on LCP image (first product image)
print()
print('=== IMAGE LOADING DETAILS ===')
imgs = re.findall(r'<img[^>]+>', html, re.IGNORECASE)
for i, img in enumerate(imgs[:5]):
    print(f'  IMG {i+1}: {img[:300]}')

# Check for next/image usage
print()
print('=== NEXT/IMAGE USAGE ===')
next_imgs = re.findall(r'<img[^>]*/_next/image[^>]*>', html, re.IGNORECASE)
print(f'  next/image optimized: {len(next_imgs)}')

# Full schema dump
print()
schemas = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
print(f'=== FULL SCHEMAS ({len(schemas)}) ===')
for i, s in enumerate(schemas):
    print(f'--- Schema {i+1} ---')
    print(s[:1500])
    print()

# Check footer links for crawlability
print()
footer = re.search(r'<footer[^>]*>(.*?)</footer>', html, re.DOTALL | re.IGNORECASE)
if footer:
    footer_links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', footer.group(1), re.IGNORECASE | re.DOTALL)
    print(f'=== FOOTER LINKS ({len(footer_links)}) ===')
    for href, text in footer_links:
        clean_text = re.sub(r'<[^>]+>', '', text).strip()
        print(f'  href="{href}" text="{clean_text[:60]}"')

# Check for robots meta
print()
robots_meta = re.findall(r'<meta[^>]*robots[^>]*/>', html, re.IGNORECASE)
print(f'=== ROBOTS META ({len(robots_meta)}) ===')
for r in robots_meta:
    print(f'  {r}')

# Check for noindex links
print()
noindex = [l for l in links if 'noindex' in str(l).lower()]
print(f'=== NOINDEX REFS: {len(noindex)} ===')

# Check for external affiliate/agent links
print()
external_links = [(href, re.sub(r'<[^>]+>', '', text).strip()) for href, text in links if href.startswith('http') and 'litbuyspreadsheet.xyz' not in href]
print(f'=== EXTERNAL LINKS ({len(external_links)}) ===')
for href, text in external_links:
    print(f'  href="{href[:100]}" text="{text[:60]}"')

# Check for pagination
print()
pagination = re.findall(r'(?:page|pagination|prev|next)[^>]*href=["\']([^"\']+)["\']', html, re.IGNORECASE)
print(f'=== PAGINATION LINKS: {len(pagination)} ===')
for p in pagination:
    print(f'  {p}')

# Check mobile nav (hamburger)
print()
hamburger = re.findall(r'(?:hamburger|menu-toggle|mobile-menu|MENU)[^>]*', html, re.IGNORECASE)
print(f'=== HAMBURGER/MOBILE MENU INDICATORS ===')
print(f'  Raw matches: {len(hamburger)}')
if hamburger:
    for h in hamburger[:3]:
        print(f'  {h[:200]}')

# Check for "MENU" text in page (mobile nav toggle)
menu_text = re.findall(r'MENU', html)
print(f'  "MENU" text occurrences: {len(menu_text)}')

# Check CSS for responsive classes
print()
print('=== RESPONSIVE CLASS INDICATORS ===')
responsive = re.findall(r'class=["\'][^"\']*(?:md:|lg:|sm:|xl:|mobile|responsive|hidden|block)[^"\']*["\']', html, re.IGNORECASE)
print(f'  Tailwind responsive classes found: {len(responsive)}')
for r in responsive[:10]:
    print(f'  {r[:120]}')
