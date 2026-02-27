import React, { useState } from 'react';

interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  type: 'Journal' | 'Conference' | 'Workshop';
  link?: string;
}

const publications: Publication[] = [
  // Journals
  {
    id: 1,
    title: "Validating polyp and instrument segmentation methods in colonoscopy through Medico 2020 and MedAI 2021 Challenges",
    authors: "D. Jha et al.",
    venue: "Medical Image Analysis, 2024",
    type: "Journal",
  },
  {
    id: 2,
    title: "PolypGen: A multi-center polyp detection and segmentation dataset for generalisability assessment",
    authors: "D. Jha et al.",
    venue: "Nature Scientific Data, 2023",
    type: "Journal",
  },
  {
    id: 3,
    title: "Machine Learning-based Classification, Detection, and Segmentation of Medical Images",
    authors: "D. Jha",
    venue: "PhD Thesis, 2022",
    type: "Journal",
  },
  {
    id: 4,
    title: "FANet: A Feedback Attention Network for Improved Biomedical Image Segmentation",
    authors: "N. Tomar, D. Jha et al.",
    venue: "IEEE Transactions on Neural Networks and Learning Systems, 2022",
    type: "Journal",
  },
  {
    id: 5,
    title: "MSRF-Net: A Multi-Scale Residual Fusion Network for Biomedical Image Segmentation",
    authors: "A. Srivastava, D. Jha et al.",
    venue: "IEEE Journal of Biomedical and Health Informatics, 2022",
    type: "Journal",
  },
  {
    id: 6,
    title: "Meta-learning with implicit gradients in a few-shot setting for medical image segmentation",
    authors: "R. Khadka, D. Jha et al.",
    venue: "Computers in Biology and Medicine, 2022",
    type: "Journal",
  },
  {
    id: 7,
    title: "A Comprehensive analysis of classification methods in gastrointestinal endoscopy imaging",
    authors: "D. Jha et al.",
    venue: "Medical Image Analysis, vol. 70, 2021",
    type: "Journal",
  },
  {
    id: 8,
    title: "A Comprehensive Study on Colorectal Polyp Segmentation with ResUNet++, Conditional Random Field and Test-Time Augmentation",
    authors: "D. Jha et al.",
    venue: "IEEE Journal of Biomedical and Health Informatics, 2021",
    type: "Journal",
  },
  {
    id: 9,
    title: "Real-Time Polyp Detection, Localization and Segmentation in Colonoscopy Using Deep Learning",
    authors: "D. Jha et al.",
    venue: "IEEE Journal of Biomedical and Health Informatics, 2021",
    type: "Journal",
  },
  {
    id: 10,
    title: "Comparative validation of multi-instance instrument segmentation in endoscopy: results of the ROBUST-MIS 2019 Challenge",
    authors: "T. Ross, A. Reinke, D. Jha et al.",
    venue: "Medical Image Analysis, vol. 70, 2021",
    type: "Journal",
  },
  {
    id: 11,
    title: "An Extensive Study on Cross-Dataset Bias and Evaluation Metrics Interpretation for Machine Learning Applied to Gastrointestinal Tract Abnormality Classification",
    authors: "V. Thambawita, D. Jha et al.",
    venue: "ACM Transactions on Computing for Healthcare, vol. 1, no. 3, 2021",
    type: "Journal",
  },
  {
    id: 12,
    title: "Kvasir-Capsule, a video capsule endoscopy dataset",
    authors: "P. Smedsrud*, H. Gjestang*, O. Nedrejord*, E. Næss*, V. Thambawita*, S. Hicks*, H. Borgli*, D. Jha* et al.",
    venue: "Nature Scientific Data [equally contributed], 2021",
    type: "Journal",
  },
  {
    id: 13,
    title: "Hyper-Kvasir: A Comprehensive Multi-Class Image and Video Dataset for Gastrointestinal Endoscopy",
    authors: "H. Borgli*, V. Thambawita*, P. Smedsrud*, S. Hicks*, D. Jha*, S. Eskeland et al.",
    venue: "Nature Scientific Data [Contributed equally], 2020",
    type: "Journal",
  },
  {
    id: 14,
    title: "Diagnosis of Alzheimer's Disease Using Dual-Tree Complex Wavelet Transform, PCA, and Feed-Forward Neural Network",
    authors: "D. Jha et al.",
    venue: "Journal of Healthcare Engineering, 2017",
    type: "Journal",
  },
  // Conferences
  {
    id: 15,
    title: "CT Liver Segmentation via PVT-based Encoding and Refined Decoding",
    authors: "D. Jha et al.",
    venue: "ISBI, 2024",
    type: "Conference",
  },
  {
    id: 16,
    title: "GastroVision: A Multi-class Endoscopy Image Dataset for Computer-Aided GI Disease Detection",
    authors: "D. Jha et al.",
    venue: "ICML ML4MHD Workshop, 2023",
    type: "Conference",
  },
  {
    id: 17,
    title: "TransNetR: Transformer-based Residual Network for Polyp Segmentation with Multi-Center Out-of-Distribution Testing",
    authors: "D. Jha et al.",
    venue: "MIDL, 2023",
    type: "Conference",
  },
  {
    id: 18,
    title: "TransResU-Net: Transformer-based ResU-Net for Real-Time Colonoscopy Polyp Segmentation",
    authors: "N. K. Tomar, A. Shergill, B. Rieders, U. Bagci, & D. Jha",
    venue: "IEEE BHI, 2022",
    type: "Conference",
  },
  {
    id: 19,
    title: "Text-guided attention for improved polyp segmentation",
    authors: "N. K. Tomar, D. Jha, U. Bagci, Sharib Ali",
    venue: "MICCAI, 2022",
    type: "Conference",
  },
  {
    id: 20,
    title: "Progressively Normalized Self-Attention Network for Video Polyp Segmentation",
    authors: "G.-P. Ji, Y.-C. Chou, D.-P. Fan, G. Chen, H. Fu, D. Jha, L. Shao",
    venue: "MICCAI, 2021",
    type: "Conference",
  },
  {
    id: 21,
    title: "Exploring Deep Learning Methods for Real-Time Surgical Instrument Segmentation in Laparoscopy",
    authors: "D. Jha et al.",
    venue: "IEEE BHI, 2021",
    type: "Conference",
  },
  {
    id: 22,
    title: "NanoNet: Real-Time Polyp Segmentation in Video Capsule Endoscopy and Colonoscopy",
    authors: "D. Jha et al.",
    venue: "IEEE CBMS, 2021",
    type: "Conference",
  },
  {
    id: 23,
    title: "The EndoTect 2020 Challenge: Evaluation and Comparison of Classification, Segmentation and Inference Time for Endoscopy",
    authors: "S. A. Hicks, D. Jha, V. Thambawita, P. Halvorsen and M. Riegler",
    venue: "ICPR Workshop, 2020",
    type: "Conference",
  },
  {
    id: 24,
    title: "LightLayers: Parameter-Efficient Dense and Convolutional Layers for Image Classification",
    authors: "D. Jha et al.",
    venue: "PDCAT-PAAP, 2020",
    type: "Conference",
  },
  {
    id: 25,
    title: "DoubleU-Net: A Deep Convolutional Neural Network for Medical Image Segmentation",
    authors: "D. Jha et al.",
    venue: "CBMS, 2020",
    type: "Conference",
  },
  {
    id: 26,
    title: "Kvasir-SEG: A segmented polyp dataset",
    authors: "D. Jha et al.",
    venue: "IEEE ISM, 2019",
    type: "Conference",
  },
  {
    id: 27,
    title: "ResUNet++: An advanced architecture for medical image segmentation",
    authors: "D. Jha et al.",
    venue: "IEEE ISM, 2019",
    type: "Conference",
  },
];

