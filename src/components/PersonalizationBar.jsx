import { Sparkles, Check } from 'lucide-react'

export const PERSONALIZATION_PRESETS = [
  { id: 'all', label: 'All Perspectives', hint: 'Balanced AI engineering overview' },
  { id: 'aiml', label: 'AI / ML Engineer', hint: 'PyTorch, Deep Learning & Vision architectures' },
  { id: 'genai', label: 'Generative AI / LLM', hint: 'RAG, Banking77 intent engine & conversational AI' },
  { id: 'datascience', label: 'Data Science', hint: 'High-scale CIC-IDS2017, fraud & sales analytics' },
  { id: 'recruiter', label: 'Recruiter / Quick Summary', hint: 'Headline metrics, production proofs & resume' },
]

export function PersonalizationBar({ currentPerspective, onSelectPerspective }) {
  return (
    <div className="personalization-wrapper" aria-label="Personalize portfolio view">
      <div className="personalization-inner">
        <div className="personalization-label">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Tailor Experience:</span>
        </div>

        <div className="personalization-pills" role="tablist">
          {PERSONALIZATION_PRESETS.map((preset) => {
            const isSelected = currentPerspective === preset.id
            return (
              <button
                key={preset.id}
                role="tab"
                aria-selected={isSelected}
                className={`personalization-pill ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectPerspective(preset.id)}
                title={preset.hint}
              >
                {isSelected && <Check size={12} className="check-icon" />}
                <span>{preset.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
