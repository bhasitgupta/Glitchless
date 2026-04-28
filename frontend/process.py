from PIL import Image
import sys

def remove_white_bg(img_path, out_path):
    try:
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change white (also shades of white)
            if item[0] > 220 and item[1] > 220 and item[2] > 220:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(out_path, "PNG")
        print("Success")
    except Exception as e:
        print("Error: " + str(e))

remove_white_bg(r'C:\Users\Bhasit Gupta\.gemini\antigravity\brain\9b841f5f-8dc8-4521-b6f2-c83927b8ae4f\media__1777406784688.png', r'C:\Users\Bhasit Gupta\Desktop\Glitchless-main\Glitchless-main\glitchless-nextjs\public\logo.png')
