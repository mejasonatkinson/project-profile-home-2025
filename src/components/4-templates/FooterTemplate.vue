<script setup>
defineProps({
    content: Object,
    year: Number,
});
</script>

<template>
    <footer class="py-8 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-4xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <p class="font-primary mb-2">&copy; {{ year }} {{ content.ownerName }}. {{ content.rightsLabel }}</p>
            <p class="font-primary">{{ content.bylinePrefix }}<a
                    :href="content.repoUrl" target="_blank"
                    class="underline hover:text-color-teal transition-all">{{ content.repoLabel }}</a></p>
        </div>
    </footer>
</template>
