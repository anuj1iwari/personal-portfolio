document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation & Scroll Logic
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);

        const sections = document.querySelectorAll('section');
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((li) => {
            li.classList.remove("active");
            if (li.getAttribute("href").includes(current)) {
                li.classList.add("active");
            }
        });
    });

    // 2. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    themeBtn.onclick = () => {
        body.classList.toggle('light-mode');
        const icon = themeBtn.querySelector('i');
        icon.className = body.classList.contains('light-mode') ? 'ph-bold ph-sun' : 'ph-bold ph-moon';
        localStorage.setItem('portfolio-theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    };

    if(localStorage.getItem('portfolio-theme') === 'light') {
        body.classList.add('light-mode');
        themeBtn.querySelector('i').className = 'ph-bold ph-sun';
    }

    // 3. Project Modal Data (Updated Content)
    const projectData = {
        prism: { 
            title: "Prism AI – Unified Intelligence Platform", 
            body: "<strong>Stack: React.js, TS, Framer Motion</strong><br><br>• Architected a high-concurrency 7-Model AI Aggregator integrating Gemini 2.5 Pro and Claude APIs.<br>• Pioneered an ’AI Jury’ system for real-time model cross-evaluation and contradiction flagging.<br>• Enhanced user retention by visualizing complex AI reasoning paths and adaptive memory profiles." 
        },
        empathy: { 
            title: "The Empathy Archive | Full-Stack App", 
            body: "<strong>Stack: React, Firebase, Lucide-React</strong><br><br>• Implemented real-time data synchronization using Firebase Firestore listeners for zero-latency updates.<br>• Built a privacy-centric Anonymous Authentication flow, handling high-volume user interactions securely." 
        },
        zen: { 
            title: "ZenSpace – Interactive Mindfulness Web App", 
            body: "<strong>Stack: React, Tailwind, GSAP, Canvas</strong><br><br>• Engineered a high-performance meditation suite featuring 5 immersive environments.<br>• Developed a complex HTML5 Canvas Particle System for fluid, 60fps animations of natural elements.<br>• Optimized UI responsiveness and accessibility for a seamless cross-device mindfulness experience." 
        },
        lofi: { 
            title: "Lofi Focus Room — Productivity Web App", 
            body: "<strong>Stack: JS, Web Audio API</strong><br><br>• Developed a low-latency ambient sound mixer using Web Audio API to bypass browser restrictions.<br>• Integrated a custom Pomodoro engine and task manager for real-time productivity analytics." 
        },
        vitae: { 
            title: "Vitae AI — Intelligent Healthcare Analytics", 
            body: "Enhances healthcare efficiency with AI-driven analytics, advanced image processing, and intelligent patient data management to assist medical professionals in providing better diagnostic accuracy." 
        },
        bloom: { 
            title: "BloomPost – Digital Bouquet Builder", 
            body: "<strong>Stack: HTML5, Tailwind, JavaScript</strong><br><br>• Designed an interactive 3-step customization engine with real-time DOM-based visual previews.<br>• Leveraged CSS Transforms and GSAP to create unique, randomized floral arrangements." 
        }
    };

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.getElementById('modal-close');

    document.querySelectorAll('.btn-read-more').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const data = projectData[id];
            if(data) {
                modalTitle.innerHTML = data.title;
                modalBody.innerHTML = `<p>${data.body}</p>`;
                modal.classList.add('active');
            }
        });
    });

    closeModalBtn.onclick = () => modal.classList.remove('active');
    window.onclick = (e) => { if(e.target == modal) modal.classList.remove('active'); };

    // 4. Working Contact Form (Web3Forms)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        formStatus.textContent = "Sending...";
        formStatus.style.color = "var(--primary-color)";

        const formData = new FormData(contactForm);
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                formStatus.textContent = "Success! Anuj will contact you soon.";
                formStatus.style.color = "#4ade80";
                contactForm.reset();
            } else {
                formStatus.textContent = "Error! Please try again.";
                formStatus.style.color = "#f87171";
            }
        } catch { 
            formStatus.textContent = "Connection Error!";
            formStatus.style.color = "#f87171";
        }
        setTimeout(() => { formStatus.textContent = ""; }, 4000);
        submitBtn.disabled = false;
    });
});
