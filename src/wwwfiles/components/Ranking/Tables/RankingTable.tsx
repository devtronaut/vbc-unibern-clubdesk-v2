import { FC, useEffect, useState } from 'react';
import RankingsService from '../../../services/rankings/RankingsService';
import { RankingSchema, TeamRankingSchema } from '../../../common/types/RankingByTeam.type';
import { TeamIdProps } from '../../../App';

export const RankingTable = (teamProps: TeamIdProps) => {
  const [isLoading, setLoading] = useState(true);
  const [ranking, setRanking] = useState({} as RankingSchema);

  useEffect(() => {
    RankingsService.fetchRankings(teamProps.teamId)
      .then(ranking => {
        setRanking(ranking);
        setLoading(false);
      })
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const headings = ['Rang', 'Team', 'Siege', 'Niederlagen', 'Punkte'];

  return (
    <div className='w-4/5 overflow-hidden rounded-md'>
      <table className='w-full'>
        <thead>
          <tr className='bg-red-700 text-white'>
            {
              headings.map((headings: string) => {
                return <th>{headings}</th>;
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            ranking.teams.map((team: TeamRankingSchema) => {
              return (<TableRow {...team} />)
            })
          }
        </tbody>
      </table >
    </div>);
}

const TableRow = (props: TeamRankingSchema) => {
  const [team, setTeam] = useState({} as TeamRankingSchema);

  useEffect(() => {
    setTeam(props);
  })

  return (
    <tr className={`border-y-2 hover:bg-slate-100 even:bg-slate-50 first:border-t-0 last:border-b-0 ${team.teamCaption?.includes('Uni Bern') && 'bg-red-100 font-bold hover:bg-red-200'}`}>
      <td className='text-center'>{team.rank}</td>
      <td>{team.teamCaption}</td>
      <td className='text-center'>{team.wins}</td>
      <td className='text-center'>{team.defeats}</td>
      <td className='text-center'>{team.points}</td>
    </tr>
  )
}