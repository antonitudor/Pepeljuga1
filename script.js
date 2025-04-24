function toggleMenu(serviceId) 
            {
                const currentMenu = document.getElementById(serviceId);
                const allMenus = document.querySelectorAll('.service-menu');

                allMenus.forEach(menu => {
                    if (menu !== currentMenu && menu.classList.contains('open')) {
                        menu.style.maxHeight = menu.scrollHeight + 'px'; // Set height before closing for smooth transition
                        menu.style.opacity = '1';
                        setTimeout(() => {
                            menu.style.maxHeight = '0px';
                            menu.style.opacity = '0';
                            setTimeout(() => {
                                menu.style.display = "none"; // Hide after animation
                                menu.classList.remove('open');
                            }, 300);
                        }, 100);
                    }
                });

                if (!currentMenu.classList.contains('open')) {
                    currentMenu.style.display = "block"; // Ensure it's visible before animation
                    setTimeout(() => {
                        currentMenu.style.maxHeight = currentMenu.scrollHeight + 'px';
                        currentMenu.style.opacity = '1';
                        currentMenu.classList.add('open');
                    }, 100);
                } else {
                    closeMenu(serviceId); // Call the close function
                }
            }

            function closeMenu(serviceId) 
            {
                const menu = document.getElementById(serviceId);
                menu.style.maxHeight = '0px';
                menu.style.opacity = '0';

                setTimeout(() => {
                    menu.style.display = "none"; // Hide after animation ends
                    menu.classList.remove('open');
                }, 300);
            }

                

            let currentIndex = 0;
            const galleryImages = document.querySelectorAll(".gallery-grid img");
            const lightbox = document.getElementById("lightbox");
            const lightboxImg = document.getElementById("lightbox-img");

            // Zoom Variables
            let scale = 1;
            let startX = 0;
            let startY = 0;
            let isDragging = false;

            function openLightbox(index) {
                currentIndex = index;
                lightboxImg.src = galleryImages[currentIndex].src;
                lightbox.style.display = "flex";
                resetZoom(); // Reset zoom on opening
            }

            function closeLightbox() {
                lightbox.style.display = "none";
                resetZoom();
            }

            // Close the lightbox when clicking outside the image
            document.getElementById("lightbox").addEventListener("click", function(event) {
                if (event.target === this) { 
                    closeLightbox();
                }
            });

            function changeSlide(direction) {
                currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
                lightboxImg.src = galleryImages[currentIndex].src;
                resetZoom();
            }

            // Zoom In/Out on Click
            lightboxImg.addEventListener("click", function () {
                if (scale === 1) {
                    scale = 2; // Zoom in
                } else {
                    scale = 1; // Reset
                }
                applyZoom();
            });

            // Apply Zoom Effect
            function applyZoom() {
                lightboxImg.style.transform = `scale(${scale})`;
                lightboxImg.style.cursor = scale > 1 ? "grab" : "zoom-in";
            }

            // Reset Zoom
            function resetZoom() {
                scale = 1;
                lightboxImg.style.transform = "scale(1)";
            }

            // Drag Image when Zoomed
            lightboxImg.addEventListener("mousedown", (e) => {
                if (scale > 1) {
                    isDragging = true;
                    startX = e.clientX - lightboxImg.offsetLeft;
                    startY = e.clientY - lightboxImg.offsetTop;
                    lightboxImg.style.cursor = "grabbing";
                }
            });

            lightboxImg.addEventListener("mousemove", (e) => {
                if (isDragging && scale > 1) {
                    lightboxImg.style.transform = `scale(${scale}) translate(${e.clientX - startX}px, ${e.clientY - startY}px)`;
                }
            });

            lightboxImg.addEventListener("mouseup", () => {
                isDragging = false;
                lightboxImg.style.cursor = "grab";
            });

            lightboxImg.addEventListener("mouseleave", () => {
                isDragging = false;
            });

            // Pinch-to-Zoom for Mobile
            lightboxImg.addEventListener("wheel", (e) => {
                e.preventDefault();
                scale += e.deltaY * -0.01;
                scale = Math.min(Math.max(1, scale), 3); // Limit zoom range
                applyZoom();
            });



            
            // saznaj vise animacija
            document.addEventListener("DOMContentLoaded", function() {
                document.querySelector(".cta-btn").addEventListener("click", function(event) {
                    event.preventDefault();
                    document.querySelector("#services").scrollIntoView({ behavior: "smooth" });
                });
            });

            // Go to top the button
            let mybutton = document.getElementById("myBtn");

            window.onscroll = function() {scrollFunction()};

            function scrollFunction() {
                if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                    mybutton.style.opacity = "1";
                    mybutton.style.display = "block";
                } else {
                    mybutton.style.opacity = "0";
                    setTimeout(() => { mybutton.style.display = "none"; }, 300);
                }
            }

            function topFunction() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            // When the user clicks on the button, scroll to the top of the document
            function topFunction() {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            // Slideshow functionality
            let slideIndex = 0;
            const slides = document.querySelectorAll('.slideshow img');
            const timerBar = document.querySelector('.timer-bar');
            const totalSlides = slides.length;
            const slideDuration = 3000; // 3 seconds per slide

            function showSlides() {
                slides.forEach((slide, index) => {
                    slide.style.opacity = (index === slideIndex) ? 1 : 0;
                });

                // Reset the timer bar animation
                timerBar.style.transition = 'none'; // Disable transition during reset
                timerBar.style.width = '0%'; // Reset the width
                void timerBar.offsetWidth; // Trigger reflow
                timerBar.style.transition = `width ${slideDuration / 1000}s linear`; // Re-enable transition
                timerBar.style.width = '100%'; // Start the animation

                slideIndex = (slideIndex + 1) % totalSlides;
            }

            // Show the first slide initially
            showSlides();

            // Change slides every 4 seconds
            setInterval(showSlides, slideDuration);

            //Loading screen animation
            document.addEventListener("DOMContentLoaded", function () 
            {
                const loadingScreen = document.querySelector(".loading-screen");

                setTimeout(() => {
                    loadingScreen.style.opacity = "0";
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                    }, 1000); // Allow time for fade-out effect
                }, 1000); // Adjust this duration for how long the loading screen stays
            });

            function openReviewLink() 
            {
                const button = document.querySelector(".review-btn");
                const overlay = document.querySelector(".fade-overlay");

                // Shrink button effect
                button.style.transform = "scale(0.9)";

                setTimeout(() => {
                    button.style.transform = "scale(1)";

                    // Trigger fade-out effect
                    overlay.classList.add("active");

                    setTimeout(() => {
                        window.open("https://g.co/kgs/h6tMgkA", "_blank");
                        overlay.classList.remove("active"); // Reset for next click
                    }, 500); // Wait for fade-out animation before opening the link
                }, 150);
            }

            function toggleDesignerCard() 
            {
            const card = document.getElementById("designerCard");
            card.classList.toggle("active");
            }

            function flipCard(element) 
            {
                element.classList.toggle("active");
            }

            function autoFlip() 
            {
                const cards = document.querySelectorAll('.flip-card');
                let index = 0;
                setInterval(() => {
                    cards.forEach((card, i) => {
                        card.classList.toggle('active', i === index);
                    });
                    index = (index + 1) % cards.length;
                }, 1300);
            }

            document.addEventListener('DOMContentLoaded', autoFlip);

            function openReviews() 
            {
                document.getElementById("reviews-modal").style.display = "flex";
            }

            function closeReviews() {
                document.getElementById("reviews-modal").style.display = "none";
            }