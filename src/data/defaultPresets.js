// Default presets and data for Ux4You Quote Generator matching official UX4YOU pricing & packages

export const INITIAL_COMPANY_INFO = {
  name: "UX4YOU",
  tagline: "Gestão de Automação & Inteligência de Operação",
  email: "contato@ux4you.com.br",
  phone: "+55 (11) 99999-8888",
  website: "www.ux4you.com.br",
  logoUrl: "/logo-ux4you.png",
};

export const CLIENT_NICHES = [
  "Geral / Sem Nicho Específico",
  "Lavanderia & Higienização (ex: Abralav)",
  "Comunicação Visual & Displays (ex: Mais Display)",
  "Indústria & Manufatura (ex: Master)",
  "Confeitaria & Gastronomia",
  "Varejo & Vestuário",
  "Saúde, Clínicas & Odontologia",
  "Imobiliária & Corretores",
  "Advocacia & Jurídico",
  "Educação & Infoprodutos",
  "Prestação de Serviços Gerais"
];

export const DEFAULT_AI_MODELS = [
  { id: "gpt-4o-mini", name: "OpenAI GPT-4o Mini (Recomendado para FAQ e Triagem Leona)", inputPriceUSDPerM: 0.15, outputPriceUSDPerM: 0.60, avgTokensPerMsg: 800 },
  { id: "gpt-4o", name: "OpenAI GPT-4o (Alto Raciocínio & Vendas Complexas)", inputPriceUSDPerM: 2.50, outputPriceUSDPerM: 10.00, avgTokensPerMsg: 1200 },
  { id: "claude-3-5-sonnet", name: "Anthropic Claude 3.5 Sonnet (Excelente Redação)", inputPriceUSDPerM: 3.00, outputPriceUSDPerM: 15.00, avgTokensPerMsg: 1200 },
  { id: "gemini-1-5-flash", name: "Google Gemini 1.5 Flash (Ultrarrápido & Econômico)", inputPriceUSDPerM: 0.075, outputPriceUSDPerM: 0.30, avgTokensPerMsg: 800 },
];

export const HOURLY_SUPPORT_PACKAGES = [
  { id: "hour-1", title: "Hora Avulsa de Suporte", hours: 1, price: 200 },
  { id: "hour-3", title: "Pacote de 3h de Suporte", hours: 3, price: 550 },
  { id: "hour-6", title: "Pacote de 6h de Suporte", hours: 6, price: 950 },
  { id: "hour-12", title: "Pacote de 12h de Suporte", hours: 12, price: 1750 },
];

// Corporate Email Hosting Plans (Inftek / UX4YOU Client Prices)
export const CORPORATE_EMAIL_PLANS = [
  { id: "email-2gb-30d", name: "2GB + 30 dias de arquivamento (Backup de e-mails apagados)", storage: "2GB", retention: "30 dias", pricePerAccount: 17.90 },
  { id: "email-10gb-90d", name: "10GB + 90 dias de arquivamento (Backup de e-mails apagados)", storage: "10GB", retention: "90 dias", pricePerAccount: 19.90 },
  { id: "email-25gb-365d", name: "25GB + 365 dias de arquivamento (Backup de e-mails apagados)", storage: "25GB", retention: "365 dias", pricePerAccount: 24.30 },
  { id: "email-50gb-2y", name: "50GB + 2 anos de arquivamento (Backup de e-mails apagados)", storage: "50GB", retention: "2 anos", pricePerAccount: 29.90 },
  { id: "email-10gb-10y", name: "10GB + 10 anos de arquivamento (Backup de e-mails apagados)", storage: "10GB", retention: "10 anos", pricePerAccount: 32.90 },
  { id: "email-25gb-10y", name: "25GB + 10 anos de arquivamento (Backup de e-mails apagados)", storage: "25GB", retention: "10 anos", pricePerAccount: 34.90 },
  { id: "email-50gb-10y", name: "50GB + 10 anos de arquivamento (Backup de e-mails apagados)", storage: "50GB", retention: "10 anos", pricePerAccount: 39.98 },
];

