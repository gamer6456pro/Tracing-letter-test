const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let letter = '';
let drawnLetter = '';

// Event listeners for drawing
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing() {
    isDrawing = true;
    ctx.beginPath();
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Function to draw freely on the canvas
function draw(event) {
    if (!isDrawing) return;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

// Function to set the transparent background letter
function setLetter() {
    letter = document.getElementById('letterInput').value;

    if (letter.length === 1) {
        clearCanvas();

        // Draw the transparent letter
        ctx.save();
        ctx.globalAlpha = 0.2;  // Set transparency level
        ctx.font = '400px Arial';
        ctx.fillStyle = '#ccc';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
        ctx.restore();
    } else {
        alert('Please enter a single letter.');
    }
}

// Clear the canvas and reapply the transparent letter
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (letter) {
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.font = '400px Arial';
        ctx.fillStyle = '#ccc';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
        ctx.restore();
    }
}

// Save the drawn letter as base64 image data
function saveDrawing() {
    drawnLetter = canvas.toDataURL();
    console.log('Drawn Letter Saved:', drawnLetter);
    alert('Letter saved! Check console for base64 output.');
}
