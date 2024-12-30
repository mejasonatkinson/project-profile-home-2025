<script setup>
import { onMounted } from 'vue';
import { reactive } from 'vue';

import Me from '@/assets/images/me/me.png';

import AstraZeneca from '@/assets/images/company-logos/AstraZeneca.jpg';
import DVSA from '@/assets/images/company-logos/DVSA.png';
import Google from '@/assets/images/company-logos/google.jpg';

import Lego from '@/assets/images/company-logos/Lego.png';
import Meta from '@/assets/images/company-logos/Meta.png';
import NCSC from '@/assets/images/company-logos/NCSC.jpg';

import Perkbox from '@/assets/images/company-logos/Perkbox.png';
import RedBull from '@/assets/images/company-logos/redbull.jpg';
import Snap from '@/assets/images/company-logos/snap.jpg';

import RockMission from '@/assets/images/company-logos/rockmission.jpg';
import Sponge from '@/assets/images/company-logos/sponge.jpg';

import MaleProfile from '@/assets/images/recommendations/m.png';
import FemaleProfile from '@/assets/images/recommendations/f.png';

const state = reactive({
    light: true,
});
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    state.light = false;
} else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light'
    state.light = true;
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
let year = new Date().getFullYear();
onMounted(() => {
    const words = ["Developer", "Designer", "Artist", "Creative Coder", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    const typingElement = document.getElementById("typing");
    function typeWord() {
        if (charIndex < words[wordIndex].length) {
            currentWord += words[wordIndex].charAt(charIndex);
            typingElement.innerHTML = currentWord;
            charIndex++;
            setTimeout(typeWord, 100); // Adjust typing speed here
        } else {
            setTimeout(deleteWord, 1500); // Pause before deleting
        }
    }
    function deleteWord() {
        if (charIndex > 0) {
            currentWord = currentWord.slice(0, -1);
            typingElement.innerHTML = currentWord;
            charIndex--;
            setTimeout(deleteWord, 50); // Adjust deleting speed here
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeWord, 500); // Pause before typing next word
        }
    }
    // Start the typing effect
    typeWord();
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
    <span :onclick="lightDarkMode" class="z-10 fixed top-0 right-0 cursor-pointer hover:opacity-75 p-4 print:hidden"
        :class="state.light ? 'bg-color-off-white' : 'bg-color-teal'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-8 h-8 lg:w-14 lg:h-14 text-color-off-black" :class="state.light ? 'inline' : 'hidden'">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-8 h-8 lg:w-14 lg:h-14 text-color-off-white" :class="state.light ? 'hidden' : 'inline'">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
    </span>
    <!-- Hero Section -->
    <section id="hero" class="relative flex items-center justify-center h-screen bg-color-yellow">
        <div class="relative px-6 md:px-12 w-full max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-color-off-white mb-8 drop-shadow-md"
                aria-label="Hey, I'm Jason Atkinson">
                Hey, <span class="emjo animate-wave inline-block" aria-hidden="true">👋</span> I'm <span
                    class="text-color-red">Jason
                    <span class="hidden xl:inline">Atkinson</span></span>
            </h1>
            <p class="text-xl md:text-2xl lg:text-4xl font-bold text-color-teal mb-16 drop-shadow-md"
                aria-label="Developer, Designer, Artist, Creative Coder, Problem Solver">
                _____ <span id="typing"></span> <span
                    class="inline-block w-[4px] h-[40px] bg-color-teal animate-blink align-bottom"> </span>
            </p>
            <p class="text-lg md:text-xl text-color-off-black mb-8">
                Based in the UK — Exploring the future of technology, design, learning, diversity and creativity.
            </p>
            <div class="flex gap-8 mb-8">
                <a href="#about"
                    class="inline-block hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-teal border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
                    aria-label="Learn more about me">
                    Learn More
                </a>
            </div>
        </div>
    </section>
    <!-- About Section -->
    <section id="about" class="py-16 px-6 md:px-12 bg-color-red">
        <div class="max-w-6xl mx-auto flex flex-col lg:flex-row opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <div
                class="bg-color-off-white text-color-off-black text-left p-12 lg:flex-1 order-last lg:order-first lg:transition-transform lg:transform cursor-default z-20">
                <h2 class="text-3xl md:text-4xl font-bold mb-6">Who Am I?</h2>
                <hr
                    class="h-[3px] w-[130px] mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
                <p class="text-sm md:text-sm mb-6">
                    With over 10 years of experience and nearly 20 years of coding for fun, I’ve developed a robust set
                    of skills
                    and
                    a love for solving problems!
                </p>
                <p class="text-sm md:text-sm mb-6">
                    My expertise spans JavaScript, PHP, and Python, along with various frameworks,
                    libraries, and more.
                </p>
                <p class="text-sm md:text-sm mb-6">
                    I’m comfortable working in diverse environments—whether it’s in-person, hybrid, or remote. I’ve
                    contributed to
                    projects in various industries, including <span class="emjo inline">🏥</span> Medical, <span
                        class="emjo inline">📈</span> Marketing, <span class="emjo inline">🛡️</span> InsurTech, <span
                        class="emjo inline">📅</span> Reservation, <span class="emjo inline">🏢</span>
                    Co-working, <span class="emjo inline-block">🛒</span> E-commerce, <span
                        class="emjo inline">📚</span>
                    eLearning, and the <span class="emjo inline">🏛️</span> Public Sector. My experience
                    covers
                    companies at
                    different stages, from startups and early years to growth and established enterprises.
                </p>
                <p class="text-sm md:text-sm mb-6">
                    Collaboration is key to my work. I’ve teamed up with stakeholders, founders, marketers, designers,
                    SEO and
                    social media specialists, learning experts, and fellow developers. My natural curiosity drives me to
                    continuously learn and grow. <span class="emjo inline">🌱</span>
                </p>
            </div>
            <div class="bg-color-teal p-6 lg:flex-1 relative order-first lg:order-last h-[500px] lg:h-auto z-10">
                <img :src="Me" alt="Profile Image Of Jason Atkinson"
                    class="absolute inset-0 w-full h-full object-cover">
            </div>
        </div>
    </section>
    <!-- Services Section -->
    <section id="services" class="py-16 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center text-color-off-black">Services</h2>
            <hr
                class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black">
            <div class="mb-12">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Development Section -->
                    <div
                        class="p-6 bg-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                        <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">💻</div>
                        <h3 class="text-2xl font-semibold text-color-off-black mb-4 text-center">Development</h3>
                        <p class="text-sm md:text-sm text-center">Creating responsive and user-friendly web pages with
                            clean code
                            and seamless UI/UX enhancements.</p>
                    </div>
                    <!-- Fullstack Development Section -->
                    <div
                        class="p-6 bg-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                        <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">🔧</div>
                        <h3 class="text-2xl font-semibold text-color-off-black mb-4 text-center">Fullstack Development
                        </h3>
                        <p class="text-sm md:text-sm text-center">Building robust backend systems with secure
                            authentication,
                            database management, and seamless fullstack integration.</p>
                    </div>
                    <!-- Design Section -->
                    <div
                        class="p-6 bg-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                        <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">🎨</div>
                        <h3 class="text-2xl font-semibold text-color-off-black mb-4 text-center">Design</h3>
                        <p class="text-sm md:text-sm text-center">Crafting beautiful and functional designs tailored to
                            meet your
                            needs and enhance user experience.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Projects -->
    <section id="projects" class="py-16 px-6 md:px-12 bg-color-off-black">
        <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h2 class="text-3xl md:text-4xl font-bold mb-6 text-center text-color-off-white">Projects I've worked on
            </h2>
            <hr
                class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-white text-color-off-white bg-color-off-white" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="Meta" alt="Meta" class="w-16 h-16 mb-4 bg-white">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Meta @ Sponge</h3>
                        <p class="mb-6 text-sm">Worked on the frontend for their e-learning material targeted at
                            developers.</p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">VueJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">CSS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="Google" alt="Google" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Google @ Sponge</h3>
                        <p class="mb-6 text-sm">Built the landing page and language selector theme for all courses
                            produced by Sponge.</p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">NodeJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">VueJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">CSS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="Lego" alt="Lego" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Lego @ Sponge</h3>
                        <p class="mb-6 text-sm">Developed the landing page and language selector theme for all courses
                            produced by Sponge.
                        </p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">NodeJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">VueJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">CSS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="NCSC" alt="NCSC" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> NCSC @ Sponge</h3>
                        <p class="mb-6 text-sm">Contributed to the <a href="https://www.ncsc.gov.uk/cyberfirst/overview"
                                class="underline hover:text-color-teal">CyberFirst programme</a>, including maintenance
                            and improvements
                            of the <a href="https://www.ncsc.gov.uk/collection/cybersprinters"
                                class="underline hover:text-color-teal">CyberSrpinters</a> game, and development of <a
                                href="https://www.ncsc.gov.uk/collection/cyberfirstnavigators"
                                class="underline hover:text-color-teal">CyberFirst Navigators</a>.</p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">NodeJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">StencilJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">CSS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="DVSA" alt="DVSA" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> DVSA @ Sponge</h3>
                        <p class="mb-6 text-sm">
                            Worked on the <a href="https://www.safedrivingforlife.info/">safe driving for life
                                platform</a>;
                            Implementing multi-learner access for companies, performing maintenance and upgrades,
                            improving accessibility on <a
                                href="https://www.safedrivingforlife.info/free-practice-tests/practice-theory-test-for-approved-driving-instructors-1-of-2/"
                                class="underline hover:text-color-teal transition-all">practive theory tests</a>,
                            creating a <a
                                href="https://www.safedrivingforlife.info/driving-instructor-suitability-assessment/"
                                class="underline hover:text-color-teal transition-all">driver instructore suitability
                                assessment</a>
                            and
                            collaborating on the other courses such as <a
                                href="https://www.safedrivingforlife.info/ridefree/"
                                class="underline hover:text-color-teal transition-all">ridefree</a>.
                        </p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">NodeJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">VueJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">CSS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Sass</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Python</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Django</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Wagtail
                                CMS</span> <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Docker</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">GitHub
                                Actions</span> <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Google
                                Cloud</span> <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Agile</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="Snap" alt="Snap Inc" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">🧑‍🏫</span> Snap Inc @ Sponge
                        </h3>
                        <p class="mb-6 text-sm">Served as a technical consultant for the e-learning material related to
                            Snaps, Lens Studio
                            software.</p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Communication</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Collaboration</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="AstraZeneca" alt="AstraZeneca"
                        class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> AstraZeneca @ Sponge
                        </h3>
                        <p class="mb-6 text-sm">Developed compliance learning modules distributed annually to all
                            employees.</p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">VueJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">CSS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="RedBull" alt="Red Bull" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Red Bull @ Sponge
                        </h3>
                        <p class="mb-6 text-sm">Updated training materials provided to their retail sales team.</p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">VueJS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">CSS</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div
                    class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default ">
                    <img :src="Perkbox" alt="Perkbox" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="text-xl font-semibold mb-4"><span class="emjo inline">💻</span> <span
                                class="emjo inline">🔧</span> Perkbox @ Rock Mission</h3>
                        <p class="mb-6 text-sm">Developed an engagement awards platform for top HR professionals.</p>
                        <p class="text-xs"><span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">JavaScript</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">PHP</span>
                            <span
                                class="tag inline-block mb-2 text-xs text-color-off-white bg-color-yellow px-2 py-1 rounded mr-2">WordPress</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-8">
                <button id="load-more"
                    class="hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-teal border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
                    aria-label="Load more projects">
                    Load More
                </button>
            </div>
        </div>
    </section>
    <!-- Recommendations Section -->
    <section id="testimonials" class="py-16 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h2 class="text-3xl md:text-4xl font-bold mb-12 text-black text-center">Recommendations</h2>
            <hr
                class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
            <div class="lg:flex lg:space-x-6 space-y-6 lg:space-y-0 mb-6">
                <!-- 1 -->
                <div
                    class="testimonial-item p-6 bg-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-7 relative">
                            <p class="absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-red">"</span></p>
                            <div>
                                <p class="text-color-off-black font-semibold text-2xl">
                                    Excellent communicator with great time management.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="FemaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="text-color-off-black text-sm text-center">Project Manager</p>
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
                    class="testimonial-item p-6 bg-color-red lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-7 relative">
                            <p class="absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-yellow">"</span>
                            </p>
                            <div>
                                <p class="text-color-off-black font-semibold text-2xl">
                                    Dedicated, positive, and always eager to learn.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="FemaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="text-color-off-black text-sm text-center">Engineering Operations Manager</p>
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
                    class="testimonial-item p-6 bg-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-7 relative">
                            <p class="absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-red">"</span></p>
                            <div>
                                <p class="text-color-off-black font-semibold text-2xl">
                                    A professional, driven individual with great ideas.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="FemaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="text-color-off-black text-sm text-center">Human Resources Generalist</p>
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
                    class="testimonial-item p-6 bg-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <!-- transform transition duration-700 ease-in-out opacity-0 rotate-y-90 -->
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-7 relative">
                            <p class="absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-red">"</span></p>
                            <div>
                                <p class="text-color-off-black font-semibold text-2xl">
                                    Dependable, creative, and passionate.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="MaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="text-color-off-black text-sm text-center">Senior Software Developer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-12">
                <a href="https://www.linkedin.com/in/mejasonatkinson/details/recommendations/"
                    class="text-sm underline hover:text-color-teal transition-all" target="_blank">Read the full
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
    <!-- Contact Section -->
    <!-- Social Media Section -->
    <section id="contact" class="py-16 px-6 md:px-12 bg-color-teal">
        <div class="max-w-6xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <div class="flex justify-center gap-8">
                <ul class="flex space-x-6">
                    <li class="inline lg:flex-1"><a href="https://x.com/mejasonatkinson"
                            class="fa fa-2x fa-brands fa-x-twitter text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                            target="_blank" aria-label="Visit my X / Twitter profile"></a></li>
                    <li class="inline lg:flex-1"><a href="https://uk.linkedin.com/in/mejasonatkinson"
                            class="fa fa-2x fa-brands fa-linkedin text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                            target="_blank" aria-label="Visit my LinkedIn profile"></a></li>
                    <li class="inline lg:flex-1"><a href="https://github.com/mejasonatkinson/"
                            class="fa fa-2x fa-brands fa-github text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                            target="_blank" aria-label="Visit my GitHub profile"></a></li>
                    <li class="inline lg:flex-1"><a href="mailto:me@jasonatkinson.co.uk"
                            class="fa fa-2x fa-envelope text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8"
                            aria-label="Send me an email"></a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <!-- Footer -->
    <footer class="py-8 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-4xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <p class="text-xs mb-2">&copy; {{ year }} Jason Atkinson. All rights reserved.</p>
            <p class="text-xs">Designed and developed by Jason Atkinson | <a
                    href="https://github.com/mejasonatkinson/project-profile-home-2025" target="_blank"
                    class="text-s underline hover:text-color-teal transition-all">View on GitHub</a></p>
        </div>
    </footer>
</template>