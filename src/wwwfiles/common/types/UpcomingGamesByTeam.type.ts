import { GameType } from '../enums/GameType.enum'

export type LocationSchema = {
  caption: string,
  street: string,
  number: string,
  zip: string,
  city: string,
  plusCode: string
}

export type UpcomingGamesSchema = {
  id: string,
  teamId: number,
  gameId: number,
  dateUtc: string,
  league: string,
  opponent: string,
  type: GameType,
  location: LocationSchema,
}

export type UpcomingGamesPerTeamSchema = {
  teamId: number,
  createdAt: string,
  upcomingGames: UpcomingGamesSchema[]
}
