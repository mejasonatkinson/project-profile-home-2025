<script setup>
import { onMounted, watch, nextTick, reactive, computed } from 'vue';

import LightMe from '@/assets/images/me/light.png';
import DarkMe from '@/assets/images/me/light.png';

import AstraZeneca from '@/assets/images/company-logos/AstraZeneca.jpg';
import DVSA from '@/assets/images/company-logos/DVSA.png';
import Google from '@/assets/images/company-logos/google.jpg';

import Lego from '@/assets/images/company-logos/Lego.png';
import Meta from '@/assets/images/company-logos/Meta.png';
import NCSC from '@/assets/images/company-logos/NCSC.jpg';

import Medway from '@/assets/images/company-logos/medway.png';

import Perkbox from '@/assets/images/company-logos/Perkbox.png';
import RedBull from '@/assets/images/company-logos/redbull.jpg';
import Snap from '@/assets/images/company-logos/snap.jpg';

import RockMission from '@/assets/images/company-logos/rockmission.jpg';
import Sponge from '@/assets/images/company-logos/sponge.jpg';

import MaleProfile1 from '@/assets/images/recommendations/m-1.png';
import FemaleProfile1 from '@/assets/images/recommendations/f-1.png';
import FemaleProfile2 from '@/assets/images/recommendations/f-2.png';
import FemaleProfile3 from '@/assets/images/recommendations/f-3.png';

const state = reactive({
    light: true,
    motionReduced: false,
    reducedMotionWordIndex: 0,
    readAloud: false,
    currentWordIndex: 0,
});

let speechSynthesisUtterance = null;
let allWords = [];
let wordSpans = [];

const heroRoles = ["Accessibility Specialist", "Developer", "Designer", "Artist", "Creative Coder", "Problem Solver"];
const profileImage = computed(() => (state.light ? LightMe : DarkMe));

// Toggle toolbar buttons on/off from one place.
const toolbarButtonToggles = {
    themeMode: true,
    motion: true,
    readAloud: false,
};

const enabledToolbarButtons = computed(() => {
    const buttonOrder = ['themeMode', 'motion', 'readAloud'];
    return buttonOrder.filter((buttonKey) => toolbarButtonToggles[buttonKey]);
});

const isLastToolbarButton = (buttonKey) => {
    const activeButtons = enabledToolbarButtons.value;
    return activeButtons.length > 0 && activeButtons[activeButtons.length - 1] === buttonKey;
};

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    state.light = false;
} else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light'
    state.light = true;
}
if (localStorage.motionReduced === 'true' || (!('motionReduced' in localStorage) && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
    document.documentElement.classList.add('reduce-motion');
    localStorage.motionReduced = 'true';
    state.motionReduced = true;
}
const lightDarkMode = () => {
    state.light = !state.light;
    if (state.light) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light'
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}
const toggleMotion = () => {
    state.motionReduced = !state.motionReduced;
    if (state.motionReduced) {
        document.documentElement.classList.add('reduce-motion');
        localStorage.motionReduced = 'true';
    } else {
        document.documentElement.classList.remove('reduce-motion');
        localStorage.motionReduced = 'false';
    }
}

const showPreviousRole = () => {
    state.reducedMotionWordIndex = (state.reducedMotionWordIndex - 1 + heroRoles.length) % heroRoles.length;
}

const showNextRole = () => {
    state.reducedMotionWordIndex = (state.reducedMotionWordIndex + 1) % heroRoles.length;
}

const getContrastRatio = (foreground, background) => {
    const getLum = (hex) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance <= 0.03928 ? luminance / 12.92 : Math.pow((luminance + 0.055) / 1.055, 2.4);
    };
    const l1 = getLum(foreground);
    const l2 = getLum(background);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
};

const extractWordsFromPage = () => {
    const main = document.getElementById('main-content');
    if (!main) return [];

    // Clone the main content to manipulate without affecting the DOM
    const clone = main.cloneNode(true);
    
    // Remove script tags and non-display elements
    const scripts = clone.querySelectorAll('script, style, [aria-hidden="true"]');
    scripts.forEach(s => s.remove());

    // Get all text nodes
    const walker = document.createTreeWalker(
        clone,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let words = [];
    let node;
    while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        if (text.length > 0) {
            const nodeWords = text.split(/\s+/);
            words.push(...nodeWords);
        }
    }

    return words.filter(w => w.length > 0);
};

