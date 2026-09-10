import React, { useState } from 'react';
import { User, Building2, Calendar, FileCode, Mail, Phone, Globe, Image, Upload, Sparkles, Check, RefreshCw, Clock } from 'lucide-react';

export const ClientInfoForm = ({
  clientInfo,
  companyInfo,
  onChangeClient,
  onChangeCompany,
  services = [],
  commercialTerms = {},
  onUpdateTerms,
  tokenConfig = {},
  emailConfig = {}
}) => {
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [suggestedTitles, setSuggestedTitles] = useState([]);
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeCompany({ ...companyInfo, logoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateAITitle = () => {
    setIsGeneratingTitle(true);

    setTimeout(() => {
      // Analyze current services and client context
      const servicesText = (services || []).map(s => `${s.title} ${s.description}`).join(' ').toLowerCase();
      const clientName = clientInfo?.companyName || '';
      const contactOrNiche = clientInfo?.contactName || '';
      const isPartner = commercialTerms?.modelType === 'partner';

      // Detect capabilities
      const hasMeta = servicesText.includes('meta') || servicesText.includes('whatsapp') || servicesText.includes('chatbot');
      const hasAI = servicesText.includes('ia') || servicesText.includes('inteligência') || servicesText.includes('agente') || (tokenConfig?.conversationsPerMonth > 0);
      const hasCRM = servicesText.includes('crm') || servicesText.includes('botconversa') || servicesText.includes('funil') || servicesText.includes('kanban');
      const hasSheets = servicesText.includes('sheets') || servicesText.includes('planilha') || servicesText.includes('dados');
      const hasFollowup = servicesText.includes('follow') || servicesText.includes('recuperação');
      const hasEmail = emailConfig?.enabled;

      // Extract niche context
      let nicheTag = '';
      const combinedClient = `${clientName} ${contactOrNiche}`.toLowerCase();
      if (combinedClient.includes('roupa') || combinedClient.includes('vestuário') || combinedClient.includes('varejo') || combinedClient.includes('moda') || combinedClient.includes('revenda')) {
        nicheTag = 'Varejo & Confecção';
      } else if (combinedClient.includes('saúde') || combinedClient.includes('clínica') || combinedClient.includes('médic') || combinedClient.includes('odont')) {
        nicheTag = 'Saúde & Clínicas';
      } else if (combinedClient.includes('imob') || combinedClient.includes('corretor')) {
        nicheTag = 'Imobiliário';
      } else if (combinedClient.includes('advoc') || combinedClient.includes('jurídic')) {
        nicheTag = 'Jurídico';
      }

      // Generate context-aware titles
      const options = [];

      // Build specific tech stack string
      const stackParts = [];
      if (hasAI) stackParts.push('IA de Qualificação');
      if (hasCRM) stackParts.push('CRM');
      if (hasSheets) stackParts.push('Google Sheets');
      if (hasFollowup && stackParts.length < 3) stackParts.push('Follow-up Automático');
      if (hasEmail && stackParts.length < 3) stackParts.push('E-mail Corporativo');

      const stackString = stackParts.slice(0, 3).join(' + ') || 'IA de Qualificação + CRM + Automação';

      if (isPartner) {
        options.push(`Matriz Partner: Operação Comercial no WhatsApp com IA & Gestão de Vendas`);
        options.push(`Estrutura de Alta Conversão no WhatsApp: IA Qualificadora + CRM + Parceria de Vendas`);
      } else {
        options.push(`Estrutura Completa de Atendimento no WhatsApp: ${stackString}`);
        options.push(`Automação Comercial no WhatsApp: Agente de IA para Triagem & Fechamento de Vendas`);
      }

      // Niche-specific options
      if (nicheTag === 'Varejo & Confecção' || combinedClient.includes('revenda')) {
        options.push(`Máquina de Vendas no WhatsApp: Triagem de Revenda vs Varejo com IA + CRM Integrado`);
      } else if (nicheTag) {
        options.push(`Central Inteligente de Atendimento no WhatsApp para ${nicheTag}: IA + CRM Oficial`);
      } else {
        options.push(`Sistema de Alta Performance no WhatsApp: Recepção Oficial Meta + Triagem com IA`);
      }

      options.push(`Operação Comercial com Inteligência Artificial: Chatbot Oficial Meta + CRM & Follow-up`);

      const uniqueOptions = [...new Set(options)].filter(Boolean);
      const chosen = uniqueOptions[0];

      onChangeClient({ ...clientInfo, projectTitle: chosen });
      setSuggestedTitles(uniqueOptions);
      setIsGeneratingTitle(false);
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 3500);
    }, 400);
  };

  return (
    <div className="card-section">
      <div className="card-header">
        <Building2 className="card-icon" size={20} />
        <div>
          <div className="step-tag-pill">ETAPA 01</div>
          <h3>Informações do Cliente e da Proposta</h3>
          <p className="card-desc">Defina os dados da proposta comercial e identificação do cliente</p>
        </div>
      </div>

      <div className="form-grid">
        {/* Client Company */}
        <div className="form-group">
          <label><Building2 size={14} /> Empresa / Cliente</label>
          <input
            type="text"
            value={clientInfo.companyName}
            onChange={(e) => onChangeClient({ ...clientInfo, companyName: e.target.value })}
            placeholder="Ex: Empresa Exemplo Ltda"
          />
        </div>

        {/* Contact Person */}
        <div className="form-group">
          <label><User size={14} /> Nome do Contato</label>
          <input
            type="text"
            value={clientInfo.contactName}
            onChange={(e) => onChangeClient({ ...clientInfo, contactName: e.target.value })}
            placeholder="Ex: Carlos Silva - Diretor de Operações"
          />
        </div>

        {/* Client Email */}
        <div className="form-group">
          <label><Mail size={14} /> E-mail do Cliente</label>
          <input
            type="email"
            value={clientInfo.email}
            onChange={(e) => onChangeClient({ ...clientInfo, email: e.target.value })}
            placeholder="carlos@empresaexemplo.com.br"
          />
        </div>

        {/* Client Phone */}
        <div className="form-group">
          <label><Phone size={14} /> WhatsApp do Cliente</label>
          <input
            type="text"
            value={clientInfo.phone}
            onChange={(e) => onChangeClient({ ...clientInfo, phone: e.target.value })}
            placeholder="(11) 98765-4321"
          />
        </div>

        {/* Project Title with AI Generator */}
        <div className="form-group full-width">
          <div className="label-with-action">
            <label><FileCode size={14} /> Título do Projeto</label>
            <button
              type="button"
              onClick={handleGenerateAITitle}
              disabled={isGeneratingTitle}
              className="btn-ai-sparkle-inline"
              title="Gerar título profissional com IA coerente com os serviços e cliente selecionados"
            >
              {isGeneratingTitle ? (
                <>
                  <RefreshCw size={13} className="spin-animation" />
                  <span>Analisando e Gerando...</span>
                </>
              ) : copiedFeedback ? (
                <>
                  <Check size={13} className="text-success" />
                  <span>Título Atualizado com IA!</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>Gerar Título com IA</span>
                </>
              )}
            </button>
          </div>
          <input
            type="text"
            value={clientInfo.projectTitle}
            onChange={(e) => onChangeClient({ ...clientInfo, projectTitle: e.target.value })}
            placeholder="Ex: Estrutura Completa de Atendimento no WhatsApp: IA de Qualificação + CRM + Google Sheets"
            className="input-project-title"
          />

          {suggestedTitles.length > 1 && (
            <div className="ai-title-suggestions">
              <span className="suggestions-label">💡 Sugestões geradas pela IA (clique para aplicar):</span>
              <div className="suggestions-chips">
                {suggestedTitles.map((title, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`suggestion-chip ${clientInfo.projectTitle === title ? 'active' : ''}`}
                    onClick={() => onChangeClient({ ...clientInfo, projectTitle: title })}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Proposal Code */}
        <div className="form-group">
          <label>Número / Código da Proposta</label>
          <input
            type="text"
            value={clientInfo.proposalId}
            onChange={(e) => onChangeClient({ ...clientInfo, proposalId: e.target.value })}
          />
        </div>

        {/* Proposal Date */}
        <div className="form-group">
          <label><Calendar size={14} /> Data de Emissão</label>
          <input
            type="date"
            value={clientInfo.date}
            onChange={(e) => onChangeClient({ ...clientInfo, date: e.target.value })}
          />
        </div>

        {/* Delivery Days (Directly controls the Cover Badge) */}
        {onUpdateTerms && (
          <div className="form-group">
            <label><Clock size={14} /> Prazo de Implantação (Dias Úteis)</label>
            <input
              type="number"
              min="1"
              max="180"
              value={commercialTerms?.deliveryDays !== undefined ? commercialTerms.deliveryDays : 15}
              onChange={(e) => {
                const days = parseInt(e.target.value) || 1;
                onUpdateTerms({
                  ...commercialTerms,
                  deliveryDays: days,
                  deliveryTime: `Operação Funcional em até ${days} dias úteis`
                });
              }}
            />
            <span className="input-hint">Altera o destaque na capa do PDF (ex: {commercialTerms?.deliveryDays || 15} DIAS ÚTEIS).</span>
          </div>
        )}
      </div>

      {/* Accordion for Provider (Ux For You) Customization */}
      <details className="custom-company-details">
        <summary className="custom-company-summary">
          <Image size={16} /> Personalizar Dados & Logotipo da Ux For You
        </summary>
        <div className="form-grid margin-top">
          <div className="form-group">
            <label>Nome da Minha Empresa</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => onChangeCompany({ ...companyInfo, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Slogan / Subtítulo</label>
            <input
              type="text"
              value={companyInfo.tagline}
              onChange={(e) => onChangeCompany({ ...companyInfo, tagline: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label><Globe size={14} /> Website</label>
            <input
              type="text"
              value={companyInfo.website}
              onChange={(e) => onChangeCompany({ ...companyInfo, website: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label><Phone size={14} /> Telefone / WhatsApp</label>
            <input
              type="text"
              value={companyInfo.phone}
              onChange={(e) => onChangeCompany({ ...companyInfo, phone: e.target.value })}
            />
          </div>
          <div className="form-group full-width">
            <label><Upload size={14} /> Logotipo Personalizado (Envio de Imagem em PNG/JPG)</label>
            <div className="logo-upload-wrapper">
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="file-input" />
              {companyInfo.logoUrl ? (
                <div className="logo-preview-box">
                  <img src={companyInfo.logoUrl} alt="Logo" className="logo-img-preview" />
                  <button
                    type="button"
                    onClick={() => onChangeCompany({ ...companyInfo, logoUrl: '' })}
                    className="btn-danger-sm"
                  >
                    Remover Logo
                  </button>
                </div>
              ) : (
                <span className="logo-upload-hint">Deixe em branco para usar a identidade visual padrão da Ux For You.</span>
              )}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};
