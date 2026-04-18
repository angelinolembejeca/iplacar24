# ⚽🏀 PLACAR 24

Site de resultados e notícias de futebol e basquete, hospedado gratuitamente no Vercel.

---

## 🆓 Custo Zero

| Serviço | Plano | Custo |
|--------|-------|-------|
| Vercel (hospedagem) | Hobby | **Grátis** |
| API-Sports (dados esportivos) | Free (100 req/dia) | **Grátis** |
| Domínio placar24.vercel.app | Incluído no Vercel | **Grátis** |

---

## 🚀 Como Publicar no Vercel (passo a passo)

### Passo 1 — Criar conta gratuita na API-Sports

1. Acesse: https://dashboard.api-sports.io/register
2. Crie uma conta gratuita (não precisa de cartão)
3. Copie a sua **API Key** no dashboard

### Passo 2 — Criar conta no GitHub

1. Acesse: https://github.com
2. Crie uma conta gratuita
3. Crie um novo repositório chamado `placar24` (público ou privado)

### Passo 3 — Colocar o código no GitHub

Na pasta do projeto, rode estes comandos no terminal:

```bash
git init
git add .
git commit -m "Placar 24 - primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/placar24.git
git push -u origin main
```

### Passo 4 — Publicar no Vercel

1. Acesse: https://vercel.com
2. Clique em "Sign Up" → entre com sua conta do GitHub
3. Clique em "Add New Project"
4. Selecione o repositório `placar24`
5. Na seção **Environment Variables**, adicione:
   - `APISPORTS_KEY` → cole sua chave da API-Sports
6. Clique em **Deploy**
7. Aguarde ~2 minutos — seu site estará em: `placar24.vercel.app` 🎉

---

## 💻 Rodar localmente

```bash
# Instalar dependências
npm install

# Criar arquivo de variáveis de ambiente
cp .env.example .env.local
# Edite .env.local e adicione sua chave da API-Sports

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

---

## 📁 Estrutura do Projeto

```
placar24/
├── pages/
│   ├── api/
│   │   ├── football.js     → API de futebol
│   │   ├── basketball.js   → API de basquete
│   │   └── noticias.js     → RSS de notícias
│   ├── _app.js             → App principal
│   ├── index.js            → Página inicial
│   ├── futebol.js          → Página de futebol
│   ├── basquete.js         → Página de basquete
│   └── jogadores.js        → Página de jogadores
├── components/
│   ├── Navbar.js           → Navegação
│   ├── ScoreCard.js        → Card de placar
│   └── NewsCard.js         → Card de notícia
├── styles/
│   └── globals.css         → Estilos globais
├── .env.example            → Modelo de variáveis de ambiente
└── next.config.js
```

---

## 🔧 APIs utilizadas

### API-Sports (futebol + basquete)
- Site: https://api-sports.io
- Plano free: 100 req/dia por API
- Cobre: Brasileirão, Champions League, Premier League, La Liga, NBA, NBB e mais

### Feeds RSS (notícias)
- GE.Globo.com — sem limite, completamente grátis

---

## 📈 Próximas funcionalidades

- [ ] Tabela de classificação por liga
- [ ] Página de perfil de jogador com histórico
- [ ] Notificações de jogos ao vivo
- [ ] Modo claro/escuro
- [ ] Domínio personalizado (ex: placar24.com.ao)
