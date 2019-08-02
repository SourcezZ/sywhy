import os
from PIL import Image

file_dir = r'./appfront/dist/upload/img/'
convert_dir = r'./appfront/dist/upload/convert_img/'

def make_little_img(imgname):
    img = Image.open(file_dir + imgname)
    if img.size[0] > 1024 or img.size[1] > 1000:
        newWidth = 1024
        newHeight = float(1024) / img.size[0] * img.size[1]
        img.thumbnail((newWidth,newHeight),Image.ANTIALIAS)

    saveToPath = convert_dir + imgname
    img = img.convert('RGB')
    img.save(saveToPath,"JPEG")