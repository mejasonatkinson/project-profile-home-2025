<script setup>
import TestimonialGrid from '@/components/3-organisms/TestimonialGrid.vue';

defineProps({
    content: Object,
});
</script>

<template>
    <section id="testimonials" aria-labelledby="testimonials-heading" class="py-16 px-6 md:px-12 bg-color-off-white">
        <TestimonialGrid :content="content" />
    </section>
</template>
