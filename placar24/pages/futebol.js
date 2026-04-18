
// pages/futebol.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ScoreCard from '../components/ScoreCard'
import NewsCard from '../components/NewsCard'

export default function Futebol() {
  const [jogos, setJogos] = useState([])
  const [noticias, setNoticias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.allSettled([
      fetch('/api/football').then(r => r.json()),
      fetch('/api/noticias').then(r => r.json()),
    ]).then(([rJ, rN]) => {
      if (rJ.status === 'fulfilled') setJogos(rJ.value.jogos || [])
      if (rN.status === 'fulfilled')
        setNoticias((rN.value.noticias || []).filter(n => n.esporte === 'futebol'))
      setLoading(false)
    })
  }, [])

  const ao_vivo = jogos.filter(j => ['1H','2H','ET','BT','P'].includes(j.status))
  const encerrados = jogos.filter(j => ['FT','AET','PEN'].includes(j.status))
  const agendados = jogos.filter(j => ['NS','TBD'].includes(j.status))

  function Secao({ titulo, lista }) {
    if (lista.length === 0) return null
    return (
      <div style={{ marginBottom: '28px' }}>
        <h3 style={styles.subTitle}>{titulo} ({lista.length})</h3>
        <div style={styles.grid}>
          {lista.map(j => <ScoreCard key={j.id} jogo={j} esporte="futebol" />)}
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Futebol — Placar 24</title>
        <meta name="description" content="Resultados e notícias de futebol" />
      </Head>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.left}>
          <h1 style={styles.title}>⚽ Futebol</h1>
          {loading ? (
            <p style={{ color: '#555' }}>Carregando jogos...</p>
          ) : (
            <>
              <Secao titulo="Ao vivo" lista={ao_vivo} />
              <Secao titulo="Encerrados" lista={encerrados} />
              <Secao titulo="Agendados" lista={agendados} />
              {jogos.length === 0 && (
                <p style={{ color: '#555' }}>Nenhum jogo encontrado para hoje.</p>
              )}
            </>
          )}
        </div>
        <aside style={styles.sidebar}>
          <h2 style={styles.sideTitle}>Notícias</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {noticias.map((n, i) => <NewsCard key={n.id} noticia={n} destaque={i === 0} />)}
          </div>
        </aside>
      </main>
    </>
  )
}

const styles = {
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    gap: '24px',
    padding: '24px 1.5rem',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  left: {},
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '32px',
    color: '#22c55e',
    letterSpacing: '2px',
    marginBottom: '20px',
  },
  subTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#F5C842',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  sidebar: {},
  sideTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '22px',
    color: '#e2e2e2',
    letterSpacing: '1px',
    marginBottom: '14px',
  },
}
