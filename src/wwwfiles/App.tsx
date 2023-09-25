import React, { useEffect, useState } from 'react'
import { RankingTable } from './components/Ranking/Tables/RankingTable'
import { TableSwitchButton } from './components/Controls/TableSwitchButton'
import { UpcomingGamesTable } from './components/Ranking/Tables/UpcomingGamesTable'
import { ResultsTable } from './components/Ranking/Tables/ResultsTable'

export type TeamProps = {
  teamId: number,
  teamName: string,
}

export const App = (teamProps: TeamProps) => {
  const [isRanking, setRanking] = useState(false);
  const [isResults, setResults] = useState(true);
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
        <div className='tw-mb-3 tw-w-fit tw-space-x-2'>
          {!isRanking && <TableSwitchButton text={'Tabelle'} handler={rankingButtonClicked} />}
          {!isResults && <TableSwitchButton text={'Resultate'} handler={resultsButtonClicked} />}
          {!isUpcomingGames && <TableSwitchButton text={'Nächste Spiele'} handler={upcomingGamesButtonClicked} />}
        </div>

        <div className='tw-w-full tw-rounded-md tw-h-[550px] tw-overflow-y-auto'>
          {isRanking && <RankingTable teamId={teamProps.teamId} teamName={teamProps.teamName} />}
          {isUpcomingGames && <UpcomingGamesTable teamId={teamProps.teamId} teamName={teamProps.teamName} />}
          {isResults && <ResultsTable teamId={teamProps.teamId} teamName={teamProps.teamName} />}
        </div>
      </div>
    </div>
  )
}