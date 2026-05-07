<script setup>
defineProps({
    content: Object,
});
</script>

<template>
    <div class="max-w-6xl mx-auto flex flex-col lg:flex-row opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
        <div class="bg-color-off-white text-color-off-black text-left p-12 lg:flex-1 order-last lg:order-first lg:transition-transform lg:transform cursor-default z-20">
            <h2 id="about-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-6">{{ content.title }}</h2>
            <hr class="h-[3px] w-[130px] mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
            <p v-for="paragraph in content.paragraphs" :key="paragraph" class="font-primary mb-6">
                {{ paragraph }}
            </p>
        </div>
        <div class="bg-color-teal p-6 lg:flex-1 relative order-first lg:order-last h-[500px] lg:h-auto z-10">
            <img :src="content.imageSrc" :alt="content.imageAlt"
                class="absolute inset-0 w-full h-full object-cover">
        </div>
    </div>
</template>
