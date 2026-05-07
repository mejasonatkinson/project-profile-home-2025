<script setup>
import SocialLinks from '@/components/2-molecules/SocialLinks.vue';

defineProps({
    content: Object,
});
</script>

<template>
    <section id="contact" :aria-label="content.sectionAriaLabel" class="py-16 px-6 md:px-12 bg-color-teal">
        <div class="max-w-6xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <div class="flex justify-center gap-8">
                <SocialLinks :links="content.links" />
            </div>
        </div>
    </section>
</template>
