# Access Path Finder

Você é um Engenheiro de Software Sênior, UX Designer e Product Designer especializado em aplicações SaaS modernas.

Sua missão é desenvolver um aplicativo mobile chamado AccessMap.

O objetivo do aplicativo é ajudar pessoas com deficiência a encontrarem estabelecimentos acessíveis próximos da sua localização.

Este projeto será apenas um MVP funcional, portanto NÃO deve existir backend, APIs externas ou autenticação online.

Todo o sistema deverá funcionar 100% OFFLINE, utilizando apenas armazenamento local.

O código deve ser extremamente organizado, escalável e preparado para que futuramente a persistência local possa ser substituída por um backend (Supabase ou outro) sem alterar a lógica do aplicativo.

Objetivo do Produto

O usuário deverá conseguir:

 Criar uma conta.

 Fazer login.

 Informar seu tipo de deficiência.

 Encontrar estabelecimentos acessíveis.

 Pesquisar estabelecimentos.

 Visualizar um mapa.

 Filtrar categorias.

 Avaliar locais.

 Favoritar locais.

 Personalizar sua experiência.

 Utilizar todo o aplicativo completamente offline.

Tecnologias

Desenvolva utilizando:

 React

 TypeScript

 Vite

 TailwindCSS

 shadcn/ui

 React Router

 React Hook Form

 Zod

 Lucide React

 React Leaflet (com OpenStreetMap)

 LocalStorage como banco de dados

 Context API

Não utilizar Firebase.

Não utilizar Supabase.

Não utilizar APIs externas.

Não utilizar banco online.

Toda persistência deve utilizar LocalStorage.

Nome do aplicativo

AccessMap

Slogan:

"Acessibilidade começa pela informação."

Identidade Visual

Criar um design moderno.

Minimalista.

Profissional.

Acessível.

Paleta:

