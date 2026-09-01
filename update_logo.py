import os
import glob

old_logo = '''        <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 8px;">
  <path d="M16 4L4 10L16 16L28 10L16 4Z" fill="var(--accent)"/>
  <path d="M4 16L16 22L28 16" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M4 22L16 28L28 22" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span style="font-weight: 900; letter-spacing: 1.5px; font-size: 1.4rem; vertical-align: middle; text-transform: uppercase; font-family: 'Inter', sans-serif;">SWIFT</span>'''

new_logo = '''        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 8px;">
  <path d="M4 12H10" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M2 17H10" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M6 22H10" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="19,9 26,12.5 19,16 12,12.5" fill="var(--primary)"/>
  <polygon points="12,12.5 19,16 19,24 12,20.5" fill="var(--accent)"/>
  <polygon points="19,16 26,12.5 26,20.5 19,24" fill="var(--accent)" opacity="0.6"/>
</svg>
<span style="font-weight: 900; letter-spacing: 1.5px; font-size: 1.4rem; vertical-align: middle; text-transform: uppercase; font-family: 'Inter', sans-serif; color: var(--primary);">SWIFT</span>'''

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if old_logo in content:
        content = content.replace(old_logo, new_logo)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {f}')
