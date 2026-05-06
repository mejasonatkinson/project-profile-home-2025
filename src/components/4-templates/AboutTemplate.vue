<script setup>
import Me from '@/assets/images/me/me.png';
</script>

<template>
    <section id="about" aria-labelledby="about-heading" class="py-16 px-6 md:px-12 bg-color-red">
        <div class="max-w-6xl mx-auto flex flex-col lg:flex-row opacity-0 transition-opacity duration-1000 ease-in-out" data-section>
            <div
                class="bg-color-off-white text-color-off-black text-left p-12 lg:flex-1 order-last lg:order-first lg:transition-transform lg:transform cursor-default z-20">
                <h2 id="about-heading" class="font-secondary text-3xl md:text-4xl font-bold mb-6">Who Am I?</h2>
                <hr
                    class="h-[3px] w-[130px] mt-[30px] mb-[45px] border-color-off-black text-color-off-black bg-color-off-black" />
                <p class="font-primary mb-6">
                    I'm an Accessibility Specialist at Medway Council, focused on making digital services inclusive, usable, and compliant for everyone.
                </p>
                <p class="font-primary mb-6">
                    With 10+ years in web development and over 20 years coding for fun, I bring a mix of technical depth and empathy, bridging the gap between accessibility standards and real-world implementation.
                </p>
                <p class="font-primary mb-6">
                    My work includes running workshops, audits, and accessibility reviews, shaping strategy, supporting remediation, and helping teams understand assistive technology, inclusive design, and WCAG.
                </p>
                <p class="font-primary mb-6">
                    I've worked across sectors including healthcare, e-commerce, eLearning, and the public sector, using technologies like JavaScript, PHP, and Python.
                </p>
                <p class="font-primary mb-6">
                    I'm not actively looking for new roles, but I'm always open to conversations around accessibility and inclusive design.
                </p>
            </div>
            <div class="bg-color-teal p-6 lg:flex-1 relative order-first lg:order-last h-[500px] lg:h-auto z-10">
                <img :src="Me" alt="Profile Image Of Jason Atkinson"
                    class="absolute inset-0 w-full h-full object-cover">
            </div>
        </div>
    </section>
</template>
