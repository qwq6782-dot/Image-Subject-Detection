// *****************************
// Image Subject Detection Application
// Author Name
// Date
// Demo from PROG 102 Code
// *****************************

// ============================
// Load the AI Model
// ============================

let model = null;

async function loadModel() {
  document.getElementById("result").textContent = "Loading model...";

  model = await mobilenet.load();

  document.getElementById("result").textContent =
    "Model ready! Choose an image.";
}

// Load the model when the page opens
window.addEventListener("DOMContentLoaded", loadModel);


// ============================
// Analyze an Image
// ============================

async function analyzeImage() {
  const img = document.getElementById("preview");
  const result = document.getElementById("result");

  // Check if the model is ready
  if (!model) {
    result.textContent = "Please wait. Model is loading...";
    return;
  }

  // Check if an image was selected
  if (!img.src) {
    result.textContent = "Please choose an image first.";
    return;
  }

  result.textContent = "Analyzing image...";

  // Ask the AI model to recognize the image
  const predictions = await model.classify(img);

  // Show the result
  if (predictions.length > 0) {
    const subject = predictions[0].className;
    const confidence = predictions[0].probability * 100;

    result.textContent =
      "Subject: " + subject +
      " (Confidence: " + confidence.toFixed(1) + "%)";
  } else {
    result.textContent = "Could not recognize the image.";
  }
}


// ============================
// Display Selected Image
// ============================

function loadImage(file) {
  const img = document.getElementById("preview");

  // Display the image
  img.src = URL.createObjectURL(file);
  img.style.display = "block";

  // Analyze the image after it loads
  img.onload = analyzeImage;
}


// ============================
// Select an Image
// ============================

const fileInput = document.getElementById("imageInput");

fileInput.addEventListener("change", function() {
  const file = fileInput.files[0];

  if (file) {
    loadImage(file);
  }
});


// ============================
// Drag and Drop an Image
// ============================

const dropzone = document.getElementById("dropzone");

// Open the file selector when clicked
dropzone.addEventListener("click", function() {
  fileInput.click();
});

// Allow an image to be dragged over the drop area
dropzone.addEventListener("dragover", function(event) {
  event.preventDefault();
});

// Load the image when it is dropped
dropzone.addEventListener("drop", function(event) {
  event.preventDefault();

  const file = event.dataTransfer.files[0];

  if (file) {
    loadImage(file);
  }
});