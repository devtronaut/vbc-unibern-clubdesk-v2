import { useState } from 'react'
import { TableSwitchButton } from './components/Controls/TableSwitchButton'
import { RankingTable } from './components/Tables/RankingTable';
import { UpcomingGamesTable } from './components/Tables/UpcomingGamesTable';
import { ResultsTable } from './components/Tables/ResultsTable';

export type TeamProps = {
  teamId: number,
  teamName: string,
}

export const App = ({teamId, teamName}: TeamProps) => {
  const [isRanking, setRanking] = useState(true);
  const [isResults, setResults] = useState(false);
  const [isUpcomingGames, setUpcomingGames] = useState(false);

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
    <div className='tw-parent'>
      <div className='tw-w-full tw-flext tw-flex-col tw-items-center tw-my-8'>
        <div className='tw-w-full tw-overflow-clip'>
          <TableSwitchButton text={'Tabelle'} handler={rankingButtonClicked} isActive={isRanking}/>
          <TableSwitchButton text={'Resultate'} handler={resultsButtonClicked} isActive={isResults}/>
          <TableSwitchButton text={'Nächste Spiele'} handler={upcomingGamesButtonClicked} isActive={isUpcomingGames}/>
        </div>

        <div className='tw-w-full tw-rounded-md tw-rounded-tl-none tw-max-h-[550px] tw-overflow-y-auto tw-shadow'>
          {isRanking && <RankingTable teamId={teamId} teamName={teamName} />}
          {isUpcomingGames && <UpcomingGamesTable teamId={teamId} teamName={teamName} />}
          {isResults && <ResultsTable teamId={teamId} teamName={teamName} />}
        </div>
      </div>
    </div>
  )
}