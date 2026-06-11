"""One-off helper for stripping white/off-white backgrounds from hero PNGs.

Usage: edit `images` below and run `python scripts/remove_bg.py`.
Requires Pillow (`pip install pillow`).
"""

from PIL import Image


def is_near_white(pixel, threshold=240):
    r, g, b, a = pixel
    return r > threshold and g > threshold and b > threshold and a > 0


def remove_background(image_path, output_path, threshold=240, crop=False):
    """Flood-fill near-white pixels reachable from the corners to transparent."""
    img = Image.open(image_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    replacement_color = (255, 255, 255, 0)
    starts = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]

    visited = set()
    stack = []

    for start in starts:
        if is_near_white(pixels[start[0], start[1]], threshold):
            stack.append(start)
            visited.add(start)

    while stack:
        x, y = stack.pop()
        pixels[x, y] = replacement_color

        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                visited.add((nx, ny))
                if is_near_white(pixels[nx, ny], threshold):
                    stack.append((nx, ny))

    if crop:
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

    img.save(output_path)
    print(f"Processed and saved to {output_path}")


if __name__ == "__main__":
    images = ["public/hero/character_v2.png", "public/hero/laptop_v2.png"]
    for img_path in images:
        out_path = img_path.replace("_v2.png", "_v3.png")
        remove_background(img_path, out_path, threshold=230)
