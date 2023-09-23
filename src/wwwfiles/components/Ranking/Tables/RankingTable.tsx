import { useEffect, useState } from 'react';
import RankingsService from '../../../services/rankings/RankingsService';
import { RankingSchema, TeamRankingSchema } from '../../../common/types/RankingByTeam.type';
import { TeamProps } from '../../../App';

export const RankingTable = (teamProps: TeamProps) => {
  const [isLoading, setLoading] = useState(true);
  const [ranking, setRanking] = useState({} as RankingSchema);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    RankingsService.fetchRankings(teamProps.teamId)
      .then(ranking => {
        setRanking(ranking);
        setLoading(false);
      })

    setTeamName(teamProps.teamName);
  }, [])

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className='tw-w-full tw-overflow-hidden tw-rounded-md'>
      <table className='tw-w-full tablet:tw-table-fixed phone:tw-table-auto tw-border-collapse'>
        <thead>
          <tr className='tw-bg-col-table-header tw-text-white'>
            <th className='tw-text-center tw-py-1'>RANG</th>
            <th className='tw-text-center tw-py-1'>TEAM</th>
            <th className='tw-text-center tw-py-1 phone:tw-hidden'>SIEGE</th>
            <th className='tw-text-center tw-py-1 phone:tw-hidden tw-overflow-hidden tw-text-ellipsis'>NIEDERLAGEN</th>
            <th className='tw-text-center tw-py-1'>PUNKTE</th>
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
    team.teamCaption?.includes(teamName) ?
      (
        <tr className={'tw-border-y-2 tw-font-bold even:tw-bg-slate-50 first:tw-border-t-0 last:tw-border-b-0 tw-bg-red-100 tw-duration-200 hover:tw-bg-red-200'}>
          <td className='tw-text-center tw-py-1'><strong>{team.rank}</strong></td>
          <td className='tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-py-1'><strong>{team.teamCaption}</strong></td>
          <td className='tw-text-center tw-py-1 phone:tw-hidden'><strong>{team.wins}</strong></td>
          <td className='tw-text-center tw-py-1 phone:tw-hidden'><strong>{team.defeats}</strong></td>
          <td className='tw-text-center tw-py-1'><strong>{team.points}</strong></td>
        </tr>
      ) : (
        <tr className={`tw-border-0 tw-border-y-2 tw-border-solid tw-border-slate-200 tw-duration-200 hover:tw-bg-slate-100 even:tw-bg-slate-50 first:tw-border-t-0 last:tw-border-b-0`}>
          <td className='tw-text-center tw-py-1'>{team.rank}</td>
          <td className='tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-py-1'>{team.teamCaption}</td>
          <td className='tw-text-center tw-py-1 phone:tw-hidden'>{team.wins}</td>
          <td className='tw-text-center tw-py-1 phone:tw-hidden'>{team.defeats}</td>
          <td className='tw-text-center tw-py-1'>{team.points}</td>
        </tr>
      )
  )
}