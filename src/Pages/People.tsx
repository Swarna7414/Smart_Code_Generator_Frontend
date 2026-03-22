import React from 'react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

interface Person {
  id: number;
  name: string;
  role: string;
  bio: string;
  initials: string;
  links: {
    website?: string;
    linkedin?: string;
    github?: string;
  };
}

const people: Person[] = [
  {
    id: 1,
    name: "Sai Sankar Swarna",
    role: "Graduate Student, Computer Science",
    bio: "Full Stack Developer with 3.5+ years of experience building scalable web applications using React, Java, and Python. Skilled in microservices, RESTful APIs. Experienced in deploying on AWS (EC2, ECS, EKS) with CI/CD via Jenkins. Also working with Generative AI and Agentic AI to build intelligent, AI-powered applications and automation agents.",
    initials: "SSS",
    links: {
      website: "https://swarna7414.github.io/SwarnaSaiSankar/",
      linkedin: "https://www.linkedin.com/in/swarna-sai-sankar-a1084a203",
      github: "https://github.com/Swarna7414",
    },
  },
  {
    id: 2,
    name: "Ramya Dabbara",
    role: "Graduate Student, Computer Science",
    bio: "CS graduate student with a strong interest in Agentic AI and its real-world applications. ~3 years of experience building intelligent systems with Python and ML frameworks. Recent projects include an AI-powered Resume Evaluation Tool using Google Gemini and a personalized study path generator using Reinforcement Learning.",
    initials: "RD",
    links: {
      website: "https://ramya2000-7.github.io/Ramya-portfolio/",
      linkedin: "https://www.linkedin.com/in/ramya-dabbara-7a573b349/",
      github: "https://github.com/Ramya2000-7",
    },
  },
];

const People: React.FC = () => {
  return (
    <main className="min-h-screen bg-white px-6 py-28 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">People</h1>
        <p className="text-gray-500 text-base md:text-lg mb-12">
          Meet the team behind the Perception Intelligence Lab.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {people.map((person) => (
            <div
              key={person.id}
              className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200"
            >
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg tracking-wide">{person.initials}</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">{person.name}</h2>
                  <p className="text-sm text-[#0ed6e8] font-medium">{person.role}</p>
                </div>
              </div>

              
              <p className="text-sm text-gray-500 leading-relaxed">{person.bio}</p>

              
              <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100">
                {person.links.website && (
                  <a
                    href={person.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0ed6e8] transition-colors duration-200"
                  >
                    <FaGlobe className="text-sm" />
                    Website
                  </a>
                )}
                {person.links.linkedin && (
                  <a
                    href={person.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0ed6e8] transition-colors duration-200"
                  >
                    <FaLinkedin className="text-sm" />
                    LinkedIn
                  </a>
                )}
                {person.links.github && (
                  <a
                    href={person.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-[#0ed6e8] transition-colors duration-200"
                  >
                    <FaGithub className="text-sm" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default People;
