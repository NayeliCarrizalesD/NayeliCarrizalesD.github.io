/**
 * @fileoverview Cyberpunk Huasteco Interactive Engine.
 * Coordinates dynamic experience calculation, bilingual localization (ES/EN),
 * project filtering, interactive audio synthesis, HTML5 canvas particle systems,
 * emblem showcase switching, and typewriter text animations for the portfolio.
 *
 * @author Nayeli Carrizales Díaz <nayeli.carrizales.diaz@gmail.com>
 * @copyright 2026 Nayeli Carrizales Díaz. All rights reserved.
 * @license MIT
 */

document.addEventListener('DOMContentLoaded', () => {
    initDynamicExperience();
    initLanguage();
    initProjectFilters();
    initScrollSpy();
    initMobileNav();
    initContactForm();
    initCyberAudio();
    initEmblemTabs();
    initHeroInteractive();
    initHeroTypewriter();
});

/**
 * Initializes the experience counter by calculating elapsed years from a base start year
 * and triggering a numeric count-up animation when visible in the viewport.
 *
 * @function initDynamicExperience
 * @returns {void}
 */
function initDynamicExperience() {
    const el = document.getElementById('yearsExperienceNum');
    if (!el) return;

    const startYear = parseInt(el.getAttribute('data-start-year') || '2020', 10);
    const currentYear = new Date().getFullYear();
    const targetYears = Math.max(1, currentYear - startYear);

    el.textContent = `${targetYears}+`;

    if ('IntersectionObserver' in window) {
        let hasAnimated = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    animateCountUp(el, 1, targetYears, 1100, '+');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });
        observer.observe(el);
    }
}

/**
 * Animates a numeric transition from start to end using cubic ease-out interpolation.
 *
 * @function animateCountUp
 * @param {HTMLElement} element - Target DOM element receiving the rendered value.
 * @param {number} start - Starting integer value.
 * @param {number} end - Final target integer value.
 * @param {number} duration - Total animation time in milliseconds.
 * @param {string} [suffix=''] - Optional character string appended after the number.
 * @returns {void}
 */
