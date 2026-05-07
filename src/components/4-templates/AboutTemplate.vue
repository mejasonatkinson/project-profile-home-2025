<script setup>
import ProfileSplit from '@/components/3-organisms/ProfileSplit.vue';

defineProps({
    content: Object,
});
</script>

<template>
    <section id="about" aria-labelledby="about-heading" class="py-16 px-6 md:px-12 bg-color-red">
        <ProfileSplit :content="content" />
    </section>
</template>
