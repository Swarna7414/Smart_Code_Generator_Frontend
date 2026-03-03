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
    name: "Nikhil Kumar Tomar",
    role: "Researcher",
    bio: "Researcher at Northwestern University specializing in medical image segmentation and deep learning. Co-author of 24+ publications including FANet, TransNetR, TransResU-Net, and NanoNet. Contributes to AI-driven solutions for colonoscopy, polyp detection, and biomedical image analysis.",
    initials: "NT",
    links: {
      github: "https://github.com/nikhilroxtomar",
      linkedin: "https://www.linkedin.com/in/nktomar",
    },
  },
  {
    id: 2,
    name: "Harshith Reddy Nalla",
    role: "Undergraduate Research Assistant",
    bio: "Undergraduate Research Assistant at the University of South Dakota, mentored by Professor Debesh Jha. Works on AI-powered medical imaging and intelligent web applications integrating deep learning and scalable backend systems.",
    initials: "HN",
    links: {
      github: "https://github.com/HarshithReddy01",
      linkedin: "https://www.linkedin.com/in/harshith-reddy-nalla-6005012ab/",
      website: "https://harshithreddy01.github.io/My-Web/",
    },
  },
  {
    id: 3,
    name: "Sai Sankar Swarna",
    role: "Graduate Assistant",
    bio: "Graduate Assistant at the University of South Dakota specializing in Computer Science. Experienced in Spring Boot, Java, Python, and DevOps tools, contributing to scalable backend systems and academic instruction.",
    initials: "SS",
    links: {
      website: "https://swarna7414.github.io/SwarnaSaiSankar/",
      linkedin: "https://www.linkedin.com/in/swarna-sai-sankar-a1084a203",
      github: "https://github.com/Swarna7414",
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
