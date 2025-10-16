/*=============== HEADER & NAVIGATION ===============*/
const header = document.getElementById('header');
const navList = document.getElementById('nav-list');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

// Function to handle sticky header
function stickyHeader() {
    if (window.scrollY >= 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}
window.addEventListener('scroll', stickyHeader);

// Function to toggle the mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show-menu');
        // Toggle icon between menu and close
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


// Function to close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navList.classList.contains('show-menu')) {
            navList.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });
});


/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.nav-list a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/*=============== SCROLL REVEAL ANIMATION ===============*/
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);
// To reveal the first elements on page load
reveal();


/*=============== CONTACT FORM HANDLING (WEB3FORMS) ===============*/
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    formStatus.innerHTML = "Sending...";
    formStatus.style.color = '#E5E7EB';


    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                formStatus.innerHTML = "Message Sent Successfully!";
                formStatus.style.color = '#10B981'; // Green color for success
            } else {
                console.log(response);
                formStatus.innerHTML = json.message;
                formStatus.style.color = '#EF4444'; // Red color for error
            }
        })
        .catch(error => {
            console.log(error);
            formStatus.innerHTML = "Something went wrong!";
            formStatus.style.color = '#EF4444';
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        });
});

