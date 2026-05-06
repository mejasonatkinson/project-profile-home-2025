<script setup>
import { onMounted } from 'vue';

defineProps({
    content: Object,
});

onMounted(() => {
    const projects = document.querySelectorAll('.project-item');
    const loadMoreButton = document.getElementById('load-more');
    let visibleProjects = 3;

    projects.forEach((project, index) => {
        if (index >= visibleProjects) {
            project.classList.add('hidden');
        }
    });

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function () {
            const nextVisibleProjects = visibleProjects + 3;
            projects.forEach((project, index) => {
                if (index < nextVisibleProjects) {
                    project.classList.remove('hidden');
                }
            });
            visibleProjects = nextVisibleProjects;
            if (visibleProjects >= projects.length) {
                loadMoreButton.classList.add('hidden');
            }
        });
    }
});
</script>

<template>
    <section id="projects" aria-labelledby="projects-heading" class="py-16 px-6 md:px-12 bg-color-off-black">
        <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h2 id="projects-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-6 text-center text-color-off-white">{{ content.title }}</h2>
            <hr
                class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-white text-color-off-white bg-color-off-white" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="project in content.items" :key="project.title" class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="project.logo" :alt="project.alt" class="w-16 h-16 mb-4 bg-white">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4">{{ project.title }}</h3>
                        <p v-if="project.summary" class="font-primary mb-6 text-sm">{{ project.summary }}</p>
                        <p v-else class="font-primary mb-6 text-sm" v-html="project.summaryHtml"></p>
                        <p class="font-primary text-xs">
                            <span v-for="tag in project.tags" :key="tag" class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">{{ tag }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-8">
                <button id="load-more"
                    class="font-secondary hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-teal border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
                    :aria-label="content.loadMoreAriaLabel">
                    {{ content.loadMoreLabel }}
                </button>
            </div>
        </div>
    </section>
</template>
