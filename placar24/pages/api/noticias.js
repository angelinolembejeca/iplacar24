// pages/api/noticias.js
// Busca notícias via RSS gratuito - sem limite de requisições

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1200')

  const FEEDS = [
    { url: 'https://ge.globo.com/rss/futebol/', esporte: 'futebol' },
    { url: 'https://ge.globo.com/rss/basquete/', esporte: 'basquete' },
  ]

  try {
    const resultados = await Promise.allSettled(
      FEEDS.map(feed => fetchFeed(feed.url, feed.esporte))
    )

    const noticias = resultados
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value)
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .slice(0, 12)

    res.json({ noticias })
  } catch (err) {
    console.error('Erro noticias:', err)
    res.json({ noticias: getMockNoticias() })
  }
}

async function fetchFeed(url, esporte) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Placar24/1.0' },
    signal: AbortSignal.timeout(5000),
  })

  const xml = await response.text()

  // Parse RSS simples sem biblioteca externa
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]

  return items.slice(0, 6).map(match => {
    const item = match[1]
    const titulo = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      || item.match(/<title>(.*?)<\/title>/)?.[1] || ''
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '#'
    const data = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || new Date().toISOString()
    const desc = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1]
      || item.match(/<description>(.*?)<\/description>/)?.[1] || ''

    return {
      id: link,
      titulo: titulo.trim(),
      link,
      data: new Date(data).toISOString(),
      esporte,
      resumo: desc.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
    }
  })
}

function getMockNoticias() {
  return [
    {
      id: '1', esporte: 'futebol',
      titulo: 'Vinicius Jr. marca dois gols e Real Madrid vence clássico',
      link: '#', data: new Date().toISOString(),
      resumo: 'O atacante brasileiro foi decisivo na partida de domingo com duas assistências e dois gols...',
    },
    {
      id: '2', esporte: 'basquete',
      titulo: 'LeBron James bate recorde histórico na NBA com 40 pontos',
      link: '#', data: new Date(Date.now() - 3600000).toISOString(),
      resumo: 'O astro dos Lakers protagonizou mais uma noite histórica na liga americana...',
    },
    {
      id: '3', esporte: 'futebol',
      titulo: 'Flamengo confirma contratação de atacante europeu',
      link: '#', data: new Date(Date.now() - 7200000).toISOString(),
      resumo: 'O clube carioca anuncia reforço para a disputa do Campeonato Brasileiro...',
    },
    {
      id: '4', esporte: 'basquete',
      titulo: 'NBB: Franca e Flamengo decidem o título neste fim de semana',
      link: '#', data: new Date(Date.now() - 10800000).toISOString(),
      resumo: 'As duas equipes mais regulares da temporada se encontram na grande final...',
    },
    {
      id: '5', esporte: 'futebol',
      titulo: 'Brasileirão: Confira os destaques da rodada do fim de semana',
      link: '#', data: new Date(Date.now() - 14400000).toISOString(),
      resumo: 'Rodada movimentada com surpresas e viradas emocionantes em todo o país...',
    },
    {
      id: '6', esporte: 'basquete',
      titulo: 'Stephen Curry lidera Warriors com 35 pontos em vitória crucial',
      link: '#', data: new Date(Date.now() - 18000000).toISOString(),
      resumo: 'O armador foi inspirado e conduziu o time da Califórnia a vitória importante...',
    },
  ]
}