const wrapWordsInSpans = () => {
    allWords = extractWordsFromPage();
    wordSpans = [];
    const main = document.getElementById('main-content');
    
    if (!main) return;

    const walker = document.createTreeWalker(
        main,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    let wordCounter = 0;
    while (node = walker.nextNode()) {
        const words = node.textContent.split(/(\s+)/);
        const parent = node.parentNode;
        const fragment = document.createDocumentFragment();

        words.forEach((word, index) => {
            if (word.match(/\s+/)) {
                fragment.appendChild(document.createTextNode(word));
            } else if (word.length > 0) {
                const span = document.createElement('span');
                span.className = 'read-aloud-word';
                span.dataset.wordIndex = wordCounter;
                span.textContent = word;
                fragment.appendChild(span);
                wordSpans[wordCounter] = span;
                wordCounter++;
            }
        });

        parent.replaceChild(fragment, node);
    }
};

const highlightWord = (index) => {
    wordSpans.forEach((span, i) => {
        if (i === index) {
            span.style.backgroundColor = '#0A84FF';
            span.style.color = '#FFFFFF';
            span.style.padding = '0 2px';
            span.style.borderRadius = '2px';
            span.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            span.style.backgroundColor = '';
            span.style.color = '';
            span.style.padding = '';
            span.style.borderRadius = '';
        }
    });
};

const toggleReadAloud = () => {
    state.readAloud = !state.readAloud;

    if (state.readAloud) {
        wrapWordsInSpans();
        allWords = extractWordsFromPage();
        
        if (allWords.length === 0) {
            state.readAloud = false;
            return;
        }

        let currentIndex = 0;

        const speakWord = () => {
            if (currentIndex >= allWords.length || !state.readAloud) {
                state.readAloud = false;
                wordSpans.forEach(span => {
                    span.style.backgroundColor = '';
                    span.style.color = '';
                    span.style.padding = '';
                    span.style.borderRadius = '';
                });
                wordSpans = [];
                allWords = [];
                return;
            }

            // Highlight current word
            highlightWord(currentIndex);

            // Create utterance for current word
            const utterance = new SpeechSynthesisUtterance(allWords[currentIndex]);
            utterance.rate = 1.2;

            utterance.onend = () => {
                currentIndex++;
                // Speak next word after current finishes
                speakWord();
            };

            utterance.onerror = () => {
                currentIndex++;
                speakWord();
            };

            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        };

        speakWord();
    } else {
        speechSynthesis.cancel();
        wordSpans.forEach(span => {
            span.style.backgroundColor = '';
            span.style.color = '';
            span.style.padding = '';
            span.style.borderRadius = '';
        });
        wordSpans = [];
        allWords = [];
    }
};

let year = new Date().getFullYear();
onMounted(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    function typeWord() {
        if (state.motionReduced) return;
        const typingElement = document.getElementById("typing");
        if (!typingElement) return;
        if (charIndex < heroRoles[wordIndex].length) {
            currentWord += heroRoles[wordIndex].charAt(charIndex);
            typingElement.innerHTML = currentWord;
            charIndex++;
            setTimeout(typeWord, 100); // Adjust typing speed here
        } else {
            setTimeout(deleteWord, 1500); // Pause before deleting
        }
    }
    function deleteWord() {
        if (state.motionReduced) return;
        const typingElement = document.getElementById("typing");
        if (!typingElement) return;
        if (charIndex > 0) {
            currentWord = currentWord.slice(0, -1);
            typingElement.innerHTML = currentWord;
            charIndex--;
            setTimeout(deleteWord, 50); // Adjust deleting speed here
        } else {
            wordIndex = (wordIndex + 1) % heroRoles.length;
            setTimeout(typeWord, 500); // Pause before typing next word
        }
    }
    // Start the typing effect (skip if motion is already reduced)
    if (!state.motionReduced) typeWord();
    // Restart typing when motion is re-enabled
    watch(() => state.motionReduced, async (reduced) => {
        if (!reduced) {
            wordIndex = 0;
            charIndex = 0;
            currentWord = '';
            await nextTick();
            typeWord();
        }
    });
    const projects = document.querySelectorAll('.project-item');
    const loadMoreButton = document.getElementById('load-more');
    let visibleProjects = 3;
    // Hide all projects except the first three
    projects.forEach((project, index) => {
        if (index >= visibleProjects) {
            project.classList.add('hidden');
        }
    });
    loadMoreButton.addEventListener('click', function () {
        // Show three more projects
        const nextVisibleProjects = visibleProjects + 3;
        projects.forEach((project, index) => {
            if (index < nextVisibleProjects) {
                project.classList.remove('hidden');
            }
        });
        visibleProjects = nextVisibleProjects;
        // Hide the button if all projects are visible
        if (visibleProjects >= projects.length) {
            loadMoreButton.classList.add('hidden');
        }
    });
    const sections = document.querySelectorAll("[data-section]");
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Adjust this threshold as needed
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fadein");
                entry.target.classList.remove("opacity-0");
                observer.unobserve(entry.target);
            }
        });
    }, options);
    sections.forEach(section => {
        observer.observe(section);
    });
})
</script>
<template>
    <div class="z-10 fixed top-0 right-0 flex flex-col print:hidden" role="toolbar" aria-label="Display settings">
        <div v-if="toolbarButtonToggles.themeMode" class="relative group">
            <button type="button" @click="lightDarkMode"
                class="cursor-pointer hover:opacity-75 p-4 border-l-4 border-color-off-black"
                :class="[state.light ? 'bg-color-off-white' : 'bg-color-teal', { 'border-b-4': isLastToolbarButton('themeMode') }]"
                :aria-label="state.light ? 'Switch to dark mode' : 'Switch to light mode'"
                :aria-pressed="!state.light" aria-describedby="theme-toggle-tooltip">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8 lg:w-14 lg:h-14 text-color-off-black"
                    :class="state.light ? 'inline' : 'hidden'">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-8 h-8 lg:w-14 lg:h-14 text-color-off-white"
                    :class="state.light ? 'hidden' : 'inline'">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            </button>
            <span id="theme-toggle-tooltip" role="tooltip"
                class="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap bg-color-off-black text-color-off-white border-2 border-color-off-white px-3 py-2 text-sm font-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                {{ state.light ? 'Switch to dark mode' : 'Switch to light mode' }}
            </span>
        </div>

        <div v-if="toolbarButtonToggles.motion" class="relative group">
            <button type="button" @click="toggleMotion"
                class="cursor-pointer hover:opacity-75 p-4 border-l-4 border-color-off-black"
                :class="[state.light ? 'bg-color-off-white' : 'bg-color-teal', { 'border-b-4': isLastToolbarButton('motion') }]"
                :aria-label="state.motionReduced ? 'Enable motion' : 'Reduce motion'"
                :aria-pressed="state.motionReduced" aria-describedby="motion-toggle-tooltip">
                <!-- Sparkles: motion is active -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg> -->
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 lg:w-14 lg:h-14"
                    :class="[state.motionReduced ? 'hidden' : 'inline', state.light ? 'text-color-off-black' : 'text-color-off-white']">
                    <path d="M8 28C16 12 32 36 40 20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                    <line x1="10" y1="10" x2="38" y2="38" stroke="currentColor" stroke-width="3" />
                </svg>
                <!-- Pause: motion is reduced -->
                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                    >
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg> -->
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 lg:w-14 lg:h-14"
                    :class="[state.motionReduced ? 'inline' : 'hidden', state.light ? 'text-color-off-black' : 'text-color-off-white']">
                    <path d="M6 28C10 20 14 20 18 28C22 36 26 36 30 28C34 20 38 20 42 28" stroke="currentColor"
                        stroke-width="3" stroke-linecap="round" />
                </svg>
            </button>
            <span id="motion-toggle-tooltip" role="tooltip"
                class="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap bg-color-off-black text-color-off-white border-2 border-color-off-white px-3 py-2 text-sm font-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                {{ state.motionReduced ? 'Enable animations and transitions' : 'Reduce animations and transitions' }}
            </span>
        </div>

        <div v-if="toolbarButtonToggles.readAloud" class="relative group">
            <button type="button" @click="toggleReadAloud"
            class="cursor-pointer hover:opacity-75 p-4 border-l-4 border-color-off-black"
                :class="[state.light ? 'bg-color-off-white' : 'bg-color-teal', { 'border-b-4': isLastToolbarButton('readAloud') }]"
                :aria-label="state.readAloud ? 'Stop reading' : 'Read page aloud'"
                :aria-pressed="state.readAloud" aria-describedby="read-aloud-tooltip">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 lg:w-14 lg:h-14"
                    :class="state.light ? 'text-color-off-black' : 'text-color-off-white'">
                    <path d="M12 14L6 18v12l6 4V14Z" fill="currentColor" />
                    <path d="M18 12v24" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    <path d="M24 10v28" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    <path d="M30 8v32" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
            </button>
            <span id="read-aloud-tooltip" role="tooltip"
                class="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap bg-color-off-black text-color-off-white border-2 border-color-off-white px-3 py-2 text-sm font-primary opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                {{ state.readAloud ? 'Stop reading page' : 'Read page aloud' }}
            </span>
        </div>
    </div>
    <main id="main-content">
        <!-- Hero Section -->
        <section id="hero" aria-labelledby="hero-heading"
            class="relative flex items-center justify-center h-screen bg-color-yellow">
            <div class="relative px-6 md:px-12 w-full max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out"
                data-section>
                <h1 id="hero-heading"
                    class="font-secondary text-5xl md:text-6xl lg:text-7xl font-extrabold text-color-off-black mb-8 drop-shadow-md"
                    aria-label="Hey, I'm Jason Atkinson">
                    Hey, <span class="emjo animate-wave inline-block" aria-hidden="true">👋</span> I'm <span
                        class="text-color-off-black">Jason
                        <span class="hidden xl:inline">Atkinson</span></span>
                </h1>
                <p class="font-primary text-xl md:text-2xl lg:text-4xl font-bold text-color-off-black mb-16 drop-shadow-md"
                    aria-label="Accessibility Specialist, Developer, Designer, Artist, Creative Coder, Problem Solver">
                    <span class="hero-roles-print">_____ {{ heroRoles.join(', ') }}</span>
                    <template v-if="!state.motionReduced">
                        <span class="hero-roles-screen">_____ <span id="typing"></span> <span
                            class="inline-block w-[4px] h-[40px] bg-color-off-black animate-blink align-bottom"> </span>
                        </span>
                    </template>
                    <template v-else>
                        <span class="hero-roles-screen">_____ {{ heroRoles[state.reducedMotionWordIndex] }}</span>
                        <div class="hero-roles-screen mt-4 flex items-center gap-3">
                            <button type="button"
                                class="font-secondary px-4 py-2 text-base font-bold text-color-off-white bg-color-off-black border-2 border-color-off-black rounded-md hover:opacity-85 transition-all"
                                aria-label="Show previous role" @click="showPreviousRole">
                                Back
                            </button>
                            <button type="button"
                                class="font-secondary px-4 py-2 text-base font-bold text-color-off-white bg-color-off-black border-2 border-color-off-black rounded-md hover:opacity-85 transition-all"
                                aria-label="Show next role" @click="showNextRole">
                                Next
                            </button>
                        </div>
                    </template>
                </p>
                <p class="font-primary text-lg md:text-xl text-color-off-black mb-8">
                    Based in the UK — Exploring how accessibility, design, and technology can create better experiences
                    for everyone.
                </p>
                <div class="flex gap-8 mb-8">
                    <a href="#about"
                        class="font-secondary inline-block hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-off-black border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
                        aria-label="Learn more about me">
                        Learn More
                    </a>
                </div>
            </div>
        </section>
        <!-- About Section -->
        <section id="about" aria-labelledby="about-heading" class="py-16 px-6 md:px-12 bg-color-red">
            <div class="max-w-6xl mx-auto flex flex-col lg:flex-row opacity-0 transition-opacity duration-1000 ease-in-out"
                data-section>
                <div
                    class="bg-color-off-white text-color-off-black text-left p-12 lg:flex-1 order-last lg:order-first lg:transition-transform lg:transform cursor-default z-20">
                    <h2 id="about-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-6">
                        <!-- Who Am I? -->
                        Who I am
                    </h2>
                    <hr
                        class="h-[3px] w-[130px] mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
                    <!-- <p class="font-primary text-sm md:text-sm mb-6">
                    I'm an Accessibility Specialist at Medway Council, where I work to make digital
                    services inclusive and usable for everyone. With a background in web development and design spanning
                    over 10 years professionally and nearly 20 years coding for fun, I bring a technical depth to
                    accessibility that bridges the gap between standards, empathy, and implementation.
                </p>
                <p class="font-primary text-sm md:text-sm mb-6">
                    My expertise includes WCAG compliance, assistive technology testing, inclusive design, and
                    accessibility auditing — alongside hands-on development skills in JavaScript, PHP, Python, Vue,
                    and more.
                </p>
                <p class="font-primary text-sm md:text-sm mb-6">
                    I've contributed to projects across <span class="emjo inline">🏥</span> Medical, <span
                        class="emjo inline">📈</span> Marketing, <span class="emjo inline">🛡️</span> InsurTech, <span
                        class="emjo inline">📅</span> Reservation, <span class="emjo inline">🏢</span>
                    Co-working, <span class="emjo inline-block">🛒</span> E-commerce, <span
                        class="emjo inline">📚</span>
                    eLearning, and the <span class="emjo inline">🏛️</span> Public Sector — at every stage from
                    startups to established enterprises.
                </p>
                <p class="font-primary text-sm md:text-sm mb-6">
                    Collaboration is central to everything I do. I'm as comfortable running accessibility workshops and
                    reviews as I am writing code, and I've worked alongside stakeholders, founders, marketers,
                    designers, SEO specialists, learning experts, and fellow developers. My natural curiosity means I'm
                    always learning and growing. <span class="emjo inline">🌱</span>
                </p> -->
                    <p class="font-primary mb-6">
                        I’m an Accessibility Specialist at Medway Council, helping create digital services that are
                        accessible,
                        usable, and inclusive by design.
                    </p>
                    <p class="font-primary mb-6">
                        My background spans design, development, and accessibility, with over 10 years working
                        professionally in
                        web development and more than 20 years building things online out of curiosity and creativity.
                    </p>
                    <p class="font-primary mb-6">
                        I work across polcies, strategy, audits, remediation, and technical implementation — through
                        workshops,
                        training and 1-2-1 sessions I helping bridge the gap between accessibility guidance and
                        real-world
                        delivery.
                    </p>
                    <p class="font-primary mb-6">
                        Over the years, I’ve worked across e-commerce, marketing, e-learning, and the public sector
                        using
                        technologies including JavaScript, PHP, and Python.
                    </p>
                    <p class="font-primary mb-6">
                        I’m not actively looking for new roles, but I’m always open to conversations around
                        accessibility,
                        inclusive design, and the future of the web.
                    </p>
                </div>
                <div class="bg-color-teal p-6 lg:flex-1 relative order-first lg:order-last h-[500px] lg:h-auto z-10">
                    <img :src="profileImage" alt="Profile Image Of Jason Atkinson"
                        class="absolute inset-0 w-full h-full object-cover">
                </div>
            </div>
        </section>
        <!-- Services Section -->
        <section id="services" aria-labelledby="services-heading" class="py-16 px-6 md:px-12 bg-color-off-white">
            <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
                <h2 id="services-heading"
                    class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-center text-color-off-black">
                    <!-- Services -->
                    What I do
                </h2>
                <hr
                    class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black">
                <div class="mb-12">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <!-- Accessibility Consulting Section -->
                        <div
                            class="p-6 border-4 border-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                            <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">♿</div>
                            <h3 class="font-secondary text-2xl font-semibold text-color-off-black mb-4 text-center">
                                Accessibility Strategy & Guidance
                            </h3>
                            <p class="font-primary text-center">
                                Helping teams build accessibility into products, processes, and decision-making through
                                audits,
                                workshops, reviews, and practical guidance.
                            </p>
                        </div>
                        <!-- Development Section -->
                        <div
                            class="p-6 border-4 border-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                            <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">💻</div>
                            <h3 class="font-secondary text-2xl font-semibold text-color-off-black mb-4 text-center">
                                Accessible Front-end Development
                            </h3>
                            <p class="font-primary text-center">
                                Building and improving accessible interfaces with semantic HTML, thoughtful interaction
                                design,
                                and accessibility-first development practices.
                            </p>
                        </div>
                        <!-- Fullstack Development Section -->
                        <div
                            class="p-6 border-4 border-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                            <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">🔧</div>
                            <h3 class="font-secondary text-2xl font-semibold text-color-off-black mb-4 text-center">
                                Design & Delivery Support
                            </h3>
                            <p class="font-primary text-center">
                                Working across design and development teams to turn accessibility requirements into
                                practical,
                                usable solutions.
                            </p>
                        </div>
                        <!-- Design Section -->
                        <div
                            class="p-6 border-4 border-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                            <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">🎨</div>
                            <h3 class="font-secondary text-2xl font-semibold text-color-off-black mb-4 text-center">
                                Inclusive Design Thinking
                            </h3>
                            <p class="font-primary text-center">
                                Supporting teams in creating experiences that work better for a wider range of people,
                                devices,
                                and assistive technologies.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Projects -->
        <section id="projects" aria-labelledby="projects-heading" class="py-16 px-6 md:px-12 bg-color-off-black">
            <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
                <h2 id="projects-heading"
                    class="font-secondary text-3xl md:text-4xl font-bold mb-6 text-center text-color-off-white">Projects
                    I've
                    worked on
                </h2>
                <hr
                    class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-white text-color-off-white bg-color-off-white" />
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧭</span>
                                Strategy @
                                Medway</h3>
                            <p class="font-primary mb-6 text-sm">Led the design of Medway Council’s digital
                                accessibility and
                                inclusion strategy, working across teams to define structure, roles, and a long-term
                                approach to
                                accessible services.</p>
                            <p class="font-primary text-xs">
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">User
                                    Research</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public
                                    Sector</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Strategy</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Team
                                    Design</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">📜</span>
                                Policy @
                                Medway</h3>
                            <p class="font-primary mb-6 text-sm">Improved and expanded internal accessibility policies
                                to better
                                support compliance, consistency, and inclusive delivery across the organisation.</p>
                            <p class="font-primary text-xs">
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Accessibility</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Policy</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public
                                    Sector</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧪</span>
                                Empathy
                                Lab @ Medway</h3>
                            <p class="font-primary mb-6 text-sm">Designed and facilitated guided “Empathy Lab” sessions
                                to help
                                teams understand accessibility barriers through structured, hands-on experiences—while
                                clearly
                                framing the limits of simulation vs lived experience.</p>
                            <p class="font-primary text-xs">
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Accessibility</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Assistive
                                    Technology</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Inclusive
                                    Design</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Workshops</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public
                                    Sector</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧰</span>
                                Toolkit @
                                Medway</h3>
                            <p class="font-primary mb-6 text-sm">Created a practical accessibility toolkit enabling
                                teams to
                                deliver accessible content independently, covering WCAG, assistive tech, documents, and
                                inclusive communication.</p>
                            <p class="font-primary text-xs">
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">WCAG</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Documentation</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Training</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Accessibility</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public
                                    Sector</span>
                            </p>
                        </div>
                    </div>
                    <!-- EmergeOne -->
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Meta" alt="Meta" class="w-16 h-16 mb-4 bg-white">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                Meta @
                                Sponge</h3>
                            <p class="font-primary mb-6 text-sm">Worked on the frontend for their e-learning material
                                targeted
                                at
                                developers.</p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Google" alt="Google" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                Google @
                                Sponge</h3>
                            <p class="font-primary mb-6 text-sm">Built the landing page and language selector theme for
                                all
                                courses
                                produced by Sponge.</p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Lego" alt="Lego" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                Lego @
                                Sponge</h3>
                            <p class="font-primary mb-6 text-sm">Developed the landing page and language selector theme
                                for all
                                courses
                                produced by Sponge.
                            </p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="NCSC" alt="NCSC" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                NCSC @
                                Sponge</h3>
                            <p class="font-primary mb-6 text-sm">Contributed to the <a
                                    href="https://www.ncsc.gov.uk/cyberfirst/overview"
                                    class="underline hover:text-color-teal">CyberFirst programme</a>, including
                                maintenance
                                and improvements
                                of the <a href="https://www.ncsc.gov.uk/collection/cybersprinters"
                                    class="underline hover:text-color-teal">CyberSrpinters</a> game, and development of
                                <a href="https://www.ncsc.gov.uk/collection/cyberfirstnavigators"
                                    class="underline hover:text-color-teal">CyberFirst Navigators</a>.</p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">StencilJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="DVSA" alt="DVSA" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                DVSA @
                                Sponge</h3>
                            <p class="font-primary mb-6 text-sm">
                                Worked on the <a href="https://www.safedrivingforlife.info/">safe driving for life
                                    platform</a>;
                                Implementing multi-learner access for companies, performing maintenance and upgrades,
                                improving accessibility on <a
                                    href="https://www.safedrivingforlife.info/free-practice-tests/practice-theory-test-for-approved-driving-instructors-1-of-2/"
                                    class="underline hover:text-color-teal transition-all">practive theory tests</a>,
                                creating a <a
                                    href="https://www.safedrivingforlife.info/driving-instructor-suitability-assessment/"
                                    class="underline hover:text-color-teal transition-all">driver instructore
                                    suitability
                                    assessment</a>
                                and
                                collaborating on the other courses such as <a
                                    href="https://www.safedrivingforlife.info/ridefree/"
                                    class="underline hover:text-color-teal transition-all">ridefree</a>.
                            </p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Python</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Django</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Wagtail
                                    CMS</span> <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Docker</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">GitHub
                                    Actions</span> <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Google
                                    Cloud</span> <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Agile</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Snap" alt="Snap Inc" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧑‍🏫</span>
                                Snap
                                Inc @ Sponge
                            </h3>
                            <p class="font-primary mb-6 text-sm">Served as a technical consultant for the e-learning
                                material
                                related to
                                Snaps, Lens Studio
                                software.</p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Communication</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Collaboration</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="AstraZeneca" alt="AstraZeneca" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                AstraZeneca @ Sponge
                            </h3>
                            <p class="font-primary mb-6 text-sm">Developed compliance learning modules distributed
                                annually to
                                all
                                employees.</p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="RedBull" alt="Red Bull" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                Red Bull @
                                Sponge
                            </h3>
                            <p class="font-primary mb-6 text-sm">Updated training materials provided to their retail
                                sales team.
                            </p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                            </p>
                        </div>
                    </div>
                    <div
                        class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                        <img :src="Perkbox" alt="Perkbox" class="w-16 h-16 mb-4">
                        <div>
                            <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span>
                                <span class="emjo inline">🔧</span> Perkbox @ Rock Mission</h3>
                            <p class="font-primary mb-6 text-sm">Developed an engagement awards platform for top HR
                                professionals.</p>
                            <p class="font-primary text-xs"><span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">PHP</span>
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">WordPress</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-8">
                    <button id="load-more"
                        class="font-secondary hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-teal border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
                        aria-label="Load more projects">
                        Load More
                    </button>
                </div>
            </div>
        </section>
        <!-- Skills Section -->
        <section id="skills" aria-labelledby="skills-heading" class="py-16 px-6 md:px-12 bg-color-yellow">
            <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
                <h2 id="skills-heading"
                    class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-center text-color-off-black">
                    Areas of focus
                </h2>
                <hr
                    class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    <aside class="lg:col-span-4 relative overflow-hidden border-4 border-color-off-black bg-color-off-black p-8">
                        <div aria-hidden="true" class="absolute -right-10 -top-10 w-32 h-32 rotate-12 bg-color-teal opacity-40"></div>
                        <div aria-hidden="true" class="absolute -left-8 bottom-8 w-24 h-24 rotate-12 bg-color-red opacity-50"></div>

                        <div class="relative">
                            <p class="font-secondary text-xs tracking-[0.2em] text-color-yellow mb-4">FOCUS MAP</p>
                            <h3 class="font-secondary text-3xl leading-tight text-color-off-white mb-4">
                                Strategy that ships. Delivery that includes everyone.
                            </h3>
                            <p class="font-primary text-color-off-white mb-8">
                                I work where policy, product, and code meet. The goal is always the same: practical accessibility, not just checklists.
                            </p>

                            <div class="space-y-3" aria-label="Core strengths snapshot">
                                <p class="font-primary text-color-off-black bg-color-yellow px-4 py-2 border-2 border-color-yellow">Audits to action plans</p>
                                <p class="font-primary text-color-off-black bg-color-off-white px-4 py-2 border-2 border-color-off-white">Design to implementation</p>
                                <p class="font-primary text-color-off-black bg-color-teal px-4 py-2 border-2 border-color-teal">Teams to shared standards</p>
                            </div>
                        </div>
                    </aside>

                    <div class="lg:col-span-8 space-y-4">
                        <article class="relative border-4 border-color-off-black bg-color-off-white p-5 lg:p-6 lg:transition-transform lg:transform lg:hover:translate-x-1">
                            <span class="font-secondary absolute -top-3 left-4 bg-color-yellow border-2 border-color-off-black px-3 py-1 text-sm">01</span>
                            <h3 class="font-secondary text-2xl text-color-off-black mt-4 mb-3">Accessibility</h3>
                            <p class="font-primary text-color-off-black">
                                
                                <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">WCAG audits</span>
                                    <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">accessibility strategy</span> 
                                    <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">assistive technology testing</span> 
                                    <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">inclusive design</span>
                                    <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">accessibility reviews</span> 
                                    <span
                                    class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">remediation support</span>
                                </p>
                        </article>

                        <article class="relative border-4 border-color-off-black bg-color-teal p-5 lg:p-6 lg:transition-transform lg:transform lg:hover:translate-x-1">
                            <span class="font-secondary absolute -top-3 left-4 bg-color-off-white border-2 border-color-off-black px-3 py-1 text-sm">02</span>
                            <h3 class="font-secondary text-2xl text-color-off-white mt-4 mb-3">Design & Development</h3>
                            <p class="font-primary text-color-off-white">
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Semantic HTML</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Design Systems</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Front-end Architecture</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Responsive Interfaces</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Performance</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Component-based Development</span>
                            </p>
                        </article>

                        <article class="relative border-4 border-color-off-black bg-color-red p-5 lg:p-6 lg:transition-transform lg:transform lg:hover:translate-x-1">
                            <span class="font-secondary absolute -top-3 left-4 bg-color-yellow border-2 border-color-off-black px-3 py-1 text-sm">03</span>
                            <h3 class="font-secondary text-2xl text-color-off-white mt-4 mb-3">Collaboration & Delivery</h3>
                            <p class="font-primary text-color-off-white">
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Workshop Facilitation</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Cross-team Collaboration</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Documentation</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Mentoring</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">User-centred Thinking</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Communication</span>
                            </p>
                        </article>

                        <article class="relative border-4 border-color-off-black bg-color-yellow p-5 lg:p-6 lg:transition-transform lg:transform lg:hover:translate-x-1">
                            <span class="font-secondary absolute -top-3 left-4 bg-color-off-black text-color-off-white border-2 border-color-off-black px-3 py-1 text-sm">04</span>
                            <h3 class="font-secondary text-2xl text-color-off-black mt-4 mb-3">Technologies</h3>
                            <p class="font-primary text-color-off-black">
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">JavaScript</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">TypeScript</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">Vue</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">React</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">Node.js</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">Python</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">Django</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">PHP</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">Docker</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">GitHub Actions</span>
                                <span class="tag inline-block mb-2 text-xs text-color-off-black bg-color-off-white px-2 py-1 rounded mr-2">Google Cloud</span>
                            </p>
                        </article>
                    </div>
                </div>
            </div>


                    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-12"> -->
                    <!-- Frontend -->
                    <!-- <div class="p-6">
                    <h3 class="font-secondary text-xl font-semibold mb-6 text-color-off-black"><span class="emjo text-2xl mr-2">💻</span>Frontend</h3>
                    <div class="flex flex-wrap gap-3 bg-color-off-white p-6">
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Vue.js</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">TypeScript</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">JavaScript</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">React</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">HTML5</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">CSS3</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Tailwind CSS</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Sass</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Responsive Design</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Accessibility (a11y)</span>
                    </div>
                </div> -->

                    <!-- Backend -->
                    <!-- <div class="p-6">
                    <h3 class="font-secondary text-xl font-semibold mb-6 text-color-off-black"><span class="emjo text-2xl mr-2">⚙️</span>Backend</h3>
                    <div class="flex flex-wrap gap-3 bg-color-off-white p-6">
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Node.js</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Python</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Django</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">PHP</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">PostgreSQL</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">MySQL</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">RESTful APIs</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">GraphQL</span>
                    </div>
                </div> -->

                    <!-- Tools & DevOps -->
                    <!-- <div class="p-6">
                    <h3 class="font-secondary text-xl font-semibold mb-6 text-color-off-black"><span class="emjo text-2xl mr-2">🛠️</span>Tools & DevOps</h3>
                    <div class="flex flex-wrap gap-3 bg-color-off-white p-6">
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Git & GitHub</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Docker</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">GitHub Actions</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Google Cloud</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Wagtail CMS</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">WordPress</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Vite</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">npm & yarn</span>
                    </div>
                </div> -->

                    <!-- Professional Skills -->
                    <!-- <div class="p-6 md:col-span-3">
                    <h3 class="font-secondary text-xl font-semibold mb-6 text-color-off-black"><span class="emjo text-2xl mr-2">🎯</span>Professional Skills</h3>
                    <div class="flex flex-wrap gap-3 bg-color-off-white p-6">
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Accessibility Strategy</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-poi">WCAG Compliance</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">User Research</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Workshop Facilitation</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Inclusive Design</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Assistive Technology Testing</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Communication</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Collaboration</span>
                        <span class="inline-block bg-color-off-black text-color-off-white px-4 py-2 rounded-md text-sm font-primary lg:transition-transform lg:transform lg:hover:scale-110 lg:hover:shadow-md cursor-pointer">Problem Solving</span>
                    </div>
                </div> -->
                    <!-- </div> -->
      
        </section>
        <!-- Recommendations Section -->
        <section id="testimonials" aria-labelledby="testimonials-heading"
            class="py-16 px-6 md:px-12 bg-color-off-white">
            <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
                <h2 id="testimonials-heading"
                    class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-black text-center">Recommendations
                </h2>
                <hr
                    class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
                <div class="lg:flex lg:space-x-6 space-y-6 lg:space-y-0 mb-6">
                    <!-- 1 -->
                    <div
                        class="testimonial-item p-6 border-4 border-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                        <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                        <div class="text-base flex flex-col justify-between h-full">
                            <div class="flex items-start mb-8 pt-5 pl-6 relative">
                                <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                        class="text-color-red">"</span></p>
                                <div>
                                    <p class="font-secondary text-color-off-black font-bold text-2xl">
                                        Excellent communicator with great time management.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <img :src="FemaleProfile1" alt="" class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                                <p class="font-primary text-color-off-black text-center">Project Manager</p>
                            </div>
                        </div>
                    </div>
                    <!-- 
