<script setup>
import { onMounted } from 'vue';
import ProjectCard from '@/components/2-molecules/ProjectCard.vue';

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
    <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
        <h2 id="projects-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-6 text-center text-color-off-white">{{ content.title }}</h2>
        <hr class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-white text-color-off-white bg-color-off-white" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
                v-for="project in content.items"
                :key="project.title"
                :logo="project.logo"
                :alt="project.alt"
                :title="project.title"
                :summary="project.summary"
                :summaryHtml="project.summaryHtml"
                :tags="project.tags"
            />
        </div>
        <div class="text-center mt-8">
            <button id="load-more"
                class="font-secondary hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-teal border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
                :aria-label="content.loadMoreAriaLabel">
                {{ content.loadMoreLabel }}
            </button>
        </div>
    </div>
</template>
