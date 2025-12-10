# Kev's Portfolio

## Sobre o Projeto

Este projeto é uma representação digital das minhas habilidades como estudante de Ciência da Computação e entusiasta de Game Dev. O objetivo foi fugir dos templates padrões e criar uma experiência de navegação que simula um sistema operacional antigo ou um terminal.

## Funcionalidades do Sistema

### 1. Terminal Interativo (Home)

Na página inicial, além da navegação convencional, existe um terminal funcional (`kevOS v1.0`).

- O usuário pode digitar comandos para navegar.
- **Comandos:** `help`, `sobre`, `projetos`, `game`, `contato`, `clear`.
- Feedback visual de erro e sucesso.

### 2. Mini-Game: Defesa do Sistema

Um *Space Shooter* arcade desenvolvido do usando **HTML5 Canvas API**.

- **Mecânicas:** Movimentação, tiro, sistema de vidas (3 corações), spawn de inimigos.
- **Dificuldade Progressiva:** O jogo fica mais rápido e difícil conforme a pontuação aumenta.
- **Lógica:** Loop de jogo otimizado com `requestAnimationFrame` e detecção de colisão AABB.

## Tecnologias Utilizadas

- **HTML5:** Estrutura semântica (`<header>`, `<nav>`, `<main>`, `<canvas>`).
- **CSS3:** Variáveis, Animações (`@keyframes`), Grid Layout, Media Queries para responsividade e filtros de imagem.
- **JavaScript (ES6+):** Manipulação de eventos, lógica de jogo orientada a objetos (via protótipos/objetos literais) e manipulação do DOM.
- **Fonte:** [VT323](https://fonts.google.com/specimen/VT323) (Google Fonts) para a tipografia monoespaçada.
