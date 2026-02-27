import React, { useState } from 'react';
import DataMining from '../assets/Courses/Datamining.png';
import Computers from '../assets/Courses/Computers.png';
import Seminar from '../assets/Courses/Seminar.png';
import MachineLearning from '../assets/Courses/MachineLearning.png';

interface Course {
  id: number;
  title: string;
  description: string;
  level: 'Graduate' | 'Undergraduate';
  university: string;
  image: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Data Mining",
    level: "Graduate",
    university: "University of South Dakota",
    image: DataMining,
    description:
      "In this graduate course at University of South Dakota, students gain the ability to transform raw datasets into meaningful insights. The course emphasizes feature engineering, clustering, classification, and association rule learning, while also covering evaluation and reproducibility. Learners work with diverse datasets, practice model validation, and explore practical applications in science, business, and healthcare. By the end, they can design robust pipelines, detect patterns responsibly, and communicate findings effectively to both technical and non-technical audiences. The course blends technical depth with a strong focus on clarity, ethics, and hands-on experimentation.",
  },
  {
    id: 2,
    title: "Introduction to Computers",
    level: "Undergraduate",
    university: "University of South Dakota",
    image: Computers,
    description:
      "This course at University of South Dakota offers a clear introduction to the world of computing, covering hardware, operating systems, software, and networks. Through interactive examples, learners build confidence in navigating digital systems and solving everyday computing problems. We highlight essential concepts like file organization, safe browsing, backups, and productivity tools, all taught with practical demonstrations. Students also practice communication of technical issues, making them better prepared for teamwork in advanced studies. By the end, learners understand not just how computers work, but how to use them responsibly and efficiently in research, professional, and personal contexts.",
  },
  {
    id: 3,
    title: "Seminar",
    level: "Graduate",
    university: "University of South Dakota",
    image: Seminar,
    description:
      "The graduate seminar at University of South Dakota is designed to strengthen analytical thinking, presentation skills, and collaborative learning. Students engage with current research, prepare short talks, and participate in thoughtful discussions on emerging topics in computing and data science. The environment emphasizes inclusivity, critical questioning, and respectful dialogue. Participants learn how to critique ideas constructively, synthesize multiple viewpoints, and translate theory into practice. This course helps students build confidence as academic contributors, refine their communication style, and cultivate habits of lifelong learning, preparing them to thrive in both academic and professional environments.",
  },
  {
    id: 4,
    title: "Introduction to Machine Learning",
    level: "Graduate",
    university: "University of South Dakota",
    image: MachineLearning,
    description:
      "At University of South Dakota, this graduate-level machine learning course provides a strong foundation in both supervised and unsupervised methods. Students explore regression, classification, clustering, ensemble methods, and neural networks, with a focus on when and why models work. Hands-on labs encourage coding, experimentation, and reproducibility, while lectures emphasize ethics, fairness, and explainability in AI systems. By the end of the course, students can confidently design, train, and evaluate models on real datasets, balancing accuracy with transparency.",
  },
];

const levels = ['All', 'Graduate', 'Undergraduate'] as const;
type FilterLevel = typeof levels[number];

const Courses: React.FC = () => {
  const [filter, setFilter] = useState<FilterLevel>('All');

  const filtered = filter === 'All' ? courses : courses.filter(c => c.level === filter);

  return (
    <main className="min-h-screen bg-white px-6 py-28 md:py-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">Courses</h1>
        <p className="text-gray-500 text-base md:text-lg mb-8">
          Courses taught at the University of South Dakota.
        </p>

        
        <div className="flex flex-wrap gap-2 mb-10">
          {levels.map(l => (
            <button
              key={l}
              onClick={() => setFilter(l)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === l
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        
        <div className="space-y-6">
          {filtered.map((course) => (
            <div key={course.id} className="flex flex-col sm:flex-row gap-5 border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-all duration-200">
              
              <div className="sm:w-56 flex-shrink-0 flex items-center justify-center bg-gray-50 p-3">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              
              <div className="flex flex-col justify-center p-5 sm:pl-0">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{course.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-400 text-center mt-16">No courses found for this level.</p>
        )}
      </div>
    </main>
  );
};

export default Courses;
