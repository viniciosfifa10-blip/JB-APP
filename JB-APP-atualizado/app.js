(function () {
  "use strict";

  var C = window.CONFIG || {};
  var form = document.getElementById("form");
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Aplica o config.js na página ---------- */

  var cores = C.cores || {};
  var raiz = document.documentElement.style;
  if (cores.principal) raiz.setProperty("--principal", cores.principal);
  if (cores.escuro) {
    raiz.setProperty("--escuro", cores.escuro);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", cores.escuro);
  }
  if (cores.fundo) raiz.setProperty("--fundo", cores.fundo);
  if (cores.botao) raiz.setProperty("--botao", cores.botao);
  if (cores.textoBotao) raiz.setProperty("--texto-botao", cores.textoBotao);

  document.querySelectorAll("[data-config]").forEach(function (el) {
    var valor = C[el.getAttribute("data-config")];
    if (valor) el.textContent = valor;
  });

  (C.marcas || []).forEach(function (marca) {
    var op = document.createElement("option");
    op.value = marca;
    op.textContent = marca;
    $("marca").appendChild(op);
  });

  (C.defeitos || []).forEach(function (defeito) {
    $("defeitos").appendChild(opcao("checkbox", "defeitos", defeito));
  });

  var atendimentos = (C.atendimento || []).filter(function (a) { return a.ativo; });
  if (atendimentos.length > 1) {
    atendimentos.forEach(function (a) {
      $("atendimento").appendChild(opcao("radio", "atendimento", a.texto));
    });
  } else {
    $("atendimento-campo").hidden = true;
  }

  rodape("r-endereco", C.endereco);
  rodape("r-horario", C.horario);
  var insta = $("r-instagram");
  if (C.instagram) insta.querySelector("a").href = C.instagram;
  else insta.hidden = true;
  $("ano").textContent = new Date().getFullYear();

  function opcao(tipo, nome, texto) {
    var label = document.createElement("label");
    var input = document.createElement("input");
    var span = document.createElement("span");
    input.type = tipo;
    input.name = nome;
    input.value = texto;
    span.textContent = texto;
    label.appendChild(input);
    label.appendChild(span);
    return label;
  }

  function rodape(id, texto) {
    if (texto) $(id).querySelector("span").textContent = texto;
    else $(id).hidden = true;
  }

  /* ---------- Máscara do telefone: (11) 99999-9999 ---------- */

  var tel = $("telefone");
  tel.addEventListener("input", function () {
    var d = tel.value.replace(/\D/g, "");
    if (d.length > 11 && d.indexOf("55") === 0) d = d.slice(2); // colou com +55
    if (d.length > 11 && d[0] === "0") d = d.slice(1); // colou com 0 antes do DDD
    d = d.slice(0, 11);
    var r = d;
    if (d.length > 2) r = "(" + d.slice(0, 2) + ") " + d.slice(2);
    else if (d.length > 0) r = "(" + d;
    if (d.length > 6) {
      var meio = d.length === 11 ? 7 : 6; // celular tem 5 dígitos antes do traço
      r = "(" + d.slice(0, 2) + ") " + d.slice(2, meio) + "-" + d.slice(meio);
    }
    tel.value = r;
  });

  /* ---------- Validação ---------- */

  function texto(id) { return $(id).value.trim(); }

  function marcados(nome) {
    return Array.prototype.map.call(
      form.querySelectorAll('input[name="' + nome + '"]:checked'),
      function (i) { return i.value; }
    );
  }

  function telefoneValido(valor) {
    var d = valor.replace(/\D/g, "");
    if (d.length !== 10 && d.length !== 11) return false;
    if (Number(d.slice(0, 2)) < 11) return false;
    if (d.length === 11 && d[2] !== "9") return false;
    return true;
  }

  var regras = [
    { id: "nome", msg: function () {
        var v = texto("nome");
        if (!v) return "Digite seu nome.";
        if (v.length < 2) return "Digite seu nome completo ou como prefere ser chamado.";
      } },
    { id: "telefone", msg: function () {
        var v = texto("telefone");
        if (!v) return "Digite seu WhatsApp para a gente responder.";
        if (!telefoneValido(v)) return "Número inválido. Use o formato (11) 99999-9999.";
      } },
    { id: "regiao", msg: function () {
        if (!texto("regiao")) return "Informe o bairro ou região onde será o atendimento.";
      } },
    { id: "marca", msg: function () {
        if (!texto("marca")) return "Escolha a marca do aparelho.";
      } },
    { id: "modelo", msg: function () {
        if (!texto("modelo")) return "Digite o modelo do aparelho (ex.: iPhone 13, Galaxy A54).";
      } },
    { id: "defeitos", campo: "defeitos-campo", msg: function () {
        if (C.defeitoObrigatorio && marcados("defeitos").length === 0)
          return "Marque pelo menos um defeito (ou \"Outro\").";
      } },
    { id: "consentimento", msg: function () {
        if (!$("consentimento").checked) return "Para enviar, autorize o uso dos dados para o orçamento.";
      } }
  ];

  function validar(regra) {
    var erro = regra.msg() || "";
    var campo = $(regra.campo || regra.id);
    $(regra.id + "-erro").textContent = erro;
    (campo.closest(".campo") || campo).classList.toggle("invalido", !!erro);
    if (regra.id !== "defeitos") $(regra.id).setAttribute("aria-invalid", erro ? "true" : "false");
    return !erro;
  }

  // Revalida o campo enquanto o cliente corrige
  regras.forEach(function (regra) {
    var alvo = $(regra.campo || regra.id);
    var evento = regra.id === "defeitos" || regra.id === "consentimento" || regra.id === "marca" ? "change" : "input";
    alvo.addEventListener(evento, function () {
      if ($(regra.id + "-erro").textContent) validar(regra);
    });
    if (regra.id !== "defeitos") {
      $(regra.id).setAttribute("aria-describedby", regra.id + "-erro");
      alvo.addEventListener("blur", function () {
        if (regra.id === "telefone" && texto("telefone")) validar(regra);
      });
    }
  });

  /* ---------- Mensagem ---------- */

  function montarMensagem() {
    var marca = texto("marca");
    var aparelho = [marca === "Outra" ? "" : marca, texto("modelo")].filter(Boolean).join(" ");
    if (texto("cor")) aparelho += " – " + texto("cor");

    var atendimento = marcados("atendimento")[0] || (atendimentos.length === 1 ? atendimentos[0].texto : "");

    var linhas = [
      ["👤 Nome", texto("nome")],
      ["📱 WhatsApp", texto("telefone")],
      ["📍 Região", texto("regiao")],
      ["🔧 Aparelho", aparelho],
      ["⚠️ Defeitos", marcados("defeitos").join(", ")],
      ["📝 Descrição", texto("descricao").replace(/\s*\n\s*/g, " ")],
      ["🔓 Já foi aberto", marcados("aberto")[0]],
      ["⏱️ Urgência", marcados("urgencia")[0]],
      ["🏠 Atendimento", atendimento]
    ]
      .filter(function (l) { return l[1]; })
      .map(function (l) { return l[0] + ": " + l[1]; });

    return ["*NOVO ORÇAMENTO – " + (C.nome || "") + "*"].concat(linhas).join("\n");
  }

  function linkWhatsApp(mensagem) {
    var numero = String(C.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
  }

  function ehCelular() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  /* ---------- Envio ---------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var invalidas = regras.filter(function (r) { return !validar(r); });
    var erroGeral = $("erro-geral");

    if (invalidas.length) {
      erroGeral.textContent = invalidas.length === 1
        ? "Falta 1 informação. Confira o campo marcado em vermelho."
        : "Faltam " + invalidas.length + " informações. Confira os campos marcados em vermelho.";
      erroGeral.hidden = false;
      var primeira = invalidas[0];
      var alvo = primeira.id === "defeitos" ? $("defeitos").querySelector("input") : $(primeira.id);
      (alvo.closest(".campo") || alvo).scrollIntoView({ behavior: "smooth", block: "center" });
      alvo.focus({ preventScroll: true });
      return;
    }
    erroGeral.hidden = true;

    var url = linkWhatsApp(montarMensagem());
    $("link-whats").href = url;

    // Mostra o aviso das fotos antes de sair para o WhatsApp
    form.hidden = true;
    document.body.classList.add("enviado");
    $("pronto").hidden = false;
    window.scrollTo(0, 0);
    $("pronto").focus({ preventScroll: true });

    if (ehCelular()) {
      // Abre o app do WhatsApp (funciona também no navegador do Instagram)
      window.location.href = url;
    } else {
      // No computador abre o WhatsApp Web em outra aba
      var aba = window.open(url, "_blank");
      if (aba) aba.opener = null;
      else window.location.href = url;
    }
  });

  $("novo").addEventListener("click", function () {
    form.reset();
    regras.forEach(function (r) {
      $(r.id + "-erro").textContent = "";
      var campo = $(r.campo || r.id);
      (campo.closest(".campo") || campo).classList.remove("invalido");
    });
    $("pronto").hidden = true;
    form.hidden = false;
    document.body.classList.remove("enviado");
    window.scrollTo(0, 0);
    $("nome").focus();
  });
})();
