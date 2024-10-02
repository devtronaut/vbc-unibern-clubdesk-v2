import { TeamProps } from '../../App';
import { useResultsApi } from '../../common/hooks/useResultsApi';
import {
  ResultsSchema,
  ResultTeamSchema,
} from '../../common/types/ResultsByTeam.type';
import DateTransformer from '../../common/utils/transform/DateTransformer';
import { Spinner } from '../Loading/Spinner';
import { Toast } from '../Toast/Toast';

export const ResultsTable = (teamProps: TeamProps) => {
  const [loading, results, error] = useResultsApi(
    teamProps.teamId
  );

  if (error) {
    console.error('Error while fetching results.');
    return (
      <Toast text="Beim Laden der Resultate ist ein Fehler aufgetreten." />
    );
  }

  if (loading) {
    return <Spinner text="Lade Resultate ..." />;
  }

  if (!results.results || results.results.length === 0) {
    return (
      <Toast text="Für deine Mannschaft sind noch keine Resultate vorhanden." />
    );
  }

  const maxPlayedSets = Math.max(...results.results.map((r) => r.winner.sets.length));

  return (
    <table className="tw-w-full tablet:tw-table-auto phone:tw-table-auto tw-border-collapse">
      <thead className="tw-sticky tw-top-0">
        <tr className="tw-bg-col-table-header tw-text-white">
          <th className="tw-text-center tw-py-1">DATUM</th>
          <th className="tw-text-center tw-py-1 phone:tw-hidden">MODUS</th>
          <th className="tw-text-center tw-py-1">TEAMS</th>
          <th className="tw-text-center tw-py-1">SÄTZE</th>
          <th colSpan={5} className="tw-text-left tw-py-1 phone:tw-hidden">
            PUNKTE
          </th>
        </tr>
      </thead>
      {results.results.map((result: ResultsSchema, index: number) => {
        return (
          <ResultTableRow
            key={index}
            winner={result.winner}
            loser={result.loser}
            dateUtc={result.dateUtc}
            mode={result.mode}
            maxPlayedSets={maxPlayedSets}
          />
        );
      })}
    </table>
  );
};

type TableRowProps = {
  winner: ResultTeamSchema;
  loser: ResultTeamSchema;
  dateUtc: string;
  mode: string;
  maxPlayedSets: number;
};

// TODO Refactor that shit!!!
const ResultTableRow = ({
  winner,
  loser,
  dateUtc,
  mode,
  maxPlayedSets,
}: TableRowProps) => {
  const [, short] = DateTransformer.transformDate(dateUtc);

  // Fill the sets array to the maximum number of sets played (to have an equal amount of cells in each row)
  const setDifference = maxPlayedSets - winner.sets.length;
  const fillArray = new Array(setDifference).fill(null, 0, setDifference);
  const winnerSets = winner.sets.concat(fillArray);
  const loserSets = loser.sets.concat(fillArray);

  const [winnerSetObjects, loserSetObjects] = getSetObjects(winnerSets, loserSets);

  return (
    <tbody className="even:tw-bg-slate-50 hover:tw-bg-slate-100">
      <tr>
        <td rowSpan={2} className="tw-text-center tw-py-1">
          {short}
        </td>
        <td rowSpan={2} className="tw-text-center tw-py-1 phone:tw-hidden">
          {mode}
        </td>
        <TeamResultRow
          isWinner={true}
          caption={winner.caption}
          setsWon={winner.setsWon}
          sets={winnerSetObjects}
        />
      </tr>
      <tr className="tw-border-0 tw-border-b-2 tw-border-solid tw-border-slate-200 hover:tw-bg-slate-100">
        <TeamResultRow
          isWinner={false}
          caption={loser.caption}
          setsWon={loser.setsWon}
          sets={loserSetObjects}
        />
      </tr>
    </tbody>
  );
};

type Set = {
  points: number;
  won: boolean;
};

type TeamResultRowProps = {
  isWinner: boolean,
  caption: string,
  setsWon: number,
  sets: Set[]
}

const TeamResultRow = ({
  isWinner,
  caption,
  setsWon,
  sets,
}: TeamResultRowProps) => {
  return (
    <>
      <td className="tw-text-center tw-pt-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
        {isWinner ? <strong>{caption}</strong> : caption}
      </td>
      <td className="tw-text-center tw-pt-1">
        {isWinner ? <strong>{setsWon}</strong> : setsWon}
      </td>
      {sets.map((set, index) => {
        return (
          <td className="tw-text-left tw-pt-1 phone:tw-hidden" key={index}>
            {set.won ? (
              <strong>{set.points}</strong>
            ) : (
              <span className="tw-text-neutral-600">{set.points}</span>
            )}
          </td>
        );
      })}
    </>
  );
};

const getSetObjects = (
  winnerSets: number[],
  loserSets: number[]
): [Set[], Set[]] => {
  const winnerSetObjects: Set[] = [];
  const loserSetObjects: Set[] = [];

  winnerSets.forEach((winnerPoints, idx) => {
    const loserPoints = loserSets[idx];
    const winnerWonSet = winnerPoints > loserPoints;

    winnerSetObjects.push({
      points: winnerPoints,
      won: winnerWonSet,
    });

    loserSetObjects.push({
      points: loserPoints,
      won: !winnerWonSet,
    });
  });

  return [winnerSetObjects, loserSetObjects];
};
