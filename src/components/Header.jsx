import React, { useState, useEffect } from 'react';
import { Sparkles, FileText, Download, RotateCcw, PackageCheck, Eye, Edit3, Smartphone } from 'lucide-react';
import { PRESET_PACKAGES } from '../data/defaultPresets';

export const Header = ({
  activeTab,
  setActiveTab,
  selectedPresetId,
  onSelectPreset,
  onReset,
  onGeneratePDF,
  isGeneratingPDF,
  proposalId,
  clientName
}) => {
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand Logo & Title */}
        <div className="brand-group">
          <img src="/logo-ux4you.png" alt="Ux4You" className="brand-header-logo" />
          <div>
            <div className="brand-name-row">
              <span className="brand-tag font-mono">Gerador de Orçamentos</span>
            </div>
            <p className="brand-subtitle">Desenvolvimento Web & Soluções em Inteligência Artificial</p>
          </div>
        </div>

        {/* Center Actions / Preset Picker */}
        <div className="header-controls">
          <div className="preset-picker-group">
            <PackageCheck size={18} className="preset-icon" />
            <select
              value={selectedPresetId}
              onChange={(e) => onSelectPreset(e.target.value)}
              className="preset-select"
            >
              <option value="">-- Carregar Pacote Pré-definido --</option>
              {PRESET_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  [{pkg.category}] {pkg.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Tabs */}
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              <Edit3 size={16} />
              <span>Editar Orçamento</span>
            </button>
            <button
              className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={16} />
              <span>Visualizar Proposta</span>
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="header-actions">
          <button
            onClick={() => {
              if (activeTab !== 'editor') setActiveTab('editor');
              setTimeout(() => {
                const el = document.getElementById('demand-analyzer-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="btn-ai-header glow-effect-magenta"
            title="Diagnosticar Demanda do Cliente com IA"
          >
            <Sparkles size={16} />
            <span>Diagnóstico com IA</span>
          </button>

          {installPrompt && (
            <button
              onClick={handleInstallApp}
              className="btn-install-pwa glow-effect-cyan"
              title="Instalar como aplicativo no seu computador ou celular"
            >
              <Smartphone size={16} />
              <span>Instalar App</span>
            </button>
          )}

          <button onClick={onReset} className="btn-secondary btn-icon" title="Resetar formulário">
            <RotateCcw size={16} />
            <span>Resetar</span>
          </button>
          <button
            onClick={onGeneratePDF}
            disabled={isGeneratingPDF}
            className="btn-primary glow-effect"
          >
            <Download size={18} />
            <span>{isGeneratingPDF ? 'Gerando PDF...' : 'Baixar Proposta (PDF)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
