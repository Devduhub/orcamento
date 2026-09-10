import React from 'react';
import { Mail, Shield, AlertCircle, CheckSquare, Square, HardDrive } from 'lucide-react';
import { CORPORATE_EMAIL_PLANS } from '../data/defaultPresets';

export const EmailHostingEditor = ({ emailConfig, onUpdateEmailConfig }) => {
  const { enabled, planId, accountCount, hasLgpd, hasPhishing } = emailConfig;

  const selectedPlan = CORPORATE_EMAIL_PLANS.find(p => p.id === planId) || CORPORATE_EMAIL_PLANS[0];

  const lgpdPrice = hasLgpd ? 2.00 : 0;
  const phishingPrice = hasPhishing ? 2.00 : 0;
  const unitPricePerAccount = (selectedPlan.pricePerAccount || 0) + lgpdPrice + phishingPrice;
  const totalMonthlyPrice = unitPricePerAccount * (accountCount || 1);

  return (
    <div className={`card-section ${!enabled ? 'disabled-card' : ''}`}>
      <div className="card-header space-between">
        <div className="card-header-left">
          <Mail className="card-icon text-cyan" size={20} />
          <div>
            <div className="step-tag-pill">ETAPA 04</div>
            <h3>E-mail Corporativo & Arquivamento Segurado</h3>
            <p className="card-desc">Contas de e-mail com backup completo de mensagens apagadas, LGPD e Phishing</p>
          </div>
        </div>

        <button
          type="button"
          className={`toggle-check-btn ${enabled ? 'active' : ''}`}
          onClick={() => onUpdateEmailConfig({ ...emailConfig, enabled: !enabled })}
        >
          {enabled ? <CheckSquare size={20} className="text-cyan" /> : <Square size={20} />}
          <span>{enabled ? 'Módulo Ativo' : 'Módulo Inativo'}</span>
        </button>
      </div>

      {enabled && (
        <div className="form-grid margin-top-sm">
          {/* Plan Picker */}
          <div className="form-group full-width">
            <label><HardDrive size={14} /> Plano de E-mail & Retenção de Backup</label>
            <select
              value={planId}
              onChange={(e) => onUpdateEmailConfig({ ...emailConfig, planId: e.target.value })}
              className="select-custom"
            >
              {CORPORATE_EMAIL_PLANS.map(plan => (
                <option key={plan.id} value={plan.id}>
                  {plan.storage} + {plan.retention} de arquivamento — R$ {plan.pricePerAccount.toFixed(2)}/conta/mês
                </option>
              ))}
            </select>
          </div>

          {/* Account Count */}
          <div className="form-group">
            <label>Quantidade de Contas de E-mail</label>
            <input
              type="number"
              min="1"
              max="500"
              value={accountCount}
              onChange={(e) => onUpdateEmailConfig({ ...emailConfig, accountCount: parseInt(e.target.value) || 1 })}
            />
            <span className="input-hint">Número de caixas postais para a empresa.</span>
          </div>

          {/* Price per account preview */}
          <div className="form-group">
            <label>Valor por Conta / Mês</label>
            <input
              type="text"
              readOnly
              value={`R$ ${unitPricePerAccount.toFixed(2)} / conta`}
              className="readonly-input"
            />
          </div>

          {/* Add-ons Toggles */}
          <div className="form-group full-width">
            <label><Shield size={14} /> Ferramentas Adicionais de Segurança</label>
            <div className="addons-checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={hasLgpd}
                  onChange={(e) => onUpdateEmailConfig({ ...emailConfig, hasLgpd: e.target.checked })}
                />
                <span>Ferramenta de Adequação LGPD (+ R$ 2,00/conta)</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={hasPhishing}
                  onChange={(e) => onUpdateEmailConfig({ ...emailConfig, hasPhishing: e.target.checked })}
                />
                <span>Ferramenta de Phishing Educativo (+ R$ 2,00/conta)</span>
              </label>
            </div>
          </div>

          {/* Subtotal Box */}
          <div className="totals-summary-card full-width margin-top-xs">
            <div className="summary-line">
              <span>Plano Selecionado:</span>
              <strong>{selectedPlan.name}</strong>
            </div>
            <div className="summary-line">
              <span>Contas Contratadas:</span>
              <strong>{accountCount} contas x R$ {unitPricePerAccount.toFixed(2)}</strong>
            </div>
            <div className="summary-line total-highlight text-cyan">
              <span>Recorrência Mensal de E-mails:</span>
              <strong>R$ {totalMonthlyPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / mês</strong>
            </div>
          </div>

          {/* Domain Policy Note */}
          <div className="token-disclaimer full-width">
            <AlertCircle size={16} />
            <span>
              <strong>Regra de Contratação por Domínio:</strong> Todas as contas de e-mail de um mesmo domínio seguem o mesmo plano contratado. É possível realizar upgrade ou downgrade de todas as contas no futuro.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
