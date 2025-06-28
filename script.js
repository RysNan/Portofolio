document.addEventListener('DOMContentLoaded', function() {

    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    function setDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            if (toggleSwitch) toggleSwitch.checked = true;
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            if (toggleSwitch) toggleSwitch.checked = false;
            localStorage.setItem('theme', 'light');
        }
    }

    if (currentTheme) {
        if (currentTheme === 'dark') {
            setDarkMode(true);
        }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true);
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            setDarkMode(e.target.checked);
        });
    }
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        setActiveNavItem();
        
        if (window.scrollY > 50) {
            document.querySelector('.header').classList.add('scrolled');
        } else {
            document.querySelector('.header').classList.remove('scrolled');
        }
    });
    
    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
                moveNavIndicator(item);
            }
        });
    }
    
    function moveNavIndicator(activeItem) {
        const indicator = document.querySelector('.nav-indicator');
        if (!indicator) return;
        const itemRect = activeItem.getBoundingClientRect();
        const navRect = document.querySelector('.nav-links').getBoundingClientRect();
        
        indicator.style.width = `${itemRect.width}px`;
        indicator.style.left = `${itemRect.left - navRect.left}px`;
    }

    setTimeout(() => {
        const activeNavItem = document.querySelector('.nav-link.active');
        if (activeNavItem) {
            moveNavIndicator(activeNavItem);
        }
    }, 100);

    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const cursor = document.querySelector('.cursor');
    
    if (cursor && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        const hoverElements = document.querySelectorAll('a, button, .project-card, .form-group input, .form-group textarea');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.opacity = '0.5';
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            });
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }
    
   const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = this.querySelector('#message').value.trim(); 
            
            if (!message) {
                alert('Please enter your message');
                return;
            }

            const subject = `New message from Portfolio Visitor`;
            const body = `Message:\n\n${message}`;
            window.location.href = `mailto:Rys.Nando@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            this.reset();
            alert('Please continue sending your message via email. Thank you!');
        });
    }

    
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-title .title-line, .hero-subtitle, .hero-cta, .about-content > *, .project-card, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    animateOnScroll();
    
    window.addEventListener('scroll', animateOnScroll);
    
    setTimeout(() => {
        document.querySelector('.hero-title .title-line:nth-child(1)').classList.add('animate');
        setTimeout(() => {
            document.querySelector('.hero-title .title-line:nth-child(2)').classList.add('animate');
            setTimeout(() => {
                document.querySelector('.hero-subtitle').classList.add('animate');
                setTimeout(() => {
                    document.querySelector('.hero-cta').classList.add('animate');
                }, 200);
            }, 200);
        }, 200);
    }, 500);

    setActiveNavItem(); 
});
