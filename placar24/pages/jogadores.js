// pages/jogadores.js
import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'

const JOGADORES_FUTEBOL = [
  { nome: 'Vinicius Jr.', clube: 'Real Madrid', posicao: 'Atacante', pais: '🇧🇷', stat: '18 gols', detalhe: 'LaLiga 2024/25' },
  { nome: 'Endrick', clube: 'Real Madrid', posicao: 'Atacante', pais: '🇧🇷', stat: '10 gols', detalhe: 'LaLiga 2024/25' },
  { nome: 'Rodrygo', clube: 'Real Madrid', posicao: 'Atacante', pais: '🇧🇷', stat: '12 gols', detalhe: 'LaLiga 2024/25' },
  { nome: 'Gabriel Magalhães', clube: 'Arsenal', posicao: 'Zagueiro', pais: '🇧🇷', stat: '5 gols', detalhe: 'Premier League' },
  { nome: 'Erling Haaland', clube: 'Man. City', posicao: 'Atacante', pais: '🇳🇴', stat: '24 gols', detalhe: 'Premier League' },
  { nome: 'Kylian Mbappé', clube: 'Real Madrid', posicao: 'Atacante', pais: '🇫🇷', stat: '22 gols', detalhe: 'LaLiga 2024/25' },
  { nome: 'Pedro', clube: 'Flamengo', posicao: 'Atacante', pais: '🇧🇷', stat: '15 gols', detalhe: 'Brasileirão' },
  { nome: 'Raphinha', clube: 'Barcelona', posicao: 'Atacante', pais: '🇧🇷', stat: '20 gols', detalhe: 'LaLiga 2024/25' },
]

const JOGADORES_BASQUETE = [
  { nome: 'LeBron James', clube: 'LA Lakers', posicao: 'Ala', pais: '🇺🇸', stat: '27.4 pts', detalhe: 'NBA 2024/25' },
  { nome: 'Stephen Curry', clube: 'Golden State Warriors', posicao: 'Armador', pais: '🇺🇸', stat: '29.1 pts', detalhe: 'NBA 2024/25' },
  { nome: 'Nikola Jokić', clube: 'Denver Nuggets', posicao: 'Pivô', pais: '🇷🇸', stat: '26.8 pts', detalhe: 'NBA 2024/25' },
  { nome: 'Luka Dončić', clube: 'Dallas Mavericks', posicao: 'Armador', pais: '🇸🇮', stat: '31.2 pts', detalhe: 'NBA 2024/25' },
  { nome: 'Giannis', clube: 'Milwaukee Bucks', posicao: 'Ala-Pivô', pais: '🇬🇷', stat: '29.6 pts', detalhe: 'NBA 2024/25' },
  { nome: 'Gui Santos', clube: 'Golden State Warriors', posicao: 'Ala', pais: '🇧🇷', stat: '8.2 pts', detalhe: 'NBA 2024/25' },
  { nome: 'Bruno Caboclo', clube: 'Flamengo', posicao: 'Ala-Pivô', pais: '🇧🇷', stat: '14.3 pts', detalhe: 'NBB' },
  { nome: 'Gegê', clube: 'Franca', posicao: 'Armador', pais: '🇧🇷', stat: '19.1 pts', detalhe: 'NBB' },
]

function getIniciais(nome) {
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('')
}

export default function Jogadores() {
  const [esporte, setEsporte] = useState('futebol')
  const [busca, setBusca] = useState('')

  const lista = esporte === 'futebol' ? JOGADORES_FUTEBOL : JOGADORES_BASQUETE
  const filtrados = lista.filter(j =>
    j.nome.toLowerCase().includes(busca.toLowerCase()) ||
    j.clube.toLowerCase().includes(busca.toLowerCase())
  )

  const isFut = esporte === 'futebol'

  return (
    <>
      <Head>
        <title>Jogadores — Placar 24</title>
        <meta name="description" content="Estatísticas dos melhores jogadores de futebol e basquete" />
      </Head>
      <Navbar />
      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Jogadores em Destaque</h1>
          <div style={styles.controles}>
            <div style={styles.tabs}>
              <button
                style={{ ...styles.tab, ...(isFut ? styles.tabFut : styles.tabInactive) }}
                onClick={() => setEsporte('futebol')}
              >⚽ Futebol</button>
              <button
                style={{ ...styles.tab, ...(!isFut ? styles.tabBas : styles.tabInactive) }}
                onClick={() => setEsporte('basquete')}
              >🏀 Basquete</button>
            </div>
            <input
              type="text"
              placeholder="Buscar jogador ou clube..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              style={styles.search}
            />
          </div>
        </div>

        <div style={styles.grid}>
          {filtrados.map((j, i) => (
            <div key={i} style={styles.card}>
              <div style={{
                ...styles.avatar,
                background: isFut ? '#14532d' : '#431407',
                color: isFut ? '#22c55e' : '#f97316',
              }}>
                {getIniciais(j.nome)}
              </div>
              <div style={styles.info}>
                <div style={styles.playerName}>{j.pais} {j.nome}</div>
                <div style={styles.playerClub}>{j.clube}</div>
                <div style={styles.playerPos}>{j.posicao}</div>
              </div>
              <div style={styles.statBox}>
                <div style={styles.statNum}>{j.stat}</div>
                <div style={styles.statDetalhe}>{j.detalhe}</div>
              </div>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <p style={{ color: '#555', textAlign: 'center', marginTop: '2rem' }}>
            Nenhum jogador encontrado para &quot;{busca}&quot;
          </p>
        )}
      </main>
    </>
  )
}

const styles = {
  main: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px 1.5rem',
  },
  header: { marginBottom: '24px' },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '32px',
    color: '#e2e2e2',
    letterSpacing: '2px',
    marginBottom: '16px',
  },
  controles: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tabs: { display: 'flex', gap: '8px' },
  tab: {
    padding: '8px 20px',
    borderRadius: '8px',
    border: '0.5px solid #2a2a3e',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '500',
  },
  tabFut: { background: '#14532d', color: '#22c55e', borderColor: '#22c55e' },
  tabBas: { background: '#431407', color: '#f97316', borderColor: '#f97316' },
  tabInactive: { background: 'transparent', color: '#888' },
  search: {
    background: '#14141f',
    border: '0.5px solid #2a2a3e',
    borderRadius: '8px',
    padding: '8px 14px',
    color: '#e2e2e2',
    fontSize: '14px',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    flex: 1,
    minWidth: '200px',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    background: '#14141f',
    border: '0.5px solid #2a2a3e',
    borderRadius: '10px',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    flexShrink: 0,
  },
  info: { flex: 1 },
  playerName: { fontSize: '15px', fontWeight: '500', color: '#e2e2e2' },
  playerClub: { fontSize: '12px', color: '#888', marginTop: '2px' },
  playerPos: { fontSize: '11px', color: '#555', marginTop: '2px' },
  statBox: { textAlign: 'right' },
  statNum: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '22px',
    color: '#F5C842',
  },
  statDetalhe: { fontSize: '10px', color: '#555', marginTop: '2px' },
}
