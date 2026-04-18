// components/ScoreCard.js

export default function ScoreCard({ jogo, esporte }) {
  const isFut = esporte === 'futebol'
  const isLive = ['1H', '2H', 'ET', 'BT', 'P', 'Q1', 'Q2', 'Q3', 'Q4', 'OT'].includes(jogo.status)
  const isFinished = ['FT', 'AET', 'PEN', 'AOT'].includes(jogo.status)
  const isScheduled = ['NS', 'TBD'].includes(jogo.status)

  const placarCasa = isFut ? jogo.golsCasa : jogo.pontosCasa
  const placarFora = isFut ? jogo.golsFora : jogo.pontosFora

  function formatHorario(iso) {
    const d = new Date(iso)
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

  function getStatusLabel() {
    if (isLive) {
      const tempo = isFut
        ? (jogo.minuto ? `${jogo.minuto}'` : jogo.status)
        : (jogo.periodo ? `${jogo.status} · ${jogo.periodo}` : jogo.status)
      return <span><span className="live-dot" />{tempo}</span>
    }
    if (isFinished) return 'Encerrado'
    if (isScheduled) return formatHorario(jogo.horario)
    return jogo.status
  }

  return (
    <div style={styles.card}>
      <div style={{ ...styles.badge, ...(isFut ? styles.badgeFut : styles.badgeBas) }}>
        {isFut ? 'Futebol' : 'Basquete'} · {jogo.liga}
      </div>

      <div style={styles.row}>
        <span style={styles.team}>{jogo.timeCasa}</span>
        <span style={{
          ...styles.score,
          ...(jogo.vencedor === 'casa' ? styles.scoreWin : {}),
          ...(isScheduled ? styles.scoreHidden : {}),
        }}>
          {isScheduled ? '–' : (placarCasa ?? '–')}
        </span>
      </div>

      <div style={styles.divider} />

      <div style={styles.row}>
        <span style={styles.team}>{jogo.timeFora}</span>
        <span style={{
          ...styles.score,
          ...(jogo.vencedor === 'fora' ? styles.scoreWin : {}),
          ...(isScheduled ? styles.scoreHidden : {}),
        }}>
          {isScheduled ? '–' : (placarFora ?? '–')}
        </span>
      </div>

      <div style={styles.status}>{getStatusLabel()}</div>
    </div>
  )
}

const styles = {
  card: {
    background: '#14141f',
    border: '0.5px solid #2a2a3e',
    borderRadius: '10px',
    padding: '12px 16px',
    minWidth: '190px',
    flexShrink: 0,
  },
  badge: {
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    marginBottom: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  badgeFut: { color: '#22c55e' },
  badgeBas: { color: '#f97316' },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
  },
  team: {
    color: '#e2e2e2',
    fontSize: '13px',
    fontWeight: '500',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  score: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: '22px',
    color: '#fff',
    minWidth: '30px',
    textAlign: 'right',
  },
  scoreWin: { color: '#F5C842' },
  scoreHidden: { color: '#555' },
  divider: {
    height: '0.5px',
    background: '#2a2a3e',
    margin: '6px 0',
  },
  status: {
    fontSize: '11px',
    color: '#666',
    textAlign: 'center',
    marginTop: '8px',
  },
}
