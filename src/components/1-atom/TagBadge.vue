<script setup>
defineProps({
    label: String,
});
</script>

<template>
    <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">{{ label }}</span>
</template>
