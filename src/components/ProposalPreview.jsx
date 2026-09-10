import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Clock, Award, Handshake, DollarSign } from 'lucide-react';
import { DEFAULT_AI_MODELS, CORPORATE_EMAIL_PLANS } from '../data/defaultPresets';

export const ProposalPreview = ({
  companyInfo,
  clientInfo,
  services,
  discount,
  tokenConfig,
  emailConfig,
  infraItems,
  maintenanceMonthlyPrice,
  maintenanceDescription,
  glossary,
  commercialTerms
}) => {
  const isPartnerModel = commercialTerms?.modelType === 'partner';
  const partnerPercent = commercialTerms?.partnerPercent || 10;

  // Setup Subtotal & Total
  const setupSubtotal = services.reduce((acc, item) => acc + (Number(item.price) * Number(item.qty || 1)), 0);

  let discountAmount = 0;
  if (discount.type === 'fixed') {
    discountAmount = Number(discount.value || 0);
  } else if (discount.type === 'percent') {
    discountAmount = (setupSubtotal * Number(discount.value || 0)) / 100;
  }
  const setupGrandTotal = Math.max(0, setupSubtotal - discountAmount);

  // Corporate Email Calculation
  let emailMonthlyTotal = 0;
  let selectedEmailPlan = null;
  let emailUnitPricePerAccount = 0;

  if (emailConfig?.enabled) {
    selectedEmailPlan = CORPORATE_EMAIL_PLANS.find(p => p.id === emailConfig.planId) || CORPORATE_EMAIL_PLANS[0];
    const lgpd = emailConfig.hasLgpd ? 2 : 0;
    const phishing = emailConfig.hasPhishing ? 2 : 0;
    emailUnitPricePerAccount = selectedEmailPlan.pricePerAccount + lgpd + phishing;
    emailMonthlyTotal = emailUnitPricePerAccount * (emailConfig.accountCount || 1);
  }

  // Recurrence Calculation
  const infraMonthlyTotal = infraItems.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const fixedRecurrenceTotal = infraMonthlyTotal + Number(maintenanceMonthlyPrice || 0) + emailMonthlyTotal;

  // AI Token Calculation
  const selectedModel = DEFAULT_AI_MODELS.find(m => m.id === tokenConfig.selectedModelId) || DEFAULT_AI_MODELS[0];
  const totalMsgsPerMonth = (tokenConfig.conversationsPerMonth || 0) * (tokenConfig.msgsPerConversation || 0);
  const tokensPerMsg = selectedModel.avgTokensPerMsg || 1000;
  const inputTokens = totalMsgsPerMonth * Math.round(tokensPerMsg * 0.7);
  const outputTokens = totalMsgsPerMonth * Math.round(tokensPerMsg * 0.3);
  const costUSD = ((inputTokens / 1000000) * selectedModel.inputPriceUSDPerM) + ((outputTokens / 1000000) * selectedModel.outputPriceUSDPerM);
  const costBRL = costUSD * (tokenConfig.usdToBrlRate || 5.6);

  const activeGlossary = (glossary || []).filter(g => g.enabled);

  // Extract delivery days dynamically from commercialTerms
  let deliveryDays = commercialTerms?.deliveryDays;
  if (deliveryDays === undefined || deliveryDays === null || isNaN(Number(deliveryDays))) {
    if (commercialTerms?.deliveryTime) {
      const match = String(commercialTerms.deliveryTime).match(/(\d+)/);
      deliveryDays = match ? parseInt(match[1], 10) : 15;
    } else {
      deliveryDays = 15;
    }
  } else {
    deliveryDays = Number(deliveryDays);
  }

  return (
    <div className="proposal-preview-wrapper">
      <div id="proposal-pdf-container" className="proposal-document ux4you-official-template">
        
        {/* ==================== PAGE 1: CAPA EXECUTIVA ==================== */}
        <div className="pdf-page pdf-cover-page">
          <div className="cover-main-col">
            <div>
              <div className="pdf-cover-logo-row">
                <img
                  src={companyInfo.logoUrl || "/logo-ux4you.png"}
                  alt={companyInfo.name || "UX4YOU"}
                  className="pdf-company-logo"
                />
              </div>

              <div className="pdf-badge-pill">
                {isPartnerModel ? 'PROPOSTA COMERCIAL — MATRIZ PARTNER' : 'PROPOSTA COMERCIAL EXECUTIVA'}
              </div>

              <h1 className="pdf-cover-title">
                {clientInfo.projectTitle || "Estrutura Completa de Atendimento no WhatsApp: IA de Qualificação + CRM + Google Sheets"}
              </h1>

              <p className="pdf-cover-subtitle">
                {isPartnerModel
                  ? "Ganhamos juntos, crescemos juntos. Nossa estrutura e tecnologia para alavancar suas vendas no WhatsApp."
                  : "Estrutura comercial inteligente para automatizar o atendimento, qualificar interessados e direcionar oportunidades prontas para fechamento."}
              </p>

              <div className="pdf-op-card-clean">
                <div className="op-card-header">
                  <Zap size={18} className="text-magenta" />
                  <strong>Objetivo do Projeto</strong>
                </div>
                <p>
                  Implementar uma operação comercial ágil no WhatsApp oficial da Meta: recepção automática por origem (Instagram, TikTok, YouTube), qualificação inteligente de perfil (revenda vs. uso pessoal) e organização completa dos leads para a equipe de vendas.
                </p>
              </div>
            </div>

            <div className="pdf-client-footer-box">
              <span className="client-box-label">PREPARADO EXCLUSIVAMENTE PARA:</span>
              <strong className="client-box-name">{clientInfo.companyName || "Robson Moreira"}</strong>
              {clientInfo.contactName && <span className="client-box-sub">{clientInfo.contactName}</span>}
              {clientInfo.email && <span className="client-box-sub">{clientInfo.email}</span>}
              <span className="client-box-date">
                Data de Emissão: {clientInfo.date ? new Date(clientInfo.date + 'T12:00:00').toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')} • Cód: {clientInfo.proposalId}
              </span>
            </div>
          </div>

          {/* Right Solid Magenta Column */}
          <div className="cover-sidebar-col">
            <div className="sidebar-stat-block">
              <span className="stat-number">{deliveryDays}</span>
              <span className="stat-unit">DIAS ÚTEIS</span>
              <p className="stat-desc">para a operação estar totalmente no ar e atendendo com IA.</p>
            </div>

            <div className="sidebar-stat-block">
              <span className="stat-number">{isPartnerModel ? `${partnerPercent}%` : '24/7'}</span>
              <span className="stat-unit">{isPartnerModel ? 'PARTICIPAÇÃO' : 'ATENDIMENTO'}</span>
              <p className="stat-desc">
                {isPartnerModel
                  ? 'de participação sobre vendas a partir do início da operação.'
                  : 'atendimento contínuo e sem filas, sem perder clientes fora do horário comercial.'}
              </p>
            </div>
          </div>
        </div>

        <div className="pdf-page-break-divider"></div>

        {/* ==================== PAGE 2: ESCOPO & JORNADA DO CLIENTE ==================== */}
        <div className="pdf-page pdf-section-page">
          <div>
            <div className="pdf-section-header-tag">01. ESCOPO DA SOLUÇÃO & ENTREGÁVEIS</div>
            <h2 className="pdf-headline">Ativos de tecnologia sob medida para o seu negócio</h2>
            <p className="pdf-subheadline">
              Tudo configurado de ponta a ponta e entregue em até {deliveryDays} dias úteis com a API Oficial da Meta.
            </p>

            {/* Structured Deliverables Grid */}
            <div className="pdf-deliverables-cards-grid">
              {services.map((item, idx) => (
                <div key={item.id || idx} className="pdf-deliverable-item-card">
                  <div className="deliv-card-header">
                    <span className="deliv-number-badge">MÓDULO 0{idx + 1}</span>
                    <strong className="deliv-card-title">{item.title}</strong>
                  </div>
                  <p className="deliv-card-desc">{item.description}</p>
                  <div className="deliv-card-footer">
                    <span className="deliv-type-tag">{item.type === 'setup' ? 'Setup / Implantação' : 'Recorrente'}</span>
                    <span className="deliv-price-tag font-mono">
                      R$ {Number(item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Jornada do Cliente Simplificada e Objetiva */}
            <div className="jornada-section-block margin-top">
              <div className="pdf-section-header-tag">02. COMO FUNCIONA NA PRÁTICA (JORNADA DO CLIENTE)</div>
              <h3 className="sub-headline-sm">Fluxo de atendimento automático da entrada até a venda</h3>
              
              <div className="pdf-jornada-flow-container margin-top-xs">
                <div className="jornada-flow-step">
                  <div className="jornada-step-badge">1</div>
                  <strong>Entrada & Origem</strong>
                  <p>Lead clica no link das redes (TikTok, Instagram ou YouTube) e inicia contato.</p>
                </div>

                <div className="jornada-flow-step">
                  <div className="jornada-step-badge">2</div>
                  <strong>Boas-Vindas</strong>
                  <p>Atendimento imediato em segundos com áudio/texto e apresentação profissional.</p>
                </div>

                <div className="jornada-flow-step">
                  <div className="jornada-step-badge">3</div>
                  <strong>Triagem IA</strong>
                  <p>IA diferencia se é revenda (atacado) ou uso pessoal e apresenta tabela.</p>
                </div>

                <div className="jornada-flow-step">
                  <div className="jornada-step-badge">4</div>
                  <strong>Lead Quente</strong>
                  <p>Coleta dados (CEP, produtos) e avisa a equipe no CRM Kanban para fechamento.</p>
                </div>

                <div className="jornada-flow-step">
                  <div className="jornada-step-badge">5</div>
                  <strong>Follow-up</strong>
                  <p>Mensagens automáticas em 2h, 2 dias e 1 semana para recuperar quem não finalizou.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pdf-banner-clean">
            <strong>🎯 RESULTADO DIRETO PARA SUA OPERAÇÃO:</strong> Sua equipe comercial deixa de perder tempo respondendo dúvidas repetitivas e passa a atender somente contatos filtrados, com intenção de compra e dados em mãos.
          </div>
        </div>

        <div className="pdf-page-break-divider"></div>

        {/* ==================== PAGE 3: RESUMO FINANCEIRO & ACEITE ==================== */}
        <div className="pdf-page pdf-section-page">
          <div>
            <div className="pdf-section-header-tag">03. RESUMO DO INVESTIMENTO & CONDIÇÕES</div>
            <h2 className="pdf-headline">Investimento transparente e sem custos ocultos</h2>
            <p className="pdf-subheadline">
              Estrutura clara de investimento inicial de desenvolvimento e previsão de custos mensais da operação.
            </p>

            {/* Clear Financial Summary Cards */}
            <div className="investimento-cards-row margin-bottom">
              <div className="invest-card setup-box">
                <span className="invest-tag">INVESTIMENTO INICIAL (SETUP)</span>
                <div className="invest-price">
                  R$ {setupGrandTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                {discountAmount > 0 && (
                  <span className="discount-applied-tag">
                    (De R$ {setupSubtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} com Desconto de R$ {discountAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})
                  </span>
                )}
                <span className="invest-sub">Pagamento único na contratação / entrega</span>
                <p className="invest-desc">Construção completa da IA, integrações, CRM, fluxos e validação operacional.</p>
              </div>

              <div className="invest-card mensaliade-box">
                <span className="invest-tag tag-white">
                  {isPartnerModel ? 'MODELO MATRIZ PARTNER' : 'GESTÃO & SUPORTE UX4YOU'}
                </span>
                <div className="invest-price text-white">
                  {isPartnerModel ? (
                    `${partnerPercent}%`
                  ) : (
                    `R$ ${Number(maintenanceMonthlyPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês`
                  )}
                </div>
                <span className="invest-sub text-white">
                  {isPartnerModel ? 'Participação sobre vendas realizadas' : 'Mensalidade de Gestão & Evolução UX4YOU'}
                </span>
                <p className="invest-desc text-white">
                  {isPartnerModel
                    ? 'A partir do início da operação. Sem mensalidade fixa. Cancela quando quiser.'
                    : maintenanceDescription || 'Acompanhamento contínuo, calibração de prompts da IA, relatórios e suporte.'}
                </p>
              </div>
            </div>

            {/* Cost Breakdown Table */}
            <h4 className="sub-title-magenta">DETALHAMENTO DOS CUSTOS MENSAIS E FERRAMENTAS</h4>
            <div className="pdf-table-wrapper">
              <table className="pdf-financial-table">
                <thead>
                  <tr>
                    <th>Componente / Serviço</th>
                    <th>Tipo</th>
                    <th>Faturamento</th>
                    <th style={{ textAlign: 'right' }}>Valor Estimado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Gestão & Suporte UX4YOU</strong></td>
                    <td>Suporte & Curadoria</td>
                    <td>UX4YOU</td>
                    <td style={{ textAlign: 'right' }} className="font-mono">
                      {isPartnerModel ? `${partnerPercent}% de Vendas` : `R$ ${Number(maintenanceMonthlyPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês`}
                    </td>
                  </tr>

                  {infraItems.map((infra) => (
                    <tr key={infra.id}>
                      <td>
                        <strong>{infra.title}</strong>
                        {infra.note && <small className="table-subnote">{infra.note}</small>}
                      </td>
                      <td>Servidores / Licença</td>
                      <td>Provedor / UX4YOU</td>
                      <td style={{ textAlign: 'right' }} className="font-mono">
                        {infra.isVariable ? 'Faturado Direto' : `R$ ${Number(infra.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês`}
                      </td>
                    </tr>
                  ))}

                  {tokenConfig.conversationsPerMonth > 0 && (
                    <tr>
                      <td>
                        <strong>Consumo de IA ({selectedModel.name.split('(')[0]})</strong>
                        <small className="table-subnote">Estimativa para ~{tokenConfig.conversationsPerMonth?.toLocaleString('pt-BR')} conversas/mês</small>
                      </td>
                      <td>Tokens OpenAI / Meta</td>
                      <td>Direto no Cartão / Provedor</td>
                      <td style={{ textAlign: 'right' }} className="font-mono">
                        ~ R$ {costBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/mês
                      </td>
                    </tr>
                  )}

                  {emailConfig?.enabled && (
                    <tr>
                      <td>
                        <strong>E-mail Corporativo ({emailConfig.accountCount} contas)</strong>
                        <small className="table-subnote">{selectedEmailPlan.storage} + {selectedEmailPlan.retention} arquivamento</small>
                      </td>
                      <td>Hospedagem Corporativa</td>
                      <td>Mensal</td>
                      <td style={{ textAlign: 'right' }} className="font-mono">
                        R$ {emailMonthlyTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}/mês
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Commercial Terms Summary */}
            <div className="pdf-terms-clean margin-top-sm">
              <div className="pdf-terms-grid-inline">
                <div>
                  <strong>Prazo de Implantação:</strong> {commercialTerms?.deliveryTime || `${deliveryDays} dias úteis (a partir do recebimento dos acessos).`}
                </div>
                <div>
                  <strong>Garantia de Setup:</strong> {commercialTerms?.warrantyDays || 30} dias para homologação e suporte.
                </div>
                <div>
                  <strong>Validade da Proposta:</strong> {commercialTerms?.validityDays || 15} dias corridos.
                </div>
                <div>
                  <strong>Condições:</strong> Setup na contratação + recorrência mensal acordada.
                </div>
              </div>
            </div>
          </div>

          {/* Signature Block */}
          <div className="pdf-signature-section margin-top-sm">
            <p className="sig-intro">
              Estando de acordo com as especificações, escopo e investimento deste documento, assinam as partes:
            </p>

            <div className="signatures-grid">
              <div className="signature-box">
                <div className="signature-line"></div>
                <strong className="sign-name">{companyInfo.name || "UX4YOU"}</strong>
                <span className="sign-role">Gestão de Automação & IA</span>
                <span className="sign-date">Data: ____/____/2026</span>
              </div>

              <div className="signature-box">
                <div className="signature-line"></div>
                <strong className="sign-name">{clientInfo.companyName || "Robson Moreira"}</strong>
                <span className="sign-role">{clientInfo.contactName || "Aceite do Cliente"}</span>
                <span className="sign-date">Data: ____/____/2026</span>
              </div>
            </div>

            <div className="pdf-footer-ux4you">
              <span>UX4YOU • Gestão de Automação & Inteligência Comercial</span>
              <span>{companyInfo.website || "www.ux4you.com.br"} • {companyInfo.email || "contato@ux4you.com.br"}</span>
            </div>
          </div>
        </div>

        {/* ==================== PAGE 4 (OPTIONAL): GUIA DIDÁTICO / GLOSSÁRIO ==================== */}
        {activeGlossary.length > 0 && (
          <>
            <div className="pdf-page-break-divider"></div>
            <div className="pdf-page pdf-section-page">
              <div>
                <div className="pdf-section-header-tag">04. GUIA INFORMATIVO & CONCEITOS</div>
                <h2 className="pdf-headline">Entendendo a Tecnologia da Sua Operação</h2>
                <p className="pdf-subheadline">
                  Respostas simples e didáticas para as principais dúvidas sobre Inteligência Artificial e ferramentas.
                </p>

                <div className="pdf-glossary-grid-ux margin-top">
                  {activeGlossary.map((g) => (
                    <div key={g.id} className="glossary-card-ux">
                      <strong>{g.title}</strong>
                      <p>{g.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pdf-footer-ux4you">
                <span>UX4YOU • Gestão de Automação & Inteligência Comercial</span>
                <span>{companyInfo.website || "www.ux4you.com.br"}</span>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default ProposalPreview;
