from PIL import Image

def terminal_screenshot_to_detailed_ascii(image_path, width=100):
    chars = "⣿⣷⣯⣟⡿⡽⡻⢿⣾⣽⣻⢻⣹⢸⡸⢠⣠⣌⣀⡀⠁⠀ "
    image = Image.open(image_path).convert("L")

    # resize while keeping aspect aaa i forgot a yes ratio
    aspect_ratio = image.height / image.width
    new_height = int(aspect_ratio * width * 0.55)
    resized = image.resize((width, new_height))

    pixels = resized.getdata()
    ascii_str = ""
    for i, pixel in enumerate(pixels):
        ascii_str += chars[pixel * len(chars) // 256]
        if (i + 1) % width == 0:
            ascii_str += "\n"

    return ascii_str

# put this to ur input image
input_image_path = "IMAGEGOESHERE.png"

#  this prints out the ascii
ascii_art = terminal_screenshot_to_detailed_ascii(input_image_path, width=100)

#  ascii output
output_file_path = "ascii_output.txt"
with open(output_file_path, "w", encoding="utf-8") as f:
    f.write(ascii_art)

# also print a tiny preview in terminal js incase
print(ascii_art[:1000] + "\n... (preview only, full art in ascii_output.txt)")
