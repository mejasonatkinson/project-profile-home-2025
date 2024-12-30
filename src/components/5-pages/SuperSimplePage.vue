<script setup lang="ts">
import { reactive } from 'vue';

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
</script>

<template>
    <section id="hero" class="relative flex items-center justify-center h-screen bg-color-yellow">
        <span :onclick="lightDarkMode"
            class="absolute top-0 right-0 cursor-pointer hover:opacity-75 p-4 print:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-14 h-14 text-color-off-white" :class="state.light ? 'inline' : 'hidden'">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-14 h-14 text-color-off-white" :class="state.light ? 'hidden' : 'inline'">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
        </span>
        <div class="relative px-6 md:px-12">
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 text-color-off-white drop-shadow-md"
                aria-label="Hey, I'm Jason Atkinson">
                Hey, <span class="inline-block" aria-hidden="true">👋</span> I'm <span class="text-color-red">Jason
                    <span class="hidden xl:inline">Atkinson</span></span>
            </h1>
            <p class="text-xl md:text-2xl lg:text-4xl font-bold mb-16 text-color-teal drop-shadow-md">
                A Developer, Designer, Artist, and Creative Coder
            </p>
            <p class="text-base md:text-lg font-normal mb-16 text-color-off-black drop-shadow-md">
                Based in the UK — Exploring the future of technology, design, learning, diversity and creativity.
            </p>
            <div class="flex gap-8">
                <ul class="flex space-x-6">
                    <li class="inline lg:flex-1"><a href="https://x.com/mejasonatkinson"
                            class="fa fa-2x fa-brands fa-x-twitter text-4xl leading-none lg:border-4 border-color-off-white rounded-xl text-color-off-white hover:border-color-off-white hover:text-color-yellow hover:bg-color-off-white transition-all p-2 lg:p-4 drop-shadow-md"
                            target="_blank" aria-label="Visit my Twitter profile"></a></li>
                    <li class="inline lg:flex-1"><a href="https://uk.linkedin.com/in/mejasonatkinson"
                            class="fa fa-2x fa-brands fa-linkedin text-4xl leading-none lg:border-4 border-color-off-white rounded-xl text-color-off-white hover:border-color-off-white hover:text-color-yellow hover:bg-color-off-white transition-all p-2 lg:p-4 drop-shadow-md"
                            target="_blank" aria-label="Visit my LinkedIn profile"></a></li>
                    <li class="inline lg:flex-1"><a href="https://github.com/mejasonatkinson/"
                            class="fa fa-2x fa-brands fa-github text-4xl leading-none lg:border-4 border-color-off-white rounded-xl text-color-off-white hover:border-color-off-white hover:text-color-yellow hover:bg-color-off-white transition-all p-2 lg:p-4 drop-shadow-md"
                            target="_blank" aria-label="Visit my GitHub profile"></a></li>
                    <li class="inline lg:flex-1"><a href="mailto:me@jasonatkinson.co.uk"
                            class="fa fa-2x fa-envelope text-4xl leading-none lg:border-4 border-color-off-white rounded-xl text-color-off-white hover:border-color-off-white hover:text-color-yellow hover:bg-color-off-white transition-all p-2 lg:p-4 drop-shadow-md"
                            aria-label="Send me an email"></a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
