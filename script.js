document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('erase-canvas');
    const ctx = canvas.getContext('2d');
    const mapImage = document.getElementById('map-image');

    function resizeCanvas() {
        // Set canvas size to match the container
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Redraw the gray layer
        ctx.fillStyle = 'rgba(211, 211, 211, 0.8)'; // Light gray with 80% opacity
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Call resizeCanvas on load and on resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

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
