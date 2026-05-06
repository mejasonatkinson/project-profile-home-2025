<script setup>
import MaleProfile from '@/assets/images/recommendations/m.png';
import FemaleProfile from '@/assets/images/recommendations/f.png';
</script>

<template>
    <section id="testimonials" aria-labelledby="testimonials-heading" class="py-16 px-6 md:px-12 bg-color-off-white">
        <div class="max-w-6xl mx-auto opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <h2 id="testimonials-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-12 text-black text-center">Recommendations</h2>
            <hr
                class="h-[3px] w-[130px] m-auto mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
            <div class="lg:flex lg:space-x-6 space-y-6 lg:space-y-0 mb-6">
                <!-- 1 -->
                <div
                    class="testimonial-item p-6 border-4 border-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-6 relative">
                            <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-red">"</span></p>
                            <div>
                                <p class="font-secondary text-color-off-black font-bold text-2xl">
                                    Excellent communicator with great time management.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="FemaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="font-primary text-color-off-black text-center">Project Manager</p>
                        </div>
                    </div>
                </div>
                <!-- 2 -->
                <div
                    class="testimonial-item p-6 border-4 border-color-red lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-6 relative">
                            <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-yellow">"</span>
                            </p>
                            <div>
                                <p class="font-secondary text-color-off-black font-bold text-2xl">
                                    Dedicated, positive, and always eager to learn.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="FemaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="font-primary text-color-off-black text-center">Operations Manager</p>
                        </div>
                    </div>
                </div>
                <!-- 3 -->
                <div
                    class="testimonial-item p-6 border-4 border-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-6 relative">
                            <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-red">"</span></p>
                            <div>
                                <p class="font-secondary text-color-off-black font-bold text-2xl">
                                    A professional, driven individual with great ideas.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="FemaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="font-primary text-color-off-black text-center">Human Resources Generalist</p>
                        </div>
                    </div>
                </div>
                <!-- 4 -->
                <div
                    class="testimonial-item p-6 border-4 border-color-yellow lg:flex-1 lg:transition-transform lg:transform lg:hover:scale-105 cursor-default">
                    <div class="text-base flex flex-col justify-between h-full">
                        <div class="flex items-start mb-8 pt-5 pl-6 relative">
                            <p class="font-secondary absolute top-[-25px] left-[-18px] font-semibold text-8xl"><span
                                    class="text-color-red">"</span></p>
                            <div>
                                <p class="font-secondary text-color-off-black font-bold text-2xl">
                                    Dependable, creative, and passionate.
                                </p>
                            </div>
                        </div>
                        <div>
                            <img :src="MaleProfile" alt=""
                                class="w-14 h-14 mb-4 bg-white rounded-full m-auto">
                            <p class="font-primary text-color-off-black text-center">Senior Software Developer</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-12">
                <a href="https://www.linkedin.com/in/mejasonatkinson/details/recommendations/"
                    class="font-primary underline hover:text-color-teal transition-all" target="_blank">Read the full
                    recommendations on my LinkedIn</a>
            </div>
        </div>
    </section>
</template>
