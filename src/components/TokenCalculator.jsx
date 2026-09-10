import React from 'react';
import { Cpu, DollarSign, Calculator, HelpCircle, AlertCircle } from 'lucide-react';
import { DEFAULT_AI_MODELS } from '../data/defaultPresets';

export const TokenCalculator = ({ tokenConfig, onUpdateTokenConfig }) => {
  const { conversationsPerMonth, msgsPerConversation, selectedModelId, usdToBrlRate } = tokenConfig;

  // Find model
  const selectedModel = DEFAULT_AI_MODELS.find(m => m.id === selectedModelId) || DEFAULT_AI_MODELS[0];

  // Calculations
  const totalMsgsPerMonth = (conversationsPerMonth || 0) * (msgsPerConversation || 0);
  // Estimate tokens per message (approx 80% input, 20% output)
  const tokensPerMsg = selectedModel.avgTokensPerMsg || 1000;
  const inputTokensPerMsg = Math.round(tokensPerMsg * 0.7);
  const outputTokensPerMsg = Math.round(tokensPerMsg * 0.3);

  const totalInputTokensPerMonth = totalMsgsPerMonth * inputTokensPerMsg;
  const totalOutputTokensPerMonth = totalMsgsPerMonth * outputTokensPerMsg;

  // Price calculations in USD
  const inputCostUSD = (totalInputTokensPerMonth / 1000000) * selectedModel.inputPriceUSDPerM;
  const outputCostUSD = (totalOutputTokensPerMonth / 1000000) * selectedModel.outputPriceUSDPerM;
  const totalCostUSD = inputCostUSD + outputCostUSD;

  // Convert to BRL
  const totalCostBRL = totalCostUSD * (usdToBrlRate || 5.6);

  return (
    <div className="card-section">
      <div className="card-header">
        <Cpu className="card-icon text-cyan" size={20} />
        <div>
          <div className="step-tag-pill">ETAPA 03</div>
          <h3>Estimativa de Consumo de Inteligência Artificial (Tokens)</h3>
          <p className="card-desc">Simule os custos mensais de uso de modelos de linguagem da OpenAI, Google ou Anthropic</p>
        </div>
      </div>

      <div className="form-grid">
        {/* Model Selection */}
        <div className="form-group full-width">
          <label><Cpu size={14} /> Modelo de Inteligência Artificial</label>
          <select
            value={selectedModelId}
            onChange={(e) => onUpdateTokenConfig({ ...tokenConfig, selectedModelId: e.target.value })}
            className="select-custom"
          >
            {DEFAULT_AI_MODELS.map(model => (
              <option key={model.id} value={model.id}>
                {model.name} — (${model.inputPriceUSDPerM}/1M in, ${model.outputPriceUSDPerM}/1M out)
              </option>
            ))}
          </select>
        </div>

        {/* Conversations / Month */}
        <div className="form-group">
          <label>Conversas Estimadas por Mês</label>
          <input
            type="number"
            min="0"
            step="500"
            value={conversationsPerMonth}
            onChange={(e) => onUpdateTokenConfig({ ...tokenConfig, conversationsPerMonth: parseInt(e.target.value) || 0 })}
          />
          <span className="input-hint">Número médio de clientes que chamam no WhatsApp por mês.</span>
        </div>

        {/* Msgs / Conversation */}
        <div className="form-group">
          <label>Troca de Mensagens por Conversa</label>
          <input
            type="number"
            min="1"
            max="30"
            value={msgsPerConversation}
            onChange={(e) => onUpdateTokenConfig({ ...tokenConfig, msgsPerConversation: parseInt(e.target.value) || 1 })}
          />
          <span className="input-hint">Média de perguntas e respostas por atendimento.</span>
        </div>

        {/* Exchange Rate */}
        <div className="form-group">
          <label><DollarSign size={14} /> Cotação do Dólar (R$/USD)</label>
          <input
            type="number"
            step="0.05"
            value={usdToBrlRate}
            onChange={(e) => onUpdateTokenConfig({ ...tokenConfig, usdToBrlRate: parseFloat(e.target.value) || 5.6 })}
          />
        </div>
      </div>

      {/* Calculator Result Box */}
      <div className="token-result-card">
        <div className="token-metrics-grid">
          <div className="metric-item">
            <span className="metric-label">Mensagens Totais / Mês</span>
            <strong className="metric-val">{totalMsgsPerMonth.toLocaleString('pt-BR')} msgs</strong>
          </div>
          <div className="metric-item">
            <span className="metric-label">Tokens Estimados / Mês</span>
            <strong className="metric-val">{((totalInputTokensPerMonth + totalOutputTokensPerMonth) / 1000000).toFixed(2)}M Tokens</strong>
          </div>
          <div className="metric-item">
            <span className="metric-label">Custo Estimado em Dólar</span>
            <strong className="metric-val text-cyan">${totalCostUSD.toFixed(2)} USD</strong>
          </div>
          <div className="metric-item highlight-box">
            <span className="metric-label">Custo Mensal Estimado de IA (R$)</span>
            <strong className="metric-val text-gradient">R$ {totalCostBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / mês</strong>
          </div>
        </div>

        <div className="token-disclaimer">
          <AlertCircle size={16} />
          <span>
            <strong>Observação Importante:</strong> Este valor de consumo de IA é faturado diretamente pelo provedor ({selectedModel.name.split(' ')[0]}) no cartão cadastrado na plataforma. A <strong>Ux For You</strong> auxilia na configuração e otimização dos prompts para menor consumo.
          </span>
        </div>
      </div>
    </div>
  );
};
