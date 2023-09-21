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
    <table>
      <thead>
        <tr className='bg-blue-900 text-white'>
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
    </table >);
}

const TableRow = (props: TeamRankingSchema) => {
  const [team, setTeam] = useState({} as TeamRankingSchema);

  useEffect(() => {
    setTeam(props);
  })

  return (
    <tr>
      <td className='rank'>{team.rank}</td>
      <td className='teamCaption'>{team.teamCaption}</td>
      <td className='wins'>{team.wins}</td>
      <td className='defeats'>{team.defeats}</td>
      <td className='points'>{team.points}</td>
    </tr>
  )
}