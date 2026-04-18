// pages/api/football.js
// Busca jogos de futebol do dia - API-Sports (100 req/dia grátis)

export default async function handler(req, res) {
  // Cache de 5 minutos para poupar requisições
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

  const today = new Date().toISOString().split('T')[0]

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${today}&timezone=America/Luanda`,
      {
        headers: {
          'x-apisports-key': process.env.APISPORTS_KEY,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`API-Sports error: ${response.status}`)
    }

    const data = await response.json()

    // Filtra ligas relevantes (Brasileirão, Champions, La Liga, Premier League, etc.)
    const LIGAS_RELEVANTES = [71, 72, 2, 39, 140, 78, 61, 135, 4, 9, 10]
    const jogos = (data.response || [])
      .filter(f => LIGAS_RELEVANTES.includes(f.league.id))
      .map(f => ({
        id: f.fixture.id,
        status: f.fixture.status.short,
        minuto: f.fixture.status.elapsed,
        horario: f.fixture.date,
        liga: f.league.name,
        ligaLogo: f.league.logo,
        timeCasa: f.teams.home.name,
        timeFora: f.teams.away.name,
        logosCasa: f.teams.home.logo,
        logosFora: f.teams.away.logo,
        golsCasa: f.goals.home,
        golsFora: f.goals.away,
        vencedor: f.teams.home.winner ? 'casa' : f.teams.away.winner ? 'fora' : null,
      }))

    res.json({ jogos })
  } catch (err) {
    console.error('Erro football API:', err)
    // Retorna dados mock se API falhar (sem gastar requisições)
    res.json({ jogos: getMockFootball() })
  }
}

function getMockFootball() {
  return [
    {
      id: 1, status: 'FT', minuto: null, horario: new Date().toISOString(),
      liga: 'Brasileirão Série A', timeCasa: 'Flamengo', timeFora: 'Palmeiras',
      golsCasa: 2, golsFora: 1, vencedor: 'casa',
    },
    {
      id: 2, status: '2H', minuto: 67, horario: new Date().toISOString(),
      liga: 'Champions League', timeCasa: 'Real Madrid', timeFora: 'Barcelona',
      golsCasa: 1, golsFora: 1, vencedor: null,
    },
    {
      id: 3, status: 'NS', minuto: null, horario: new Date(Date.now() + 7200000).toISOString(),
      liga: 'Premier League', timeCasa: 'Arsenal', timeFora: 'Manchester City',
      golsCasa: null, golsFora: null, vencedor: null,
    },
  ]
}
