<script setup>
import HeroContent from '@/components/3-organisms/HeroContent.vue';

defineProps({
    motionReduced: Boolean,
    reducedMotionWordIndex: Number,
    content: Object,
});

const emit = defineEmits(['show-previous-role', 'show-next-role']);
</script>

<template>
    <section id="hero" aria-labelledby="hero-heading" class="relative flex items-center justify-center h-screen bg-color-yellow">
        <HeroContent
            :content="content"
            :motionReduced="motionReduced"
            :reducedMotionWordIndex="reducedMotionWordIndex"
            @show-previous-role="emit('show-previous-role')"
            @show-next-role="emit('show-next-role')"
        />
    </section>
</template>
