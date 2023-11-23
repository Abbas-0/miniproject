// uploadimg.js
const uploadModal = document.getElementById('uploadModal');

// Function to open the modal
function openModal() {
  uploadModal.style.display = 'flex';
  uploadModal.classList.add('show'); // Add a class to show the content
}

// Function to close the modal
function closeModal() {
  uploadModal.style.display = 'none';
  uploadModal.classList.remove('show'); // Remove the class when closing
}

// Function to upload an image
function uploadImage() {
  // Your existing uploadImage function
  const imageInput = document.getElementById('imageInput');
  const formData = new FormData();
  formData.append('image', imageInput.files[0]);

  // You can now use fetch to send this formData to your server for image upload
  // Example: fetch('/upload-image', { method: 'POST', body: formData })
  // Make sure your server handles the image upload and saves it to the database
}

// Function to confirm the upload
function confirmUpload() {
  // You can add additional logic here if needed
  // For now, let's close the modal
  closeModal();
}
