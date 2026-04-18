// components/NewsCard.js

export default function NewsCard({ noticia, destaque = false }) {
  const isFut = noticia.esporte === 'futebol'

  function tempoAtras(iso) {
    const diff = Date.now() - new Date(iso).getTime()
    const min = Math.floor(diff / 60000)
    if (min < 60) return `há ${min} min`
    const h = Math.floor(min / 60)
    if (h < 24) return `há ${h}h`
    return `há ${Math.floor(h / 24)}d`
  }

  if (destaque) {
    return (
      <a href={noticia.link} target="_blank" rel="noopener noreferrer" style={styles.cardDestaque}>
        <div style={{ ...styles.thumb, height: '160px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            ...styles.thumbBg,
            background: isFut
              ? 'linear-gradient(135deg, #14532d, #052e16)'
              : 'linear-gradient(135deg, #431407, #1c0a03)',
          }} />
          <div style={styles.thumbIcon}>{isFut ? '⚽' : '🏀'}</div>
          <span style={{ ...styles.badge, ...(isFut ? styles.badgeFut : styles.badgeBas) }}>
            {isFut ? 'Futebol' : 'Basquete'}
          </span>
        </div>
        <div style={styles.body}>
          <div style={styles.tag}>{noticia.esporte}</div>
          <div style={{ ...styles.title, fontSize: '16px', lineHeight: '1.4' }}>
            {noticia.titulo}
          </div>
          <div style={styles.meta}>{tempoAtras(noticia.data)}</div>
        </div>
      </a>
    )
  }

  return (
    <a href={noticia.link} target="_blank" rel="noopener noreferrer" style={styles.card}>
      <div style={{ ...styles.thumb, width: '100px', flexShrink: 0 }}>
        <div style={{
          ...styles.thumbBg,
          background: isFut
            ? 'linear-gradient(135deg, #14532d, #052e16)'
            : 'linear-gradient(135deg, #431407, #1c0a03)',
        }} />
        <div style={{ ...styles.thumbIcon, fontSize: '24px' }}>{isFut ? '⚽' : '🏀'}</div>
        <span style={{ ...styles.badge, ...(isFut ? styles.badgeFut : styles.badgeBas) }}>
          {isFut ? 'Fut' : 'Bas'}
        </span>
      </div>
      <div style={styles.body}>
        <div style={styles.tag}>{noticia.esporte}</div>
        <div style={styles.title}>{noticia.titulo}</div>
        <div style={styles.meta}>{tempoAtras(noticia.data)}</div>
      </div>
    </a>
  )
}

const styles = {
  card: {
    background: '#14141f',
    border: '0.5px solid #2a2a3e',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  },
  cardDestaque: {
    background: '#14141f',
    border: '0.5px solid #2a2a3e',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  },
  thumb: {
    position: 'relative',
    overflow: 'hidden',
  },
  thumbBg: {
    position: 'absolute',
    inset: 0,
    opacity: 0.85,
  },
  thumbIcon: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    opacity: 0.4,
  },
  badge: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    fontSize: '9px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  badgeFut: { background: '#14532d', color: '#22c55e' },
  badgeBas: { background: '#431407', color: '#f97316' },
  body: {
    padding: '12px 14px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  tag: {
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#666',
  },
  title: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#e2e2e2',
    lineHeight: '1.4',
    flex: 1,
  },
  meta: {
    fontSize: '11px',
    color: '#555',
  },
}
