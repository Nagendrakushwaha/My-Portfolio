import { useState } from 'react'
import { projectCategories, projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

export function Projects() {
  const [filter, setFilter] = useState('All')
  const visibleProjects = filter === 'All' ? projects : projects.filter((project) => project.categories.includes(filter))
  return <main className="page-main"><section className="page-hero"><p className="overline">03 / Project archive</p><h1>Projects that turn<br /><em>curiosity into systems.</em></h1><p>Selected work across Machine Learning, Deep Learning, NLP, Data Science, Cybersecurity and Generative AI.</p></section>
    <section className="projects-page-section content-width"><div className="projects-toolbar"><div className="category-tabs" role="toolbar" aria-label="Filter projects">{projectCategories.map((category) => <button className={filter === category ? 'selected-tab' : ''} key={category} onClick={() => setFilter(category)}>{category}</button>)}</div><span className="result-count">{visibleProjects.length} projects</span></div>
      <div className="light-project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onDetails={(item) => { window.history.pushState({}, '', `/projects/${item.id}`); window.dispatchEvent(new PopStateEvent('popstate')) }} />)}</div></section>
  </main>
}

export function ProjectsPreview({ onDetails }) {
  return <div className="light-project-grid preview-grid">{projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.id} project={project} onDetails={onDetails} />)}</div>
}
