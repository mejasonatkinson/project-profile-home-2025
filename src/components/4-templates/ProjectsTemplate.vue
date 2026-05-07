<script setup>
import ProjectCardGrid from '@/components/3-organisms/ProjectCardGrid.vue';

defineProps({
    content: Object,
});
</script>

<template>
    <section id="projects" aria-labelledby="projects-heading" class="py-16 px-6 md:px-12 bg-color-off-black">
        <ProjectCardGrid :content="content" />
    </section>
</template>
