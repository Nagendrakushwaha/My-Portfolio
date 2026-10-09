import { useMemo, useState } from 'react'
import { Search, Sparkles } from 'lucide-react'
import { skillCategories, skills } from '../data/skills'
import { synth } from '../utils/audioSynth'

export function Skills() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const visibleSkills = useMemo(
    () =>
      skills.filter(
        (item) =>
          (filter === 'All' || item.category === filter) &&
          item.name.toLowerCase().includes(query.toLowerCase())
      ),
    [filter, query]
  )

  return (
    <main className="page-main">
      <section className="page-hero content-width">
        <p className="overline">
          <Sparkles size={12} className="orange-dot-icon" /> 02 / Capability Map
        </p>
        <h1>
          A technical toolkit
          <br />
          <em>grounded in production engineering.</em>
        </h1>
        <p>
          Every technology is documented honestly through Core, Working Knowledge, or Exploring, reflecting genuine project implementations.
        </p>
      </section>

      <section className="skills-page-section content-width">
        <div className="skills-toolbar">
          <div className="category-tabs" role="toolbar" aria-label="Filter skills">
            {skillCategories.map((category) => (
              <button
                className={filter === category ? 'selected-tab' : ''}
                key={category}
                onMouseEnter={() => synth.playHover()}
                onClick={() => {
                  synth.playClick()
                  setFilter(category)
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="skill-search">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search skills (PyTorch, RAG, SQL)..."
              aria-label="Search skills"
            />
          </label>
        </div>

        <div className="skills-bento">
          {visibleSkills.map((item) => (
            <article
              className="skill-tile"
              key={`${item.category}-${item.name}`}
              onMouseEnter={() => synth.playHover()}
            >
              <div className="skill-tile-top">
                <span>{item.category}</span>
                <i className={`skill-dot ${item.level.toLowerCase().replace(' ', '-')}`} />
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <strong>{item.level}</strong>
            </article>
          ))}
        </div>

        {visibleSkills.length === 0 && (
          <div className="empty-state">
            <p>No skills match &quot;{query}&quot; under &quot;{filter}&quot;.</p>
          </div>
        )}
      </section>
    </main>
  )
}
