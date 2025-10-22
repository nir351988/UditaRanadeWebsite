from PIL import Image, ImageDraw, ImageFont
import os

# Create assets/images directory if it doesn't exist
os.makedirs('assets/images', exist_ok=True)

# Image 1: Hero Performance (1200x600)
img1 = Image.new('RGB', (1200, 600), color='#3949ab')
draw1 = ImageDraw.Draw(img1)

# Add gradient effect (simplified)
for y in range(600):
    opacity = int(255 * (1 - y/600))
    draw1.rectangle([(0, y), (1200, y+1)], fill=(57, 73, 171, opacity))

# Add stage platform
draw1.rectangle([(400, 400), (800, 450)], fill='#1a1a2e', outline='#d4af37', width=3)

# Add microphone stand
draw1.rectangle([(590, 200), (610, 400)], fill='#7a7a7a')
draw1.ellipse([(560, 150), (640, 230)], fill='#c0c0c0', outline='#e8e8e8', width=2)

# Add musical notes
for x, y in [(300, 300), (500, 250), (700, 300), (900, 280)]:
    draw1.ellipse([(x, y), (x+30, y+30)], fill='#d4af37')
    draw1.rectangle([(x+30, y-50), (x+35, y)], fill='#d4af37')

# Add title text
try:
    font_title = ImageFont.truetype("arial.ttf", 48)
    font_subtitle = ImageFont.truetype("arial.ttf", 24)
except:
    font_title = ImageFont.load_default()
    font_subtitle = ImageFont.load_default()

draw1.text((600, 500), "Professional Performance", fill='white', font=font_title, anchor="mm")

img1.save('assets/images/hero-performance.jpg', 'JPEG', quality=90)
print("✅ Created hero-performance.jpg")

# Image 2: Portrait Professional (600x800)
img2 = Image.new('RGB', (600, 800), color='#263238')
draw2 = ImageDraw.Draw(img2)

# Add gradient
for y in range(800):
    shade = int(50 + (y/800) * 50)
    draw2.rectangle([(0, y), (600, y+1)], fill=(shade, shade, shade+20))

# Add silhouette
draw2.ellipse([(225, 200), (375, 350)], fill='#1a1a1a')  # Head
draw2.rectangle([(200, 350), (400, 650)], fill='#1a1a1a')  # Body

# Add microphone detail
draw2.ellipse([(280, 550), (320, 590)], fill='#c0c0c0')
draw2.rectangle([(295, 590), (305, 650)], fill='#7a7a7a')

# Add musical notes
for x, y in [(450, 300), (150, 400), (500, 500)]:
    draw2.ellipse([(x, y), (x+20, y+20)], fill='#d4af37')

# Add title
draw2.text((300, 720), "Udita Ranade", fill='white', font=font_title, anchor="mm")
draw2.text((300, 760), "Professional Singer", fill='#d4af37', font=font_subtitle, anchor="mm")

img2.save('assets/images/portrait-professional.jpg', 'JPEG', quality=90)
print("✅ Created portrait-professional.jpg")

# Image 3: News Performance (1200x600)
img3 = Image.new('RGB', (1200, 600), color='#5c6bc0')
draw3 = ImageDraw.Draw(img3)

# Opera house shapes
for x in [100, 400, 700]:
    points = [(x, 400), (x+150, 350), (x+300, 400), (x+300, 550), (x, 550)]
    draw3.polygon(points, fill='#1a1a2e', outline='#3949ab')

# Stage curtains
draw3.rectangle([(0, 200), (100, 600)], fill='#8b0000', outline='#d4af37', width=2)
draw3.rectangle([(1100, 200), (1200, 600)], fill='#8b0000', outline='#d4af37', width=2)

# Spotlights
for cx in [300, 600, 900]:
    draw3.ellipse([(cx-80, 220), (cx+80, 380)], fill=(255, 235, 59, 50))

# Musical staff
for y in [450, 470, 490, 510, 530]:
    draw3.line([(200, y), (1000, y)], fill='white', width=2)

# Title
draw3.text((600, 150), "Vienna Opera House", fill='white', font=font_title, anchor="mm")
draw3.text((600, 190), "October 15, 2025", fill='#d4af37', font=font_subtitle, anchor="mm")

img3.save('assets/images/news-performance-1.jpg', 'JPEG', quality=90)
print("✅ Created news-performance-1.jpg")

# Image 4: Recording Studio (1200x600)
img4 = Image.new('RGB', (1200, 600), color='#ab47bc')
draw4 = ImageDraw.Draw(img4)

# Vinyl record
for r in [200, 180, 160, 140, 120, 100]:
    draw4.ellipse([(200-r, 300-r), (200+r, 300+r)], outline='#333333', width=2)
draw4.ellipse([(300, 200), (500, 400)], fill='#1a1a1a')
draw4.ellipse([(350, 250), (450, 350)], fill='#d4af37')
draw4.ellipse([(375, 275), (425, 325)], fill='#1a1a1a')

# Microphone
draw4.rectangle([(840, 350), (860, 500)], fill='#7a7a7a')
draw4.ellipse([(810, 290), (890, 370)], fill='#c0c0c0', outline='#e8e8e8', width=3)
draw4.rectangle([(838, 500), (862, 508)], fill='#606060')

# Sound waves
for offset in [0, 20, 40]:
    draw4.arc([(750-offset, 250-offset), (930+offset, 430+offset)], 0, 90, fill='white', width=3)

# Title
draw4.text((600, 520), "New Album Recording", fill='white', font=font_title, anchor="mm")
draw4.text((600, 560), "Classical Arias Collection", fill='#d4af37', font=font_subtitle, anchor="mm")

img4.save('assets/images/news-recording.jpg', 'JPEG', quality=90)
print("✅ Created news-recording.jpg")

# Image 5: Gallery (1200x600)
img5 = Image.new('RGB', (1200, 600), color='#f06292')
draw5 = ImageDraw.Draw(img5)

# Gallery frames
frames = [(100, 150, 250, 300), (450, 100, 300, 400), (850, 180, 230, 280)]
for x, y, w, h in frames:
    # Frame border
    draw5.rectangle([(x, y), (x+w, y+h)], fill='#3e2723', outline='#d4af37', width=8)
    # Inner frame
    draw5.rectangle([(x+20, y+20), (x+w-20, y+h-20)], fill='#f5f5f5')
    # Silhouette
    cx, cy = x+w//2, y+h//2
    draw5.ellipse([(cx-30, cy-40), (cx+30, cy)], fill='#8d6e63')
    draw5.rectangle([(cx-35, cy), (cx+35, cy+80)], fill='#8d6e63')

# Spotlights
for cx, y in [(225, 100), (600, 80), (965, 130)]:
    draw5.ellipse([(cx-80, y), (cx+80, y+60)], fill=(255, 235, 59, 50))

# Title
draw5.text((600, 570), "Performance Photo Gallery", fill='white', font=font_title, anchor="mm")

img5.save('assets/images/news-gallery.jpg', 'JPEG', quality=90)
print("✅ Created news-gallery.jpg")

print("\n✅ All JPEG images created successfully!")
print("📁 Location: assets/images/")
