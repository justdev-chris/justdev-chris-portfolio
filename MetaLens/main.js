    const fileInput = document.getElementById('fileInput');
    const exifOutput = document.getElementById('exifOutput');
    const preview = document.getElementById('preview');
    
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(event) {
        preview.src = event.target.result;
        preview.style.display = 'block';
        
        EXIF.getData(file, function() {
          const allTags = EXIF.getAllTags(this);
          if (Object.keys(allTags).length === 0) {
            exifOutput.textContent = 'No EXIF metadata found in this image 😿';
          } else {
            exifOutput.textContent = JSON.stringify(allTags, null, 2);
          }
        });
      };
      reader.readAsDataURL(file);
    });
