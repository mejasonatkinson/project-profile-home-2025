import Me from '@/assets/images/me/me.png';

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

import MaleProfile from '@/assets/images/recommendations/m.png';
import FemaleProfile from '@/assets/images/recommendations/f.png';

export const siteContent = {
    toolbar: {
        ariaLabel: 'Display settings',
        reduceMotionLabel: 'Reduce motion',
        enableMotionLabel: 'Enable motion',
    },
    hero: {
        headingAriaLabel: "Hey, I'm Jason Atkinson",
        greeting: 'Hey,',
        firstName: 'Jason',
        lastName: 'Atkinson',
        rolesAriaLabel: 'Accessibility Specialist, Developer, Designer, Artist, Creative Coder, Problem Solver',
        roles: ['Accessibility Specialist', 'Developer', 'Designer', 'Artist', 'Creative Coder', 'Problem Solver'],
        reducedMotionBackLabel: 'Show previous role',
        reducedMotionBackText: 'Back',
        reducedMotionNextLabel: 'Show next role',
        reducedMotionNextText: 'Next',
        summary: 'Based in the UK - Exploring what a universal future in technology, design, learning, creativity, and inclusion can be.',
        ctaHref: '#about',
        ctaLabel: 'Learn More',
        ctaAriaLabel: 'Learn more about me',
    },
    about: {
        title: 'Who Am I?',
        imageSrc: Me,
        imageAlt: 'Profile Image Of Jason Atkinson',
        paragraphs: [
            "I'm an Accessibility Specialist at Medway Council, focused on making digital services inclusive, usable, and compliant for everyone.",
            'With 10+ years in web development and over 20 years coding for fun, I bring a mix of technical depth and empathy, bridging the gap between accessibility standards and real-world implementation.',
            'My work includes running workshops, audits, and accessibility reviews, shaping strategy, supporting remediation, and helping teams understand assistive technology, inclusive design, and WCAG.',
            "I've worked across sectors including healthcare, e-commerce, eLearning, and the public sector, using technologies like JavaScript, PHP, and Python.",
            "I'm not actively looking for new roles, but I'm always open to conversations around accessibility and inclusive design.",
        ],
    },
    services: {
        title: 'Services',
        items: [
            {
                icon: '♿',
                title: 'Accessibility Consulting',
                description: 'Helping teams meet WCAG standards through audits, remediation guidance, assistive technology testing, and inclusive design reviews.',
            },
            {
                icon: '💻',
                title: 'Accessible Development',
                description: 'Building and improving websites with accessibility baked in-clean, semantic code, performance, and usable interfaces from the ground up.',
            },
            {
                icon: '🔧',
                title: 'Technical Implementation',
                description: 'Supporting teams with remediation, frontend/backend integration, and turning accessibility requirements into working solutions.',
            },
            {
                icon: '🎨',
                title: 'Inclusive Design Support',
                description: 'Reviewing and guiding design decisions to ensure experiences are usable, accessible, and consistent across all users.',
            },
        ],
    },
    projects: {
        title: "Projects I've worked on",
        loadMoreLabel: 'Load More',
        loadMoreAriaLabel: 'Load more projects',
        items: [
            {
                logo: Medway,
                alt: 'Medway',
                title: '🧭 Strategy @ Medway',
                summary: "Led the design of Medway Council's digital accessibility and inclusion strategy, working across teams to define structure, roles, and a long-term approach to accessible services.",
                tags: ['User Research', 'Public Sector', 'Strategy', 'Team Design'],
            },
            {
                logo: Medway,
                alt: 'Medway',
                title: '📜 Policy @ Medway',
                summary: 'Improved and expanded internal accessibility policies to better support compliance, consistency, and inclusive delivery across the organisation.',
                tags: ['Accessibility', 'Policy', 'Public Sector'],
            },
            {
                logo: Medway,
                alt: 'Medway',
                title: '🧪 Empathy Lab @ Medway',
                summary: 'Designed and facilitated guided "Empathy Lab" sessions to help teams understand accessibility barriers through structured, hands-on experiences-while clearly framing the limits of simulation vs lived experience.',
                tags: ['Accessibility', 'Assistive Technology', 'Inclusive Design', 'Workshops', 'Public Sector'],
            },
            {
                logo: Medway,
                alt: 'Medway',
                title: '🧰 Toolkit @ Medway',
                summary: 'Created a practical accessibility toolkit enabling teams to deliver accessible content independently, covering WCAG, assistive tech, documents, and inclusive communication.',
                tags: ['WCAG', 'Documentation', 'Training', 'Accessibility', 'Public Sector'],
            },
            {
                logo: Meta,
                alt: 'Meta',
                title: '💻 Meta @ Sponge',
                summary: 'Worked on the frontend for their e-learning material targeted at developers.',
                tags: ['JavaScript', 'VueJS', 'CSS', 'Sass'],
            },
            {
                logo: Google,
                alt: 'Google',
                title: '💻 Google @ Sponge',
                summary: 'Built the landing page and language selector theme for all courses produced by Sponge.',
                tags: ['JavaScript', 'NodeJS', 'VueJS', 'CSS', 'Sass'],
            },
            {
                logo: Lego,
                alt: 'Lego',
                title: '💻 Lego @ Sponge',
                summary: 'Developed the landing page and language selector theme for all courses produced by Sponge.',
                tags: ['JavaScript', 'NodeJS', 'VueJS', 'CSS', 'Sass'],
            },
            {
                logo: NCSC,
                alt: 'NCSC',
                title: '💻 NCSC @ Sponge',
                summaryHtml: 'Contributed to the <a href="https://www.ncsc.gov.uk/cyberfirst/overview" class="underline hover:text-color-teal">CyberFirst programme</a>, including maintenance and improvements of the <a href="https://www.ncsc.gov.uk/collection/cybersprinters" class="underline hover:text-color-teal">CyberSprinters</a> game, and development of <a href="https://www.ncsc.gov.uk/collection/cyberfirstnavigators" class="underline hover:text-color-teal">CyberFirst Navigators</a>.',
                tags: ['JavaScript', 'NodeJS', 'StencilJS', 'CSS', 'Sass'],
            },
            {
                logo: DVSA,
                alt: 'DVSA',
                title: '💻 DVSA @ Sponge',
                summaryHtml: 'Worked on the <a href="https://www.safedrivingforlife.info/">safe driving for life platform</a>; Implementing multi-learner access for companies, performing maintenance and upgrades, improving accessibility on <a href="https://www.safedrivingforlife.info/free-practice-tests/practice-theory-test-for-approved-driving-instructors-1-of-2/" class="underline hover:text-color-teal transition-all">practice theory tests</a>, creating a <a href="https://www.safedrivingforlife.info/driving-instructor-suitability-assessment/" class="underline hover:text-color-teal transition-all">driver instructor suitability assessment</a> and collaborating on other courses such as <a href="https://www.safedrivingforlife.info/ridefree/" class="underline hover:text-color-teal transition-all">ridefree</a>.',
                tags: ['JavaScript', 'NodeJS', 'VueJS', 'CSS', 'Sass', 'Python', 'Django', 'Wagtail CMS', 'Docker', 'GitHub Actions', 'Google Cloud', 'Agile'],
            },
            {
                logo: Snap,
                alt: 'Snap Inc',
                title: '🧑‍🏫 Snap Inc @ Sponge',
                summary: 'Served as a technical consultant for the e-learning material related to Snaps, Lens Studio software.',
                tags: ['JavaScript', 'Communication', 'Collaboration'],
            },
            {
                logo: AstraZeneca,
                alt: 'AstraZeneca',
                title: '💻 AstraZeneca @ Sponge',
                summary: 'Developed compliance learning modules distributed annually to all employees.',
                tags: ['JavaScript', 'VueJS', 'CSS', 'Sass'],
            },
            {
                logo: RedBull,
                alt: 'Red Bull',
                title: '💻 Red Bull @ Sponge',
                summary: 'Updated training materials provided to their retail sales team.',
                tags: ['JavaScript', 'VueJS', 'CSS', 'Sass'],
            },
            {
                logo: Perkbox,
                alt: 'Perkbox',
                title: '💻 🔧 Perkbox @ Rock Mission',
                summary: 'Developed an engagement awards platform for top HR professionals.',
                tags: ['JavaScript', 'PHP', 'WordPress'],
            },
        ],
    },
    recommendations: {
        title: 'Recommendations',
        linkedInUrl: 'https://www.linkedin.com/in/mejasonatkinson/details/recommendations/',
        linkedInLabel: 'Read the full recommendations on my LinkedIn',
        items: [
            {
                quote: 'Excellent communicator with great time management.',
                role: 'Project Manager',
                profileImage: FemaleProfile,
                quoteColorClass: 'text-color-red',
                borderClass: 'border-color-yellow',
            },
            {
                quote: 'Dedicated, positive, and always eager to learn.',
                role: 'Operations Manager',
                profileImage: FemaleProfile,
                quoteColorClass: 'text-color-yellow',
                borderClass: 'border-color-red',
            },
            {
                quote: 'A professional, driven individual with great ideas.',
                role: 'Human Resources Generalist',
                profileImage: FemaleProfile,
                quoteColorClass: 'text-color-red',
                borderClass: 'border-color-yellow',
            },
            {
                quote: 'Dependable, creative, and passionate.',
                role: 'Senior Software Developer',
                profileImage: MaleProfile,
                quoteColorClass: 'text-color-red',
                borderClass: 'border-color-yellow',
            },
        ],
    },
    contact: {
        sectionAriaLabel: 'Contact',
        links: [
            {
                href: 'https://x.com/mejasonatkinson',
                iconClass: 'fa fa-2x fa-brands fa-x-twitter text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8',
                ariaLabel: 'Visit my X / Twitter profile',
                external: true,
            },
            {
                href: 'https://uk.linkedin.com/in/mejasonatkinson',
                iconClass: 'fa fa-2x fa-brands fa-linkedin text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8',
                ariaLabel: 'Visit my LinkedIn profile',
                external: true,
            },
            {
                href: 'https://github.com/mejasonatkinson/',
                iconClass: 'fa fa-2x fa-brands fa-github text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8',
                ariaLabel: 'Visit my GitHub profile',
                external: true,
            },
            {
                href: 'mailto:me@jasonatkinson.co.uk',
                iconClass: 'fa fa-2x fa-envelope text-4xl leading-none lg:border-4 border-color-off-white rounded-full text-color-off-white hover:border-color-off-white hover:text-color-teal hover:bg-color-off-white transition-all p-2 lg:p-8',
                ariaLabel: 'Send me an email',
                external: false,
            },
        ],
    },
    footer: {
        ownerName: 'Jason Atkinson',
        rightsLabel: 'All rights reserved.',
        bylinePrefix: 'Designed and developed by Jason Atkinson | ',
        repoUrl: 'https://github.com/mejasonatkinson/project-profile-home-2025',
        repoLabel: 'View on GitHub',
    },
};