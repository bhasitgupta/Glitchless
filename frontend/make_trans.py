from PIL import Image
import colorsys

input_file = r"c:\Users\Bhasit Gupta\Desktop\Logo.png"
output_file = r"c:\Users\Bhasit Gupta\Desktop\Glitchless-main\frontend\public\logo.png"

img = Image.open(input_file).convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a == 0:
            continue
        
        # Convert to HSL to check saturation
        r_n, g_n, b_n = r / 255.0, g / 255.0, b / 255.0
        h_val, l_val, s_val = colorsys.rgb_to_hls(r_n, g_n, b_n)
        
        # Remove anything that is:
        # 1. Very light with low saturation (white/near-white)
        # 2. Has lightness > 0.92 (very bright regardless of hue)
        if l_val > 0.92 and s_val < 0.15:
            pixels[x, y] = (255, 255, 255, 0)
        elif l_val > 0.96:
            pixels[x, y] = (255, 255, 255, 0)
        elif r > 240 and g > 240 and b > 240:
            pixels[x, y] = (255, 255, 255, 0)

# Crop to content bounding box
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(output_file, "PNG")
print(f"Saved. Final size: {img.size}")

# Verify
img2 = Image.open(output_file).convert("RGBA")
pixels2 = img2.load()
whites = 0
for y in range(img2.height):
    for x in range(img2.width):
        r, g, b, a = pixels2[x, y]
        if a > 0 and r > 220 and g > 220 and b > 220:
            whites += 1
print(f"Remaining white-ish visible pixels: {whites}")
