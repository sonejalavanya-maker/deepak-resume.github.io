        function toggleDetails(element) {
            // Finds the parent .job-item element
            const parent = element.closest('.job-item');
            if (!parent) return;

            // Finds the .details-content and .toggle-icon within that parent
            const details = parent.querySelector('.details-content');
            const icon = parent.querySelector('.toggle-icon');

            if (details.classList.contains('hidden')) {
                // Show the content and change the icon
                details.classList.remove('hidden');
                details.classList.add('block');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                // Hide the content and change the icon back
                details.classList.remove('block');
                details.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }

        // Canvas animation logic
        window.onload = function() {
            const canvas = document.getElementById('interactive-bg');
            const ctx = canvas.getContext('2d');
            let particles = [];

            // Set canvas dimensions
            function setCanvasSize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            setCanvasSize();
            window.addEventListener('resize', setCanvasSize);

            // Particle constructor
            function Particle(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.5) + ')';
            }

            // Draw method
            Particle.prototype.draw = function() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            // Update method
            Particle.prototype.update = function() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) {
                    this.speedX = -this.speedX;
                }
                if (this.y < 0 || this.y > canvas.height) {
                    this.speedY = -this.speedY;
                }
            }

            // Create particles
            function init() {
                particles = [];
                const numParticles = Math.min(window.innerWidth * window.innerHeight / 15000, 150);
                for (let i = 0; i < numParticles; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    particles.push(new Particle(x, y));
                }
            }

            // Animation loop
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < particles.length; i++) {
                    particles[i].update();
                    particles[i].draw();
                }
                requestAnimationFrame(animate);
            }

            init();
            animate();
        }