import { TeamProps } from '../../App';
import {
  LocationSchema,
  UpcomingGamesSchema,
} from '../../common/types/UpcomingGamesByTeam.type';
import { Spinner } from '../Loading/Spinner';
import { Toast } from '../Toast/Toast';
import { GameType } from '../../common/enums/GameType.enum';
import { useUpcomingGamesApi } from '../../common/hooks/api/useUpcomingGamesApi';
import { useDateTransformer } from '../../common/hooks/transformers/useDateTransformer';
import { useMapsLinkTransformer } from '../../common/hooks/transformers/useMapsLinkTransformer';
import { TeamLogo } from '../Logo/TeamLogo';

export const UpcomingGamesTable = ({ teamId }: TeamProps) => {
  const [loading, games, error] = useUpcomingGamesApi(teamId);

  if (error) {
    console.error('Error while fetching upcoming games.');
    return <Toast text="Beim Laden der Spiele ist ein Fehler aufgetreten." />;
  }

  if (loading) {
    return <Spinner text="Lade nächste Spiele ..." />;
  }

  if (!games.upcomingGames || games.upcomingGames.length === 0) {
    return (
      <Toast text="Für deine Mannschaft sind keine weiteren Spiele vorhanden." />
    );
  }

  return (
    <table className="tw-w-full tablet:tw-table-fixed tw-table-auto phone:tw-table-auto tw-border-collapse">
      <thead className="tw-sticky tw-top-0">
        <tr className="tw-bg-col-gray tw-text-white">
          <GamesTableHeader
            text="DATUM"
            styles="phone:tw-w-24 tw-text-center"
          />
          <GamesTableHeader text="GEGNER" styles="tablet:tw-text-center tw-text-left" />
          <GamesTableHeader text="TYP" styles='tablet:tw-hidden tw-text-center'/>
          <GamesTableHeader text="ORT" styles="phone:tw-w-20 tw-text-center" />
        </tr>
      </thead>
      <tbody>
        {games.upcomingGames.map((game: UpcomingGamesSchema, index: number) => {
          return <GamesTableRow key={index} {...game} />;
        })}
      </tbody>
    </table>
  );
};

type GamesTableHeaderProps = {
  text: string;
  styles?: string
};

const GamesTableHeader = ({
  text,
  styles
}: GamesTableHeaderProps) => {
  return (
    <th
      className={` tw-py-1 ${styles ?? ''}`}
    >
      {text}
    </th>
  );
};

type GamesTableRowProps = {
  opponent: string;
  mode: string;
  type: GameType;
  location: LocationSchema;
  dateUtc: string;
  opponentLogoUrl: string;
};

const GamesTableRow = ({
  opponent,
  mode,
  type,
  location,
  dateUtc,
  opponentLogoUrl,
}: GamesTableRowProps) => {
  const [long, short, time] = useDateTransformer(dateUtc);
  const mapsLink = useMapsLinkTransformer(location.plusCode);

  return (
    <tr className="tw-border-0 tw-border-y-2 tw-border-solid tw-border-slate-200 tw-duration-200 hover:tw-bg-slate-100 even:tw-bg-slate-50 first:tw-border-t-0 last:tw-border-b-0">
      <td className="tw-text-center tw-py-1">
        <div className="tw-w-full tw-text-center tw-block tablet:tw-hidden">
          {long}
        </div>
        <div className="tw-w-full tw-text-center tw-hidden tablet:tw-block">
          {short}
        </div>
        {`${time} Uhr`}
      </td>
      <td className="tw-text-center tw-py-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
        <div className="tablet:tw-h-12 tw-h-8 tw-flex tablet:tw-flex-col tw-flex-row tw-items-center phone:tw-gap-0 tw-gap-2">
          <div className="tablet:tw-h-[50%] tw-h-full">
            <TeamLogo src={opponentLogoUrl} />
          </div>
          {opponent}
        </div>
      </td>
      <td className="tw-text-center tw-py-1 tablet:tw-hidden">
        {mode}
        <br />
        {type}
      </td>
      <td className="tw-text-center tw-py-1 tablet:tw-hidden tw-whitespace-nowrap  tw-overflow-hidden tw-text-ellipsis">
        <a>{location.caption}</a>
        <PinLink mapsLink={mapsLink} />
        <br />
        <span className="tw-text-balance">{`${location.street} ${location.number}, ${location.zip} ${location.city}`}</span>
      </td>
      <td className="tw-text-center tw-py-1 tw-hidden tablet:tw-table-cell">
        <PinLink mapsLink={mapsLink} />
      </td>
    </tr>
  );
};

type PinLinkProps = {
  mapsLink: string;
};

const PinLink = ({ mapsLink }: PinLinkProps) => {

  return (
    <a href={mapsLink}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pin-map-fill"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"
        />
        <path
          fillRule="evenodd"
          d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"
        />
      </svg>
    </a>
  );
};
