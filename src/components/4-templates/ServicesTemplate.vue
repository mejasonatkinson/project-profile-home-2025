<script setup>
defineProps({
    content: Object,
});
</script>

<template>
    <section id="services" aria-labelledby="services-heading" class="py-16 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h2 id="services-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-center text-color-off-black">{{ content.title }}</h2>
            <hr
                class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black">
            <div class="mb-12">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div
                        v-for="item in content.items"
                        :key="item.title"
                        class="p-6 border-4 border-color-yellow text-color-off-black transition-transform transform hover:scale-105 cursor-default py-12">
                        <div class="emjo text-5xl md:text-6xl lg:text-7xl mb-12 text-center">{{ item.icon }}</div>
                        <h3 class="font-secondary text-2xl font-semibold text-color-off-black mb-4 text-center">{{ item.title }}</h3>
                        <p class="font-primary text-center">{{ item.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