function animateCountUp(element, start, end, duration, suffix = '') {
    let startTime = null;
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * (end - start) + start);
        element.textContent = `${current}${suffix}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = `${end}${suffix}`;
        }
    }
    window.requestAnimationFrame(step);
}

/**
 * Current active language state ('es' or 'en').
 * @type {'es'|'en'}
 */
let currentLang = 'es';

/**
 * Sets up the bilingual language toggle button listener.
 *
 * @function initLanguage
 * @returns {void}
 */
function initLanguage() {
    const langBtn = document.getElementById('langToggle');
    if (!langBtn) return;

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        applyLanguage(currentLang);
        playCyberBeep(650, 0.05);
    });
}

/**
 * Applies the selected language to all DOM elements containing localized data attributes.
 *
 * @function applyLanguage
 * @param {'es'|'en'} lang - Target ISO 639-1 language code.
 * @returns {void}
 */
function applyLanguage(lang) {
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.innerHTML = `<i data-lucide="globe"></i> <span>${lang === 'es' ? 'ES | EN' : 'EN | ES'}</span>`;
    }

    if (typeof restartHeroTypewriter === 'function') restartHeroTypewriter();

    document.querySelectorAll('[data-es][data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.innerHTML = text;
            }
        }
    });

    if (window.lucide) {
        lucide.createIcons();
    }

    document.title = lang === 'es' 
        ? 'Nayeli Carrizales Díaz — Portafolio Cyberpunk Huasteco'
        : 'Nayeli Carrizales Díaz — Cyberpunk Huasteco Portfolio';
}

/**
 * Initializes interactive category filtering for portfolio project cards.
 *
 * @function initProjectFilters
 * @returns {void}
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-cyber-card');

    function applyFilter(category) {
        projectCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const shouldShow = (category === 'all' || cardCat === category);
            card.style.display = shouldShow ? 'flex' : 'none';
            if (shouldShow) {
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            }
        });
    }

    applyFilter('all');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');
            if (typeof playCyberBeep === 'function') {
                playCyberBeep(720, 0.04);
            }
            applyFilter(category);
        });
    });
}

/**
 * Coordinates tab selection and display states between Flor Tének and Quezquém cultural showcases.
 *
 * @function initEmblemTabs
 * @returns {void}
 */
function initEmblemTabs() {
    const tabBtns = document.querySelectorAll('.emblem-pill-btn');
    const tabs = {
        flor: {
            canvas: document.getElementById('emblemCanvasFlor'),
            caption: document.getElementById('emblemCaptionFlor')
        },
        quezquem: {
            canvas: document.getElementById('emblemCanvasQuezquem'),
            caption: document.getElementById('emblemCaptionQuezquem')
        }
    };
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-emblem');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            Object.entries(tabs).forEach(([key, items]) => {
                const isActive = (key === target);
                if (items.canvas) {
                    items.canvas.style.display = isActive ? 'flex' : 'none';
                    if (isActive) items.canvas.classList.add('active');
                    else items.canvas.classList.remove('active');
                }
                if (items.caption) {
                    items.caption.style.display = isActive ? 'flex' : 'none';
                }
            });
            playCyberBeep(700, 0.04);
        });
    });
}

/**
 * Initializes and drives the global HTML5 canvas particle constellation system
 * with mouse parallax interaction, scroll drift, and interconnecting filaments.
 *
 * @function initHeroInteractive
 * @returns {void}
 */
function initHeroInteractive() {
    const canvas = document.getElementById('cyberGlobalParticles') || document.getElementById('heroBgParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;
    const PARTICLE_COUNT = 95;
    const particles = [];
    const colorPalette = [
        'rgba(255, 0, 127, ',
        'rgba(255, 46, 147, ',
        'rgba(255, 122, 0, ',
        'rgba(180, 50, 255, ',
        'rgba(0, 240, 255, '
    ];

    function createParticles() {
        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                size: Math.random() * 2.2 + 1.2,
                baseAlpha: Math.random() * 0.45 + 0.2,
                colorPrefix: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                depthFactor: Math.random() * 0.6 + 0.4
            });
        }
    }

    function resizeCanvas() {
        const oldWidth = width;
        const oldHeight = height;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        if (particles.length === 0) {
            createParticles();
            return;
        }

        const scaleX = width / (oldWidth || width);
        const scaleY = height / (oldHeight || height);

        particles.forEach(p => {
            p.x *= scaleX;
            p.y *= scaleY;
            if (p.x < 0 || p.x > width) p.x = Math.random() * width;
            if (p.y < 0 || p.y > height) p.y = Math.random() * height;
        });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    let mouseX = -1000;
    let mouseY = -1000;
    let targetShiftX = 0;
    let targetShiftY = 0;
    let currentShiftX = 0;
    let currentShiftY = 0;
    let lastScroll = window.pageYOffset || 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetShiftX = (mouseX - centerX) / centerX;
        targetShiftY = (mouseY - centerY) / centerY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
        targetShiftX = 0;
        targetShiftY = 0;
    }, { passive: true });

    function animateHero() {
        currentShiftX += (targetShiftX - currentShiftX) * 0.05;
        currentShiftY += (targetShiftY - currentShiftY) * 0.05;

        const currentScroll = window.pageYOffset || 0;
        const scrollDelta = (currentScroll - lastScroll);
        lastScroll = currentScroll;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.y -= scrollDelta * 0.18 * p.depthFactor;

            if (mouseX > 0 && mouseY > 0) {
                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140 && dist > 0) {
                    const force = (140 - dist) / 140;
                    p.vx -= (dx / dist) * force * 0.03;
                    p.vy -= (dy / dist) * force * 0.03;
                }
            }

            p.x += p.vx + currentShiftX * 0.2 * p.depthFactor;
            p.y += p.vy + currentShiftY * 0.2 * p.depthFactor;
            p.vx *= 0.99;
            p.vy *= 0.99;

            if (p.x < 0) {
                p.x = width;
            } else if (p.x > width) {
                p.x = p.x > width + 40 ? Math.random() * width : 0;
            }

            if (p.y < 0) {
                p.y = height;
            } else if (p.y > height) {
                p.y = p.y > height + 40 ? Math.random() * height : 0;
            }

            ctx.fillStyle = `${p.colorPrefix}${p.baseAlpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const lineDx = p.x - p2.x;
                const lineDy = p.y - p2.y;
                const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

                if (lineDist < 125) {
                    const lineAlpha = (1 - lineDist / 125) * 0.18;
                    ctx.strokeStyle = `rgba(255, 0, 127, ${lineAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateHero);
    }

    requestAnimationFrame(animateHero);
}

/**
 * Shared Web Audio API context singleton.
 * @type {AudioContext|null}
 */
let audioCtx = null;

/**
 * Plays a procedural synthesized audio beep using an oscillator and gain exponential ramp.
 *
 * @function playCyberBeep
 * @param {number} [freq=600] - Audio frequency in Hertz (Hz).
 * @param {number} [duration=0.04] - Sound duration in seconds.
 * @returns {void}
 */
function playCyberBeep(freq = 600, duration = 0.04) {
    try {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // Silently ignore browser autoplay security limitations
    }
}

/**
 * Attaches audio feedback clicks to interactive cultural badges.
 *
 * @function initCyberAudio
 * @returns {void}
 */
function initCyberAudio() {
    const badges = document.querySelectorAll('.decor-badge-item');
    badges.forEach((badge, idx) => {
        badge.addEventListener('click', () => {
            const freqs = [640, 720, 800, 880];
            playCyberBeep(freqs[idx % freqs.length] || 700, 0.05);
        });
    });
}

/**
 * Monitors vertical page scroll position and updates active link state in navigation menus.
 *
 * @function initScrollSpy
 * @returns {void}
 */
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.header-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset + 200;
        sections.forEach(sec => {
            if (scrollPos >= sec.offsetTop) {
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && (href === `#${current}` || href.endsWith(`#${current}`))) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/**
 * Initializes the mobile navigation drawer toggle.
 *
 * @function initMobileNav
 * @returns {void}
 */
function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        playCyberBeep(600, 0.05);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
        });
    });
}

