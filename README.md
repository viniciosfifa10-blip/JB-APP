# JB Assistência Técnica — site de orçamento

Site de uma página: o cliente preenche os dados do celular e do defeito, toca em
**Enviar orçamento pelo WhatsApp** e o WhatsApp abre com a mensagem pronta para a
assistência. Não tem servidor nem banco de dados: os dados só saem do celular do
cliente quando ele mesmo envia a mensagem.

## Arquivos

```
jb-assistencia-tecnica/
├── index.html        a página (textos de SEO e de compartilhamento ficam aqui)
├── config.js         ← o único arquivo que você precisa editar no dia a dia
├── css/style.css     visual
├── js/app.js         formulário, máscara do telefone, validação e mensagem
└── img/              logo, ícones e imagem que aparece ao compartilhar o link
```

## Como editar o `config.js`

Abra o arquivo em qualquer editor de texto (no computador: Bloco de Notas, VS Code;
no GitHub: botão do lápis). Troque só o que está **entre aspas** e mantenha as
vírgulas no fim das linhas.

| Campo | O que é | Exemplo |
| --- | --- | --- |
| `nome` | Nome no topo e na mensagem | `"JB Assistência Técnica"` |
| `whatsapp` | Número que recebe os orçamentos, só números, com 55 + DDD | `"5511983985827"` |
| `frase` / `subtitulo` | Textos do topo | |
| `cores` | Cores no formato `#RRGGBB` | `principal: "#D5AA2A"` |
| `marcas` | Opções da lista de marcas | |
| `defeitos` | Opções de defeito | |
| `defeitoObrigatorio` | `true` obriga marcar pelo menos um defeito; `false` deixa opcional | |
| `atendimento` | Formas de atendimento. `ativo: false` esconde a opção. Se só uma ficar ativa, a pergunta some e ela vai direto na mensagem | `{ texto: "Levar na loja", ativo: true }` |
| `endereco`, `horario`, `instagram` | Linhas do rodapé. Deixe `""` para esconder | `instagram: "https://instagram.com/seuperfil"` |
| `avisoFotos` | Aviso que aparece depois do envio | |

**Antes de publicar, confira:** o `horario` está como "Segunda a sábado, das 9h às 19h"
(é um exemplo). Troque pelo horário real.

Para ver o resultado no computador, é só abrir o `index.html` no navegador.

## Publicar no Netlify (grátis)

### Jeito mais fácil: arrastar a pasta

1. Entre em <https://app.netlify.com> e crie uma conta (pode usar o Google).
2. No painel, vá em **Add new project → Deploy manually**.
3. Arraste a pasta **`jb-assistencia-tecnica`** inteira para a área indicada.
4. Em alguns segundos o site está no ar com um endereço tipo `nome-aleatorio.netlify.app`.
5. Para escolher o endereço: **Project configuration → Change project name** (ex.: `jbassistencia` → `jbassistencia.netlify.app`).
6. Para atualizar depois de editar o `config.js`: aba **Deploys** → arraste a pasta de novo.

### Jeito automático: ligado ao GitHub

1. Coloque esta pasta num repositório do GitHub.
2. No Netlify: **Add new project → Import an existing project → GitHub** e escolha o repositório.
3. Em **Base directory**, coloque `jb-assistencia-tecnica` (ou deixe vazio se a pasta for a raiz do repositório). Deixe **Build command** vazio e **Publish directory** igual ao base directory.
4. Clique em **Deploy**. A cada alteração salva no GitHub, o site se atualiza sozinho.

### Depois de ter o endereço final (importante para o compartilhamento)

O WhatsApp e o Instagram só mostram a imagem do link se ela tiver o endereço
completo. No `index.html`, troque as **4 ocorrências** de
`https://jbassistencia.netlify.app` pelo endereço real do seu site e publique de novo.
Para conferir, cole o link em <https://www.opengraph.xyz>.

Se mudar o nome da assistência, troque também o `<title>`, a `description` e as
tags `og:` no topo do `index.html` (os robôs do Google e do WhatsApp não leem o `config.js`).

## Como testar o envio

- **Android e iPhone:** abra o site pelo celular, preencha e toque no botão. Deve abrir o
  app do WhatsApp na conversa com a assistência, com a mensagem pronta. Teste também
  abrindo o link pela bio do Instagram (navegador interno do Instagram).
- **Computador:** abre o WhatsApp Web em outra aba.
- Se o WhatsApp não abrir, a tela de confirmação tem o link "Toque aqui para abrir".
- Faça um teste com um número seu no campo `whatsapp` antes de divulgar.

O link usado é `https://wa.me/NUMERO?text=MENSAGEM`, com o texto codificado por
`encodeURIComponent`. Campos vazios não entram na mensagem.

## Privacidade (LGPD)

O site não guarda nada: não há banco de dados, cookies nem formulário enviado para
servidor. O cliente marca a autorização e é ele quem envia a mensagem pelo próprio WhatsApp.
As fontes vêm do Google Fonts (se preferir zero chamada externa, apague as 3 linhas
`fonts.googleapis`/`fonts.gstatic` do `index.html`; o site usa a fonte do sistema).
