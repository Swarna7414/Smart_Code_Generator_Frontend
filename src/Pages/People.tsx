import React from 'react';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const aboutSections = [
  {
    title: "Overview",
    body: "The Smart Code Generator is an intelligent backend system designed to automatically generate, execute, and refine code based on natural language input. It acts as a self-improving coding agent that not only writes code but also validates it by running it in a real environment. By combining large language models with an iterative execution loop, the system ensures that generated solutions are both functional and reliable.",
  },
  {
    title: "Core Architecture",
    body: "The system is built around a modular architecture where each component is responsible for a specific stage of the workflow. These modules include task classification, code generation, execution, error parsing, and reflection. Together, they form a continuous loop that improves code quality over multiple iterations. This design allows the system to handle both simple programming tasks and complex multi-step problems efficiently.",
  },
  {
    title: "Task Processing Strategy",
    body: "Every request begins with analyzing the user's input to determine the nature of the task. The system identifies whether the request requires actual code execution or a conceptual analysis. This classification ensures that resources are used efficiently and that the response is tailored to the user's intent. For example, pure Python tasks trigger execution mode, while comparison-based queries activate analysis mode.",
  },
  {
    title: "Code Generation Engine",
    body: "At the heart of the system lies a powerful code generation engine powered by a large language model. It constructs structured prompts using the user's task and optional test cases, ensuring that the generated code is complete and executable. The engine prioritizes clarity, correctness, and consistency, producing code that adheres to best practices and includes all necessary dependencies.",
  },
  {
    title: "Execution and Validation",
    body: "Once the code is generated, it is executed in a controlled environment using a subprocess. This step verifies whether the code actually works rather than just appearing correct. The system captures outputs, errors, execution time, and return status. By running the code in real conditions, it ensures that the final result meets practical requirements.",
  },
  {
    title: "Error Handling and Debugging",
    body: "If the generated code fails during execution, the system automatically analyzes the error output. It identifies the type of error, extracts relevant details such as line numbers, and prepares structured feedback. This process enables precise debugging and ensures that issues are clearly understood before attempting any fixes.",
  },
  {
    title: "Iterative Improvement Loop",
    body: "One of the most powerful features of the system is its iterative refinement loop. When an error is detected, the system sends the faulty code along with the error details back to the language model. The model then generates an improved version of the code along with a brief explanation of the fix. This cycle repeats until the code executes successfully or a predefined limit is reached.",
  },
  {
    title: "Multi-Language Analysis",
    body: "For tasks involving multiple programming languages or comparisons, the system switches to analysis mode. Instead of executing code, it generates structured responses that include implementations in different languages, explanations, difficulty levels, and comparisons. This helps users understand trade-offs and choose the best approach for their needs.",
  },
  {
    title: "Real-Time Communication",
    body: "The backend uses Server-Sent Events (SSE) to stream updates to the client in real time. This means users can see progress as it happens, including code generation, execution results, errors, and refinements. This streaming approach improves transparency and provides a more interactive user experience.",
  },
  {
    title: "Performance Evaluation",
    body: "After completing a session, the system can evaluate its own performance by analyzing metrics such as execution time, number of iterations, error types, and success rate. These insights help measure efficiency and can be used to further optimize the system.",
  },
];

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
          Meet the Students behind the Smart Code Generator.
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

        {/* About Section */}
        <section className="mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 tracking-tight">
            Design and Implementation of the Smart Code Generator
          </h2>

          <div className="flex flex-col gap-8">
            {aboutSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-black mb-2">{section.title}</h3>
                <p className="text-sm text-gray-700 leading-7 text-justify">{section.body}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default People;
