import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle2, ArrowRight, Zap, DollarSign, ShieldCheck, RefreshCw } from 'lucide-react';
import { PRESET_PACKAGES, DEFAULT_AI_MODELS } from '../data/defaultPresets';

export function DemandAnalyzer({ onApplyPlan, clientInfo }) {
  const [isOpen, setIsOpen] = useState(true);
  const [demandText, setDemandText] = useState(
    "Cliente da área de Varejo de Roupas e Vestuário quer um agente de IA no WhatsApp para atendimento aos clientes, triagem de pedidos, sugestão de produtos com catálogo, agendamento e integração com CRM. Estimativa de 4.000 a 5.000 conversas/mês."
  );
  const [analyzedResult, setAnalyzedResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Quick Preset Sample Requests
  const sampleDemands = [
    {
      label: "👔 Robson Moreira (Varejo / Revenda Completo)",
      text: "ORÇAMENTO - ESTRUTURA COMPLETA DE ATENDIMENTO E QUALIFICAÇÃO - ROBSON MOREIRA. Atendimento no WhatsApp para Compras e Varejo Roupas e Vestuário, combinando chatbot (primeiro contato, mensagem boas vindas, grupo VIP, 1º áudio gravado e nome) + IA de Qualificação (🛍️ Revenda vs 👕 Uso pessoal, experiência no ramo) + Cadastro (CEP, produto, tamanhos) + Orçamento + Envio de Mídias + CRM BotConversa (9 etapas) + Etiqueta LEAD QUENTE + Google Sheets + 3 Follow-ups (2h, 2d, 1w) + Horário Comercial + 10 Modelos Meta Cloud API."
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
      label: "🚀 Escala Multi-Agente + Quiz (Alta Volumetria)",
      text: "Preciso de uma estrutura completa com 4 Agentes de IA especialistas (Vendas, Qualificação, Quiz de Estilo e Suporte), Banco de Dados Vetorial, Dashboard de Métricas e 10.000 conversas/mês."
    },
    {
      label: "🤝 Modelo Parceria / Revenue Share (Matriz Partner)",
      text: "Queremos parceria com a UX4YOU sem mensalidade fixa alta. Setup comercial inicial + 10% de participação em revenue share sobre todas as vendas realizadas pela automação no WhatsApp."
    }
  ];

  // Smart Heuristic & Keyword Diagnostic Engine
  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = demandText.toLowerCase();
      const isRobsonProposal = lower.includes("robson") || (lower.includes("botconversa") && lower.includes("sheets"));
      const isPartner = lower.includes("parceria") || lower.includes("revenue") || lower.includes("10%") || lower.includes("sem mensalidade") || lower.includes("comissão");
      const isMultiAgentHighScale = lower.includes("4 agente") || lower.includes("multi-agente") || lower.includes("10.000") || lower.includes("10k") || lower.includes("quiz") || lower.includes("site");
      const isMediumScale = lower.includes("2 agente") || lower.includes("dashboard") || lower.includes("5.000") || lower.includes("5k") || lower.includes("catalogo") || lower.includes("varejo");
      const isHourly = lower.includes("avulso") || lower.includes("apenas suporte") || lower.includes("ajustes pontuais");

      let recommendedPreset;
      let modelId = "gpt-4o-mini";
      let estimatedConversations = 4000;
      let msgsPerConv = 8;
      let reasoning = [];
      let longTermStrategy = "";
      let customServices = null;

      // Extract conversation numbers if explicitly present
      const convMatch = lower.match(/(\d+[\.\,]?\d*)\s*(conversas|atendimentos|leads|mensagens)/);
      if (convMatch) {
        const numStr = convMatch[1].replace(".", "").replace(",", "");
        const parsedNum = parseInt(numStr, 10);
        if (!isNaN(parsedNum) && parsedNum > 100) {
          estimatedConversations = parsedNum;
        }
      }

      if (isRobsonProposal) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-digital-2");
        modelId = "gpt-4o-mini";
        estimatedConversations = 4500;
        reasoning = [
          "Arquitetura Híbrida (Chatbot Estático + IA de Qualificação): economiza tokens no 1º contato (áudio + grupo VIP) e aciona a IA na qualificação de perfil.",
          "Segmentação Inteligente (🛍️ Revenda vs 👕 Uso Pessoal): fluxo exclusivo com verificação de experiência no ramo para revendedores.",
          "CRM Kanban BotConversa (9 Etapas) + Google Sheets automático para histórico e etiqueta 'LEAD QUENTE'.",
          "Régua de Recuperação com 3 Follow-ups automáticos (2h, 2 dias, 1 semana) e verificação de Horário de Atendimento Humano."
        ];
        longTermStrategy = "Estrutura completa e de altíssima conversão para Varejo & Vestuário. Ao filtrar leads de uso pessoal vs revenda no primeiro nível, sua equipe recebe apenas oportunidades pré-qualificadas com CEP, produtos e quantidades desejadas, otimizando o tempo de vendas.";
        customServices = [
          { id: "serv-1", title: "1. Chatbot Inicial & Rastreio de Origem (Meta API)", description: "Identificação automática da origem (TikTok, YouTube, Instagram), mensagem de boas-vindas, envio de link VIP, Instagram e 1º áudio gravado com solicitação do nome do cliente.", price: 1200, qty: 1, type: "setup" },
          { id: "serv-2", title: "2. Agente de IA de Qualificação (Revenda vs Uso Pessoal)", description: "Treinamento da IA para triagem de perfil (experiência no ramo para revendedores), tabela de preços das peças e cadastro comercial completo (CEP, endereço, produtos, tamanhos e quantidade).", price: 1500, qty: 1, type: "setup" },
          { id: "serv-3", title: "3. Integração CRM BotConversa & Google Sheets", description: "Configuração do Funil Kanban (9 etapas), etiquetagem automatizada de 'LEAD QUENTE', alerta imediato ao atendente, verificação de horário comercial e catálogo de mídias (vídeos/fotos/áudios).", price: 1200, qty: 1, type: "setup" },
          { id: "serv-4", title: "4. Régua de 3 Follow-ups Automáticos & 10 Modelos Meta", description: "Sequência de recuperação aos 2h, 2 dias e 1 semana com menu interativo + criação e homologação oficial de 10 templates de mensagem na Meta Cloud API.", price: 900, qty: 1, type: "setup" }
        ];
      } else if (isPartner) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-partner");
        reasoning = [
          "Modelo focado em crescimento mútuo e alinhamento de incentivos.",
          "Setup inicial (R$ 3.000 ~ 7.000) para implantar a estrutura comercial completa.",
          "Participação recorrente de 10% sobre as vendas geradas pela operação de IA.",
          "Sem mensalidade fixa de suporte, reduzindo a barreira de entrada para o cliente."
        ];
        longTermStrategy = "Ideal para empresas com alto potencial de conversão de vendas, onde o modelo de 10% de participação gera rentabilidade escalável a longo prazo sem barreira de fidelidade contratual.";
      } else if (isMultiAgentHighScale || estimatedConversations >= 8000) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-digital-3");
        modelId = "gpt-4o-mini";
        reasoning = [
          "Operação de alta complexidade com necessidade de até 4 Agentes de IA especialistas.",
          "Inclusão de Quiz/Site Inteligente para altíssima conversão de leads.",
          "Servidor Cloud de Alta Performance e Cluster de Banco de Dados Vetorial dedicados.",
          "10 horas de suporte mensal para acompanhamento contínuo e evolução dos fluxos."
        ];
        longTermStrategy = "Garante estabilidade e baixa latência para altos volumes (10.000+ conversas/mês). A estrutura com 4 agentes isola responsabilidades (vendas, suporte, recomendação) evitando alucinações da IA.";
      } else if (isMediumScale || estimatedConversations >= 3000) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-digital-2");
        modelId = "gpt-4o-mini";
        reasoning = [
          "Necessidade de 2 Agentes de IA (ex: Atendimento Inicial + Qualificação/Vendas).",
          "Plataforma Leona com Dashboard de Indicadores em Tempo Real.",
          "Banco de dados de vetores para busca inteligente em catálogo de produtos ou base de conhecimento.",
          "6 horas de suporte mensal da UX4YOU inclusas para manutenção e ajustes."
        ];
        longTermStrategy = "Excelente custo-benefício para empresas em consolidação digital. Permite escala de atendimento mantendo controle total sobre relatórios e métricas no Dashboard.";
      } else if (isHourly) {
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "pacote-horas-avulso");
        reasoning = [
          "Demanda focada em manutenção, melhorias pontuais ou banco de horas avulso.",
          "Sem custos de mensalidade de suporte recorrente obrigatórios."
        ];
        longTermStrategy = "Indicado para clientes que já possuem infraestrutura própria e necessitam apenas de horas especialistas de desenvolvimento da UX4YOU.";
      } else {
        // Default to Matriz Digital 1
        recommendedPreset = PRESET_PACKAGES.find(p => p.id === "matriz-digital-1");
        modelId = "gpt-4o-mini";
        reasoning = [
          "1 Agente de IA especialista focado em triagem, FAQ e direcionamento comercial.",
          "Automação Leona e integração com WhatsApp Cloud API.",
          "3 horas de suporte mensal para acompanhamento e otimização.",
          "Entregável em até 15 dias úteis com rápida validação no mercado."
        ];
        longTermStrategy = "Ideal para validar a operação de automação com baixo investimento inicial. Permite upgrade simples para o Matriz Digital 2 ou 3 conforme o volume de leads aumentar.";
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
      let suggestedProjectTitle = "Gestão de Automação + Inteligência de Operação";
      if (isRobsonProposal) suggestedProjectTitle = "Estrutura Completa de Atendimento no WhatsApp: Chatbot + IA de Qualificação + CRM + Google Sheets";
      else if (isPartnerModel) suggestedProjectTitle = "Parceria Comercial & Automação de Operação de IA";
      else if (isMultiAgentHighScale) suggestedProjectTitle = "Arquitetura Multi-Agente de IA + Site/Quiz Inteligente";
      else if (isMediumScale) suggestedProjectTitle = "Sistema de Agentes de IA no WhatsApp + Dashboard de Gestão";
      else suggestedProjectTitle = "Agente de IA no WhatsApp para Atendimento & Triagem";

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
              rows={3}
              value={demandText}
              onChange={(e) => {
                setDemandText(e.target.value);
                setAnalyzedResult(null);
              }}
              placeholder="Ex: Cliente quer automação no WhatsApp com 2 agentes de IA, integração com CRM, catálogo de produtos e espera atender 5.000 clientes/mês..."
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
