import React from 'react';
import { BookOpen, CheckSquare, Square, Plus, Trash2 } from 'lucide-react';

export const GlossaryEditor = ({ glossary, onUpdateGlossary }) => {
  const handleToggle = (id) => {
    onUpdateGlossary(glossary.map(item => {
      if (item.id === id) {
        return { ...item, enabled: !item.enabled };
      }
      return item;
    }));
  };

  const handleChange = (id, field, value) => {
    onUpdateGlossary(glossary.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleAddCustom = () => {
    const newItem = {
      id: `glossary-${Date.now()}`,
      title: 'Título da Explicação para o Cliente',
      content: 'Escreva aqui a explicação detalhada de forma didática...',
      enabled: true
    };
    onUpdateGlossary([...glossary, newItem]);
  };

  const handleRemove = (id) => {
    onUpdateGlossary(glossary.filter(item => item.id !== id));
  };

  return (
    <div className="card-section">
      <div className="card-header space-between">
        <div className="card-header-left">
          <BookOpen className="card-icon" size={20} />
          <div>
            <div className="step-tag-pill">ETAPA 06</div>
            <h3>Guia Educativo para o Cliente (Glossário & Conceitos)</h3>
            <p className="card-desc">Explicativo didático no PDF sobre APIs, Tokens e Infraestrutura para sanar dúvidas do cliente</p>
          </div>
        </div>
        <button onClick={handleAddCustom} className="btn-primary-sm">
          <Plus size={16} />
          <span>Adicionar Tópico</span>
        </button>
      </div>

      <div className="glossary-items-grid">
        {glossary.map((item) => (
          <div key={item.id} className={`glossary-card ${item.enabled ? 'enabled' : 'disabled'}`}>
            <div className="glossary-card-header">
              <button
                type="button"
                className={`toggle-check-btn ${item.enabled ? 'active' : ''}`}
                onClick={() => handleToggle(item.id)}
              >
                {item.enabled ? <CheckSquare size={18} className="text-cyan" /> : <Square size={18} />}
                <span>{item.enabled ? 'Incluído na Proposta' : 'Oculto da Proposta'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleRemove(item.id)}
                className="btn-delete"
                title="Remover tópico"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="form-group margin-top-xs">
              <label>Pergunta / Título do Tópico</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleChange(item.id, 'title', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Explicação Didática</label>
              <textarea
                rows={3}
                value={item.content}
                onChange={(e) => handleChange(item.id, 'content', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
