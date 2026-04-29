from PIL import Image
img = Image.open(r"c:\Users\Bhasit Gupta\Desktop\Logo.png").convert("RGBA")
print(img.getpixel((0,0)))
print(img.getpixel((img.width-1, 0)))
print(img.getpixel((0, img.height-1)))
print(img.getpixel((img.width-1, img.height-1)))
