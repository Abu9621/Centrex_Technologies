document.addEventListener("DOMContentLoaded", () => {

    // 1. INITIALIZE LENIS (Smooth Scroll Engine)
    // Declared once and used globally to prevent lag
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    // 2. PRELOADER & ENTRY SEQUENCE
    const preloader = document.querySelector('.preloader');
    const loaderBar = document.querySelector('.loader-bar');

    // Start Preloader
    setTimeout(() => {
        if (loaderBar) loaderBar.style.width = '100%';

        setTimeout(() => {
            document.body.classList.add('loaded');
            runEntrySequence();
        }, 1000);
    }, 500);

    // Staggered Animation for Hero Section
    function runEntrySequence() {
        const nav = document.getElementById('main-nav');
        const badge = document.querySelector('.badge-wrapper');
        const titleTop = document.querySelector('.hero-title-1');
        const titleMain = document.querySelector('.hero-title-2');
        const desc = document.querySelector('.hero-desc');

        if (nav) {
            setTimeout(() => {
                nav.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
                nav.style.transform = "translate3d(0,0,0)";
                nav.style.opacity = "1";
            }, 200);
        }

        if (badge) {
            setTimeout(() => {
                badge.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
                badge.style.transform = "translate3d(0,0,0)";
                badge.style.opacity = "1";
            }, 500);
        }

        if (titleTop) {
            setTimeout(() => {
                titleTop.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
                titleTop.style.transform = "translate3d(0,0,0)";
                titleTop.style.opacity = "1";
            }, 700);
        }

        if (titleMain) {
            setTimeout(() => {
                titleMain.style.transition = "all 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1s ease-out";
                titleMain.style.filter = "blur(0px)";
                titleMain.style.opacity = "1";
            }, 900);
        }

        if (desc) {
            setTimeout(() => {
                desc.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
                desc.style.transform = "translate3d(0,0,0)";
                desc.style.opacity = "1";
            }, 1100);
        }
    }


    // 3. VIDEO CONTROLLER (Play/Pause Logic)
    const videoContainer = document.querySelector('.video-container');
    const mainVideo = document.querySelector('.main-video-player');

    if (videoContainer && mainVideo) {

        mainVideo.addEventListener('play', () => {
            videoContainer.classList.add('playing');
        });

        mainVideo.addEventListener('pause', () => {
            videoContainer.classList.remove('playing');
        });

    }


    // 4. PERFORMANCE MODAL (NO-LAG POPUP ARCHITECTURE)
    const openModalBtn = document.getElementById('open-story-modal');
    const closeModalBtn = document.getElementById('close-story-modal');
    const storyModal = document.getElementById('story-modal');

    if (openModalBtn && closeModalBtn && storyModal) {

        // OPEN SEQUENCE
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            storyModal.classList.add('active');


            lenis.stop();


            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed'; // Full lock
            document.body.style.width = '100%';
        });

        // CLOSE SEQUENCE 
        const triggerClose = () => {
            storyModal.classList.remove('active');

            setTimeout(() => {
                lenis.start();
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
            }, 400);
        };

        closeModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerClose();
        });

        // Close on background click
        storyModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-blur-bg')) {
                triggerClose();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && storyModal.classList.contains('active')) {
                triggerClose();
            }
        });
    }
});


document.addEventListener("mousemove", (e) => {

    const cards =
        document.querySelectorAll(".floating-card");

    const x =
        (window.innerWidth / 2 - e.clientX) / 40;

    const y =
        (window.innerHeight / 2 - e.clientY) / 40;

    cards.forEach(card => {

        card.style.transform =
            `translate(${x}px,${y}px)`;

    });

});



// 5. FOOTER REVEAL ON SCROLL

document.addEventListener("DOMContentLoaded", function () {
    const footerElement = document.querySelector(".modern-footer");

    const observerOptions = {
        root: null,
        threshold: 0.15, // Triggers perfectly when scrolled down
        rootMargin: "0px"
    };

    const slowScrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    footerElement.classList.add("reveal-triggered");
                }, 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (footerElement) {
        slowScrollObserver.observe(footerElement);
    }
});

