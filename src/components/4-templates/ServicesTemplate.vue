<script setup>
import ServiceCardGrid from '@/components/3-organisms/ServiceCardGrid.vue';

defineProps({
    content: Object,
});
</script>

<template>
    <section id="services" aria-labelledby="services-heading" class="py-16 px-6 md:px-12 bg-color-off-white">
        <ServiceCardGrid :content="content" />
    </section>
</template>
