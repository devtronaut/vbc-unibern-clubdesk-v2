export type ResultTeamSchema = {
  caption: string,
  setsWon: number,
  sets: number[]
}

export type ResultsSchema = {
  id: string,
  teamId: number,
  gameId: number,
  dateUtc: string,
  winner: ResultTeamSchema,
  loser: ResultTeamSchema,
  league: string,
  mode: string
}

export type ResultPerTeamSchema = {
  teamId: number,
  createdAt: string,
  results: ResultsSchema[]
}
