/**
 * Morning Star Printing Press Co. — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {

    // ── AOS Animations ──────────────────────────────────────────
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            offset: 80,
            once: true,
            easing: 'ease-out-cubic',
        });
    }

    // ── Navbar Scroll Effect ─────────────────────────────────────
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ── Back to Top Button ───────────────────────────────────────
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('show', window.scrollY > 300);
        });

        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Smooth Scroll for Anchor Links ───────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ── Scroll-Spy: Highlight Active Nav Link ────────────────────
    const navSectionMap = {
        'home':         document.getElementById('nav-home'),
        'about':        document.getElementById('nav-about'),
        'services':     document.getElementById('nav-services'),
        'testimonials': document.getElementById('nav-testimonials'),
        'contact':      document.getElementById('nav-contact'),
    };

    const sections = document.querySelectorAll('section[id]');

    function setActiveNav(id) {
        Object.values(navSectionMap).forEach(function (link) {
            if (link) link.classList.remove('active');
        });
        if (navSectionMap[id]) {
            navSectionMap[id].classList.add('active');
        }
    }

    if (sections.length > 0) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        }, {
            rootMargin: '-40% 0px -55% 0px',
            threshold: 0
        });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    // Set active nav on page load based on URL hash
    (function () {
        const hash = window.location.hash.replace('#', '');
        if (hash && navSectionMap[hash]) {
            setActiveNav(hash);
        } else {
            setActiveNav('home');
        }
    })();

    // ── Animated Counters ────────────────────────────────────────
    function animateCounter(element) {
        const raw = element.textContent.trim();
        const finalValue = parseInt(raw.replace(/\D/g, ''));
        if (isNaN(finalValue)) return;
        const increment = finalValue / 50;
        let currentValue = 0;
        const useComma = raw.includes(',');

        const counter = setInterval(function () {
            currentValue += increment;
            if (currentValue >= finalValue) {
                element.textContent = useComma ? finalValue.toLocaleString() : finalValue;
                clearInterval(counter);
            } else {
                const val = Math.floor(currentValue);
                element.textContent = useComma ? val.toLocaleString() : val;
            }
        }, 30);
    }

    const countersSection = document.querySelector('.counters-section');
    if (countersSection) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter-number');
                    counters.forEach(function (counter) {
                        if (!counter.classList.contains('animated')) {
                            animateCounter(counter);
                            counter.classList.add('animated');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(countersSection);
    }

    // ── Animate Story Stats (stat-number) ────────────────────────
    function animateStat(el) {
        const raw = el.textContent.trim();
        const num = parseInt(raw.replace(/\D/g, ''));
        const suffix = raw.replace(/[\d]/g, '');
        if (isNaN(num)) return;
        let current = 0;
        const step = Math.max(1, Math.floor(num / 60));
        const useComma = raw.includes(',');
        const timer = setInterval(function () {
            current = Math.min(current + step, num);
            const val = useComma ? current.toLocaleString() : current;
            el.textContent = val + suffix;
            if (current >= num) clearInterval(timer);
        }, 25);
    }

    const statSection = document.querySelector('.story-stats');
    if (statSection) {
        const statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.stat-number').forEach(function (el) {
                        if (!el.dataset.animated) {
                            el.dataset.animated = '1';
                            animateStat(el);
                        }
                    });
                }
            });
        }, { threshold: 0.4 });
        statObserver.observe(statSection);
    }

    // ── Auto-dismiss Alerts ──────────────────────────────────────
    document.querySelectorAll('.alert').forEach(function (alert) {
        setTimeout(function () {
            alert.style.display = 'none';
        }, 5000);
    });

    // ── Theme Toggle (Light/Dark Mode) ───────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleText = document.getElementById('themeToggleText');
    const themeToggleIcon = themeToggle ? themeToggle.querySelector('i') : null;

    if (themeToggle && themeToggleText && themeToggleIcon) {
        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleText.textContent = 'Dark';
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }

        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            if (isDark) {
                localStorage.setItem('theme', 'dark');
                themeToggleText.textContent = 'Dark';
                themeToggleIcon.classList.remove('fa-sun');
                themeToggleIcon.classList.add('fa-moon');
            } else {
                localStorage.setItem('theme', 'light');
                themeToggleText.textContent = 'Light';
                themeToggleIcon.classList.remove('fa-moon');
                themeToggleIcon.classList.add('fa-sun');
            }
        });
    }

});
