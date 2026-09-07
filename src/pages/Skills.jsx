import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { skillCategories, skills } from '../data/skills'

export function Skills() {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const visibleSkills = useMemo(() => skills.filter((item) => (filter === 'All' || item.category === filter) && item.name.toLowerCase().includes(query.toLowerCase())), [filter, query])
  return <main className="page-main"><section className="page-hero"><p className="overline">02 / Capability map</p><h1>A technical toolkit<br /><em>still in motion.</em></h1><p>Every skill is a current working relationship, represented honestly through Core, Working Knowledge, or Exploring.</p></section>
    <section className="skills-page-section content-width"><div className="skills-toolbar"><div className="category-tabs" role="toolbar" aria-label="Filter skills">{skillCategories.map((category) => <button className={filter === category ? 'selected-tab' : ''} key={category} onClick={() => setFilter(category)}>{category}</button>)}</div><label className="skill-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills..." aria-label="Search skills" /></label></div><div className="skills-bento">{visibleSkills.map((item) => <article className="skill-tile" key={`${item.category}-${item.name}`}><div className="skill-tile-top"><span>{item.category}</span><i className={`skill-dot ${item.level.toLowerCase().replace(' ', '-')}`} /></div><h3>{item.name}</h3><p>{item.description}</p><strong>{item.level}</strong></article>)}</div>{visibleSkills.length === 0 && <div className="empty-state">No skills match that search yet.</div>}</section>
  </main>
}
