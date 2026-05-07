<script setup>
import TagBadge from '@/components/1-atom/TagBadge.vue';

defineProps({
    logo: String,
    alt: String,
    title: String,
    summary: String,
    summaryHtml: String,
    tags: Array,
});
</script>

<template>
    <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
        <img :src="logo" :alt="alt" class="w-16 h-16 mb-4 bg-white">
        <div>
            <h3 class="font-secondary text-xl font-semibold mb-4">{{ title }}</h3>
            <p v-if="summary" class="font-primary mb-6 text-sm">{{ summary }}</p>
            <p v-else class="font-primary mb-6 text-sm" v-html="summaryHtml"></p>
            <p class="font-primary text-xs">
                <TagBadge v-for="tag in tags" :key="tag" :label="tag" />
            </p>
        </div>
    </div>
</template>
