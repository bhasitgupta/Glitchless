from PIL import Image

def remove_white_bg(input_path, output_path, threshold=220):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # If the pixel is close to white, make it transparent
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            # We can also do a smooth transparency based on brightness, 
            # but for a simple fix we just drop the white and keep anti-aliasing semi-transparent.
            # Brightness based transparency:
            brightness = (item[0] + item[1] + item[2]) / 3
            if brightness > 250:
                new_data.append((255, 255, 255, 0))
            else:
                # partial transparency
                alpha = int(255 * (255 - brightness) / (255 - threshold))
                new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Done")

input_file = r"c:\Users\Bhasit Gupta\Desktop\Logo.png"
output_file = r"c:\Users\Bhasit Gupta\Desktop\Glitchless-main\frontend\public\logo.png"

# First check if the original logo is already transparent.
# It might be! The user downloaded it, sometimes Windows Photos shows transparent as white.
img = Image.open(input_file).convert("RGBA")
extrema = img.getextrema()
if extrema[3][0] < 255:
    print("Already has transparency, just copying")
    img.save(output_file, "PNG")
else:
    print("Removing white background")
    remove_white_bg(input_file, output_file, 240)
