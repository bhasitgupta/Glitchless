from PIL import Image

input_file = r"c:\Users\Bhasit Gupta\Desktop\Logo.png"
output_file = r"c:\Users\Bhasit Gupta\Desktop\Glitchless-main\frontend\public\logo.png"

img = Image.open(input_file).convert("RGBA")
data = img.getdata()

new_data = []
for r, g, b, a in data:
    # If the pixel is very bright/white, make it fully transparent
    if r > 200 and g > 200 and b > 200:
        new_data.append((255, 255, 255, 0))
    else:
        # Check if the pixel has low saturation (grey/whiteish) and high lightness
        # A simple approximation: if max(rgb) - min(rgb) is small and average is high
        avg = (r + g + b) / 3
        diff = max(r, g, b) - min(r, g, b)
        if avg > 180 and diff < 30:
            new_data.append((255, 255, 255, 0))
        elif a > 0 and r > 230 and g > 230 and b > 230:
            new_data.append((255, 255, 255, 0))
        else:
            # Maybe the semi-transparent white background has low alpha?
            # If it's mostly white with low alpha, make it 0.
            if a > 0 and a < 255 and avg > 200:
                 new_data.append((255, 255, 255, 0))
            else:
                 new_data.append((r, g, b, a))
        
img.putdata(new_data)
# Let's crop the image to its actual content bounding box
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(output_file, "PNG")
print("Saved without any bright/white/translucent background")
