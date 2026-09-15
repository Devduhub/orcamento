import React, { useState } from 'react';
import { Eye, Download, Maximize2, Edit3, CheckCircle } from 'lucide-react';
import { Header } from './components/Header';
import { ClientInfoForm } from './components/ClientInfoForm';
import { DemandAnalyzer } from './components/DemandAnalyzer';
import { ServicesEditor } from './components/ServicesEditor';
import { TokenCalculator } from './components/TokenCalculator';
import { InfrastructureEditor } from './components/InfrastructureEditor';
import { EmailHostingEditor } from './components/EmailHostingEditor';
import { GlossaryEditor } from './components/GlossaryEditor';
import { CommercialTermsEditor } from './components/CommercialTermsEditor';
import { ProposalPreview } from './components/ProposalPreview';
import { exportProposalToPDF } from './utils/pdfGenerator';
import {
  INITIAL_COMPANY_INFO,
  PRESET_PACKAGES,
  DEFAULT_EDUCATIONAL_GLOSSARY,
  DEFAULT_COMMERCIAL_TERMS
} from './data/defaultPresets';

export function App() {
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'
  const [selectedPresetId, setSelectedPresetId] = useState('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(true);

  // Core App States
  const [companyInfo, setCompanyInfo] = useState(INITIAL_COMPANY_INFO);
  const [clientInfo, setClientInfo] = useState({
    companyName: '',
    contactName: '',
    niche: 'Geral / Sem Nicho Específico',
    email: '',
    phone: '',
    projectTitle: '',
    projectObjective: 'Implementar uma operação de atendimento ágil e inteligente no WhatsApp oficial da Meta, focando na recepção automática, triagem de interessados e organização estruturada das oportunidades comerciais para a equipe de vendas.',
    customerJourney: `1. Entrada & Origem\nLead clica no link das redes sociais ou anúncios e inicia o contato.\n\n2. Boas-Vindas & Triagem Inicial\nAtendimento imediato em segundos com apresentação da empresa e inteligência artificial para entender a demanda.\n\n3. Qualificação & Captura de Dados\nIA identifica o perfil do cliente, esclarece dúvidas principais e solicita os dados necessários.\n\n4. Oportunidade Quente\nO contato qualificado é repassado automaticamente para o CRM da equipe de fechamento.\n\n5. Follow-up\nMensagens automáticas de recuperação enviadas para reativar clientes que pararam no meio do atendimento.`,
    proposalId: `UX-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
    date: new Date().toISOString().split('T')[0]
  });

  // Services / Setup
  const [services, setServices] = useState(PRESET_PACKAGES[0].items);
  const [discount, setDiscount] = useState({ type: 'none', value: 0 });

  // AI Tokens
  const [tokenConfig, setTokenConfig] = useState(PRESET_PACKAGES[0].tokenEstimate);

  // Corporate Email State
  const [emailConfig, setEmailConfig] = useState({
    enabled: false,
    planId: 'email-10gb-90d',
    accountCount: 5,
    hasLgpd: true,
    hasPhishing: false
  });

  // Infrastructure & Monthly
  const [infraItems, setInfraItems] = useState(PRESET_PACKAGES[0].infraItems);
  const [maintenanceMonthlyPrice, setMaintenanceMonthlyPrice] = useState(PRESET_PACKAGES[0].maintenanceMonthlyPrice);
  const [maintenanceDescription, setMaintenanceDescription] = useState(PRESET_PACKAGES[0].maintenanceDescription);

  // Glossary & Terms
  const [glossary, setGlossary] = useState(DEFAULT_EDUCATIONAL_GLOSSARY);
  const [commercialTerms, setCommercialTerms] = useState(DEFAULT_COMMERCIAL_TERMS);

  // Load Preset Handler
  const handleSelectPreset = (presetId) => {
    setSelectedPresetId(presetId);
    if (!presetId) return;

    const preset = PRESET_PACKAGES.find(p => p.id === presetId);
    if (preset) {
      setServices(preset.items);
      setTokenConfig(preset.tokenEstimate);
      setInfraItems(preset.infraItems);
      setMaintenanceMonthlyPrice(preset.maintenanceMonthlyPrice);
      setMaintenanceDescription(preset.maintenanceDescription);
    }
  };

  // Handler to Apply AI Recommendation
  const handleApplyRecommendedPlan = (recommendation) => {
    if (recommendation.presetId) {
      setSelectedPresetId(recommendation.presetId);
    }
    if (recommendation.projectTitle) {
      setClientInfo(prev => ({ ...prev, projectTitle: recommendation.projectTitle }));
    }
    if (recommendation.tokenConfig) {
      setTokenConfig(recommendation.tokenConfig);
    }
    if (recommendation.services) {
      setServices(recommendation.services);
    }
    if (recommendation.infraItems) {
      setInfraItems(recommendation.infraItems);
    }
    setMaintenanceMonthlyPrice(recommendation.maintenanceMonthlyPrice);
    setMaintenanceDescription(recommendation.maintenanceDescription);

    if (recommendation.isPartnerModel) {
      setCommercialTerms(prev => ({
        ...prev,
        modelType: 'partner',
        partnerPercent: recommendation.partnerPercent || 10
      }));
    } else {
      setCommercialTerms(prev => ({
        ...prev,
        modelType: 'standard'
      }));
    }
  };

  // Reset Handler
  const handleReset = () => {
    if (window.confirm('Tem certeza de que deseja resetar o formulário para os valores iniciais?')) {
      setSelectedPresetId('');
      setServices(PRESET_PACKAGES[0].items);
      setTokenConfig(PRESET_PACKAGES[0].tokenEstimate);
      setInfraItems(PRESET_PACKAGES[0].infraItems);
      setMaintenanceMonthlyPrice(PRESET_PACKAGES[0].maintenanceMonthlyPrice);
      setMaintenanceDescription(PRESET_PACKAGES[0].maintenanceDescription);
      setEmailConfig({ enabled: false, planId: 'email-10gb-90d', accountCount: 5, hasLgpd: true, hasPhishing: false });
      setDiscount({ type: 'none', value: 0 });
    }
  };

  // PDF Export Trigger
  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);

    const currentTab = activeTab;
    if (currentTab !== 'preview') {
      setActiveTab('preview');
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    const filename = `Proposta_UX4YOU_${(clientInfo.companyName || 'Cliente').replace(/\s+/g, '_')}_${clientInfo.proposalId}.pdf`;
    await exportProposalToPDF('proposal-pdf-container', filename);

    setIsGeneratingPDF(false);
  };

  return (
    <div className="app-layout">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        onGeneratePDF={handleGeneratePDF}
        isGeneratingPDF={isGeneratingPDF}
        proposalId={clientInfo.proposalId}
        clientName={clientInfo.companyName}
      />

      {/* Main App Container */}
      <main className="main-content">
        {activeTab === 'editor' ? (
          <div className={`editor-container ${showLivePreview ? 'grid-two-columns' : 'single-column'}`}>
            {/* Left Column: Form Controls */}
            <div className="editor-form-column">
              <div className="editor-toolbar" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <button 
                   className="btn-secondary-sm"
                   onClick={() => setShowLivePreview(!showLivePreview)}
                   style={{ fontSize: '13px', padding: '6px 12px' }}
                >
                   {showLivePreview ? 'Ocultar PDF Lateral (Modo Foco)' : 'Mostrar PDF Lateral'}
                </button>
              </div>

              <DemandAnalyzer
                onApplyPlan={handleApplyRecommendedPlan}
                clientInfo={clientInfo}
              />

              <ClientInfoForm
                clientInfo={clientInfo}
                companyInfo={companyInfo}
                onChangeClient={setClientInfo}
                onChangeCompany={setCompanyInfo}
                services={services}
                commercialTerms={commercialTerms}
                onUpdateTerms={setCommercialTerms}
                tokenConfig={tokenConfig}
                emailConfig={emailConfig}
              />

              <ServicesEditor
                items={services}
                onUpdateItems={setServices}
                discount={discount}
                onUpdateDiscount={setDiscount}
              />

              <CommercialTermsEditor
                terms={commercialTerms}
                onUpdateTerms={setCommercialTerms}
              />

              {/* Advanced Sections (Collapsible) */}
              <details className="advanced-section-accordion">
                <summary className="advanced-section-summary">
                  <span>⚙️ Configurações Avançadas</span>
                  <span className="accordion-hint">Tokens de IA, E-mail, Infraestrutura e Glossário</span>
                </summary>
                <div className="advanced-section-body">
                  <TokenCalculator
                    tokenConfig={tokenConfig}
                    onUpdateTokenConfig={setTokenConfig}
                  />

                  <EmailHostingEditor
                    emailConfig={emailConfig}
                    onUpdateEmailConfig={setEmailConfig}
                  />

                  <InfrastructureEditor
                    infraItems={infraItems}
                    onUpdateInfraItems={setInfraItems}
                    maintenanceMonthlyPrice={maintenanceMonthlyPrice}
                    onUpdateMaintenancePrice={setMaintenanceMonthlyPrice}
                    maintenanceDescription={maintenanceDescription}
                    onUpdateMaintenanceDesc={setMaintenanceDescription}
                  />

                  <GlossaryEditor
                    glossary={glossary}
                    onUpdateGlossary={setGlossary}
                  />
                </div>
              </details>

              {/* Bottom Action Card to Transform & View PDF */}
              <div className="editor-completion-action-bar">
                <div className="completion-info">
                  <div className="completion-badge">✨ Orçamento Pronto?</div>
                  <h4>Atualizar Proposta & Gerar PDF</h4>
                  <p>Todas as modificações feitas acima já estão salvas em tempo real. Clique para visualizar a proposta completa ou baixar o PDF oficial.</p>
                </div>
                <div className="completion-buttons">
                  <button
                    type="button"
                    className="btn-update-view"
                    onClick={() => {
                      setActiveTab('preview');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <Eye size={18} />
                    <span>Visualizar Proposta Final</span>
                  </button>
                  <button
                    type="button"
                    className="btn-generate-direct"
                    onClick={handleGeneratePDF}
                    disabled={isGeneratingPDF}
                  >
                    <Download size={18} />
                    <span>{isGeneratingPDF ? 'Gerando PDF...' : 'Baixar Proposta em PDF'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Live Sticky Document Preview */}
            {showLivePreview && (
              <div className="editor-preview-sticky-column">
                <div className="sticky-preview-header">
                <div className="sticky-title-group">
                  <h3>Pré-visualização em Tempo Real</h3>
                  <span className="live-badge">• AO VIVO</span>
                </div>
                <div className="sticky-actions">
                  <button
                    className="btn-icon-link"
                    onClick={() => setActiveTab('preview')}
                    title="Expandir para tela cheia"
                  >
                    <Maximize2 size={15} />
                    <span>Tela Cheia</span>
                  </button>
                  <button
                    className="btn-primary-xs"
                    onClick={handleGeneratePDF}
                    disabled={isGeneratingPDF}
                  >
                    <Download size={14} />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
              <div className="mini-preview-container">
                <ProposalPreview
                  companyInfo={companyInfo}
                  clientInfo={clientInfo}
                  services={services}
                  discount={discount}
                  tokenConfig={tokenConfig}
                  emailConfig={emailConfig}
                  infraItems={infraItems}
                  maintenanceMonthlyPrice={maintenanceMonthlyPrice}
                  maintenanceDescription={maintenanceDescription}
                  glossary={glossary}
                  commercialTerms={commercialTerms}
                />
              </div>
              </div>
            )}
          </div>
        ) : (
          /* Full Page Preview Tab */
          <div className="full-preview-container">
            <div className="preview-toolbar-sticky">
              <button onClick={() => setActiveTab('editor')} className="btn-secondary">
                <Edit3 size={16} />
                <span>Voltar para Edição</span>
              </button>
              <div className="preview-client-badge">
                <span>Proposta para: <strong>{clientInfo.companyName}</strong></span>
              </div>
              <button onClick={handleGeneratePDF} disabled={isGeneratingPDF} className="btn-primary">
                <Download size={18} />
                <span>{isGeneratingPDF ? 'Gerando PDF...' : 'Baixar Proposta em PDF'}</span>
              </button>
            </div>
            <ProposalPreview
              companyInfo={companyInfo}
              clientInfo={clientInfo}
              services={services}
              discount={discount}
              tokenConfig={tokenConfig}
              emailConfig={emailConfig}
              infraItems={infraItems}
              maintenanceMonthlyPrice={maintenanceMonthlyPrice}
              maintenanceDescription={maintenanceDescription}
              glossary={glossary}
              commercialTerms={commercialTerms}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

