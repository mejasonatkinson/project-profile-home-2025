<script setup>
import { onMounted } from 'vue';

import AstraZeneca from '@/assets/images/company-logos/AstraZeneca.jpg';
import DVSA from '@/assets/images/company-logos/DVSA.png';
import Google from '@/assets/images/company-logos/google.jpg';
import Lego from '@/assets/images/company-logos/Lego.png';
import Meta from '@/assets/images/company-logos/Meta.png';
import NCSC from '@/assets/images/company-logos/NCSC.jpg';
import Medway from '@/assets/images/company-logos/medway.png';
import Perkbox from '@/assets/images/company-logos/Perkbox.png';
import RedBull from '@/assets/images/company-logos/redbull.jpg';
import Snap from '@/assets/images/company-logos/snap.jpg';

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
            <h2 id="projects-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-6 text-center text-color-off-white">Projects I've worked on</h2>
            <hr
                class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-white text-color-off-white bg-color-off-white" />
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧭</span> Strategy @ Medway</h3>
                        <p class="font-primary mb-6 text-sm">Led the design of Medway Council's digital accessibility and inclusion strategy, working across teams to define structure, roles, and a long-term approach to accessible services.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">User Research</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public Sector</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Strategy</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Team Design</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">📜</span> Policy @ Medway</h3>
                        <p class="font-primary mb-6 text-sm">Improved and expanded internal accessibility policies to better support compliance, consistency, and inclusive delivery across the organisation.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Accessibility</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Policy</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public Sector</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧪</span> Empathy Lab @ Medway</h3>
                        <p class="font-primary mb-6 text-sm">Designed and facilitated guided "Empathy Lab" sessions to help teams understand accessibility barriers through structured, hands-on experiences—while clearly framing the limits of simulation vs lived experience.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Accessibility</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Assistive Technology</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Inclusive Design</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Workshops</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public Sector</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Medway" alt="Medway" class="w-16 h-16 mb-4 bg-white">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧰</span> Toolkit @ Medway</h3>
                        <p class="font-primary mb-6 text-sm">Created a practical accessibility toolkit enabling teams to deliver accessible content independently, covering WCAG, assistive tech, documents, and inclusive communication.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">WCAG</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Documentation</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Training</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Accessibility</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Public Sector</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Meta" alt="Meta" class="w-16 h-16 mb-4 bg-white">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Meta @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">Worked on the frontend for their e-learning material targeted at developers.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Google" alt="Google" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Google @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">Built the landing page and language selector theme for all courses produced by Sponge.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Lego" alt="Lego" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Lego @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">Developed the landing page and language selector theme for all courses produced by Sponge.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="NCSC" alt="NCSC" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> NCSC @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">Contributed to the <a href="https://www.ncsc.gov.uk/cyberfirst/overview"
                                class="underline hover:text-color-teal">CyberFirst programme</a>, including maintenance
                            and improvements of the <a href="https://www.ncsc.gov.uk/collection/cybersprinters"
                                class="underline hover:text-color-teal">CyberSprinters</a> game, and development of <a
                                href="https://www.ncsc.gov.uk/collection/cyberfirstnavigators"
                                class="underline hover:text-color-teal">CyberFirst Navigators</a>.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">StencilJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="DVSA" alt="DVSA" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> DVSA @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">
                            Worked on the <a href="https://www.safedrivingforlife.info/">safe driving for life platform</a>;
                            Implementing multi-learner access for companies, performing maintenance and upgrades,
                            improving accessibility on <a
                                href="https://www.safedrivingforlife.info/free-practice-tests/practice-theory-test-for-approved-driving-instructors-1-of-2/"
                                class="underline hover:text-color-teal transition-all">practice theory tests</a>,
                            creating a <a
                                href="https://www.safedrivingforlife.info/driving-instructor-suitability-assessment/"
                                class="underline hover:text-color-teal transition-all">driver instructor suitability assessment</a>
                            and collaborating on other courses such as <a
                                href="https://www.safedrivingforlife.info/ridefree/"
                                class="underline hover:text-color-teal transition-all">ridefree</a>.
                        </p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">NodeJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Python</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Django</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Wagtail CMS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Docker</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">GitHub Actions</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Google Cloud</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Agile</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Snap" alt="Snap Inc" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">🧑‍🏫</span> Snap Inc @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">Served as a technical consultant for the e-learning material related to Snaps, Lens Studio software.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Communication</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Collaboration</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="AstraZeneca" alt="AstraZeneca" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> AstraZeneca @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">Developed compliance learning modules distributed annually to all employees.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="RedBull" alt="Red Bull" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> Red Bull @ Sponge</h3>
                        <p class="font-primary mb-6 text-sm">Updated training materials provided to their retail sales team.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">VueJS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">CSS</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">Sass</span>
                        </p>
                    </div>
                </div>
                <div class="project-item p-6 bg-color-off-white relative lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <img :src="Perkbox" alt="Perkbox" class="w-16 h-16 mb-4">
                    <div>
                        <h3 class="font-secondary text-xl font-semibold mb-4"><span class="emjo inline">💻</span> <span class="emjo inline">🔧</span> Perkbox @ Rock Mission</h3>
                        <p class="font-primary mb-6 text-sm">Developed an engagement awards platform for top HR professionals.</p>
                        <p class="font-primary text-xs">
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">JavaScript</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">PHP</span>
                            <span class="tag inline-block mb-2 text-xs text-color-off-white bg-color-off-black px-2 py-1 rounded mr-2">WordPress</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-8">
                <button id="load-more"
                    class="font-secondary hover:animate-bounce-sm px-6 py-3 text-lg font-bold text-color-teal border-2 border-color-off-white bg-color-off-white rounded-md hover:bg-color-teal hover:border-color-teal hover:text-color-off-white shadow-md transition-all"
                    aria-label="Load more projects">
                    Load More
                </button>
            </div>
        </div>
    </section>
</template>