Ermira Kurti
Project Manager at Sponge
"Excellent communicator with great time management skills."
Source: "Jason has outstanding communication skills and excellent approach to time management."
-->
                    <!-- 2 -->
                    <div
                        class="testimonial-item p-6 border-4 border-color-red lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                        <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                        <div class="text-base flex flex-col justify-between h-full">
                            <div class="flex items-start mb-8 pt-5 pl-6 relative">
                                <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                        class="text-color-yellow">"</span>
                                </p>
                                <div>
                                    <p class="font-secondary text-color-off-black font-bold text-2xl">
                                        Dedicated, positive, and always eager to learn.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <img :src="FemaleProfile2" alt="" class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                                <p class="font-primary text-color-off-black text-center"><!--Engineering--> Operations
                                    Manager
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--
Ema Spry
Work-Life Strategist | Virtual Assistance | Workplace Support
"Dedicated, positive, and always eager to learn."
Source: "Jason brings dedication, positivity, and a willingness to learn to everything he does."
"He approaches challenges with enthusiasm and determination."
Source: "Regardless of the challenges or complexities of a project, Jason approaches them with enthusiasm and determination."
"Jason is open to feedback and continuously improving."
Source: "One of Jason's most admirable traits is his openness to feedback... welcoming constructive criticism as a means to enhance his skills and expertise."
-->

                    <!-- 3 -->
                    <div
                        class="testimonial-item p-6 border-4 border-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                        <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                        <div class="text-base flex flex-col justify-between h-full">
                            <div class="flex items-start mb-8 pt-5 pl-6 relative">
                                <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                        class="text-color-red">"</span></p>
                                <div>
                                    <p class="font-secondary text-color-off-black font-bold text-2xl">
                                        A professional, driven individual with great ideas.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <img :src="FemaleProfile3" alt="" class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                                <p class="font-primary text-color-off-black text-center">Human Resources Generalist</p>
                            </div>
                        </div>
                    </div>
                    <!--
