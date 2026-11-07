# Edith.dev — Portfólio Pessoal

Bem-vindo(a) ao meu portfólio! Aqui você encontra minha trajetória, habilidades e projetos como Desenvolvedora Full Stack, com foco em performance, responsividade e uma experiência de usuário agradável.

- Versão ao vivo: https://deboraedithm.github.io/edith-dev/

---

## ✨ Destaques do Projeto

- Tema claro/escuro com persistência
  - Alternância de tema via botão no header
  - Preferência salva no localStorage (chave: theme)
  - Estilização via CSS Custom Properties e [data-theme] na raiz

- Efeito de digitação no herói (Typing Effect)
  - Implementado sem dependências externas
  - Inicialização somente quando a seção entra em viewport (IntersectionObserver)
  - Título permanece disponível sem a biblioteca externa e respeita movimento reduzido

- Navegação e UX
  - Cabeçalho fixo com blur e transparência
  - Scroll suave
  - Botão “Voltar ao topo” exibido após 300px de rolagem
  - Indicador de progresso da página e destaque sutil que acompanha o cursor no herói
  - Animações de entrada nas seções, desativadas para quem prefere movimento reduzido

- Seções e Conteúdo
  - Home com título dinâmico e chamada para LinkedIn/Projetos
  - About pessoal com foto e stack de tecnologias
  - Experience com timelines de trabalho e formação acadêmica: horizontais no desktop e verticais no mobile, com detalhes expansíveis em cada marco
  - Projects em ordem cronológica inversa, com datas visíveis, cards responsivos, tags e links de demo/repositório
  - Contact com botão “Contact Me!” que copia o e-mail para a área de transferência e exibe feedback visual

- Design e Performance
  - Layout responsivo (mobile-first) com Flexbox e Grid
  - Visual minimalista com grade discreta e detalhes inspirados em HUDs de jogos
  - Fundo ambiente com gradiente sutil e brilho que acompanha o cursor
  - Projetos mobile em molduras de smartphone, com detalhes ao passar o mouse ou focar no desktop
  - Preconnect para Google Fonts
  - Ícones via CDN (Phosphor Icons)

- Acessibilidade
  - Uso de alt em imagens e aria-label em ícones/interações
  - Contraste e foco pensados para os dois temas
  - Suporte à preferência de movimento reduzido

---

## 🛠️ Tecnologias Utilizadas

- HTML5 semântico
- CSS3 (Flexbox, Grid, variáveis CSS, media queries, animações)
- JavaScript ES6+ (DOM, IntersectionObserver, Clipboard API, localStorage)
- Typed.js (efeito de digitação)
- Phosphor Icons (ícones via CDN)
- Google Fonts (Inter)
- Lucide (CDN carregado; opcional)

Observação: Todas as dependências externas são carregadas via CDN, sem etapa de build.

---

## 🔐 Segurança

Este repositório segue uma política de divulgação responsável. Consulte SECURITY.md para saber como reportar vulnerabilidades de forma privada.

Arquivo: SECURITY.md

---

## 📫 Contato

- LinkedIn: https://www.linkedin.com/in/debora-edith/
- E-mail: deboraedithm@gmail.com
