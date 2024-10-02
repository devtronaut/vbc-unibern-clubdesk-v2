import { TeamProps } from '../../App';
import { RankingSchema, TeamRankingSchema } from '../../common/types/RankingByTeam.type';
import { Spinner } from '../Loading/Spinner';
import { Toast } from '../Toast/Toast';
import { useTablesApi } from '../../common/hooks/useFetch';

const useRankingApi = (teamId: number): [boolean, RankingSchema, boolean] => {
  const [loading, data, error] = useTablesApi<RankingSchema>('rankings-service', teamId);
  return [loading, data, error];
}

export const RankingTable = ({teamId, teamName}: TeamProps) => {
  const [loading, ranking, error] = useRankingApi(teamId);

  if(error){
    console.error('Error while fetching rankings.')
    return (<Toast text='Beim Laden der Tabelle ist ein Fehler aufgetreten.'/>)
  }

  if (loading) {
    return <Spinner text="Lade Tabelle ..." />;
  }

  if(!ranking.teams || ranking.teams.length === 0){
    return (<Toast text='Für deine Mannschaft ist keine Tabelle vorhanden.'/>)
  }

  return (
    <table className='tw-w-full tablet:tw-table-fixed phone:tw-table-auto tw-border-collapse'>
        <thead className='tw-sticky tw-top-0'>
          <tr className='tw-bg-col-table-header tw-text-white'>
            <th className='tw-text-center tw-py-1'>RANG</th>
            <th className='tw-text-left tw-py-1'>TEAM</th>
            <th className='tw-text-center tw-py-1 phone:tw-hidden'>SIEGE</th>
            <th className='tw-text-center tw-py-1 phone:tw-hidden tw-overflow-hidden tw-text-ellipsis'>NIEDERLAGEN</th>
            <th className='tw-text-center tw-py-1'>PUNKTE</th>
          </tr>
        </thead>
        <tbody>
          {
            ranking.teams.map((team: TeamRankingSchema, index: number) => {
              return (<TableRow key={index} team={team} teamName={teamName} />)
            })
          }
        </tbody>
      </table >);
}

type TableRowProps = {
  team: TeamRankingSchema,
  teamName: string
}

const TableRow = ({team, teamName}: TableRowProps) => {
  return team.teamCaption?.includes(teamName) ? (
    // Row for own team (VBC Uni Bern or Volley Uni Bern)
    <tr className="tw-border-y-2 tw-font-bold first:tw-border-t-0 last:tw-border-b-0 tw-bg-red-100 tw-duration-200 hover:tw-bg-red-200">
      <td className="tw-text-center tw-py-2">
        <strong>{team.rank}</strong>
      </td>
      <td className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-py-2">
        <strong>{team.teamCaption}</strong>
      </td>
      <td className="tw-text-center tw-py-2 phone:tw-hidden">
        <strong>{team.wins}</strong>
      </td>
      <td className="tw-text-center tw-py-2 phone:tw-hidden">
        <strong>{team.defeats}</strong>
      </td>
      <td className="tw-text-center tw-py-2">
        <strong>{team.points}</strong>
      </td>
    </tr>
  ) : (
    // Row for all other teams
    <tr className="tw-border-0 tw-border-y-2 tw-border-solid tw-border-slate-200 tw-duration-200 hover:tw-bg-slate-100 even:tw-bg-slate-50 first:tw-border-t-0 last:tw-border-b-0">
      <td className="tw-text-center tw-py-2">{team.rank}</td>
      <td className="tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-py-1">
        {team.teamCaption}
      </td>
      <td className="tw-text-center tw-py-2 phone:tw-hidden">{team.wins}</td>
      <td className="tw-text-center tw-py-2 phone:tw-hidden">{team.defeats}</td>
      <td className="tw-text-center tw-py-2">{team.points}</td>
    </tr>
  );
};