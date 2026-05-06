<script setup>
import { onMounted, watch, nextTick } from 'vue';

const props = defineProps({
    motionReduced: Boolean,
    reducedMotionWordIndex: Number,
    heroRoles: Array,
});

const emit = defineEmits(['show-previous-role', 'show-next-role']);

onMounted(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';

    function typeWord() {
        if (props.motionReduced) return;
        const typingElement = document.getElementById("typing");
        if (!typingElement) return;
        if (charIndex < props.heroRoles[wordIndex].length) {
            currentWord += props.heroRoles[wordIndex].charAt(charIndex);
            typingElement.textContent = currentWord;
            charIndex++;
            setTimeout(typeWord, 100);
        } else {
            setTimeout(deleteWord, 1500);
        }
    }

    function deleteWord() {
        if (props.motionReduced) return;
        const typingElement = document.getElementById("typing");
        if (!typingElement) return;
        if (charIndex > 0) {
            currentWord = currentWord.slice(0, -1);
            typingElement.textContent = currentWord;
            charIndex--;
            setTimeout(deleteWord, 50);
        } else {
            wordIndex = (wordIndex + 1) % props.heroRoles.length;
            setTimeout(typeWord, 500);
        }
    }

    if (!props.motionReduced) typeWord();

    watch(() => props.motionReduced, async (reduced) => {
        if (!reduced) {
            wordIndex = 0;
            charIndex = 0;
            currentWord = '';
            await nextTick();
            typeWord();
        }
    });
});
</script>

<template>
    <section id="hero" aria-labelledby="hero-heading" class="relative flex items-center justify-center h-screen bg-color-yellow">
        <div class="relative px-6 md:px-12 w-full max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h1 id="hero-heading" class="font-secondary text-5xl md:text-6xl lg:text-7xl font-extrabold text-color-off-black mb-8 drop-shadow-md"
                aria-label="Hey, I'm Jason Atkinson">
                Hey, <span class="emjo animate-wave inline-block" aria-hidden="true">👋</span> I'm <span
                    class="text-color-off-black">Jason
                    <span class="hidden xl:inline">Atkinson</span></span>
            </h1>
            <p class="font-primary text-xl md:text-2xl lg:text-4xl font-bold text-color-off-black mb-16 drop-shadow-md"
                aria-label="Accessibility Specialist, Developer, Designer, Artist, Creative Coder, Problem Solver">
                <template v-if="!motionReduced">
                    _____ <span id="typing"></span> <span
                        class="inline-block w-[4px] h-[40px] bg-color-off-black animate-blink align-bottom"> </span>
                </template>
                <template v-else>
                    _____ {{ heroRoles[reducedMotionWordIndex] }}
                    <div class="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            class="font-secondary px-4 py-2 text-base font-bold text-color-off-black border-2 border-color-off-black rounded-md hover:opacity-85 transition-all"
                            aria-label="Show previous role"
                            @click="emit('show-previous-role')"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            class="font-secondary px-4 py-2 text-base font-bold text-color-off-black border-2 border-color-off-black rounded-md hover:opacity-85 transition-all"
                            aria-label="Show next role"
                            @click="emit('show-next-role')"
                        >
                            Next
                        </button>
                    </div>
                </template>
            </p>
            <p class="font-primary text-lg md:text-xl text-color-off-black mb-8">
                Based in the UK — Exploring what a universal future in technology, design, learning, creativity, and inclusion can be.
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
</template>
