import React from 'react'
import { RankingTable } from './components/Ranking/Tables/RankingTable'

export type TeamIdProps = {
  teamId: number
}

export const App = (teamIdProps: TeamIdProps) => {

  return (
    <>
      <h1>VBC Uni Bern API: Test</h1>
      <RankingTable teamId={teamIdProps.teamId} />
    </>
  )
}