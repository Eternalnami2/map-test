document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('erase-canvas');
    const ctx = canvas.getContext('2d');
    const mapImage = document.getElementById('map-image');

    // Create a new Image object for the overlay
    const overlayImage = new Image();
    overlayImage.src = 'overlay.png'; // Path to your overlay PNG

    function resizeCanvas() {
        // Set canvas size to match the image size
        canvas.width = mapImage.clientWidth;
        canvas.height = mapImage.clientHeight;

        // Clear the canvas and draw the overlay image with transparency
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.8; // Set transparency (80% opaque)
        ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1; // Reset to full opacity for future drawings
    }

    // Wait for the overlay image to load before resizing the canvas
    overlayImage.onload = resizeCanvas;

    // Call resizeCanvas on window resize
    window.addEventListener('resize', resizeCanvas);

    // Handle mouse events
    let isDrawing = false;

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        draw(e);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            draw(e);
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    function draw(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.globalCompositeOperation = 'destination-out'; // Erase mode
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over'; // Reset to default
    }
});
