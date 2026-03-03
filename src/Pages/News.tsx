import React from 'react';
import { FiExternalLink } from 'react-icons/fi';

interface NewsItem {
  id: number;
  year: string;
  title: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    year: '2025',
    title: 'Top 2% Scientist Ranking',
    description:
      'For the third consecutive year, Dr. Jha was named among the World\'s Top 2% Scientists by Stanford University and Elsevier for his global impact in AI and Biomedical Engineering.',
    link: 'https://debeshjha.github.io/',
    linkLabel: 'View Profile',
  },
  {
    id: 2,
    year: '2025',
    title: 'NSF I-Corps Award',
    description:
      'Dr. Jha received a National Science Foundation (NSF) I-Corps award to explore the commercial potential of his AI-driven medical imaging research.',
    link: 'https://www.usd.edu/About/Departments-Offices-and-Resources/Office-of-Research-and-Sponsored-Programs/USD-I-Corps',
    linkLabel: 'USD I-Corps Program',
  },
  {
    id: 3,
    year: '2025',
    title: 'A&S Professional Development Grant - USD',
    description:
      'Awarded the College of Arts & Sciences Professional Development Grant by the University of South Dakota for the Spring 2025 semester.',
    link: 'https://www.usd.edu/',
    linkLabel: 'USD Website',
  },
  {
    id: 4,
    year: '2024',
    title: 'IEEE Junior Distinguished R&D Award',
    description:
      'Honored by the IEEE Chicago Section for outstanding research and development contributions in computer-aided diagnosis and medical image segmentation at the 2024 Annual Awards Ceremony.',
    link: 'https://www.einpresswire.com/article/768534222/ieee-chicago-section-honors-excellence-at-the-2024-annual-awards-ceremony-and-announces-new-officers',
    linkLabel: 'Award Announcement',
  },
  {
    id: 5,
    year: '2024',
    title: 'Best Industry-Related Paper Award - ICPR',
    description:
      'His team\'s paper "Harmonized Spatial and Spectral Learning for Generalized Medical Image Segmentation" won the Best Industry-Related Paper Award, selected by the IAPR Industrial Liaison Committee at ICPR 2024 held in Kolkata, India.',
    link: 'https://icpr2024.org/Prizes-Awards.html',
    linkLabel: 'ICPR 2024 Awards',
  },
  {
    id: 6,
    year: '2024',
    title: 'IEEE Senior Member Elevation',
    description:
      'Dr. Jha was officially elevated to the grade of IEEE Senior Member, a distinction held by only 10% of IEEE members worldwide, recognizing his sustained professional achievement.',
    link: 'https://www.linkedin.com/posts/debesh-jha-ph-d-071462aa_ai-medicalimaging-ieeeawards-activity-7272435175316189184-trZ2',
    linkLabel: 'LinkedIn Announcement',
  },
  {
    id: 7,
    year: '2024',
    title: 'Poster of Distinction - Digestive Disease Week (DDW)',
    description:
      'Recognized during Digestive Disease Week (DDW) 2024 for impactful clinical research in AI-assisted gastrointestinal disease detection.',
    link: 'https://debeshjha.com/',
    linkLabel: 'Lab Website',
  },
  {
    id: 8,
    year: '2024',
    title: 'Assistant Professor Appointment at USD',
    description:
      'Dr. Jha joined the University of South Dakota as an Assistant Professor of Computer Science, establishing the Perception Intelligence Lab.',
    link: 'https://bagcilab.com/people/debesh-jha-postdoc-now-assistant-professor-at-university-of-south-dakota/',
    linkLabel: 'Announcement',
  },
  {
    id: 9,
    year: '2024',
    title: '10,000 Citations Milestone',
    description:
      'In late 2024, Dr. Jha surpassed 10,000 citations on Google Scholar, highlighting the massive global adoption of his AI architectures and open datasets.',
    link: 'https://scholar.google.com/citations?user=mMTyE68AAAAJ&hl=en',
    linkLabel: 'Google Scholar Profile',
  },
  {
    id: 10,
    year: '2024',
    title: 'ScholarGPS Top Scholar 2024',
    description:
      'Named a 2024 Top Scholar by ScholarGPS, ranking in the top 0.5% of scholars worldwide based on productivity, impact, and research quality.',
    link: 'https://www.linkedin.com/posts/debesh-jha-ph-d-071462aa_scholargps-topscholar2024-medicalai-activity-7339049453451915266-mVsd',
    linkLabel: 'LinkedIn Post',
  },
  {
    id: 11,
    year: '2024',
    title: 'NVIDIA Clara AI Integration',
    description:
      'His datasets (Kvasir-SEG) and algorithms (ColonSegNet) were integrated into NVIDIA Clara AI healthcare applications, enabling clinical-grade colonoscopy analysis.',
    link: 'https://docs.nvidia.com/clara-holoscan/archive/clara-deploy-0.7.4/sdk/dist/clara-reference-app/pipelines/colontumorpipeline/public/docs/readme.html',
    linkLabel: 'NVIDIA Clara Docs',
  },
  {
    id: 12,
    year: '2022',
    title: 'IEEE R&D Award - Northwestern University',
    description:
      'Received his first Junior Distinguished R&D Award from the IEEE Chicago Section while serving as a Senior Research Associate at Northwestern University.',
    link: 'https://www.linkedin.com/posts/debesh-jha-ph-d-071462aa_research-ieee-ieeechicago-activity-6999452486126247937-kMPY',
    linkLabel: 'LinkedIn Post',
  },
  {
    id: 13,
    year: '2022',
    title: 'Stanford AI Index Report - Kvasir-SEG Citation',
    description:
      'His Kvasir-SEG dataset was specifically cited in the Stanford University Artificial Intelligence Index Report 2022, recognizing it as a landmark open benchmark in medical AI.',
    link: 'https://hai.stanford.edu/ai-index/2022-ai-index-report',
    linkLabel: 'Stanford AI Index 2022',
  },
  {
    id: 14,
    year: '2021',
    title: 'PhD Thesis Defense - UiT, Norway',
    description:
      'Successfully defended his doctoral thesis "Machine Learning-based Classification, Detection, and Segmentation of Medical Images" at the University of Tromsø (UiT), Norway.',
    link: 'https://www.simula.no/about/news/debesh-jha-successfully-defended-his-thesis-0',
    linkLabel: 'Simula Announcement',
  },
];

const News: React.FC = () => {
  return (
    <main className="min-h-screen bg-white px-6 py-28 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">News</h1>
        <p className="text-gray-500 text-base md:text-lg mb-10">
          Recent recognition, awards, and milestones from the Perception Intelligence Lab.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsItems.map(item => (
            <div
              key={item.id}
              className="flex flex-col border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow duration-200"
            >
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">{item.year}</span>
              <h2 className="text-base font-semibold text-gray-900 leading-snug mb-2">{item.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-100 text-xs font-semibold text-[#0ed6e8] hover:underline transition-colors duration-200"
                >
                  <FiExternalLink className="text-sm" />
                  {item.linkLabel ?? 'Learn more'}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default News;
