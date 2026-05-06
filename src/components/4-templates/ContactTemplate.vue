<script setup>
defineProps({
    content: Object,
});
</script>

<template>
    <section id="contact" :aria-label="content.sectionAriaLabel" class="py-16 px-6 md:px-12 bg-color-teal">
        <div class="max-w-6xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <div class="flex justify-center gap-8">
                <ul class="flex space-x-6">
                    <li v-for="link in content.links" :key="link.href" class="inline lg:flex-1">
                        <a :href="link.href"
                            :class="link.iconClass"
                            :target="link.external ? '_blank' : null"
                            :aria-label="link.ariaLabel"></a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>
