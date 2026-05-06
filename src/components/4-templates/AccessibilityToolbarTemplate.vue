<script setup>
defineProps({
    light: Boolean,
    motionReduced: Boolean,
});

const emit = defineEmits(['toggle-theme', 'toggle-motion']);
</script>

<template>
    <div class="z-10 fixed top-0 right-0 flex flex-col print:hidden" role="toolbar" aria-label="Display settings">
        <span :onclick="() => emit('toggle-theme')" class="cursor-pointer hover:opacity-75 p-4 border-l-4 border-color-off-black"
            :class="light ? 'bg-color-off-white' : 'bg-color-teal'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-8 h-8 lg:w-14 lg:h-14 text-color-off-black" :class="light ? 'inline' : 'hidden'">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-8 h-8 lg:w-14 lg:h-14 text-color-off-white" :class="light ? 'hidden' : 'inline'">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
        </span>
        <span :onclick="() => emit('toggle-motion')" class="cursor-pointer hover:opacity-75 p-4 border-l-4 border-color-off-black border-b-4"
            :class="light ? 'bg-color-off-white' : 'bg-color-teal'"
            :aria-label="motionReduced ? 'Enable motion' : 'Reduce motion'"
            role="button">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 lg:w-14 lg:h-14"
                :class="[motionReduced ? 'hidden' : 'inline', light ? 'text-color-off-black' : 'text-color-off-white']">
                <path d="M8 28C16 12 32 36 40 20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
                <line x1="10" y1="10" x2="38" y2="38" stroke="currentColor" stroke-width="3"/>
            </svg>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 lg:w-14 lg:h-14"
                :class="[motionReduced ? 'inline' : 'hidden', light ? 'text-color-off-black' : 'text-color-off-white']">
                <path d="M6 28C10 20 14 20 18 28C22 36 26 36 30 28C34 20 38 20 42 28"
                    stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
        </span>
    </div>
</template>
