import os
import glob
from PIL import Image

def convert_to_webp(source):
    destination = source.rsplit('.', 1)[0] + ".webp"
    try:
        image = Image.open(source)
        image.save(destination, format="webp", quality=85)
        print(f"Converted: {source} -> {destination}")
        
        # Remove original
        os.remove(source)
        return True
    except Exception as e:
        print(f"Error converting {source}: {e}")
        return False

def replace_in_files():
    search_patterns = ['src/**/*.tsx', 'src/**/*.ts', 'src/**/*.css', 'public/index.html', 'index.html']
    files_to_check = []
    
    for pattern in search_patterns:
        files_to_check.extend(glob.glob(pattern, recursive=True))
        
    for filepath in set(files_to_check):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # replace .png, .jpg, .jpeg with .webp
            new_content = content.replace('.png', '.webp').replace('.jpg', '.webp').replace('.jpeg', '.webp')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated references in: {filepath}")
        except Exception as e:
            print(f"Error updating {filepath}: {e}")

if __name__ == "__main__":
    public_dir = "public"
    image_files = []
    for ext in ('**/*.png', '**/*.jpg', '**/*.jpeg'):
        image_files.extend(glob.glob(os.path.join(public_dir, ext), recursive=True))
        
    for img in image_files:
        # Don't convert favicon.svg or things like that, just what we found
        convert_to_webp(img)
        
    replace_in_files()
    print("Done!")
