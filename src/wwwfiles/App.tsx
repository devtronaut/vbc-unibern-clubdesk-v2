import React, { useEffect, useState } from 'react'
import { RankingTable } from './components/Ranking/Tables/RankingTable'
import { TableSwitchButton } from './components/Controls/TableSwitchButton'

export type TeamProps = {
  teamId: number,
  teamName: string,
}

export const App = (teamProps: TeamProps) => {
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
    <div className='tailwind-parent'>
      <div className='tw-w-full tw-flext tw-flex-col tw-items-center tw-my-8'>
        <div className='tw-mb-3 tw-w-fit'>
          {!isRanking && <TableSwitchButton text={'Tabelle'} handler={rankingButtonClicked} />}
          {!isResults && <TableSwitchButton text={'Resultate'} handler={resultsButtonClicked} />}
          {!isUpcomingGames && <TableSwitchButton text={'Nächste Spiele'} handler={upcomingGamesButtonClicked} />}
        </div>
        {isRanking && <RankingTable teamId={teamProps.teamId} teamName={teamProps.teamName} />}
      </div>
    </div>
  )
}