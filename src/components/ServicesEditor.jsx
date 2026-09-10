import React from 'react';
import { Layers, Plus, Trash2, Tag, DollarSign, Edit2 } from 'lucide-react';

export const ServicesEditor = ({ items, onUpdateItems, discount, onUpdateDiscount }) => {
  const handleAddItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: 'Novo Item de Serviço',
      description: 'Descrição detalhada do escopo e entregáveis deste item.',
      price: 1000,
      qty: 1,
      type: 'setup'
    };
    onUpdateItems([...items, newItem]);
  };

  const handleRemoveItem = (id) => {
    onUpdateItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    onUpdateItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + (Number(item.price) * Number(item.qty || 1)), 0);

  // Discount calculation
  let discountAmount = 0;
  if (discount.type === 'fixed') {
    discountAmount = Number(discount.value || 0);
  } else if (discount.type === 'percent') {
    discountAmount = (subtotal * Number(discount.value || 0)) / 100;
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="card-section">
      <div className="card-header space-between">
        <div className="card-header-left">
          <Layers className="card-icon" size={20} />
          <div>
            <div className="step-tag-pill">ETAPA 02</div>
            <h3>Mão de Obra & Escopo do Projeto (Investimento Inicial)</h3>
            <p className="card-desc">Cadastre os módulos, funcionalidades e serviços de desenvolvimento</p>
          </div>
        </div>
        <button onClick={handleAddItem} className="btn-primary-sm">
          <Plus size={16} />
          <span>Adicionar Item</span>
        </button>
      </div>

      {/* Items List */}
      <div className="items-list">
        {items.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum item cadastrado no escopo inicial. Clique em "Adicionar Item" acima para incluir serviços.</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={item.id} className="item-row-card">
              <div className="item-row-header">
                <div className="item-row-title-badge">
                  <span className="item-number-badge">Item #{index + 1}</span>
                  <span className="item-hint-name">{item.title || "Novo Módulo"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="btn-delete"
                  title="Remover item"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Título do Serviço / Módulo</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                    placeholder="Ex: Treinamento e Ingestão da Base de Conhecimento"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Descrição dos Entregáveis</label>
                  <textarea
                    rows={3}
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    placeholder="Detalhamento do que está incluso neste módulo..."
                  />
                </div>

                <div className="form-group">
                  <label>Valor Unitário (R$)</label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="form-group">
                  <label>Quantidade</label>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Discount & Totals Summary */}
      <div className="totals-box-container">
        <div className="discount-controls">
          <div className="discount-header">
            <Tag size={16} />
            <span>Aplicar Desconto Especial</span>
          </div>
          <div className="discount-inputs">
            <select
              value={discount.type}
              onChange={(e) => onUpdateDiscount({ ...discount, type: e.target.value })}
            >
              <option value="none">Sem Desconto</option>
              <option value="fixed">Valor Fixo (R$)</option>
              <option value="percent">Porcentagem (%)</option>
            </select>

            {discount.type !== 'none' && (
              <input
                type="number"
                min="0"
                value={discount.value}
                onChange={(e) => onUpdateDiscount({ ...discount, value: parseFloat(e.target.value) || 0 })}
                placeholder={discount.type === 'fixed' ? 'Ex: 800' : 'Ex: 15'}
              />
            )}
          </div>
        </div>

        <div className="totals-summary-card">
          <div className="summary-line">
            <span className="summary-label">Subtotal Mão de Obra:</span>
            <span className="summary-val font-mono">R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          {discountAmount > 0 && (
            <div className="summary-line text-discount">
              <span className="summary-label">Desconto Aplicado:</span>
              <span className="summary-val font-mono">- R$ {discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          <div className="summary-line total-highlight">
            <span className="summary-label">Total Inicial (Setup):</span>
            <span className="summary-val font-mono">R$ {grandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
