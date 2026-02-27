import React, { useState } from 'react';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
const JoinUs: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    degree: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-28 md:py-32">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-28">

        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 tracking-tight">Join Us</h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            We are always looking for motivated and talented individuals to join the Perception Intelligence Lab.
            Whether you are a prospective PhD student, MS student, postdoc, or visiting researcher, we'd love to hear from you.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">PhD Students</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We welcome applications from students with a strong background in computer science, machine learning, or medical imaging. Funding opportunities are available.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Postdoctoral Researchers</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We look for postdocs passionate about AI-driven medical imaging research with a track record of publications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">MS / Visiting Students</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                MS students and visiting researchers interested in working on cutting-edge AI projects are welcome to reach out.
              </p>
            </div>
          </div>

          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 tracking-tight">Contact Us</h2>
            <p className="text-gray-500 text-sm mb-6">Reach out through any of the channels below.</p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:debesh.jha@usd.edu"
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:border-[#0ed6e8] hover:shadow-sm transition-all duration-200 group">
                <MdEmail className="text-xl text-[#0ed6e8]" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-[#0ed6e8] transition-colors">debesh.jha@usd.edu</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/debesh-jha-ph-d-071462aa/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:border-[#0ed6e8] hover:shadow-sm transition-all duration-200 group">
                <FaLinkedin className="text-xl text-[#0ed6e8]" />
                <div>
                  <p className="text-xs text-gray-400">LinkedIn</p>
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-[#0ed6e8] transition-colors">Debesh Jha</p>
                </div>
              </a>
              <a href="https://debeshjha.github.io/MyWebPortfolio/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:border-[#0ed6e8] hover:shadow-sm transition-all duration-200 group">
                <FaGlobe className="text-xl text-[#0ed6e8]" />
                <div>
                  <p className="text-xs text-gray-400">Portfolio</p>
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-[#0ed6e8] transition-colors">debeshjha.github.io</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        
        <div className="flex-1">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 border border-gray-200 rounded-2xl px-8">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
              <p className="text-gray-500">Your application has been received. We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-gray-200 rounded-2xl p-6 md:p-8 space-y-5">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Get in Touch</h2>
              <p className="text-sm text-gray-400 mb-4">Fill out the form and we'll get back to you as soon as possible.</p>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-400">*</span></label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0ed6e8] focus:border-transparent transition"
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@gmail.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0ed6e8] focus:border-transparent transition"
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Interested In <span className="text-red-400">*</span></label>
                <select
                  name="position"
                  required
                  value={form.position}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0ed6e8] focus:border-transparent transition text-gray-700 bg-white"
                >
                  <option value="" disabled>Select a position</option>
                  <option value="PhD Student">PhD Student</option>
                  <option value="MS Student">MS Student</option>
                  <option value="Postdoctoral Researcher">Postdoctoral Researcher</option>
                  <option value="Visiting Researcher">Visiting Researcher</option>
                  <option value="Undergraduate Researcher">Undergraduate Researcher</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highest Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="e.g. B.Sc. in Computer Science"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0ed6e8] focus:border-transparent transition"
                />
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-400">*</span></label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your research interests, background, and why you'd like to join the lab..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0ed6e8] focus:border-transparent transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0ed6e8] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-md"
              >
                Submit Application
              </button>
            </form>
          )}
        </div>

      </div>


    </main>
  );
};

export default JoinUs;
