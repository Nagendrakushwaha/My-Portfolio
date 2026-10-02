import { useMemo, useState } from 'react'
import { ArrowUpRight, Filter, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { projectCategories, projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

const EXTENDED_CATEGORIES = [
  'All',
  'Deep Learning',
  'Computer Vision',
  'Generative AI',
  'NLP',
  'Machine Learning',
  'Data Science',
  'Cybersecurity',
  'Live Demo / Deployed',
]

export function Projects() {
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured') // 'featured', 'accuracy', 'alphabetical'

  const filteredProjects = useMemo(() => {
    let list = [...projects]

    // Category filter
    if (filter === 'Live Demo / Deployed') {
      list = list.filter((p) => p.liveDemo || (p.deployment && p.deployment !== 'None'))
    } else if (filter !== 'All') {
      list = list.filter((p) => p.categories.includes(filter) || p.category === filter)
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)) ||
          p.concepts.some((c) => c.toLowerCase().includes(q)) ||
          (p.dataset && p.dataset.toLowerCase().includes(q)) ||
          (p.models && p.models.some((m) => m.toLowerCase().includes(q)))
      )
    }

    // Sorting
    if (sortBy === 'featured') {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    } else if (sortBy === 'accuracy') {
      list.sort((a, b) => (b.metrics?.accuracy || 0) - (a.metrics?.accuracy || 0))
    } else if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    }

    return list
  }, [filter, searchQuery, sortBy])

  return (
    <main className="page-main">
      <section className="page-hero content-width">
        <p className="overline">
          <Sparkles size={12} className="orange-dot-icon" /> 02 / Interactive Project Lab
        </p>
        <h1>
          Engineering Systems &amp;
          <br />
          <em>Verified ML Architectures.</em>
        </h1>
        <p>
          End-to-end machine learning, deep computer vision, and generative conversational AI pipelines built with PyTorch, FastAPI, React, and classical ensembles.
        </p>
      </section>

      <section className="projects-page-section content-width">
        {/* Lab Toolbar */}
        <div className="projects-lab-toolbar">
          {/* Search Input */}
          <div className="lab-search-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="lab-search-input"
              placeholder="Search by technology (PyTorch, RAG), dataset (RSNA, Banking77), or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="lab-sort-wrap">
            <SlidersHorizontal size={14} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="lab-sort-select"
              aria-label="Sort projects"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="accuracy">Sort: Highest Accuracy</option>
              <option value="alphabetical">Sort: Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-tabs-bar">
          <div className="category-tabs" role="toolbar" aria-label="Filter projects by domain">
            {EXTENDED_CATEGORIES.map((category) => (
              <button
                className={`category-pill ${filter === category ? 'selected-tab' : ''}`}
                key={category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <span className="result-count">
            Showing {filteredProjects.length} of {projects.length} systems
          </span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <p>No projects match your search query &quot;{searchQuery}&quot; under &quot;{filter}&quot;.</p>
            <button
              className="soft-button"
              onClick={() => {
                setFilter('All')
                setSearchQuery('')
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="light-project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDetails={(item) => {
                  window.history.pushState({}, '', `/projects/${item.id}`)
                  window.dispatchEvent(new PopStateEvent('popstate'))
                }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export function ProjectsPreview({ onDetails, filterPersona }) {
  const displayedProjects = useMemo(() => {
    let list = [...projects]

    if (filterPersona === 'genai') {
      // Prioritize GenAI & NLP
      return list.sort((a, b) => {
        const aGen = (a.categories || []).includes('Generative AI') || (a.categories || []).includes('NLP') ? 1 : 0
        const bGen = (b.categories || []).includes('Generative AI') || (b.categories || []).includes('NLP') ? 1 : 0
        return bGen - aGen
      })
    } else if (filterPersona === 'aiml') {
      // Prioritize PyTorch, Deep Learning & Vision
      return list.sort((a, b) => {
        const aDL = (a.categories || []).includes('Deep Learning') || (a.categories || []).includes('Computer Vision') ? 1 : 0
        const bDL = (b.categories || []).includes('Deep Learning') || (b.categories || []).includes('Computer Vision') ? 1 : 0
        return bDL - aDL
      })
    } else if (filterPersona === 'datascience') {
      // Prioritize Data Science, Fraud, NIDS, Sales
      return list.sort((a, b) => {
        const aDS = (a.categories || []).includes('Data Science') || (a.categories || []).includes('Cybersecurity') ? 1 : 0
        const bDS = (b.categories || []).includes('Data Science') || (b.categories || []).includes('Cybersecurity') ? 1 : 0
        return bDS - aDS
      })
    }

    // Default: Top featured projects
    return list.filter((p) => p.featured)
  }, [filterPersona])

  return (
    <div className="light-project-grid preview-grid">
      {displayedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} onDetails={onDetails} />
      ))}
    </div>
  )
}