export const PRESET_PACKAGES = [
  {
    id: "matriz-partner",
    name: "Matriz Partner (Setup + 10% sobre Vendas)",
    category: "Parceria & Revenue Share",
    description: "Ganhamos juntos, crescemos juntos. Setup inicial subsidiado (R$ 1.500 ~ R$ 3.500) + 10% de participação sobre as vendas realizadas pelo sistema. Sem mensalidades de suporte atreladas.",
    isPartnerModel: true,
    partnerRevSharePercent: 10,
    items: [
      { id: "item-1", title: "Setup Inicial & Estrutura Comercial Base", description: "Configuração de IA integrada ao WhatsApp, fluxos de qualificação, painel de acompanhamento básico e implantação operacional.", price: 2500, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 3000,
      msgsPerConversation: 8,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [
      { id: "infra-1", title: "Custos de Servidor e IA", price: 0, isMonthly: true, isVariable: true, note: "Por conta do cliente" }
    ],
    maintenanceMonthlyPrice: 0,
    maintenanceDescription: "Participação de 10% sobre as vendas a partir do início da operação. Sem fidelidade contratual em gestão mensal."
  },
  {
    id: "matriz-digital-1",
    name: "Pacote Inicial: IA & Triagem Integrada",
    category: "Gestão Mensal",
    description: "Estrutura essencial para automatizar 100% da recepção, triagem de interessados e roteamento no WhatsApp.",
    items: [
      { id: "item-1", title: "Implantação da Operação com IA", description: "Configuração do orquestrador, construção dos fluxos principais, agente de triagem e inteligência base da empresa.", price: 3000, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 2000,
      msgsPerConversation: 6,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [
      { id: "infra-1", title: "Licença Plataforma / Servidor Base", price: 150, isMonthly: true },
    ],
    maintenanceMonthlyPrice: 600,
    maintenanceDescription: "Suporte ativo, calibragem dos agentes de IA e garantia de estabilidade contínua."
  },
  {
    id: "matriz-digital-2",
    name: "Pacote Avançado: IA, CRM & Dashboard",
    category: "Gestão Mensal",
    description: "Operação completa com múltiplos agentes inteligentes, painel de indicadores (Dashboard) e integração avançada com base de dados própria (Ex: Catálogo, FAQ Extenso).",
    items: [
      { id: "item-1", title: "Setup Completo: Inteligência Multi-Agente & Dados", description: "Configuração completa de banco de dados, múltiplos fluxos conversacionais inteligentes e dashboard em tempo real.", price: 5500, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 5000,
      msgsPerConversation: 8,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [
      { id: "infra-1", title: "Infraestrutura Cloud & Banco Vetorial", price: 290, isMonthly: true }
    ],
    maintenanceMonthlyPrice: 1200,
    maintenanceDescription: "Manutenção proativa, relatórios gerenciais e evolução constante do motor de inteligência e base de conhecimento."
  },
  {
    id: "pacote-horas-avulso",
    name: "Banco de Horas Sob Demanda",
    category: "Suporte & Evolução",
    description: "Para clientes que desejam melhorias e manutenções sob medida, sem compromisso de longo prazo.",
    items: [
      { id: "item-1", title: "Pacote de 5 Horas de Evolução Especializada", description: "Acumulável para ajustes rápidos de fluxos, adição de novas integrações ou correções de treinamento de IA.", price: 800, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 0,
      msgsPerConversation: 0,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [],
    maintenanceMonthlyPrice: 0,
    maintenanceDescription: "Apenas sob demanda. O saldo não expira num período de 6 meses."
  }
];

export const DEFAULT_EDUCATIONAL_GLOSSARY = [
  {
    id: "setup-promise",
    title: "A Promessa do Setup Inicial",
    enabled: true,
    content: "Não é tentar prever tudo antes do primeiro lead. É colocar uma base sólida no ar em até 15 dias úteis, medir o comportamento real com dados e iniciar um ciclo contínuo de evolução."
  },
  {
    id: "what-is-api",
    title: "O que é a Automação Leona & API Oficial do WhatsApp?",
    enabled: true,
    content: "É a estrutura tecnológica oficial homologada pela Meta que conecta os agentes de IA ao WhatsApp da sua empresa de forma segura, permitindo disparo de follow-ups automáticos, etiquetas de CRM e transbordo inteligente para atendentes humanos."
  },
  {
    id: "what-are-tokens",
    title: "Como funcionam os Tokens e o consumo de Inteligência Artificial?",
    enabled: true,
    content: "Os modelos de IA cobram apenas pelo volume exato de texto processado nas conversas (Tokens). Isso garante transparência total: a empresa só paga pelo uso real das interações com os clientes."
  },
  {
    id: "matriz-partner-philosophy",
    title: "Como funciona o Modelo Matriz Partner?",
    enabled: true,
    content: "Ganhamos juntos, crescemos juntos. No Matriz Partner, a UX4YOU entra com toda a inteligência e estrutura necessária para alavancar a operação. A remuneração é atrelada a 10% de participação sobre as vendas realizadas a partir do início da operação. Cancela quando quiser."
  }
];

export const DEFAULT_COMMERCIAL_TERMS = {
  modelType: "standard", // "standard" | "partner"
  partnerPercent: 10,
  deliveryDays: 15,
  deliveryTime: "Operação Funcional em até 15 dias úteis",
  paymentTerms: "Setup inicial na contratação + mensalidade recorrente (ou 10% sobre vendas no modelo Matriz Partner).",
  validityDays: 15,
  warrantyDays: 30,
  notes: "No modelo Matriz Partner: Participação de 10% sobre as vendas a partir do início da operação. Em caso de contratos recorrentes de vendas do cliente, os recebíveis de 10% permanecem válidos até o término dos respectivos contratos ou mediante recebimento proporcional."
};
