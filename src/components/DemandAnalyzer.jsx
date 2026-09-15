import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle2, ArrowRight, Zap, DollarSign, ShieldCheck, RefreshCw } from 'lucide-react';
import { PRESET_PACKAGES, DEFAULT_AI_MODELS } from '../data/defaultPresets';

export function DemandAnalyzer({ onApplyPlan, clientInfo }) {
  const [isOpen, setIsOpen] = useState(true);
  const [demandText, setDemandText] = useState(
    "Cliente da área de Varejo / Serviços quer um agente de IA no WhatsApp para atendimento inicial, triagem, agendamento e integração com CRM. Estimativa de 2.000 conversas/mês."
  );
  const [analyzedResult, setAnalyzedResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Quick Preset Sample Requests
  const sampleDemands = [
    {
      label: "👔 Estrutura Completa de Atendimento",
      text: "Atendimento no WhatsApp para negócio local combinando chatbot (primeiro contato, boas vindas) + IA de Qualificação (Triagem de necessidades) + Coleta de Dados (CEP, preferência) + CRM Kanban (Etiqueta LEAD QUENTE) + 3 Follow-ups (2h, 2d, 1w) + Horário Comercial."
    },
    {
      label: "🛍️ Varejo / Roupas (Média Volumetria)",
      text: "Cliente da área de Varejo de Roupas e Vestuário quer automação de atendimento no WhatsApp, catálogo com IA, qualificação de leads e integração CRM. Estimativa de 4.000 a 5.000 conversas por mês."
    },
    {
      label: "🏥 Clínica Médica (Atendimento & Triagem)",
      text: "Necessito de 1 Agente de IA para responder dúvidas frequentes (FAQ), agendar consultas e triar pacientes via WhatsApp. Volume baixo a médio, cerca de 1.500 conversas/mês."
    },
    {
      label: "🚀 Escala Multi-Agente (Alta Volumetria)",
      text: "Preciso de uma estrutura completa com 4 Agentes de IA especialistas, Banco de Dados Vetorial, Dashboard de Métricas e 10.000 conversas/mês."
    },
    {
      label: "🤝 Modelo Parceria (Matriz Partner)",
      text: "Queremos parceria de implantação de IA sem mensalidade fixa de suporte. Setup inicial de implantação + 10% de participação em vendas sobre negócios fechados pela ferramenta no WhatsApp."
    }
  ];

  // Smart Heuristic & Keyword Diagnostic Engine
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = demandText.toLowerCase();

      // ⚠️ O Matriz Partner NUNCA é recomendado automaticamente.
      // É escolhido manualmente pelo consultor quando aplicável.
      
      // Complexidade alta: múltiplos agentes, grande volume, dashboards
      const isMultiAgentHighScale = lower.includes("escala") || lower.includes("10.000") || lower.includes("10k") || lower.includes("multi-agente") || lower.includes("4 agente");
      
      // Complexidade média: CRM, dashboard, catálogo, integração de dados
      const isMediumScale = lower.includes("crm") || lower.includes("dashboard") || lower.includes("catálogo") || lower.includes("5.000") || lower.includes("banco de dados") || lower.includes("integração");
      
      // Setup completo com fluxos avançados
      const isComplexSetup = lower.includes("completa") || lower.includes("kanban") || lower.includes("planilha") || lower.includes("follow-up") || lower.includes("funil");
      
      // Banco de horas / suporte avulso
      const isHourly = lower.includes("avulso") || lower.includes("ajuste") || lower.includes("manutenção") || (lower.includes("horas") && !lower.includes("atendimento"));

      let recommendedPreset;
      let modelId = "gpt-4o-mini";
      let estimatedConversations = 2000;
      let msgsPerConv = 8;
      let reasoning = [];
      let longTermStrategy = "";
      let customServices = null;

      // Extrair volume de conversas mencionado no texto
      const convMatch = lower.match(/(\d+[\.,]?\d*)\s*(conversas|atendimentos|leads|mensagens)/);
      if (convMatch) {
        const numStr = convMatch[1].replace(".", "").replace(",", "");
        const parsedNum = parseInt(numStr, 10);
        if (!isNaN(parsedNum) && parsedNum > 100) {
          estimatedConversations = parsedNum;
        }
      }

      if (isMultiAgentHighScale || estimatedConversations >= 8000) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-digital-2");
        modelId = "gpt-4o-mini";
        reasoning = [
          "Volume e complexidade elevados: múltiplos fluxos e agentes de IA especializados.",
          "Base de dados vetorial para busca em catálogo ou conhecimento extenso.",
          "Dashboard de indicadores para acompanhar a operação em tempo real."
        ];
        longTermStrategy = "Estrutura robusta que suporta alto volume sem degradação da qualidade das respostas. Escalável conforme o crescimento do cliente.";
      } else if (isMediumScale || isComplexSetup || estimatedConversations >= 3000) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-digital-2");
        modelId = "gpt-4o-mini";
        reasoning = [
          "Demanda por integração de dados, CRM ou fluxos de qualificação mais elaborados.",
          "Agente de IA treinado com base de conhecimento específica do negócio.",
          "Suporte ativo para calibragem e evolução contínua dos fluxos."
        ];
        longTermStrategy = "Excelente custo-benefício para operações em consolidação. O Dashboard permite visibilidade total sobre o desempenho do atendimento automatizado.";
      } else if (isHourly) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "pacote-horas-avulso");
        reasoning = [
          "Demanda de ajustes pontuais ou melhorias em operação já existente.",
          "Sem mensalidade fixa: paga apenas pelo que usar."
        ];
        longTermStrategy = "Indicado para clientes que já possuem infraestrutura e precisam de horas especializadas da UX4YOU para evoluir.";
      } else {
        // Padrão: Pacote Inicial
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-digital-1");
        modelId = "gpt-4o-mini";
        reasoning = [
          "1 Agente de IA para triagem, FAQ e direcionamento comercial no WhatsApp.",
          "Integração com WhatsApp Cloud API Oficial (Meta).",
          "Entregável em até 15 dias úteis com operação funcional."
        ];
        longTermStrategy = "Ideal para validar a automação com investimento inicial controlado. Upgrade simples para o Pacote Avançado conforme o volume de atendimento crescer.";
      }

      // Calculate Estimated Monthly Token Cost (USD -> BRL)
      const selectedModel = DEFAULT_AI_MODELS.find(m => m.id === modelId) || DEFAULT_AI_MODELS[0];
      const usdRate = 5.60;
      const totalMsgs = estimatedConversations * msgsPerConv;
      const avgTokens = selectedModel.avgTokensPerMsg;
      const totalTokens = totalMsgs * avgTokens;
      
      const inputRatio = 0.7;
      const outputRatio = 0.3;
      const inputCostUSD = ((totalTokens * inputRatio) / 1000000) * selectedModel.inputPriceUSDPerM;
      const outputCostUSD = ((totalTokens * outputRatio) / 1000000) * selectedModel.outputPriceUSDPerM;
      const estimatedTokenCostBRL = Math.ceil((inputCostUSD + outputCostUSD) * usdRate);

      // Infra Cost
      const infraMonthlyTotal = recommendedPreset.infraItems
        .filter(item => item.isMonthly && !item.isVariable)
        .reduce((sum, item) => sum + item.price, 0);

      // Setup Price & Monthly Price
      const activeServices = customServices || recommendedPreset.items;
      const setupPrice = activeServices.reduce((sum, s) => sum + (s.price * (s.qty || 1)), 0);
      const maintenancePrice = recommendedPreset.maintenanceMonthlyPrice || 0;
      const isPartnerModel = recommendedPreset.isPartnerModel || false;

      // Project Title Suggestion
      let suggestedProjectTitle = "Agente de IA no WhatsApp para Atendimento e Triagem";
      if (isMultiAgentHighScale) suggestedProjectTitle = "Estrutura de Alta Performance: Múltiplos Agentes de IA";
      else if (isComplexSetup || isMediumScale) suggestedProjectTitle = "Estrutura Completa de Atendimento: IA de Qualificação + CRM";
      else if (isHourly) suggestedProjectTitle = "Banco de Horas para Otimização de IA";

      setAnalyzedResult({
        preset: recommendedPreset,
        customServices,
        suggestedProjectTitle,
        estimatedConversations,
        msgsPerConv,
        model: selectedModel,
        estimatedTokenCostBRL,
        infraMonthlyTotal,
        setupPrice,
        maintenancePrice,
        isPartnerModel,
        partnerPercent: recommendedPreset.partnerRevSharePercent || 10,
        reasoning,
        longTermStrategy,
        estimatedTCO: maintenancePrice + infraMonthlyTotal + estimatedTokenCostBRL
      });

      setIsAnalyzing(false);
    }, 400);
  };

  const handleApply = () => {
    if (!analyzedResult) return;
    onApplyPlan({
      presetId: analyzedResult.preset.id,
      projectTitle: analyzedResult.suggestedProjectTitle,
      tokenConfig: {
        conversationsPerMonth: analyzedResult.estimatedConversations,
        msgsPerConversation: analyzedResult.msgsPerConv,
        selectedModelId: analyzedResult.model.id,
        usdToBrlRate: 5.60
      },
      services: analyzedResult.customServices || analyzedResult.preset.items,
      infraItems: analyzedResult.preset.infraItems,
      maintenanceMonthlyPrice: analyzedResult.maintenancePrice,
      maintenanceDescription: analyzedResult.preset.maintenanceDescription,
      isPartnerModel: analyzedResult.isPartnerModel,
      partnerPercent: analyzedResult.partnerPercent
    });
  };

  return (
    <div className="demand-analyzer-card card-section glow-border-magenta" id="demand-analyzer-section">
      <div className="card-header demand-header">
        <div className="title-with-icon">
          <div className="ai-badge-pulse">
            <Sparkles size={20} className="sparkle-icon" />
          </div>
          <div>
            <h3>Diagnóstico Inteligente de Demanda & Recomendador de Planos IA</h3>
            <p className="card-desc">
              Cole o desejo ou pedido do cliente. O sistema identifica o pacote UX4YOU ideal, projeta os custos operacionais de IA e define a melhor estratégia a longo prazo.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn-text-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Ocultar Ferramenta' : 'Expandir Diagnóstico'}
        </button>
      </div>

      {isOpen && (
        <div className="demand-body">
          {/* Quick Presets / Prompt Chips */}
          <div className="samples-row">
            <span className="samples-label"><Brain size={14} /> Exemplos Rápidos para Testar:</span>
            <div className="chips-container">
              {sampleDemands.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="sample-chip"
                  onClick={() => {
                    setDemandText(sample.text);
                    setAnalyzedResult(null);
                  }}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area Input */}
          <div className="demand-input-group">
            <textarea
              className="demand-textarea"
              rows={4}
              value={demandText}
              onChange={(e) => {
                setDemandText(e.target.value);
                setAnalyzedResult(null);
              }}
              placeholder="Cole aqui o áudio transcrito, e-mail ou mensagem em texto livre com o pedido do cliente..."
            />
            <button
              type="button"
              className="btn-primary analyze-btn glow-effect"
              onClick={runAnalysis}
              disabled={isAnalyzing || !demandText.trim()}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="spinner-icon" size={16} />
                  <span>Analisando Demanda...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Analisar e Recomendar Plano</span>
                </>
              )}
            </button>
          </div>

          {/* Analysis Results Card */}
          {analyzedResult && (
            <div className="analysis-result-box animated-fade-in">
              <div className="result-header">
                <div className="plan-badge-group">
                  <span className="plan-category-tag">
                    {analyzedResult.preset.category}
                  </span>
                  <h4 className="recommended-plan-name">
                    Plano Recomendado: <span>{analyzedResult.preset.name}</span>
                  </h4>
                </div>
                <div className="setup-price-tag font-mono">
                  Setup Inicial: R$ {analyzedResult.setupPrice.toLocaleString('pt-BR')}
                </div>
              </div>

              {/* Grid Breakdown */}
              <div className="analysis-grid">
                {/* Left Column: Strategic Reasoning */}
                <div className="reasoning-column">
                  <h5 className="section-mini-title">
                    <ShieldCheck size={16} /> Por que este é o plano ideal?
                  </h5>
                  <ul className="reasoning-list">
                    {analyzedResult.reasoning.map((item, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="strategy-callout">
                    <strong>📍 Estrutura e Visão a Longo Prazo:</strong>
                    <p>{analyzedResult.longTermStrategy}</p>
                  </div>
                </div>

                {/* Right Column: Financial & Operational Costs */}
                <div className="financial-column">
                  <h5 className="section-mini-title">
                    <DollarSign size={16} /> Projeção de Custos (Estimativa Mensal)
                  </h5>

                  <div className="cost-cards-grid">
                    <div className="cost-card">
                      <span className="cost-card-title">Mensalidade / Gestão</span>
                      <span className="cost-card-value">
                        {analyzedResult.isPartnerModel ? (
                          <span className="partner-highlight">{analyzedResult.partnerPercent}% sobre Vendas</span>
                        ) : (
                          `R$ ${analyzedResult.maintenancePrice.toLocaleString('pt-BR')}/mês`
                        )}
                      </span>
                      <span className="cost-card-sub">Suporte & Evolução Contínua</span>
                    </div>

                    <div className="cost-card">
                      <span className="cost-card-title">Consumo de IA ({analyzedResult.model.name.split(' ')[1] || 'GPT-4o Mini'})</span>
                      <span className="cost-card-value font-mono">
                        ~ R$ {analyzedResult.estimatedTokenCostBRL}/mês
                      </span>
                      <span className="cost-card-sub">
                        Baseado em ~{analyzedResult.estimatedConversations.toLocaleString('pt-BR')} conversas/mês
                      </span>
                    </div>

                    <div className="cost-card">
                      <span className="cost-card-title">Infraestrutura & Servers</span>
                      <span className="cost-card-value font-mono">
                        R$ {analyzedResult.infraMonthlyTotal.toLocaleString('pt-BR')}/mês
                      </span>
                      <span className="cost-card-sub">Cloud + Vector DB + Leona</span>
                    </div>

                    <div className="cost-card total-tco-card">
                      <span className="cost-card-title">Custo Total Est. de Operação (TCO)</span>
                      <span className="cost-card-value font-mono highlight-total">
                        {analyzedResult.isPartnerModel ? (
                          `R$ ${(analyzedResult.infraMonthlyTotal + analyzedResult.estimatedTokenCostBRL).toLocaleString('pt-BR')} + 10% Vendas`
                        ) : (
                          `R$ ${analyzedResult.estimatedTCO.toLocaleString('pt-BR')}/mês`
                        )}
                      </span>
                      <span className="cost-card-sub">Investimento mensal previsto total</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="analysis-action-bar">
                <div className="suggestion-text">
                  <Zap size={14} className="cyan-text" />
                  <span>Título sugerido para o projeto: <strong>"{analyzedResult.suggestedProjectTitle}"</strong></span>
                </div>
                <button
                  type="button"
                  className="btn-primary apply-plan-btn glow-effect"
                  onClick={handleApply}
                >
                  <span>Aplicar este Plano e Configurações no Orçamento</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DemandAnalyzer;
