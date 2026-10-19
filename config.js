/*
 * CONFIGURAÇÃO DO SITE — edite só este arquivo.
 * Mantenha as aspas e as vírgulas. Depois de salvar, publique de novo (veja o README).
 */
window.CONFIG = {
  // Nome que aparece no topo e na mensagem do WhatsApp
  nome: "JB Assistência Técnica",

  // WhatsApp que recebe os orçamentos: só números, com 55 (Brasil) + DDD
  whatsapp: "5511983985827",

  // Textos do topo
  frase: "Orçamento rápido pelo WhatsApp",
  subtitulo: "Consertamos seu celular onde você estiver. Atendemos todas as zonas de São Paulo.",

  // Cores (formato #RRGGBB)
  cores: {
    principal: "#D5AA2A",   // dourado da logo (detalhes e destaques)
    escuro: "#1F2125",      // fundo do topo e textos fortes
    fundo: "#F4F2EE",       // fundo da página
    botao: "#25D366",       // botão do WhatsApp
    textoBotao: "#06301A"   // texto do botão (escuro para ter bom contraste)
  },

  // Marcas que aparecem na lista
  marcas: ["Apple", "Samsung", "Motorola", "Xiaomi", "LG", "Asus", "Realme", "Outra"],

  // Tipos de defeito (o cliente pode marcar vários)
  defeitos: [
    "Tela quebrada/trincada",
    "Tela sem imagem ou com manchas",
    "Bateria descarregando rápido",
    "Não carrega/conector",
    "Não liga",
    "Caiu na água",
    "Câmera",
    "Som/microfone/alto-falante",
    "Botões",
    "Problema de software",
    "Outro"
  ],
  // true = o cliente precisa marcar pelo menos um defeito
  defeitoObrigatorio: true,

  // Formas de atendimento. Coloque "ativo: false" para esconder uma opção.
  // Se só uma estiver ativa, ela é escolhida automaticamente e a pergunta não aparece.
  atendimento: [
    { texto: "Atendimento no meu endereço", ativo: true },
    { texto: "Retirada e devolução do aparelho", ativo: true },
    { texto: "Levar na loja", ativo: false }
  ],

  // Rodapé. Deixe "" (vazio) para esconder uma linha.
  endereco: "Atendimento delivery em todas as zonas de São Paulo — vamos até você",
  horario: "Segunda a sábado, das 9h às 19h",
  instagram: "https://www.instagram.com/jonas.jb.1829405/",

  // Aviso mostrado depois de abrir o WhatsApp
  avisoFotos: "Envie fotos do aparelho na conversa para agilizar o orçamento."
};