const types = ['All', 'Journal', 'Conference', 'Workshop'] as const;
type FilterType = typeof types[number];

const Publications: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('All');

  const filtered = filter === 'All'
    ? publications
    : publications.filter(p => p.type === filter);

  return (
    <main className="min-h-screen bg-white px-6 py-28 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">Publications</h1>
        <p className="text-gray-500 text-base md:text-lg mb-8">Research publications by the Perception Intelligence Lab.</p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                filter === t
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        
        <ol className="space-y-6">
          {filtered.map((pub, idx) => (
            <li key={pub.id} className="flex gap-4 border-b border-gray-100 pb-6">
              <span className="text-gray-400 font-medium text-sm pt-1 min-w-[1.5rem] text-right">{idx + 1}.</span>
              <div className="flex-1">
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base md:text-lg font-semibold text-gray-900 hover:text-[#0ed6e8] transition-colors duration-200 leading-snug"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <p className="text-base md:text-lg font-semibold text-gray-900 leading-snug">{pub.title}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">{pub.authors}</p>
                <p className="text-sm text-gray-400 italic">{pub.venue}</p>
              </div>
            </li>
          ))}
        </ol>

        {filtered.length === 0 && (
          <p className="text-gray-400 text-center mt-16">No publications found for this category.</p>
        )}
      </div>
    </main>
  );
};

export default Publications;
