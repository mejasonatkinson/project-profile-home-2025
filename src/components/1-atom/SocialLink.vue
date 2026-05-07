<script setup>
defineProps({
    href: String,
    iconClass: String,
    ariaLabel: String,
    external: Boolean,
});
</script>

<template>
    <a :href="href"
        :class="iconClass"
        :target="external ? '_blank' : null"
        :aria-label="ariaLabel"></a>
</template>