// Load each social icon's Lottie JSON into its own container
document.querySelectorAll('.social-icon-lottie').forEach(function (el) {
    lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: el.getAttribute('data-lottie') // swap these paths with your real .json files
    });
});

// Reveal animation trigger (unchanged behavior)
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.modern-footer').classList.add('reveal-triggered');
});



/* ================= OUR TECHNOLOGY — HORIZONTAL WAVE ENGINE ================= */

document.addEventListener("DOMContentLoaded", () => {

    const techSection = document.getElementById("our-technology");
    const techTrack = document.getElementById("techTrack");
    const techSvg = document.getElementById("techWaveSvg");
    const techPath = document.getElementById("techWavePath");

    if (!techSection || !techTrack || !techSvg || !techPath) return;

    /* ---- 1. DATA SOURCE (edit titles / icons / links / top-or-bottom here) ---- */
    const TECH_ITEMS = [
        {
            title: "Advanced RFID Solutions",
            desc: "Centrex Technologies allow Laundries,Hospitals and Hotels to optimally manage their linen and uniform inventory through improved and highly accurate asset management and inventory tracking.",
            icon: "Assets/icons/tech-linenweb.svg",
            link: "linenweb-laundry-information-system.html",
            pos: "bottom"
        },
        {
            title: "Linenweb® Laundry Information System",
            desc: "Provides a complete software and RFID solution for managing the laundry operations from production to administration,...",
            icon: "Assets/icons/tech-hospitals-hotels.svg",
            link: "linenweb-hospitals-hotels.html",
            pos: "top"
        },
        {
            title: "Linenweb® Solutions for Hospitals and Hotels",
            desc: "Combines our world renown Linen Management and Tracking System with options for Uniform Management, RFID Item Tracking and Curtain Management, making it the complete textile management solution for today's leading Hospitals and Hotels.",
            icon: "Assets/icons/tech-rfid-systems.svg",
            link: "linenweb-rfid-systems.html",
            pos: "bottom"
        },
        {
            title: "Linenweb® Uniform Management",
            desc: "Uses the latest RFID technologies to provide a complete solution to optimize uniform and scrub suit inventory, staff assignment, item tracking and administration including interfaces to uniform conveyor systems and corporate IT, for single sites or multiple sites managed from a central commercial laundry.",
            icon: "Assets/icons/tech-uniform-management.svg",
            link: "linenweb-uniform-management-system.html",
            pos: "top"
        },
        {
            title: "Linenweb® RFID Solutions",
            desc: "Linenweb RFID tracking systems from Centrex Technologies allow Laundries, Hospitals and Hotels to optimally manage their linen and uniform inventory through improved and highly accurate inventory tracking. Losses can average 20% to 40% of inventory each year — Linenweb RFID Systems offer rapid ROI payback, many cases in 6 months or less.",
            icon: "Assets/icons/tech-conveyor.svg",
            link: "linenweb-rfid-solutions.html",
            pos: "bottom"
        },
        {
            title: "Linenweb® Uniform Conveyor System",
            desc: "Centrex Technologies works in partnership with leading Uniform Conveyor manufacturers worldwide to provide sophisticated software and RFID uniform management and tracking solutions. The Linenweb® Pro System integrates with conveyor control systems and corporate IT to expedite uniform delivery while maintaining detailed tracking history.",
            icon: "Assets/icons/tech-curtain.svg",
            link: "linenweb-curtain-management-system.html",
            pos: "top"
        },
        {
            title: "Linenweb® Curtain Management System",
            desc: "The Linenweb® Curtain Management System provides the optimal solution for tracking and managing cubical curtains and drapes used throughout hospitals.",
            icon: "Assets/icons/tech-curtain.svg",
            link: "linenweb-curtain-management-system.html",
            pos: "bottom"
        }
    ];

    /* Layout constants — MUST match the values in tech-section.css exactly */
    const ITEM_SPACING = 680;   // horizontal gap between items
    const TRACK_HEIGHT = 720;   // must match .tech-track-wrapper / .tech-track height in CSS
    const TOP_Y = 220;          // must match .pos-top .tech-node top in CSS
    const BOTTOM_Y = 500;       // must match .pos-bottom .tech-node top in CSS

    // Side padding = half the viewport width. This guarantees the FIRST item is
    // perfectly centered when scroll progress = 0, and the LAST item is
    // perfectly centered when scroll progress = 1 - so the last item never gets
    // cropped against the edge of the screen at the end of the scroll.
    let SIDE_PAD = Math.max(window.innerWidth / 2, 300);

    let trackWidth = 0;
    let sectionHeight = 0;
    let sectionTop = 0;
    let maxTranslate = 0;

    const itemEls = [];
    const itemLefts = [];
    let revealedCount = 0;

    /* ---- 2. BUILD ITEMS + WAVE PATH FROM THE SAME COORDINATES ---- */
    function buildTrack() {
        techTrack.innerHTML = "";
        techTrack.appendChild(techSvg);
        itemEls.length = 0;
        itemLefts.length = 0;

        SIDE_PAD = Math.max(window.innerWidth / 2, 300);
        trackWidth = SIDE_PAD * 2 + (TECH_ITEMS.length - 1) * ITEM_SPACING;
        techTrack.style.width = trackWidth + "px";
        techSvg.setAttribute("viewBox", `0 0 ${trackWidth} ${TRACK_HEIGHT}`);

        const points = TECH_ITEMS.map((item, i) => {
            const x = SIDE_PAD + i * ITEM_SPACING;
            const y = item.pos === "top" ? TOP_Y : BOTTOM_Y;
            itemLefts.push(x);
            return { x, y };
        });

        /* Smooth step-curve through every point (same technique as reference wave) */
        let d = `M -50,${points[0].y} L ${points[0].x},${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const midX = (p0.x + p1.x) / 2;
            d += ` C ${midX},${p0.y} ${midX},${p1.y} ${p1.x},${p1.y}`;
        }
        d += ` L ${trackWidth + 50},${points[points.length - 1].y}`;
        techPath.setAttribute("d", d);

        /* Build DOM nodes for each item */
        TECH_ITEMS.forEach((item, i) => {
            const el = document.createElement("div");
            el.className = `tech-item pos-${item.pos}`;
            el.style.left = points[i].x + "px";
            el.innerHTML = `
                <span class="tech-bg-number">${String(i + 1).padStart(2, "0")}</span>
                <div class="tech-node">
                    <img src="${item.icon}" alt="${item.title}">
                </div>
                <div class="tech-copy ${item.pos === "top" ? "copy-below" : "copy-above"}">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <a class="tech-learn-more" href="${item.link}">
                        <span>Learn more</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.33334 8H12.6667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            `;
            techTrack.appendChild(el);
            itemEls.push(el);
        });
    }

    /* ---- 3. SCROLL-PIN DIMENSIONS ---- */
    function setupDimensions() {
        const viewportW = window.innerWidth;
        maxTranslate = Math.max(trackWidth - viewportW, 0);
        sectionHeight = maxTranslate + window.innerHeight;
        techSection.style.height = sectionHeight + "px";
        sectionTop = techSection.offsetTop;
    }

    /* ---- 4. REVEAL AN ITEM ONCE (staggered so several revealing together still cascade) ---- */
    function revealItem(el) {
        if (el.dataset.revealed) return;
        el.dataset.revealed = "true";
        const delay = revealedCount * 150;
        revealedCount++;
        setTimeout(() => el.classList.add("in-view"), delay);
    }

    /* ---- 5. MAIN LOOP: move track + reveal items currently in view ---- */
    function updateTrack() {
        const scrollY = window.scrollY || window.pageYOffset;
        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;

        const start = sectionTop;
        const end = sectionTop + sectionHeight - viewportH;

        let progress = (scrollY - start) / (end - start);
        progress = Math.min(Math.max(progress, 0), 1);

        const x = -progress * maxTranslate;
        techTrack.style.transform = `translate3d(${x}px, 0, 0)`;

        for (let i = 0; i < itemEls.length; i++) {
            const screenX = itemLefts[i] + x;
            if (screenX > -500 && screenX < viewportW + 300) {
                revealItem(itemEls[i]);
            }
        }
    }

    function loop() {
        updateTrack();
        requestAnimationFrame(loop);
    }

    buildTrack();
    setupDimensions();
    requestAnimationFrame(loop);

    let resizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            buildTrack();
            setupDimensions();
            revealedCount = 0;
            updateTrack();
        }, 200);
    });
});