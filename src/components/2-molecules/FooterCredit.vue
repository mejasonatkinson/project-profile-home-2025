<script setup>
defineProps({
    year: Number,
    ownerName: String,
    rightsLabel: String,
    bylinePrefix: String,
    repoUrl: String,
    repoLabel: String,
});
</script>

<template>
    <div class="max-w-4xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
        <p class="font-primary mb-2">&copy; {{ year }} {{ ownerName }}. {{ rightsLabel }}</p>
        <p class="font-primary">{{ bylinePrefix }}<a
                :href="repoUrl" target="_blank"
                class="underline hover:text-color-teal transition-all">{{ repoLabel }}</a></p>
    </div>
</template>
