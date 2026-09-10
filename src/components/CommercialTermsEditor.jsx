import React from 'react';
import { FileCheck, Clock, CreditCard, Shield, AlertTriangle, TrendingUp, Handshake } from 'lucide-react';

export const CommercialTermsEditor = ({ terms, onUpdateTerms }) => {
  const isPartner = terms.modelType === 'partner';

  const handleModelChange = (modelType) => {
    if (modelType === 'partner') {
      onUpdateTerms({
        ...terms,
        modelType: 'partner',
        partnerPercent: 10,
        notes: "Modelo Matriz Partner: Participação de 10% sobre as vendas a partir do início da operação. Tudo por nossa conta, exceto tokens e ferramentas externas. Sem fidelidade (cancela quando quiser). Importante: Em caso de contrato recorrente de vendas do cliente, os recebíveis de 10% permanecem válidos até o término dos respectivos contratos ou recebendo o proporcional deles."
      });
    } else {
      onUpdateTerms({
        ...terms,
        modelType: 'standard',
        notes: "O ciclo inicial de gestão é de 6 mensalidades. O contrato renova-se automaticamente por novos ciclos de 6 meses. Para não renovar, o cliente deve comunicar com 30 dias de antecedência."
      });
    }
  };

  return (
    <div className="card-section">
      <div className="card-header space-between">
        <div className="card-header-left">
          <FileCheck className="card-icon" size={20} />
          <div>
            <div className="step-tag-pill">ETAPA 07</div>
            <h3>Modelo Comercial, Prazos & Cláusulas</h3>
            <p className="card-desc">Escolha entre Gestão Mensal Fixa ou o Modelo Matriz Partner (10% sobre vendas)</p>
          </div>
        </div>
      </div>

      {/* Commercial Model Switcher Cards */}
      <div className="commercial-model-switcher">
        <div
          className={`model-option-card ${!isPartner ? 'selected' : ''}`}
          onClick={() => handleModelChange('standard')}
        >
          <div className="model-card-header">
            <CreditCard size={18} className="text-purple" />
            <strong>Gestão Mensal Fixa</strong>
          </div>
          <p>Setup Inicial + Mensalidades fixas por ciclo de 6 meses.</p>
        </div>

        <div
          className={`model-option-card ${isPartner ? 'selected partner-active' : ''}`}
          onClick={() => handleModelChange('partner')}
        >
          <div className="model-card-header">
            <Handshake size={18} className="text-cyan" />
            <strong>Matriz Partner (10% sobre Vendas)</strong>
          </div>
          <p>Ganhamos juntos, crescemos juntos. Setup + 10% de comissão sobre vendas. Cancela quando quiser.</p>
        </div>
      </div>

      <div className="form-grid margin-top-sm">
        {/* If Partner Model is active */}
        {isPartner && (
          <div className="form-group full-width partner-settings-box">
            <div className="partner-box-header">
              <TrendingUp size={16} className="text-cyan" />
              <strong>Parâmetros do Modelo Matriz Partner</strong>
            </div>
            <div className="form-grid margin-top-xs">
              <div className="form-group">
                <label>Porcentagem de Participação (%)</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={terms.partnerPercent || 10}
                  onChange={(e) => onUpdateTerms({ ...terms, partnerPercent: parseFloat(e.target.value) || 10 })}
                />
                <span className="input-hint">Porcentagem sobre as vendas a partir da operação.</span>
              </div>

              <div className="form-group">
                <label>Faixa de Setup Recomendado</label>
                <input
                  type="text"
                  readOnly
                  value="R$ 3.000,00 a R$ 7.000,00"
                  className="readonly-input"
                />
                <span className="input-hint">Variável conforme complexidade do projeto.</span>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Days Number & Description */}
        <div className="form-group">
          <label><Clock size={14} /> Prazo de Implantação (Dias Úteis)</label>
          <input
            type="number"
            min="1"
            max="180"
            value={terms.deliveryDays !== undefined ? terms.deliveryDays : 15}
            onChange={(e) => {
              const days = parseInt(e.target.value) || 1;
              onUpdateTerms({
                ...terms,
                deliveryDays: days,
                deliveryTime: `Operação Funcional em até ${days} dias úteis`
              });
            }}
          />
          <span className="input-hint">Define o número destacado na capa do PDF ({terms.deliveryDays || 15} DIAS ÚTEIS).</span>
        </div>

        <div className="form-group">
          <label><Clock size={14} /> Descrição Detalhada do Prazo</label>
          <input
            type="text"
            value={terms.deliveryTime || `Operação Funcional em até ${terms.deliveryDays || 15} dias úteis`}
            onChange={(e) => {
              const val = e.target.value;
              const match = val.match(/(\d+)/);
              const days = match ? parseInt(match[1], 10) : terms.deliveryDays;
              onUpdateTerms({
                ...terms,
                deliveryTime: val,
                deliveryDays: days !== undefined ? days : (terms.deliveryDays || 15)
              });
            }}
            placeholder="Ex: Operação Funcional em até 15 dias úteis"
          />
        </div>

        {/* Payment Terms */}
        <div className="form-group">
          <label><CreditCard size={14} /> Forma de Pagamento do Setup</label>
          <input
            type="text"
            value={terms.paymentTerms}
            onChange={(e) => onUpdateTerms({ ...terms, paymentTerms: e.target.value })}
            placeholder="Ex: 50% de entrada + 50% na entrega"
          />
        </div>

        {/* Validity */}
        <div className="form-group">
          <label><Clock size={14} /> Validade da Proposta (Dias)</label>
          <input
            type="number"
            min="1"
            max="90"
            value={terms.validityDays}
            onChange={(e) => onUpdateTerms({ ...terms, validityDays: parseInt(e.target.value) || 15 })}
          />
        </div>

        {/* Warranty */}
        <div className="form-group">
          <label><Shield size={14} /> Suporte e Garantia (Dias)</label>
          <input
            type="number"
            min="0"
            max="365"
            value={terms.warrantyDays}
            onChange={(e) => onUpdateTerms({ ...terms, warrantyDays: parseInt(e.target.value) || 30 })}
          />
        </div>

        {/* Notes */}
        <div className="form-group full-width">
          <label><AlertTriangle size={14} /> Cláusulas Comerciais & Contratuais</label>
          <textarea
            rows={4}
            value={terms.notes}
            onChange={(e) => onUpdateTerms({ ...terms, notes: e.target.value })}
            placeholder="Escreva as observações legais, regra de rescisão ou recebíveis..."
          />
        </div>
      </div>
    </div>
  );
};
