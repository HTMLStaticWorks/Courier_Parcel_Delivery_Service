import glob

old_logo = '''<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 8px;">
  <path d="M4 12H10" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M2 17H10" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M6 22H10" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round"/>
  <polygon points="19,9 26,12.5 19,16 12,12.5" fill="var(--primary)"/>
  <polygon points="12,12.5 19,16 19,24 12,20.5" fill="var(--accent)"/>
  <polygon points="19,16 26,12.5 26,20.5 19,24" fill="var(--accent)" opacity="0.6"/>
</svg>
<span style="font-weight: 900; letter-spacing: 1.5px; font-size: 1.4rem; vertical-align: middle; text-transform: uppercase; font-family: 'Inter', sans-serif; color: var(--primary);">SWIFT</span>'''

new_logo = '<img src="assets/images/logo.svg" alt="SWIFT Logo" style="height: 32px; width: auto; vertical-align: middle;">'

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if old_logo in content:
        content = content.replace(old_logo, new_logo)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {f}')
