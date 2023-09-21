import React from 'react'
import { RankingTable } from './components/Ranking/Tables/RankingTable'

export type TeamIdProps = {
  teamId: number
}

export const App = (teamIdProps: TeamIdProps) => {

  return (
    <div className='w-full border flex flex-col items-center'>
      <h1>VBC Uni Bern API: Test</h1>
      <br /> {/* All I am is a poor backend dev after all! BR FTW! */}
      <RankingTable teamId={teamIdProps.teamId} />
    </div>
  )
}