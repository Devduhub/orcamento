import React from 'react';
import { Server, Plus, Trash2, ShieldCheck, Repeat } from 'lucide-react';

export const InfrastructureEditor = ({
  infraItems,
  onUpdateInfraItems,
  maintenanceMonthlyPrice,
  onUpdateMaintenancePrice,
  maintenanceDescription,
  onUpdateMaintenanceDesc
}) => {
  const handleAddInfra = () => {
    const newItem = {
      id: `infra-${Date.now()}`,
      title: 'Nova Ferramenta / Servidor Cloud',
      price: 100,
      isMonthly: true,
      note: ''
    };
    onUpdateInfraItems([...infraItems, newItem]);
  };

  const handleRemoveInfra = (id) => {
    onUpdateInfraItems(infraItems.filter(item => item.id !== id));
  };

  const handleInfraChange = (id, field, value) => {
    onUpdateInfraItems(infraItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Monthly Subtotal of Infrastructure
  const infraMonthlyTotal = infraItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const totalMonthlyRecurrence = infraMonthlyTotal + Number(maintenanceMonthlyPrice || 0);

  return (
    <div className="card-section">
      <div className="card-header space-between">
        <div className="card-header-left">
          <Server className="card-icon" size={20} />
          <div>
            <div className="step-tag-pill">ETAPA 05</div>
            <h3>Infraestrutura, Ferramentas & Suporte Mensal</h3>
            <p className="card-desc">Detalhamento dos custos recorrentes com hospedagem, APIs e gestão mensal da Ux For You</p>
          </div>
        </div>
        <button onClick={handleAddInfra} className="btn-primary-sm">
          <Plus size={16} />
          <span>Adicionar Ferramenta</span>
        </button>
      </div>

      {/* Maintenance & Support Service Box */}
      <div className="maintenance-box-editor">
        <div className="maintenance-title">
          <ShieldCheck size={18} className="text-cyan" />
          <h4>Manutenção, Curadoria de IA & Suporte Mensal (Ux For You)</h4>
        </div>
        <div className="form-grid margin-top-sm">
          <div className="form-group full-width">
            <label>Descrição da Manutenção & Suporte Mensal</label>
            <textarea
              rows={2}
              value={maintenanceDescription}
              onChange={(e) => onUpdateMaintenanceDesc(e.target.value)}
              placeholder="Ex: Monitoramento dos agentes de IA, calibração de prompts, relatórios de métricas e suporte prioritário..."
            />
          </div>
          <div className="form-group">
            <label>Valor Mensal da Manutenção (R$/mês)</label>
            <input
              type="number"
              min="0"
              step="50"
              value={maintenanceMonthlyPrice}
              onChange={(e) => onUpdateMaintenancePrice(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>

      {/* Infrastructure Items */}
      <h4 className="sub-section-title"><Repeat size={16} /> Ferramentas e Infraestrutura de Terceiros</h4>
      <div className="items-list">
        {infraItems.map((item, index) => (
          <div key={item.id} className="infra-item-card">
            <div className="infra-grid">
              <div className="form-group full-width">
                <label>Nome da Ferramenta / Servidor</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleInfraChange(item.id, 'title', e.target.value)}
                  placeholder="Ex: Servidor Cloud Supabase / Meta API WhatsApp"
                />
              </div>

              <div className="form-group">
                <label>Valor (R$/mês)</label>
                <input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) => handleInfraChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="form-group">
                <label>Observação / Nota</label>
                <input
                  type="text"
                  value={item.note || ''}
                  onChange={(e) => handleInfraChange(item.id, 'note', e.target.value)}
                  placeholder="Ex: Faturado direto pela Meta"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemoveInfra(item.id)}
                className="btn-delete align-self-end"
                title="Remover infraestrutura"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recurrence Summary Card */}
      <div className="totals-summary-card margin-top">
        <div className="summary-line">
          <span className="summary-label">Infraestrutura de Terceiros:</span>
          <span className="summary-val font-mono">R$ {infraMonthlyTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / mês</span>
        </div>
        <div className="summary-line">
          <span className="summary-label">Manutenção & Suporte UX4YOU:</span>
          <span className="summary-val font-mono">R$ {Number(maintenanceMonthlyPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / mês</span>
        </div>
        <div className="summary-line total-highlight text-cyan">
          <span className="summary-label">Total de Recorrência Mensal Fixa:</span>
          <span className="summary-val font-mono">R$ {totalMonthlyRecurrence.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / mês</span>
        </div>
      </div>
    </div>
  );
};
