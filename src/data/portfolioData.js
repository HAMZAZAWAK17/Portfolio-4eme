
export const personalInfo = {
    name: "Ezzouek Hamza",
    title: "DÉVELOPPEUR FULL-STACK / ÉTUDIANT EN GÉNIE LOGICIEL",
    description: "Je suis Ezzouek Hamza, stagiaire en développement full-stack, à la recherche d'une opportunité de stage pour enrichir mon expérience. Passionné par la création de solutions web complètes, je souhaite contribuer et perfectionner mes compétences dans un environnement professionnel stimulant.",
    email: "ezouekhamza2411@gmail.com",
    phone: "+212 640 347045",
    location: "Casablanca, Maroc",
    image: "/src/assets/Gemini_Generated_Image_2725dz2725dz2725.png",
    cvLink: "#",
};

export const skills = {
    frontend: [
        { name: "HTML", icon: "FaHtml5" },
        { name: "CSS", icon: "FaCss3Alt" },
        { name: "JavaScript", icon: "FaJs" },
        { name: "Bootstrap", icon: "FaBootstrap" },
        { name: "TailwindCSS", icon: "SiTailwindcss" },
        { name: "ReactJS", icon: "FaReact" },
    ],
    backend: [
        { name: "PHP", icon: "FaPhp" },
        { name: "Laravel", icon: "FaLaravel" },
        { name: "MySQL", icon: "SiMysql" },
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "NodeJS", icon: "FaNodeJs" },
        { name: "Express", icon: "SiExpress" },
        { name: "Java", icon: "FaJava" },
        { name: "XML", icon: "FaCode" },
    ],
    tools: [
        { name: "C#", icon: "SiCsharp" },
        { name: ".NET", icon: "SiDotnet" },
        { name: "UML", icon: "FaDiagramProject" },
        { name: "GanttProject", icon: "FaTasks" },
        { name: "Figma", icon: "FaFigma" },
        { name: "Canva", icon: "SiCanva" },
    ],
    management: [
        { name: "Agile", icon: "FaProjectDiagram" },
        { name: "Scrum", icon: "FaUsers" },
    ],
};

export const projects = [
    {
        id: 1,
        title: "Dentiste Site Web",
        description: "Site web pour un cabinet dentaire moderne avec gestion des rendez-vous.",
        image: "/src/assets/Projects-images/Dentaire/coverprjt.png",
        gallery: [
            "/src/assets/Projects-images/Dentaire/image.png",
            "/src/assets/Projects-images/Dentaire/image copy.png",
            "/src/assets/Projects-images/Dentaire/image copy 2.png",
            "/src/assets/Projects-images/Dentaire/image copy 3.png",
            "/src/assets/Projects-images/Dentaire/image copy 4.png",
        ],
        icon: "FaTooth",
        technologies: ["JavaScript", "HTML", "CSS", "PHP"],
        github: "https://github.com/HAMZAZAWAK17/dentiste",
        category: "frontend",
    },
    {
        id: 2,
        title: "Flutter Full Project",
        description: "Application mobile complète développée avec Flutter.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop",
        icon: "SiFlutter",
        technologies: ["Dart", "Flutter"],
        github: "https://github.com/HAMZAZAWAK17/Flutter_fullproject",
        category: "mobile",
    },
    {
        id: 3,
        title: "Weather Map App",
        description: "Application de carte météo interactive.",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&h=300&fit=crop",
        icon: "FaCloudSun",
        technologies: ["Dart", "Flutter"],
        github: "https://github.com/HAMZAZAWAK17/WethearMap",
        category: "mobile",
    },
    {
        id: 4,
        title: "News App",
        description: "Application d'actualités en temps réel.",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=300&fit=crop",
        icon: "FaRegNewspaper",
        technologies: ["Dart", "Flutter"],
        github: "https://github.com/HAMZAZAWAK17/News-app",
        category: "mobile",
    },
    {
        id: 5,
        title: "Formateur Management",
        description: "Système de gestion pour formateurs.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&h=300&fit=crop",
        icon: "FaChalkboardTeacher",
        technologies: ["JavaScript", "PHP", "MySQL"],
        github: "https://github.com/HAMZAZAWAK17/FormateurManagement-hamza-soufiane",
        category: "fullstack",
    },
    {
        id: 6,
        title: "Tracksol",
        description: "Solution de suivi de projet.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
        icon: "FaTasks",
        technologies: ["TypeScript", "React"],
        github: "https://github.com/HAMZAZAWAK17/Tracksol",
        category: "fullstack",
    },
    {
        id: 7,
        title: "Email Sender API",
        description: "API backend pour l'envoi d'emails avec Node.js.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop",
        icon: "FaPaperPlane",
        technologies: ["JavaScript", "Node.js", "Express"],
        github: "https://github.com/HAMZAZAWAK17/Email-Sender",
        category: "backend",
    },
    {
        id: 8,
        title: "Rate Limiter",
        description: "Middleware de limitation de débit pour Express API.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&h=300&fit=crop",
        icon: "FaShieldAlt",
        technologies: ["JavaScript", "Node.js"],
        github: "https://github.com/HAMZAZAWAK17/rate_limiter",
        category: "backend",
    },
    {
        id: 9,
        title: "App Sqlite TP",
        description: "Application mobile Android utilisant SQLite.",
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=500&h=300&fit=crop",
        icon: "FaDatabase",
        technologies: ["Java", "Android"],
        github: "https://github.com/HAMZAZAWAK17/AppSqlliteTp",
        category: "mobile",
    },
];

export const certifications = [
    {
        id: 1,
        title: "Python Training",
        platform: "Orange Digital Center",
        date: "04 - 05 Février 2026",
        description: "Certification de participation active au programme de formation Python organisé par Orange Digital Center Club Ben M'Sik.",
        image: "/src/assets/certificateorangepython.png",
        icon: "FaPython",
        link: "/src/assets/PYTHONCERTIF.pdf",
    },

];

export const languages = [
    { name: "Arabe", level: "Langue maternelle", percentage: 100 },
    { name: "Anglais", level: "Intermédiaire avancé", percentage: 75 },
    { name: "Français", level: "Intermédiaire avancé", percentage: 75 },
];

export const interests = [
    { name: "Kickboxing", icon: "MdSportsKabaddi" },
    { name: "Football", icon: "MdSportsSoccer" },
    { name: "Voyage", icon: "MdTravelExplore" },
];

export const socialLinks = {
    github: "https://github.com/HAMZAZAWAK17?tab=repositories",
    linkedin: "https://linkedin.com/in/ezzouekhamza",
    twitter: "https://twitter.com/ezzouekhamza",
    instagram: "https://instagram.com/ezzouekhamza",
};
