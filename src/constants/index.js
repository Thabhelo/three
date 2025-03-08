import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    telone,
    ewc,
    homenergy,
    sos,
    heatexchange,
    threejs,
    skillcon, 
    carpriceprediction
} from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
    {
      id: "resume",
      title: "Resume",
      url: "/src/assets/Thabhelo_Duve_Resume.pdf",
      download: true,
    },
  ];
  
  const services = [
    {
      title: "Software Engineer",
      icon: web,
    },
    {
      title: "Data Science/ML Engineer",
      icon: mobile,
    },
    {
      title: "Cloud Engineer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "Git",
      icon: git,
    },
    {
      name: "Figma",
      icon: figma,
    },
    {
      name: "Docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Data Analyst",
      company_name: "TelOne",
      location: "Bulawayo, Zimbabwe",
      iconBg: "#E6DEDD",
      icon: telone,
      date: "Sep 2021 - Aug 2022",
      points: [
        "Developed automated data collection processes using Excel and PowerBI, reducing manual effort by 50%, and ensuring consistent and accurate data retrieval.",
        "Achieved a 23% surge in FTTH recovery rate during the initial 2 quarters of 2021.",
        "Created interactive dashboards using Tableau and streamlined management's data-driven decisions, enhancing visual data interpretation and reducing analysis time by 30%.",
        "Automated generation of monthly performance reports using Excel macros, saving 20 hours of manual effort per month and improving report accuracy.",
        "Implemented data cleaning and validation procedures with OpenRefine, resulting in a 30% increase in KYC data accuracy."
      ],
    },
    {
      title: "Teaching Assistant",
      company_name: "Emzini We Code",
      location: "Hybrid",
      iconBg: "#383E56",
      icon: ewc,
      date: "Feb 2023 - Aug 2023",
      points: [
        "Conducted weekly office hours, providing comprehensive support to an average of 30 students, resulting in a 75% increase in the comprehension of complex Python programming concepts.",
        "Monitored and optimized the course website 3 times every week, ensuring that course materials and announcements were up-to-date, on time, and easily accessible to students.",
        "Graded student labs, tests, and projects on Gradescope, facilitated discussions on Piazza, and gave feedback within 36 hours, boosting student engagement by 50%.",
        "Mentored 300+ students on complex programming topics, resulting in a 35% increase in labs performance and proficiency in real-world problem-solving among students."
      ],
    }
  ];
  
  
  const testimonials = [
    {
      testimonial:
        "Great progress man! I am proud of the work you have been doing and your zeal to learn new languages and technologies over the past couple of years! Proud mentor.",
      name: "Andile Mbele",
      designation: "Co-Founder",
      company: "Qu Stack | Co-founder of  Rooibos Radar",
      image: "https://assets.reactbricks.com/7RGlvboX1CS42u-/images/src_set/snSZpakDutuywOF-800/andilejadenmbele.webp",
    },
    {
      testimonial:
        "Your dedication and awesome work ethic has a great impact and progressive effect to the Emzini we Code community. Thank you for your continued willingness to support.",
      name: "Eric Khumalo",
      designation: "Data Scientist & Privacy Engineer",
      company: "Good Research | Founder & Head Instructor at Emzini we Code",
      image: "https://assets.reactbricks.com/7RGlvboX1CS42u-/images/src_set/dfHtNR0PAMYu6Sk-123/eric-1x.webp",
    },
    {
      testimonial:
        "I am impressed by the brilliant work you are doing in such a short period of time since you arrived, I am optimistic that we will cover a lot of ground and be ahead of our goals for this year's quarter 1 and 2.",
      name: "Temba Ngwenya",
      designation: "Client Relations Associate",
      company: "TelOne",
      image: "https://assets.reactbricks.com/7RGlvboX1CS42u-/images/src_set/XCBivarIyrKVIIK-225/temba.webp",
    },
  ];
  
  const projects = [
    {
      name: "SkillConnect",
      description:
        "SkillCon connects skilled volunteers with nonprofits, leveraging artificial intelligence to create meaningful and impactful partnerships. Our mission is to bridge the gap between talented individuals who want to make a difference and organizations that need their expertise.",
      tags: [
        {
          name: "TypeScript",
          color: "orange-text-gradient"
        },
        {
          name: "React",
          color: "purple-text-gradient"
        },
        {
          name: "NodeJS",
          color: "blue-text-gradient"
        },
        {
          name: "Tailwind",
          color: "pink-text-gradient"
        },
        
      ],
      image: skillcon,
      source_code_link: "https://github.com/Thabhelo/skillcon",
    },
    {
      name: "Homenergy",
      description:
        "Homenergy is a smart home management application built with Next.js, React, and TailwindCSS. It allows users to manage their smart home devices, monitor energy usage, and receive AI-powered recommendations for energy savings.",
      tags: [
        {
          name: "TypeScript",
          color: "green-text-gradient",
        },
        {
          name: "TailwindCSS",
          color: "green-text-gradient",
        },
        {
          name: "React",
          color: "blue-text-gradient",
        },

      ],
      image: homenergy,
      source_code_link: "https://github.com/Thabhelo/homenergy",
    },
    {
      name: "SOS/Emergency App",
      description:
        "SOS is designed to provide immediate assistance during emergencies. Features include one-tap SOS activation, real-time location sharing, emergency contact management, health monitoring integration, and notification functionality.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "nextjs",
          color: "green-text-gradient",
        },
        {
          name: "TailwindCSS",
          color: "pink-text-gradient",
        },
        {
          name: "twilio",
          color: "blue-text-gradient",
        },
        
        {
          name: "firebase",
          color: "green-text-gradient",
        }
      ],
      image: sos,
      source_code_link: "https://github.com/Thabhelo/sos/",
    },
    {
      name: "Car Price Prediction Model",
      description:
        "This project involves analyzing a car price dataset using Python libraries such as NumPy, Pandas, Matplotlib, Seaborn, and sklearn. The goal is to pre-process the dataset by applying feature engineering, feature selection, and exploratory data analysis. Note that actual model building is not part of this project.",
      tags: [
        {
          name: "Python",
          color: "blue-text-gradient",
        },
        {
          name: "Pandas",
          color: "green-text-gradient",
        },
        {
          name: "NumPy",
          color: "pink-text-gradient",
        },
        {
          name: "Seaborn",
          color: "blue-text-gradient",
        },
        {
          name: "Matplotlib",
          color: "green-text-gradient",
        }, 
        {
          name: "SciKit-Learn",
          color: "pink-text-gradient",
        }
      ],
      image: carpriceprediction,
      source_code_link: "https://www.github.com/Thabhelo/car-price-prediction",
    },
    {
      name: "Heat Exchange Reactor",
      description:
        "This project aims to optimize the production of benzenesulphonic acid in a chemical plant by analyzing data collected from a double-pipe heat exchanger reactor. The goal is to maximize the composition of benzenesulphonic acid while minimizing production costs, using operational data from one month. The project focuses on understanding the process, pre-processing the data, developing models for prediction, and providing recommendations for cost-efficient production.",
      tags: [
        {
          name: "Python",
          color: "blue-text-gradient",
        },
        {
          name: "Pandas",
          color: "green-text-gradient",
        },
        {
          name: "NumPy",
          color: "pink-text-gradient",
        },
        {
          name: "Seaborn",
          color: "blue-text-gradient",
        },
        {
          name: "Matplotlib",
          color: "green-text-gradient",
        }, 
        {
          name: "SciKit-Learn",
          color: "pink-text-gradient",
        }
      ],
      image: heatexchange,
      source_code_link: "https://github.com/Thabhelo/heat-exchanger-reactor",
    },
    
  ];
  
  export { services, technologies, experiences, testimonials, projects };