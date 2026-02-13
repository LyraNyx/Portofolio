// Global Variables
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const loader = document.querySelector('.loader');
const blogGrid = document.getElementById('blogGrid');

// Blog Posts Data (Cybersecurity Focus)
const blogPosts = [
    {
        id: 1,
        title: "Advanced Keylogger Development for Red Team",
        category: "pentest",
        date: "Jan 20, 2026",
        image: "images/blog1.jpg",
        excerpt: "Complete guide to building undetectable keyloggers with C2 integration, evasion techniques, and persistence mechanisms.",
        readTime: "8 min"
    },
    {
        id: 2,
        title: "WormGPT: Next-Gen Ransomware Framework",
        category: "malware",
        date: "Jan 18, 2026",
        image: "images/blog2.jpg",
        excerpt: "Production-ready worm implementation featuring lateral movement, encryption, and command & control infrastructure.",
        readTime: "12 min"
    },
    {
        id: 3,
        title: "AD Takeover: 0 to Domain Admin in 30min",
        category: "pentest",
        date: "Jan 15, 2026",
        image: "images/blog1.jpg",
        excerpt: "Weaponized Active Directory attack chains including Kerberoasting, DCSync, and Golden Ticket implementation.",
        readTime: "10 min"
    },
    {
        id: 4,
        title: "XSS to RCE: Modern Web Exploitation",
        category: "web",
        date: "Jan 12, 2026",
        image: "images/blog2.jpg",
        excerpt: "Advanced web vulnerability chaining from reflected XSS to remote code execution with practical examples.",
        readTime: "9 min"
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Hide loader
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    // Load blog posts
    renderBlogPosts('all');

    // Navbar scroll effect
    window.addEventListener('scroll', handleScroll);

    // Initialize particles
    initParticles();

    // Animate stats
    animateStats();

    // Skill bars
    animateSkillBars();
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        setActiveNav(link);
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Active Nav Link
function setActiveNav(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', body.dataset.theme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.dataset.theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.dataset.theme = savedTheme;
updateThemeIcon();

// Blog Filter
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        const filter = e.target.dataset.filter;
        renderBlogPosts(filter);
    });
});

function renderBlogPosts(filter = 'all') {
    const filteredPosts = filter === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === filter);

    blogGrid.innerHTML = filteredPosts.map(post => `
        <article class="blog-card" data-category="${post.category}">
            <div class="blog-header">
                <span class="blog-category">${post.category.toUpperCase()}</span>
                <span class="blog-date">${post.date} • ${post.readTime}</span>
            </div>
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <a href="#" class="blog-link">
                Read Article <i class="fas fa-arrow-right"></i>
            </a>
        </article>
    `).join('');
}

// Particles Background
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Counter Animation
function animateStats() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelector('.hero-stats')?.scrollIntoView({ behavior: 'smooth' });
}

// Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    bar.style.width = bar.dataset.width;
                });
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelector('.skills-grid')?.scrollIntoView({ behavior: 'smooth' });
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate form submission
    const submitBtn = e.target.querySelector('.btn');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            e.target.reset();
            alert('Message sent successfully! I\'ll get back to you within 24 hours.');
        }, 2000);
    }, 1500);
});

// Scroll Effects
function handleScroll() {
    const scrolled = window.scrollY;
    const header = document.querySelector('.header');

    if (scrolled > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.98)';
        header.style.backdropFilter = 'blur(30px)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
    }

    // Parallax effect for hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// Prevent body scroll when mobile menu open
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
    }
});