<script setup>
defineProps({
    href: String,
    label: String,
    ariaLabel: String,
});
</script>

<template>
    <a :href="href"
        class="font-secondary inline-block hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-off-black border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
        :aria-label="ariaLabel">
        {{ label }}
    </a>
</template>
