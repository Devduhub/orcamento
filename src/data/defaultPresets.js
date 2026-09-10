// Default presets and data for Ux4You Quote Generator matching official UX4YOU pricing & packages

export const INITIAL_COMPANY_INFO = {
  name: "UX4YOU",
  tagline: "Gestão de Automação & Inteligência de Operação",
  email: "contato@ux4you.com.br",
  phone: "+55 (11) 99999-8888",
  website: "www.ux4you.com.br",
  logoUrl: "/logo-ux4you.png",
};

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
    name: "Matriz Partner (Setup + 10% sobre Vendas - Sem Fidelidade)",
    category: "Parceria & Revenue Share",
    description: "Ganhamos juntos, crescemos juntos. Setup inicial (R$ 3k ~ 7k) + 10% de participação sobre as vendas a partir do início da operação. Tudo por nossa conta, exceto tokens e ferramentas externas.",
    isPartnerModel: true,
    partnerRevSharePercent: 10,
    items: [
      { id: "item-1", title: "Setup Inicial & Estrutura Comercial Completa", description: "Configuração do Leona, automações de vendas, criação de fluxos, CRM e treinamento da IA. (Valor ajustável entre R$ 3.000 e R$ 7.000 conforme complexidade).", price: 5000, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 5000,
      msgsPerConversation: 8,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [
      { id: "infra-1", title: "Consumo de Tokens & APIs de IA", price: 0, isMonthly: true, isVariable: true, note: "Por conta do cliente" },
      { id: "infra-2", title: "Ferramentas Externas & Meta WhatsApp API", price: 0, isMonthly: true, isVariable: true, note: "Faturado direto pelo provedor" }
    ],
    maintenanceMonthlyPrice: 0,
    maintenanceDescription: "Participação de 10% sobre as vendas a partir do início da operação. Tudo por nossa conta. Cancela quando quiser."
  },
  {
    id: "matriz-digital-1",
    name: "Matriz Digital 1 (1 Agente IA + Automação Leona + 3h Suporte)",
    category: "Gestão Mensal",
    description: "Estrutura inicial com 1 Agente de I.A, Automação Leona e 3 horas de suporte mensal para acompanhamento e evolução.",
    items: [
      { id: "item-1", title: "Setup Inicial & Implantação da Operação", description: "Configuração do Leona, construção dos fluxos, CRM, IA, testes, treinamento inicial e operação funcional em até 15 dias úteis.", price: 3500, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 2000,
      msgsPerConversation: 6,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [
      { id: "infra-1", title: "Servidor & Banco de Vetores (Supabase/Vercel)", price: 150, isMonthly: true },
      { id: "infra-2", title: "Licença Orquestrador Leona / API WhatsApp", price: 180, isMonthly: true },
      { id: "infra-3", title: "Taxa da Meta (WhatsApp Cloud API)", price: 0, isMonthly: true, isVariable: true, note: "~1.000 conversas grátis/mês; excedente faturado direto na Meta" }
    ],
    maintenanceMonthlyPrice: 750,
    maintenanceDescription: "Matriz Digital 1: 1 Agente de I.A + Automação Leona + 3h de Suporte Mensal da UX4YOU."
  },
  {
    id: "matriz-digital-2",
    name: "Matriz Digital 2 (2 Agentes IA + Dashboard + 6h Suporte)",
    category: "Gestão Mensal",
    description: "Operação avançada com 2 Agentes de I.A, Automação Leona, Banco de Dados, Dashboard Dedicado e 6h de suporte mensal.",
    items: [
      { id: "item-1", title: "Setup Inicial & Implantação da Operação", description: "Configuração do Leona, múltiplos fluxos, integração de banco de dados, dashboard de indicadores e treinamento inicial em até 15 dias úteis.", price: 4800, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 5000,
      msgsPerConversation: 8,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [
      { id: "infra-1", title: "Servidor Cloud Dedicado & Vector DB (Pinecone/Qdrant)", price: 280, isMonthly: true },
      { id: "infra-2", title: "Plataforma de Multi-Atendimento Leona & Dashboard", price: 290, isMonthly: true },
      { id: "infra-3", title: "Meta WhatsApp API (Conversas de Serviço)", price: 0, isMonthly: true, isVariable: true, note: "Faturado direto no cartão cadastrado na Meta" }
    ],
    maintenanceMonthlyPrice: 1500,
    maintenanceDescription: "Matriz Digital 2: 2 Agentes de I.A + Automação Leona + Banco de Dados & Dashboard Dedicado + 6h de Suporte Mensal da UX4YOU."
  },
  {
    id: "matriz-digital-3",
    name: "Matriz Digital 3 (4 Agentes IA + Dashboard + Site/Quiz + 10h Suporte)",
    category: "Gestão Mensal",
    description: "Escala completa com 4 Agentes de I.A, Automação Leona, Banco de Dados, Dashboard Dedicado, Site/Quiz Inteligente de Captura e 10h de suporte mensal.",
    items: [
      { id: "item-1", title: "Setup Inicial & Arquitetura Multi-Agente Completa", description: "Configuração do Leona com 4 Agentes, integração de banco de dados, dashboard dedicado e criação do Site/Quiz Inteligente de conversão em até 15 dias úteis.", price: 6500, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 10000,
      msgsPerConversation: 8,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [
      { id: "infra-1", title: "Servidor Cloud de Alta Performance & Cluster DB", price: 420, isMonthly: true },
      { id: "infra-2", title: "Plataforma Leona + Orquestrador Multi-Agentes", price: 380, isMonthly: true },
    ],
    maintenanceMonthlyPrice: 2500,
    maintenanceDescription: "Matriz Digital 3: 4 Agentes de I.A + Automação Leona + Banco de Dados & Dashboard Dedicado + Site/Quiz Inteligente + 10h de Suporte Mensal da UX4YOU."
  },
  {
    id: "pacote-horas-avulso",
    name: "Pacote de Horas de Evolução & Suporte Avulso",
    category: "Suporte & Evolução",
    description: "Banco de horas para pequenos ajustes, testes, novos fluxos e melhorias contínuas na operação de automação.",
    items: [
      { id: "item-1", title: "Pacote de 6 Horas de Desenvolvimento / Suporte", description: "Banco de horas acumulável para ajustes finos, treinamento de IA e integrações.", price: 950, qty: 1, type: "setup" },
    ],
    tokenEstimate: {
      conversationsPerMonth: 0,
      msgsPerConversation: 0,
      selectedModelId: "gpt-4o-mini",
      usdToBrlRate: 5.60
    },
    infraItems: [],
    maintenanceMonthlyPrice: 0,
    maintenanceDescription: "Suporte contratado por pacote de horas pontual."
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
