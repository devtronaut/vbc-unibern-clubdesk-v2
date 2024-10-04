import { TeamProps } from '../../App';
import { TeamRankingSchema } from '../../common/types/RankingByTeam.type';
import { Spinner } from '../Loading/Spinner';
import { Toast } from '../Toast/Toast';
import { useRankingApi } from '../../common/hooks/api/useRankingsApi';
import { TeamLogo } from '../Logo/TeamLogo';

export const RankingTable = ({ teamId, teamName }: TeamProps) => {
  const [loading, ranking, error] = useRankingApi(teamId);

  if (error) {
    console.error('Error while fetching rankings.');
    return <Toast text="Beim Laden der Tabelle ist ein Fehler aufgetreten." />;
  }

  if (loading) {
    return <Spinner text="Lade Tabelle ..." />;
  }

  if (!ranking.teams || ranking.teams.length === 0) {
    return <Toast text="Für deine Mannschaft ist keine Tabelle vorhanden." />;
  }

  return (
    <table className="tw-w-full tablet:tw-table-fixed phone:tw-table-auto tw-border-collapse">
      <thead className="tw-sticky tw-top-0">
        <tr className="tw-bg-col-gray tw-text-white">
          <th className="tw-text-center tw-py-1 phone:tw-w-20">RANG</th>
          <th className="tw-text-left tw-py-1">TEAM</th>
          <th className="tw-text-center tw-py-1 phone:tw-hidden">SIEGE</th>
          <th className="tw-text-center tw-py-1 phone:tw-hidden tw-overflow-hidden tw-text-ellipsis">
            NIEDERLAGEN
          </th>
          <th className="tw-text-center tw-py-1 phone:tw-w-24">PUNKTE</th>
        </tr>
      </thead>
      <tbody>
        {ranking.teams.map((team: TeamRankingSchema, index: number) => {
          return (
            <RankingTableRow
              key={index}
              team={team}
              isHomeTeam={team.teamCaption?.includes(teamName)}
            />
          );
        })}
      </tbody>
    </table>
  );
};

type RankingTableRowProps = {
  team: TeamRankingSchema,
  isHomeTeam?: boolean
}

const RankingTableRow = ({
  team,
  isHomeTeam = false,
}: RankingTableRowProps) => {
  return (
    <tr
      className={`tw-border-0 tw-border-y-2 tw-border-solid tw-border-slate-200 tw-duration-200 first:tw-border-t-0 last:tw-border-b-0 ${
        isHomeTeam
          ? 'tw-bg-red-100 tw-duration-200 hover:tw-bg-red-200 tw-font-bold'
          : 'hover:tw-bg-slate-100 even:tw-bg-slate-50'
      }`}
    >
      <td className={`tw-text-center tw-py-2`}>{team.rank}</td>
      <td
        className={`tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-py-1 tw-h-8 tw-flex tw-flex-row tw-items-center tw-gap-2`}
      >
        <TeamLogo src={team.teamLogoUrl} />
        {team.teamCaption}
      </td>
      <td className={`tw-text-center tw-py-2 phone:tw-hidden`}>{team.wins}</td>
      <td className={`tw-text-center tw-py-2 phone:tw-hidden`}>
        {team.defeats}
      </td>
      <td className={`tw-text-center tw-py-2`}>{team.points}</td>
    </tr>
  );
};