/**
 * Contact form submit handler initializer.
 *
 * @function initContactForm
 * @returns {void}
 */
function initContactForm() {}

/**
 * Active timer identifier for typewriter recursion.
 * @type {number|null}
 */
let typewriterTimeout = null;

/**
 * Internal state for typewriter string iteration and slicing.
 * @type {{phraseIndex: number, charIndex: number, isDeleting: boolean}}
 */
const typewriterState = {
    phraseIndex: 0,
    charIndex: 0,
    isDeleting: false
};

/**
 * Bilingual subtitle phrases for hero typewriter animation.
 * @type {{es: string[], en: string[]}}
 */
const heroPhrases = {
    es: [
        'End-to-End Enterprise Web Engineering',
        'React 19 · Next.js 16 · Node.js · PostgreSQL',
        'Cloud Automation & Multi-API Pipelines',
        'Sistemas en Producción a Escala Nacional'
    ],
    en: [
        'End-to-End Enterprise Web Engineering',
        'React 19 · Next.js 16 · Node.js · PostgreSQL',
        'Cloud Automation & Multi-API Pipelines',
        'Nationwide Enterprise Production Systems'
    ]
};

/**
 * Drives the cyclical character typing and backspacing animation in the hero headline.
 *
 * @function initHeroTypewriter
 * @returns {void}
 */
function initHeroTypewriter() {
    const el = document.getElementById('heroTypewriter');
    if (!el) return;

    if (typewriterTimeout) clearTimeout(typewriterTimeout);

    function tick() {
        const currentList = heroPhrases[currentLang] || heroPhrases.es;
        const currentPhrase = currentList[typewriterState.phraseIndex % currentList.length];

        if (typewriterState.isDeleting) {
            el.textContent = currentPhrase.substring(0, typewriterState.charIndex - 1);
            typewriterState.charIndex--;
        } else {
            el.textContent = currentPhrase.substring(0, typewriterState.charIndex + 1);
            typewriterState.charIndex++;
        }

        let speed = typewriterState.isDeleting ? 30 : 65;

        if (!typewriterState.isDeleting && typewriterState.charIndex === currentPhrase.length) {
            speed = 2200;
            typewriterState.isDeleting = true;
        } else if (typewriterState.isDeleting && typewriterState.charIndex === 0) {
            typewriterState.isDeleting = false;
            typewriterState.phraseIndex = (typewriterState.phraseIndex + 1) % currentList.length;
            speed = 400;
        }

        typewriterTimeout = setTimeout(tick, speed);
    }

    typewriterState.charIndex = el.textContent.length || 0;
    typewriterState.isDeleting = true;
    typewriterTimeout = setTimeout(tick, 1800);
}

/**
 * Resets the typewriter pointer to the beginning and restarts the animation loop.
 *
 * @function restartHeroTypewriter
 * @returns {void}
 */
function restartHeroTypewriter() {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    typewriterState.charIndex = 0;
    typewriterState.isDeleting = false;
    initHeroTypewriter();
}
