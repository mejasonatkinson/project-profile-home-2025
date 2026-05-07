<script setup>
import SocialLink from '@/components/1-atom/SocialLink.vue';

defineProps({
    links: Array,
});
</script>

<template>
    <ul class="flex space-x-6">
        <li v-for="link in links" :key="link.href" class="inline lg:flex-1">
            <SocialLink
                :href="link.href"
                :iconClass="link.iconClass"
                :ariaLabel="link.ariaLabel"
                :external="link.external"
            />
        </li>
    </ul>
</template>
