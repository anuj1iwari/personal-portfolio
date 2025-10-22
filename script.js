document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            // Toggle icon
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('ph-list')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-list a[href*=' + sectionId + ']');
            
            if(navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);


    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Contact Form Submission
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => { object[key] = value; });
            const json = JSON.stringify(object);

            formStatus.innerHTML = "Sending...";
            formStatus.style.color = "var(--text-color-darker)";

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });
                const result = await response.json();
                if (result.success) {
                    formStatus.innerHTML = "Message Sent Successfully!";
                    formStatus.style.color = "var(--primary-color)";
                    form.reset();
                } else {
                    formStatus.innerHTML = "Something went wrong. Please try again.";
                    formStatus.style.color = "#F87171";
                }
            } catch (error) {
                formStatus.innerHTML = "An error occurred. Please try again.";
                formStatus.style.color = "#F87171";
            }
            setTimeout(() => { formStatus.innerHTML = ""; }, 5000);
        });
    }
    
    // --- NEW JAVASCRIPT ---

    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    
    function setIcon(isLight) {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if(isLight) {
                icon.classList.remove('ph-moon');
                icon.classList.add('ph-sun');
            } else {
                icon.classList.remove('ph-sun');
                icon.classList.add('ph-moon');
            }
        });
    }
    
    function toggleTheme() {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        setIcon(isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }
    
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });


    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        setIcon(true);
    } else {
        setIcon(false);
    }

    // Project Modal Logic
    const readMoreButtons = document.querySelectorAll('.btn-read-more');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalTech = document.getElementById('modal-tech');

    // Get the H4 tags inside the modal
    const modalProblemH4 = modal.querySelector('h4:nth-of-type(1)');
    const modalSolutionH4 = modal.querySelector('h4:nth-of-type(2)');


    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get data from button's data- attributes
            const title = button.dataset.title;
            const img = button.dataset.img;
            const problem = button.dataset.problem;
            const solution = button.dataset.solution;
            const tech = button.dataset.tech;
            
            // Populate modal
            modalImg.src = img;
            modalTitle.textContent = title;
            
            // --- NEW LOGIC ---
            if (problem && problem.trim() !== "") {
                // If there IS a problem statement
                modalProblem.textContent = problem;
                modalProblemH4.style.display = 'block';
                modalProblem.style.display = 'block';
                modalSolutionH4.textContent = "Solution"; // Set to default
            } else {
                // If problem is EMPTY
                modalProblem.textContent = "";
                modalProblemH4.style.display = 'none';
                modalProblem.style.display = 'none';
                modalSolutionH4.textContent = "About This Project"; // Change "Solution" heading
            }
            // --- END NEW LOGIC ---
            
            modalSolution.textContent = solution;
            modalTech.textContent = tech;
            
            // Show modal
            modal.classList.add('active');
        });
    });

    function closeModal() {
        modal.classList.remove('active');
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) { // Click on overlay background
            closeModal();
        }
    });
    
    // --- FIX FOR NAV LAYOUT ---
    const desktopToggle = document.getElementById('theme-toggle-desktop');
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    
    function handleResize() {
        if(window.innerWidth > 768) {
            // Desktop
            desktopToggle.style.display = 'block';
            mobileToggle.style.display = 'none';
        } else {
            // Mobile
            desktopToggle.style.display = 'none';
            mobileToggle.style.display = 'block';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Run on load

});

