// pages/index.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ScoreCard from '../components/ScoreCard'
import NewsCard from '../components/NewsCard'

export default function Home() {
  const [jogosFut, setJogosFut] = useState([])
  const [jogosBas, setJogosBas] = useState([])
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos') // todos | futebol | basquete

  useEffect(() => {
    async function fetchTudo() {
      try {
        const [rFut, rBas, rNews] = await Promise.allSettled([
          fetch('/api/football').then(r => r.json()),
          fetch('/api/basketball').then(r => r.json()),
          fetch('/api/noticias').then(r => r.json()),
        ])
        if (rFut.status === 'fulfilled') setJogosFut(rFut.value.jogos || [])
        if (rBas.status === 'fulfilled') setJogosBas(rBas.value.jogos || [])
        if (rNews.status === 'fulfilled') setNoticias(rNews.value.noticias || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchTudo()
    // Atualiza placares a cada 2 minutos
    const interval = setInterval(fetchTudo, 120000)
    return () => clearInterval(interval)
  }, [])

  const todosJogos = [
    ...jogosFut.map(j => ({ ...j, _esporte: 'futebol' })),
    ...jogosBas.map(j => ({ ...j, _esporte: 'basquete' })),
  ]

  const jogosFiltrados = filtro === 'todos'
    ? todosJogos
    : todosJogos.filter(j => j._esporte === filtro)

  const noticiasFiltradas = filtro === 'todos'
    ? noticias
    : noticias.filter(n => n.esporte === filtro)

  return (
    <>
      <Head>
        <title>Placar 24 — Resultados e Notícias de Futebol e Basquete</title>
        <meta name="description" content="Placares ao vivo, resultados e notícias de futebol e basquete" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Hero: Placares */}
      <section style={styles.hero}>
        <div style={styles.heroHeader}>
          <span style={styles.heroLabel}>Resultados do dia</span>
          <div style={styles.filtros}>
            {['todos', 'futebol', 'basquete'].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                style={{ ...styles.filtroBtn, ...(filtro === f ? styles.filtroBtnActive : {}) }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={styles.loadingRow}>
            {[1, 2, 3].map(i => <div key={i} style={styles.skeleton} />)}
          </div>
        ) : (
          <div style={styles.scoresScroll}>
            {jogosFiltrados.length === 0 ? (
              <p style={styles.empty}>Nenhum jogo encontrado para hoje.</p>
            ) : (
              jogosFiltrados.map(j => (
                <ScoreCard key={`${j._esporte}-${j.id}`} jogo={j} esporte={j._esporte} />
              ))
            )}
          </div>
        )}
      </section>

      {/* Body: Notícias + Sidebar */}
      <main style={styles.main}>
        <section style={styles.newsSection}>
          <h2 style={styles.sectionTitle}>Últimas Notícias</h2>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map(i => <div key={i} style={{ ...styles.skeleton, height: '100px' }} />)}
            </div>
          ) : (
            <div style={styles.newsGrid}>
              {noticiasFiltradas.length === 0 ? (
                <p style={styles.empty}>Nenhuma notícia encontrada.</p>
              ) : (
                noticiasFiltradas.map((n, i) => (
                  <NewsCard key={n.id} noticia={n} destaque={i === 0} />
                ))
              )}
            </div>
          )}
        </section>

        <aside style={styles.sidebar}>
          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>Próximos Jogos</h3>
            {todosJogos
              .filter(j => ['NS', 'TBD'].includes(j.status))
              .slice(0, 5)
              .map(j => (
                <div key={j.id} style={styles.nextGame}>
                  <span style={{ fontSize: '12px', color: '#e2e2e2', flex: 1 }}>
                    {j.timeCasa} × {j.timeFora}
                  </span>
                  <span style={{ fontSize: '11px', color: '#F5C842' }}>
                    {new Date(j.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            {todosJogos.filter(j => ['NS', 'TBD'].includes(j.status)).length === 0 && (
              <p style={{ fontSize: '12px', color: '#555' }}>Nenhum jogo agendado.</p>
            )}
          </div>

          <div style={styles.sideCard}>
            <h3 style={styles.sideTitle}>Estatísticas Rápidas</h3>
            <div style={styles.statRow}>
              <span style={styles.statLabel}>Jogos hoje</span>
              <span style={styles.statNum}>{todosJogos.length}</span>
            </div>
            <div style={styles.statRow}>
              <span style={styles.statLabel}>Ao vivo</span>
              <span style={{ ...styles.statNum, color: '#ef4444' }}>
                {todosJogos.filter(j => ['1H','2H','Q1','Q2','Q3','Q4','ET','OT'].includes(j.status)).length}
              </span>
            </div>
            <div style={styles.statRow}>
              <span style={styles.statLabel}>Futebol</span>
              <span style={{ ...styles.statNum, color: '#22c55e' }}>{jogosFut.length}</span>
            </div>
            <div style={styles.statRow}>
              <span style={styles.statLabel}>Basquete</span>
              <span style={{ ...styles.statNum, color: '#f97316' }}>{jogosBas.length}</span>
            </div>
          </div>
        </aside>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 Placar 24 · Dados via API-Sports</p>
      </footer>
    </>
  )
}

const styles = {
  hero: {
    background: '#0A0A0F',
    padding: '1.2rem 1.5rem 1.5rem',
    borderBottom: '1px solid #1e1e2e',
  },
  heroHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  heroLabel: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#F5C842',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  },
  filtros: { display: 'flex', gap: '6px' },
  filtroBtn: {
    fontSize: '12px',
    padding: '5px 14px',
    borderRadius: '20px',
    border: '0.5px solid #2a2a3e',
    background: 'transparent',
    color: '#888',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
  filtroBtnActive: {
    background: '#F5C842',
    borderColor: '#F5C842',
    color: '#0A0A0F',
    fontWeight: '600',
  },
  scoresScroll: {
    display: 'flex',
    gap: '12px',
    overflowX: 'auto',
    paddingBottom: '4px',
  },
  loadingRow: { display: 'flex', gap: '12px' },
  skeleton: {
    background: '#14141f',
    border: '0.5px solid #2a2a3e',
    borderRadius: '10px',
    height: '120px',
    minWidth: '190px',
    animation: 'pulse 1.5s infinite',
  },
  empty: { color: '#555', fontSize: '14px', padding: '1rem 0' },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 260px',
    gap: '20px',
    padding: '20px 1.5rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  newsSection: {},
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '22px',
    color: '#e2e2e2',
    letterSpacing: '1px',
    marginBottom: '14px',
  },
  newsGrid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '16px' },
  sideCard: {
    background: '#14141f',
    border: '0.5px solid #2a2a3e',
    borderRadius: '10px',
    padding: '14px',
  },
  sideTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '18px',
    letterSpacing: '1px',
    color: '#e2e2e2',
    marginBottom: '12px',
  },
  nextGame: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '7px 0',
    borderBottom: '0.5px solid #1e1e2e',
    gap: '8px',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '7px 0',
    borderBottom: '0.5px solid #1e1e2e',
  },
  statLabel: { fontSize: '13px', color: '#888' },
  statNum: { fontSize: '14px', fontWeight: '600', color: '#e2e2e2' },
  footer: {
    textAlign: 'center',
    padding: '2rem',
    color: '#444',
    fontSize: '12px',
    borderTop: '1px solid #1e1e2e',
  },
}
