import { Briefcase, Calendar, GraduationCap, Award, Code2 } from 'lucide-react'

const MILESTONES = [
  {
    type: 'role',
    date: 'Currently Active',
    title: 'Data Science Mentor',
    organization: 'Internship Catalyst',
    badge: 'Mentorship',
    details: 'Guiding learners through data science concepts, technical problem-solving, analytical thinking, machine learning pipelines, and project-based implementations.',
    icon: Briefcase,
  },
  {
    type: 'project',
    date: 'March 2026',
    title: 'Released ShopEase & Medical Vision Systems',
    organization: 'Autonomous AI Development',
    badge: 'Milestone',
    details: 'Completed ShopEase Conversational AI (Banking77: 88.72% test accuracy, Render Live Demo) and SmartMed Vision (RSNA: 93.60% accuracy, 0.9562 ROC-AUC).',
    icon: Code2,
  },
  {
    type: 'role',
    date: 'Dec 2025 — Mar 2026',
    title: 'Data Analytics Intern',
    organization: 'UptoSkill',
    badge: 'Internship',
    details: 'Worked with Python, SQL querying, statistical data analytics, data visualization with Pandas/Matplotlib/Seaborn, and data-driven business analytics concepts.',
    icon: Briefcase,
  },
  {
    type: 'education',
    date: '2023 — Present',
    title: 'B.Tech in Computer Science Engineering',
    organization: 'Sam Global University, Bhopal',
    badge: '7.85 / 10 CGPA',
    details: '3rd Year / 6th Semester. Focused on Artificial Intelligence, Machine Learning, Deep Learning, Data Structures & Algorithms, Database Systems, and Mathematics for ML.',
    icon: GraduationCap,
  },
  {
    type: 'program',
    date: 'Completed',
    title: 'Data Science Virtual Experience Program',
    organization: 'BCG (Boston Consulting Group)',
    badge: 'Industry Simulation',
    details: 'Completed project-based simulations applying structured business data analysis, analytical thinking, feature modeling, and strategic data-driven decision making.',
    icon: Award,
  },
]

export function EngineeringTimeline() {
  return (
    <section className="timeline-section content-width" id="experience">
      <div className="section-title">
        <span className="section-number">09</span>
        <div>
          <h2>Engineering Timeline &amp; Credentials</h2>
          <p>Verified academic foundations, data internships, technical mentorship, and project releases.</p>
        </div>
      </div>

      <div className="timeline-container">
        <div className="timeline-track">
          {MILESTONES.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="timeline-node">
                <div className="timeline-marker">
                  <Icon size={16} />
                </div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <span className="timeline-date">{item.date}</span>
                    <span className="timeline-badge">{item.badge}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <strong>{item.organization}</strong>
                  <p>{item.details}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
