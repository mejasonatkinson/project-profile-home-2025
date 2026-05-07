<script setup>
import TestimonialCard from '@/components/2-molecules/TestimonialCard.vue';

defineProps({
    content: Object,
});
</script>

<template>
    <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
        <h2 id="testimonials-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-black text-center">{{ content.title }}</h2>
        <hr class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
        <div class="lg:flex lg:space-x-6 space-y-6 lg:space-y-0 mb-6">
            <TestimonialCard
                v-for="item in content.items"
                :key="item.quote"
                :quote="item.quote"
                :role="item.role"
                :profileImage="item.profileImage"
                :quoteColorClass="item.quoteColorClass"
                :borderClass="item.borderClass"
            />
        </div>
        <div class="text-center mt-12">
            <a :href="content.linkedInUrl"
                class="font-primary underline hover:text-color-teal transition-all" target="_blank">{{ content.linkedInLabel }}</a>
        </div>
    </div>
</template>
