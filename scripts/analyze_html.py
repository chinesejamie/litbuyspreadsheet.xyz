import re
import sys

with open('/Users/asiger/LitBuyFinds/screenshots/page_source.html', 'r', encoding='utf-8') as f:
    html = f.read()

# --- HEADINGS ---
headings = re.findall(r'<(h[1-6])[^>]*>(.*?)</\1>', html, re.IGNORECASE | re.DOTALL)
print('=== HEADINGS ===')
for tag, text in headings[:30]:
    clean = re.sub(r'<[^>]+>', '', text).strip()
    print(f'  <{tag}> {clean[:120]}')

# --- NAV ---
print()
nav_elements = re.findall(r'<nav[^>]*>(.*?)</nav>', html, re.DOTALL | re.IGNORECASE)
print(f'=== NAV ELEMENTS: {len(nav_elements)} found ===')
for n in nav_elements[:3]:
    clean = re.sub(r'<[^>]+>', ' ', n).strip()
    print(f'  {clean[:400]}')

# --- IMAGES ---
print()
imgs = re.findall(r'<img[^>]+>', html, re.IGNORECASE)
print(f'=== IMAGES: {len(imgs)} found ===')
for img in imgs[:20]:
    src = re.search(r'src=["\']([^"\']+)["\']', img)
    alt = re.search(r'alt=["\']([^"\']*)["\']', img)
    width = re.search(r'width=["\']([^"\']+)["\']', img)
    height = re.search(r'height=["\']([^"\']+)["\']', img)
    loading = re.search(r'loading=["\']([^"\']+)["\']', img)
    priority = 'priority' in img.lower()
    print(f'  src={src.group(1)[:80] if src else "MISSING"} | alt="{alt.group(1)[:60] if alt else "MISSING"}" | w={width.group(1) if width else "?"} h={height.group(1) if height else "?"} loading={loading.group(1) if loading else "?"} priority={priority}')

# --- LINKS ---
print()
links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>', html, re.IGNORECASE | re.DOTALL)
print(f'=== LINKS: {len(links)} found ===')
for href, text in links[:30]:
    clean_text = re.sub(r'<[^>]+>', '', text).strip()
    print(f'  href="{href[:80]}" text="{clean_text[:60]}"')

# --- SCHEMA/JSON-LD ---
print()
schemas = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL | re.IGNORECASE)
print(f'=== JSON-LD SCHEMAS: {len(schemas)} found ===')
for s in schemas:
    print(f'  {s[:500]}')
    print()

# --- SEMANTIC ELEMENTS ---
print()
semantic_tags = ['main', 'article', 'section', 'aside', 'header', 'footer']
print('=== SEMANTIC HTML ===')
for tag in semantic_tags:
    count = len(re.findall(f'<{tag}[\\s>/]', html, re.IGNORECASE))
    print(f'  <{tag}>: {count}')

# --- VIEWPORT / MOBILE ---
print()
viewport = re.search(r'<meta[^>]*name=["\']viewport["\'][^>]*/>', html, re.IGNORECASE)
print(f'=== VIEWPORT META ===')
print(f'  {viewport.group(0) if viewport else "NOT FOUND"}')

# --- CANONICAL ---
print()
canonical = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*/>', html, re.IGNORECASE)
print(f'=== CANONICAL ===')
print(f'  {canonical.group(0) if canonical else "NOT FOUND"}')

# --- TITLE length ---
print()
title = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
if title:
    t = title.group(1)
    print(f'=== TITLE ({len(t)} chars) ===')
    print(f'  "{t}"')

# --- META DESCRIPTION length ---
desc = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
if not desc:
    desc = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*name=["\']description["\']', html, re.IGNORECASE)
if desc:
    d = desc.group(1)
    print(f'=== META DESC ({len(d)} chars) ===')
    print(f'  "{d}"')

# --- OG image check ---
print()
og_image = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
print(f'=== OG IMAGE ===')
print(f'  {og_image.group(1) if og_image else "NOT FOUND"}')

# --- CTA buttons ---
print()
buttons = re.findall(r'<(button|a)[^>]*class=["\'][^"\']*btn[^"\']*["\'][^>]*>(.*?)</\1>', html, re.IGNORECASE | re.DOTALL)
print(f'=== CTA BUTTONS/LINKS: {len(buttons)} found ===')
for tag, text in buttons[:10]:
    clean = re.sub(r'<[^>]+>', '', text).strip()
    print(f'  <{tag}> "{clean[:80]}"')

# --- Above fold indicators - first visible text content ---
print()
print('=== FIRST 2000 CHARS OF BODY TEXT ===')
body = re.search(r'<body[^>]*>(.*)', html, re.DOTALL | re.IGNORECASE)
if body:
    body_text = re.sub(r'<script[^>]*>.*?</script>', '', body.group(1), flags=re.DOTALL)
    body_text = re.sub(r'<style[^>]*>.*?</style>', '', body_text, flags=re.DOTALL)
    body_text = re.sub(r'<[^>]+>', ' ', body_text)
    body_text = re.sub(r'\s+', ' ', body_text).strip()
    print(f'  {body_text[:2000]}')