Jade Tiller
Human Resources Generalist
"His passion and creativity shine through in every group."
Source: "His passion in social groups and committees are outstanding and he always has ideas to share."
"A professional, driven individual with great ideas."
Source: "Jason is a very professional and driven individual, always eager to learn more and develop his skills."   
-->
                    <!-- 4 -->
                    <div
                        class="testimonial-item p-6 border-4 border-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                        <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                        <div class="text-base flex flex-col justify-between h-full">
                            <div class="flex items-start mb-8 pt-5 pl-6 relative">
                                <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                        class="text-color-red">"</span></p>
                                <div>
                                    <p class="font-secondary text-color-off-black font-bold text-2xl">
                                        Dependable, creative, and passionate.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <img :src="MaleProfile1" alt="" class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                                <p class="font-primary text-color-off-black text-center">Senior Software Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-12">
                    <a href="https://www.linkedin.com/in/mejasonatkinson/details/recommendations/"
                        class="font-primary underline hover:text-color-teal transition-all" target="_blank">Read the
                        full
                        recommendations on my LinkedIn</a>
                </div>
            </div>
            <!--
Ian Luckraft
Senior Software Engineer at Surfline/Wavetrak
"Jason is dependable, creative, and passionate."
Source: "He is very dependable and extremely willing to learn... In addition to delivering technical solutions Jason is able to offer up creative solutions..."
"Impressive presentation skills and technical expertise."
Source: "I was also hugely impressed with Jason’s presentation skills when attending a session he had prepared and delivered..."
"Jason ensures inclusivity in all teams he’s part of."
Source: "He has a strong passion for ensuring inclusivity within both the immediate and wider teams."    
-->
        </section>
        <!-- Contact Form Section -->
        <section id="contact" aria-labelledby="contact-heading" class="py-16 px-6 md:px-12 bg-color-red">
            <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
                <h2 id="contact-heading"
                    class="font-secondary text-3xl md:text-4xl font-bold mb-6 text-center text-color-off-white">
                    Get in Touch
                </h2>
                <hr
                    class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-white text-color-off-white bg-color-off-white" />
                <p class="font-primary text-color-off-white text-center max-w-2xl mx-auto mb-12">
                    Want to collaborate, ask a question, or start a conversation about accessibility? Send me a message below.
                </p>

                <div class="max-w-2xl mx-auto relative overflow-hidden border-4 border-color-off-white p-6 md:p-8 bg-color-off-white">
                    <div aria-hidden="true" class="hidden md:block absolute -top-6 -right-6 w-32 h-32 rotate-12 bg-color-red opacity-20"></div>

                    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field"
                        action="/#contact" class="relative space-y-6" aria-describedby="contact-form-help">
                        <input type="hidden" name="form-name" value="contact" />
                        <p class="hidden">
                            <label>
                                Do not fill this field if you are human:
                                <input name="bot-field" />
                            </label>
                        </p>

                        <p id="contact-form-help" class="font-primary text-sm text-color-off-black">
                            All fields are required.
                        </p>

                        <div>
                            <label for="contact-name" class="block font-secondary text-color-off-black font-semibold mb-2">Name <span aria-label="required">*</span></label>
                            <input id="contact-name" name="name" type="text" required autocomplete="name"
                                class="w-full border-2 border-color-red px-4 py-3 font-primary text-color-off-black bg-color-off-white focus:outline-none" />
                        </div>

                        <div>
                            <label for="contact-email" class="block font-secondary text-color-off-black font-semibold mb-2">Email <span aria-label="required">*</span></label>
                            <input id="contact-email" name="email" type="email" required autocomplete="email"
                                class="w-full border-2 border-color-red px-4 py-3 font-primary text-color-off-black bg-color-off-white focus:outline-none" />
                        </div>

                        <div>
                            <label for="contact-subject" class="block font-secondary text-color-off-black font-semibold mb-2">Subject <span aria-label="required">*</span></label>
                            <input id="contact-subject" name="subject" type="text" required
                                class="w-full border-2 border-color-red px-4 py-3 font-primary text-color-off-black bg-color-off-white focus:outline-none" />
                        </div>

                        <div>
                            <label for="contact-message" class="block font-secondary text-color-off-black font-semibold mb-2">Message <span aria-label="required">*</span></label>
                            <textarea id="contact-message" name="message" rows="6" required
                                class="w-full border-2 border-color-red px-4 py-3 font-primary text-color-off-black bg-color-off-white focus:outline-none"></textarea>
                        </div>

                        <button type="submit"
                            class="font-secondary px-6 py-3 text-lg font-bold text-color-off-white border-2 border-color-red bg-color-red rounded-md hover:opacity-85 transition-all w-full">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>

        <!-- Social Media Section -->
        <section id="social" aria-labelledby="social-heading" class="py-16 px-6 md:px-12 bg-color-teal">
            <div class="max-w-6xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
                <h2 id="social-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-color-off-white">
                    Elsewhere on the Web
                </h2>
                <hr
                    class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-white text-color-off-white bg-color-off-white" />
                <div class="flex justify-center gap-8">
                    <ul class="flex space-x-6" role="list">
                        <li class="inline lg:flex-1"><a href="https://x.com/mejasonatkinson"
                                class="fa fa-2x fa-brands fa-x-twitter text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                                target="_blank" rel="noopener noreferrer" aria-label="Visit my X / Twitter profile"></a></li>
                        <li class="inline lg:flex-1"><a href="https://www.instagram.com/mejasonatkinson/"
                                class="fa fa-2x fa-brands fa-instagram text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                                target="_blank" rel="noopener noreferrer" aria-label="Visit my Instagram profile"></a></li>
                        <li class="inline lg:flex-1"><a href="https://uk.linkedin.com/in/mejasonatkinson"
                                class="fa fa-2x fa-brands fa-linkedin text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                                target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile"></a></li>
                        <li class="inline lg:flex-1"><a href="https://github.com/mejasonatkinson/"
                                class="fa fa-2x fa-brands fa-github text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                                target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile"></a></li>
                        <!-- <li class="inline lg:flex-1"><a href="mailto:me@jasonatkinson.co.uk"
                                class="fa fa-2x fa-envelope text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                                aria-label="Send me an email"></a>
                        </li> -->
                    </ul>
                </div>
            </div>
        </section>
    </main>
    <!-- Footer -->
    <footer class="py-8 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-4xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <p class="font-primary mb-2">&copy; {{ year }} Jason Atkinson. All rights reserved.</p>
            <p class="font-primary">
                <!-- Designed and developed by Jason Atkinson -->
                Built with accessibility and curiosity in mind
                | <a href="https://github.com/mejasonatkinson/project-profile-home-2025" target="_blank"
                    class="underline hover:text-color-teal transition-all">View on GitHub</a>
            </p>
        </div>
    </footer>
</template>