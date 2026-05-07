<script setup>
defineProps({
    icon: String,
    title: String,
    description: String,
});
</script>

<template>
    <div class="p-6 border-4 border-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
        <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">{{ icon }}</div>
        <h3 class="font-secondary text-2xl font-semibold text-color-off-black mb-4 text-center">{{ title }}</h3>
        <p class="font-primary text-center">{{ description }}</p>
    </div>
</template>
