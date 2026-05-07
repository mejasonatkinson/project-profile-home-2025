<script setup>
import AccessibilityToolbar from '@/components/2-molecules/AccessibilityToolbar.vue';

defineProps({
    light: Boolean,
    motionReduced: Boolean,
    content: Object,
});

const emit = defineEmits(['toggle-theme', 'toggle-motion']);
</script>

<template>
    <AccessibilityToolbar
        :light="light"
        :motionReduced="motionReduced"
        :content="content"
        @toggle-theme="emit('toggle-theme')"
        @toggle-motion="emit('toggle-motion')"
    />
</template>
