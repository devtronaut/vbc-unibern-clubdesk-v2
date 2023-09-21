import React, { useEffect, useState } from 'react'
import { RankingTable } from './components/Ranking/Tables/RankingTable'

export type TeamIdProps = {
  teamId: number
}

export const App = (teamIdProps: TeamIdProps) => {
  const [isRanking, setRanking] = useState(true);
  const [isResults, setResults] = useState(false);
  const [isUpcomingGames, setUpcomingGames] = useState(false);

  useEffect(() => { }, [isRanking, isResults, isUpcomingGames]);

  const rankingButtonClicked = () => {
    setRanking(true);
    setResults(false);
    setUpcomingGames(false);
  }

  const resultsButtonClicked = () => {
    setRanking(false);
    setResults(true);
    setUpcomingGames(false);
  }

  const upcomingGamesButtonClicked = () => {
    setRanking(false);
    setResults(false);
    setUpcomingGames(true);
  }

  return (
    <div className='w-full flex flex-col items-center my-8'>
      {isRanking && <RankingTable teamId={teamIdProps.teamId} />}
      <div className='mt-3'>
        {!isRanking && <button onClick={() => rankingButtonClicked()} className='px-4 py-1 text-red-700 border-2 border-red-700 hover:bg-red-700 hover:text-white first:rounded-l-full last:rounded-r-full'>Tabelle</button>}
        {!isResults && <button onClick={() => resultsButtonClicked()} className='px-4 py-1 text-red-700 border-2 border-red-700 hover:bg-red-700 hover:text-white first:rounded-l-full last:rounded-r-full'>Resultate</button>}
        {!isUpcomingGames && <button onClick={() => upcomingGamesButtonClicked()} className='px-4 py-1 text-red-700 border-2 border-red-700 hover:bg-red-700 hover:text-white first:rounded-l-full last:rounded-r-full'>Nächste Spiele</button>}
      </div>
    </div>
  )
}