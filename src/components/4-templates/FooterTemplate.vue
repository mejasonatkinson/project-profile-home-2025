<script setup>
import FooterCredit from '@/components/2-molecules/FooterCredit.vue';

defineProps({
    content: Object,
    year: Number,
});
</script>

<template>
    <footer class="py-8 px-6 md:px-12 bg-color-off-white">
        <FooterCredit
            :year="year"
            :ownerName="content.ownerName"
            :rightsLabel="content.rightsLabel"
            :bylinePrefix="content.bylinePrefix"
            :repoUrl="content.repoUrl"
            :repoLabel="content.repoLabel"
        />
    </footer>
</template>
