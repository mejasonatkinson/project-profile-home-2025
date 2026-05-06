<script setup>
import { reactive, onMounted } from 'vue';

import AccessibilityToolbarTemplate from '@/components/4-templates/AccessibilityToolbarTemplate.vue';
import HeroTemplate from '@/components/4-templates/HeroTemplate.vue';
import AboutTemplate from '@/components/4-templates/AboutTemplate.vue';
import ServicesTemplate from '@/components/4-templates/ServicesTemplate.vue';
import ProjectsTemplate from '@/components/4-templates/ProjectsTemplate.vue';
import RecommendationsTemplate from '@/components/4-templates/RecommendationsTemplate.vue';
import ContactTemplate from '@/components/4-templates/ContactTemplate.vue';
import FooterTemplate from '@/components/4-templates/FooterTemplate.vue';
import { siteContent } from '@/content/siteContent';

const state = reactive({
    light: true,
    motionReduced: false,
    reducedMotionWordIndex: 0,
});

const year = new Date().getFullYear();

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    state.light = false;
} else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
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
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
};

const toggleMotion = () => {
    state.motionReduced = !state.motionReduced;
    if (state.motionReduced) {
        document.documentElement.classList.add('reduce-motion');
        localStorage.motionReduced = 'true';
    } else {
        document.documentElement.classList.remove('reduce-motion');
        localStorage.motionReduced = 'false';
    }
};

const showPreviousRole = () => {
    state.reducedMotionWordIndex = (state.reducedMotionWordIndex - 1 + siteContent.hero.roles.length) % siteContent.hero.roles.length;
};

const showNextRole = () => {
    state.reducedMotionWordIndex = (state.reducedMotionWordIndex + 1) % siteContent.hero.roles.length;
};

onMounted(() => {
    const sections = document.querySelectorAll("[data-section]");
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
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
});
</script>

<template>
    <AccessibilityToolbarTemplate
        :light="state.light"
        :motionReduced="state.motionReduced"
        :content="siteContent.toolbar"
        @toggle-theme="lightDarkMode"
        @toggle-motion="toggleMotion"
    />
    <main id="main-content">
        <HeroTemplate
            :motionReduced="state.motionReduced"
            :reducedMotionWordIndex="state.reducedMotionWordIndex"
            :content="siteContent.hero"
            @show-previous-role="showPreviousRole"
            @show-next-role="showNextRole"
        />
        <AboutTemplate :content="siteContent.about" />
        <ServicesTemplate :content="siteContent.services" />
        <ProjectsTemplate :content="siteContent.projects" />
        <RecommendationsTemplate :content="siteContent.recommendations" />
        <ContactTemplate :content="siteContent.contact" />
    </main>
    <FooterTemplate :content="siteContent.footer" :year="year" />
</template>
