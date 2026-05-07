<script setup>
defineProps({
    quote: String,
    role: String,
    profileImage: String,
    quoteColorClass: String,
    borderClass: String,
});
</script>

<template>
    <div class="testimonial-item p-6 border-4 lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default"
        :class="borderClass">
        <div class="text-base flex flex-col justify-between h-full">
            <div class="flex items-start mb-8 pt-5 pl-6 relative">
                <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl">
                    <span :class="quoteColorClass">"</span>
                </p>
                <div>
                    <p class="font-secondary text-color-off-black font-bold text-2xl">{{ quote }}</p>
                </div>
            </div>
            <div>
                <img :src="profileImage" alt="" class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                <p class="font-primary text-color-off-black text-center">{{ role }}</p>
            </div>
        </div>
    </div>
</template>
