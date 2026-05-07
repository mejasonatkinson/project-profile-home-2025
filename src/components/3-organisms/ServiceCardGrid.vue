<script setup>
import ServiceCard from '@/components/2-molecules/ServiceCard.vue';

defineProps({
    content: Object,
});
</script>

<template>
    <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
        <h2 id="services-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-center text-color-off-black">{{ content.title }}</h2>
        <hr class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black">
        <div class="mb-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ServiceCard
                    v-for="item in content.items"
                    :key="item.title"
                    :icon="item.icon"
                    :title="item.title"
                    :description="item.description"
                />
            </div>
        </div>
    </div>
</template>
