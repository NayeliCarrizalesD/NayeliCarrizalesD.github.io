/* ==========================================================================
   CYBERPUNK HUASTECO — JAVASCRIPT ENGINE
   Nayeli Carrizales Díaz | Portfolio Interactive Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

/* ==========================================================================
   1. BILINGUAL LANGUAGE ENGINE (ES / EN)
   ========================================================================== */
let currentLang = 'es';

function initLanguage() {
    const langBtn = document.getElementById('langToggle');
    if (!langBtn) return;

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        applyLanguage(currentLang);
        playCyberBeep(650, 0.05);
    });
}

function applyLanguage(lang) {
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.innerHTML = lang === 'es' ? '🌐 ES | EN' : '🌐 EN | ES';
    }

    if (typeof restartHeroTypewriter === "function") restartHeroTypewriter();
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

    // Update document title
    document.title = lang === 'es' 
        ? 'Nayeli Carrizales Díaz — Portafolio Cyberpunk Huasteco'
        : 'Nayeli Carrizales Díaz — Cyberpunk Huasteco Portfolio';
}

/* ==========================================================================
   2. PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-cyber-card');

    function applyFilter(category) {
        projectCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');

            if (category === 'all') {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else if (cardCat === category) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.4s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Set initial display (hide personal-only from default 'all' view)
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

/* ==========================================================================
   7. DUAL EMBLEM SHOWCASE CONTROLLER (FLOR HUASTECA / QUEZQUÉM)
   ========================================================================== */
function initEmblemTabs() {
    const tabBtns = document.querySelectorAll('.emblem-pill-btn');
    const panels = {
        'flor': document.getElementById('emblemPanelFlor'),
        'quezquem': document.getElementById('emblemPanelQuezquem')
    };
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-emblem');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            Object.entries(panels).forEach(([key, panel]) => {
                if (panel) {
                    panel.style.display = (key === target) ? 'flex' : 'none';
                }
            });
            playCyberBeep(700, 0.04);
        });
    });
}

/* ==========================================================================
   8. GLOBAL FULL-PAGE CYBER PARTICLES ENGINE & SCROLL/MOUSE PARALLAX
   ========================================================================== */
function initHeroInteractive() {
    const canvas = document.getElementById('cyberGlobalParticles') || document.getElementById('heroBgParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Luminous nodes in Rosa Mexicano & Ámbar Huasteco
    const PARTICLE_COUNT = 95;
    const particles = [];
    const colorPalette = [
        'rgba(255, 0, 127, ',    // Rosa Mexicano
        'rgba(255, 46, 147, ',   // Magenta Neón
        'rgba(255, 122, 0, ',    // Ámbar Huasteco
        'rgba(180, 50, 255, ',   // Violeta Cyber
        'rgba(0, 240, 255, '     // Turquesa Neón
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * (width || window.innerWidth),
            y: Math.random() * (height || window.innerHeight),
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            size: Math.random() * 2.2 + 1.2,
            baseAlpha: Math.random() * 0.45 + 0.2,
            colorPrefix: colorPalette[Math.floor(Math.random() * colorPalette.length)],
            depthFactor: Math.random() * 0.6 + 0.4 // Parallax depth layer
        });
    }

    // Scroll & Mouse Parallax Coordinates
    let mouseX = -1000;
    let mouseY = -1000;
    let targetShiftX = 0;
    let targetShiftY = 0;
    let currentShiftX = 0;
    let currentShiftY = 0;
    let scrollYOffset = window.pageYOffset || 0;
    let targetScrollY = scrollYOffset;

    window.addEventListener('scroll', () => {
        targetScrollY = window.pageYOffset || 0;
    }, { passive: true });

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

    let lastScroll = window.pageYOffset || 0;

    // 60FPS RAF Animation Loop with Smooth Lerp
    function animateHero() {
        // Smooth lerp for scroll and mouse parallax
        currentShiftX += (targetShiftX - currentShiftX) * 0.05;
        currentShiftY += (targetShiftY - currentShiftY) * 0.05;

        const currentScroll = window.pageYOffset || 0;
        const scrollDelta = (currentScroll - lastScroll);
        lastScroll = currentScroll;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Parallax drift relative to scroll
            p.y -= scrollDelta * 0.18 * p.depthFactor;

            // Subtle gentle mouse deflection when near cursor
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

            // Natural movement + mouse parallax drift
            p.x += p.vx + currentShiftX * 0.2 * p.depthFactor;
            p.y += p.vy + currentShiftY * 0.2 * p.depthFactor;
            p.vx *= 0.99;
            p.vy *= 0.99;

            // Wrap around viewport edges
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Render particle node
            ctx.fillStyle = p.colorPrefix + p.baseAlpha + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Connect nearby nodes with faint cyber filaments
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const lineDx = p.x - p2.x;
                const lineDy = p.y - p2.y;
                const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

                if (lineDist < 125) {
                    const lineAlpha = (1 - lineDist / 125) * 0.18;
                    ctx.strokeStyle = 'rgba(255, 0, 127, ' + lineAlpha + ')';
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

/* ==========================================================================
   AUDIO SYNTHESIZER & NAVIGATION HELPERS
   ========================================================================== */
let audioCtx = null;
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
    } catch (e) {}
}

function initCyberAudio() {}

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

function initMobileNav() {
    const toggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (!toggle || !navMenu) return;

    toggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        playCyberBeep(600, 0.05);
    });
}

function initContactForm() {}


/* ==========================================================================
   TYPEWRITER EFFECT (Hero Subtitle)
   ========================================================================== */
let typewriterTimeout = null;
let typewriterState = {
    phraseIndex: 0,
    charIndex: 0,
    isDeleting: false
};

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
            speed = 2200; // Pause when phrase is fully written
            typewriterState.isDeleting = true;
        } else if (typewriterState.isDeleting && typewriterState.charIndex === 0) {
            typewriterState.isDeleting = false;
            typewriterState.phraseIndex = (typewriterState.phraseIndex + 1) % currentList.length;
            speed = 400; // Pause before typing next phrase
        }

        typewriterTimeout = setTimeout(tick, speed);
    }

    // Set initial char index based on existing text length
    typewriterState.charIndex = el.textContent.length || 0;
    typewriterState.isDeleting = true;
    typewriterTimeout = setTimeout(tick, 1800);
}

function restartHeroTypewriter() {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    typewriterState.charIndex = 0;
    typewriterState.isDeleting = false;
    initHeroTypewriter();
}
