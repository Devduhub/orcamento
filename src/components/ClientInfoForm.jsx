import React, { useState } from 'react';
import { User, Building2, Calendar, FileCode, Mail, Phone, Globe, Image, Upload, Sparkles, Check, RefreshCw, Clock, Target, ListOrdered, Save } from 'lucide-react';
import { CLIENT_NICHES } from '../data/defaultPresets';

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
      const niche = clientInfo?.niche || 'Geral / Sem Nicho Específico';
      const isPartner = commercialTerms?.modelType === 'partner';
      
      let title = "Estrutura de Atendimento Ágil: IA de Qualificação + Direcionamento de Vendas";
      let objective = "Implementar uma operação comercial ágil e inteligente no WhatsApp oficial, garantindo atendimento instantâneo, triagem 24/7 e organização automática dos clientes qualificados para a equipe de vendas.";
      let journey = "1. Entrada & Origem\nLead clica no link e inicia o contato.\n\n2. Boas-Vindas & Triagem\nAtendimento imediato e identificação da demanda.\n\n3. Qualificação\nIA esclarece dúvidas e capta dados.\n\n4. Oportunidade Quente\nRepasse ao time de vendas.\n\n5. Follow-up\nRecuperação automática de contatos parados.";

      if (niche.includes("Lavanderia")) {
        title = "Central de Atendimento IA para Lavanderia: Captação e Triagem Automática";
        objective = "Automatizar o primeiro atendimento via WhatsApp, permitindo que os clientes solicitem coleta, consultem preços e recebam status de pedidos instantaneamente, enviando apenas os casos necessários para o time comercial.";
        journey = "1. Solicitação Inicial\nCliente envia mensagem via WhatsApp.\n\n2. Triagem de Serviço\nIA identifica se é lavagem comum, tapetes, estofados, etc.\n\n3. Cotação Básica\nApresentação de tabela e agendamento.\n\n4. Confirmação\nDados enviados para o sistema/logística.\n\n5. Pós-venda\nFollow-up sobre qualidade do serviço.";
      } else if (niche.includes("Comunicação Visual")) {
        title = "Máquina de Vendas no WhatsApp para Comunicação Visual";
        objective = "Agilizar orçamentos de projetos e displays sob medida. A IA coleta medidas, materiais e necessidades do cliente antes de envolver a equipe de projetos.";
        journey = "1. Primeiro Contato\nCliente chama buscando orçamento.\n\n2. Coleta de Escopo\nIA pergunta o tipo de material, tamanho e formato.\n\n3. Briefing Inicial\nRecebimento de dados da arte.\n\n4. Orçamento Específico\nRepasse para o projetista com tudo mastigado.\n\n5. Follow-up\nRetorno para fechamento.";
      } else if (niche.includes("Varejo")) {
        title = "Máquina de Vendas no WhatsApp: Triagem de Revenda vs Varejo com IA";
        objective = "Implementar operação comercial no WhatsApp focada na qualificação de perfil (uso pessoal vs revenda), coleta de CEP e lista de produtos desejados.";
        journey = "1. Entrada\nLead clica no link do Instagram.\n\n2. Boas-Vindas\nIA diferencia varejo de atacado.\n\n3. Catálogo\nApresentação de preços por perfil.\n\n4. Captura de Pedido\nColeta de grade, tamanho e envio ao CRM.\n\n5. Recuperação\nFollow-up para carrinhos abandonados.";
      } else if (niche.includes("Saúde")) {
        title = "Central de Agendamento Automático: IA e Triagem de Pacientes";
        objective = "Reduzir filas de espera no WhatsApp da clínica, tirando dúvidas de especialidades, aceitação de convênios e encaminhando para agendamento rápido.";
        journey = "1. Início\nPaciente entra em contato.\n\n2. Triagem de Convênio\nIA pergunta especialidade e se tem plano de saúde.\n\n3. Informações\nTira dúvidas sobre procedimentos.\n\n4. Agendamento\nRepasse para recepção com dados em mãos.\n\n5. Lembrete\nMensagem automática de confirmação de consulta.";
      }

      if (isPartner) {
        title = "Matriz Partner: " + title;
      }

      onChangeClient({ 
        ...clientInfo, 
        projectTitle: title,
        projectObjective: objective,
        customerJourney: journey
      });
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

        {/* Niche Dropdown */}
        <div className="form-group">
          <label><Globe size={14} /> Nicho de Mercado</label>
          <select
            value={clientInfo.niche || 'Geral / Sem Nicho Específico'}
            onChange={(e) => onChangeClient({ ...clientInfo, niche: e.target.value })}
            className="input-select"
          >
            {CLIENT_NICHES.map(niche => (
              <option key={niche} value={niche}>{niche}</option>
            ))}
          </select>
        </div>

        {/* Client Phone */}
        <div className="form-group">
          <label><Phone size={14} /> WhatsApp do Cliente</label>
          <input
            type="text"
            value={clientInfo.phone || ''}
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
              title="Analisar e preencher título, objetivo e jornada com IA baseada no nicho"
            >
              {isGeneratingTitle ? (
                <>
                  <RefreshCw size={13} className="spin-animation" />
                  <span>Gerando Textos...</span>
                </>
              ) : copiedFeedback ? (
                <>
                  <Check size={13} className="text-success" />
                  <span>Proposta Atualizada!</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>Preencher Textos com IA</span>
                </>
              )}
            </button>
          </div>
          <input
            type="text"
            value={clientInfo.projectTitle || ''}
            onChange={(e) => onChangeClient({ ...clientInfo, projectTitle: e.target.value })}
            placeholder="Ex: Estrutura Completa de Atendimento no WhatsApp: IA de Qualificação"
            className="input-project-title"
          />
        </div>

        {/* Objective */}
        <div className="form-group full-width">
          <label><Target size={14} /> Objetivo do Projeto</label>
          <textarea
            rows={3}
            value={clientInfo.projectObjective || ''}
            onChange={(e) => onChangeClient({ ...clientInfo, projectObjective: e.target.value })}
            placeholder="Descreva o foco principal do projeto de automação..."
          />
        </div>

        {/* Journey */}
        <div className="form-group full-width">
          <label><ListOrdered size={14} /> Como Funciona na Prática (Jornada do Cliente)</label>
          <textarea
            rows={6}
            value={clientInfo.customerJourney || ''}
            onChange={(e) => onChangeClient({ ...clientInfo, customerJourney: e.target.value })}
            placeholder="1. Entrada... 2. Boas Vindas... Descreva a jornada em formato de passos."
          />
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

      <div className="card-footer" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          className="btn-primary-sm" 
          onClick={() => {
            const btn = document.activeElement;
            if(btn) btn.blur();
            alert("Documento sincronizado! Verifique a prévia.");
          }}
          title="Sincronizar dados e atualizar prévia"
        >
          <Save size={16} />
          <span>Salvar e Atualizar Documento</span>
        </button>
      </div>
    </div>
  );
};
