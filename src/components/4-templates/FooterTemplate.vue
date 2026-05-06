<script setup>
const year = new Date().getFullYear();
</script>

<template>
    <footer class="py-8 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-4xl mx-auto text-center opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <p class="font-primary mb-2">&copy; {{ year }} Jason Atkinson. All rights reserved.</p>
            <p class="font-primary">Designed and developed by Jason Atkinson | <a
                    href="https://github.com/mejasonatkinson/project-profile-home-2025" target="_blank"
                    class="underline hover:text-color-teal transition-all">View on GitHub</a></p>
        </div>
    </footer>
</template>