Azul (#2563EB)

Branco

Cinza claro

Verde para indicadores positivos

Vermelho para indicadores negativos

Bordas suaves.

Sombras discretas.

Cards modernos.

Botões arredondados.

Ícones grandes.

Excelente contraste.

Fontes grandes.

Interface amigável.

Estrutura das páginas

Criar as seguintes páginas:

Splash

Login

Cadastro

Home

Mapa

Detalhes do Local

Favoritos

Perfil

Configurações

404

Splash

Mostrar:

Logo

Nome AccessMap

Slogan

Após alguns segundos:

Verificar sessão salva.

Caso exista:

Entrar automaticamente.

Caso contrário:

Ir para Login.

Cadastro

Campos:

Nome

Email

Senha

Confirmar senha

Tipo de deficiência

Opções:

Cadeirante

Baixa mobilidade

Deficiência visual

Pessoa cega

Pessoa surda

Pessoa com TEA

Pessoa idosa

Salvar usuário no LocalStorage.

Efetuar login automaticamente.

Login

Campos:

Email

Senha

Caso usuário exista:

Entrar.

Caso contrário:

Mostrar mensagem amigável.

Persistir sessão.

Home

Criar dashboard moderna contendo:

Campo de pesquisa

Botão limpar pesquisa

Categorias

Mapa

Lista de locais

Resumo com quantidade de locais encontrados

Botão Favoritos

Botão Perfil

Botão Configurações

Categorias

Criar filtro por:

Restaurantes

Mercados

Farmácias

Hospitais

Bancos

Praças

Escolas

Shoppings

Academias

Postos

Todos

Pesquisa

Pesquisar em tempo real por:

Nome

Categoria

Endereço

Descrição

Sem necessidade de botão pesquisar.

Mapa

Utilizar React Leaflet.

Adicionar aproximadamente 30 marcadores.

Ao clicar:

Abrir popup moderno contendo:

Nome

Categoria

Nota

Botão Ver detalhes

Dados simulados

Criar automaticamente aproximadamente 30 estabelecimentos.

Cada estabelecimento deverá possuir:

id

nome

categoria

descrição

telefone

endereço

latitude

longitude

horário

imagem placeholder

nota

quantidadeAvaliações

Recursos de acessibilidade

Cada estabelecimento deverá possuir:

Rampa

Elevador

Banheiro adaptado

Piso tátil

Braille

Atendimento em Libras

Porta larga

Corrimão

Vaga especial

Entrada sem degraus

Todos representados por valores booleanos.

Personalização

Após login:

Verificar tipo de deficiência.

Se usuário for cadeirante:

Priorizar locais com:

Rampa

Banheiro adaptado

Porta larga

Entrada sem degraus

Se usuário for cego:

Priorizar:

Piso tátil

Braille

Se usuário for surdo:

Priorizar:

Atendimento em Libras

Essa priorização deve acontecer automaticamente na lista.

Tela de detalhes

Mostrar:

Imagem

Nome

Categoria

Descrição

Endereço

Telefone

Horário

Mapa

Todos os recursos de acessibilidade.

Exemplo:

✅ Possui rampa

❌ Não possui piso tátil

✅ Banheiro adaptado

etc.

Criar indicador percentual.

Exemplo:

89% acessível

O cálculo deve ser automático considerando os recursos disponíveis.

Favoritos

Usuário poderá:

Adicionar favorito.

Remover favorito.

Persistir localmente.

Criar tela exclusiva de favoritos.

Avaliações

Usuário poderá:

Dar nota.

Escrever comentário.

Persistir no LocalStorage.

Mostrar:

Lista de avaliações.

Média das notas.

Quantidade de avaliações.

Perfil

Mostrar:

Foto padrão

Nome

Email

Tipo de deficiência

Quantidade de favoritos

Quantidade de avaliações

Editar perfil.

Salvar alterações.

Configurações

Permitir:

Modo alto contraste

Fonte grande

Ativar leitura por voz (simulada)

Ativar vibração (simulada)

Persistir preferências.

Componentes

Criar componentes reutilizáveis.

Button

Input

Card

Header

SearchBar

CategoryFilter

AccessibilityBadge

RatingStars

FavoriteButton

MapCard

PlaceCard

Avatar

Modal

Loading

EmptyState

Toast

Layout

Responsivo.

Mobile First.

Interface semelhante a aplicativos modernos.

Animações suaves.

Transições elegantes.

Banco local

Criar camada de persistência.

Nunca acessar LocalStorage diretamente nas páginas.

Criar um serviço responsável por:

Usuários

Sessão

Favoritos

Avaliações

Configurações

Estabelecimentos

Organização

Organizar o projeto por features.

Separar:

components

pages

hooks

contexts

services

storage

utils

types

constants

mock

assets

Código

Todo código deve utilizar:

TypeScript

React Hooks

Clean Code

SOLID

Componentes reutilizáveis

Funções pequenas

Boa tipagem

Nenhuma duplicação

Fluxo do aplicativo

Splash

↓

Login

↓

Cadastro (caso necessário)

↓

Home

↓

Mapa

↓

Detalhes

↓

Favoritos

↓

Perfil

↓

Configurações

Experiência do Usuário

O aplicativo deve transmitir confiança, simplicidade e inclusão.

Toda navegação deve ser intuitiva.

A interface deve seguir boas práticas de acessibilidade, incluindo contraste adequado, textos legíveis, elementos clicáveis com bom espaçamento e navegação consistente.

Critérios de aceite

O MVP só será considerado concluído quando for possível:

 Criar uma conta.

 Fazer login e manter a sessão ativa.

 Escolher o tipo de deficiência.

 Visualizar aproximadamente 30 estabelecimentos simulados.

 Pesquisar estabelecimentos por nome, categoria, endereço ou descrição.

 Filtrar por categoria.

 Visualizar os locais em um mapa interativo.

 Abrir a tela de detalhes de qualquer estabelecimento.

 Ver o percentual de acessibilidade calculado automaticamente.

 Adicionar e remover favoritos.

 Avaliar estabelecimentos com nota e comentário.

 Editar o perfil do usuário.

 Alterar configurações de acessibilidade.

 Persistir todas as informações no LocalStorage.

 Funcionar completamente offline.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://navigate-able.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/62588315-be9d-45d1-8a99-db4dcc17231f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
