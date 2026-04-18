// pages/api/basketball.js
// Busca jogos de basquete - API-Sports (mesmo plano gratuito do futebol)

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  const today = new Date().toISOString().split('T')[0]

  try {
    const response = await fetch(
      `https://v1.basketball.api-sports.io/games?date=${today}&timezone=America/Luanda`,
      {
        headers: {
          'x-apisports-key': process.env.APISPORTS_KEY,
        },
      }
    )

    if (!response.ok) throw new Error(`API error: ${response.status}`)

    const data = await response.json()

    // Filtra NBA e NBB (liga brasileira de basquete)
    const LIGAS_BAS = [12, 270] // 12 = NBA, 270 = NBB Brasil
    const jogos = (data.response || [])
      .filter(g => LIGAS_BAS.includes(g.league.id))
      .map(g => ({
        id: g.id,
        status: g.status.short,
        periodo: g.status.timer,
        horario: g.date,
        liga: g.league.name,
        timeCasa: g.teams.home.name,
        timeFora: g.teams.away.name,
        logoCasa: g.teams.home.logo,
        logoFora: g.teams.away.logo,
        pontosCasa: g.scores.home.total,
        pontosFora: g.scores.away.total,
        vencedor: g.teams.home.winner ? 'casa' : g.teams.away.winner ? 'fora' : null,
      }))

    res.json({ jogos })
  } catch (err) {
    console.error('Erro basketball API:', err)
    res.json({ jogos: getMockBasketball() })
  }
}

function getMockBasketball() {
  return [
    {
      id: 10, status: 'FT', periodo: null, horario: new Date().toISOString(),
      liga: 'NBA', timeCasa: 'LA Lakers', timeFora: 'Boston Celtics',
      pontosCasa: 108, pontosFora: 104, vencedor: 'casa',
    },
    {
      id: 11, status: 'Q3', periodo: '4:22', horario: new Date().toISOString(),
      liga: 'NBA', timeCasa: 'Golden State Warriors', timeFora: 'Phoenix Suns',
      pontosCasa: 89, pontosFora: 91, vencedor: null,
    },
    {
      id: 12, status: 'FT', periodo: null, horario: new Date().toISOString(),
      liga: 'NBB', timeCasa: 'Flamengo', timeFora: 'Franca',
      pontosCasa: 91, pontosFora: 78, vencedor: 'casa',
    },
  ]
}
