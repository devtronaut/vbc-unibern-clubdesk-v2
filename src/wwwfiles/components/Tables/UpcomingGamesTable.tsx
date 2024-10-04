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
import { GoogleMapsIcon } from '../Icons/GoogleMapsIcon';

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
          <GamesTableHeader
            text="GEGNER"
            styles="phone:tw-text-center tw-text-left"
          />
          <GamesTableHeader
            text="TYP"
            styles="tablet:tw-hidden tw-text-center"
          />
          <GamesTableHeader text="ORT" styles="phone:tw-w-16 tw-text-center" />
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
  styles?: string;
};

const GamesTableHeader = ({ text, styles }: GamesTableHeaderProps) => {
  return <th className={` tw-py-1 ${styles ?? ''}`}>{text}</th>;
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
        <div className="tablet:tw-h-12 tw-h-8 tw-flex phone:tw-flex-col tw-flex-row tw-items-center phone:tw-gap-0 tw-gap-2">
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
      <td className="tw-text-center tw-align-middle tw-py-1 tw-text-ellipsis">
        <a
          href={mapsLink}
          target="_blank"
          className="tablet:tw-hidden tw-inline"
        >
          {location.caption}
        </a>
        <div className="tw-text-balance tw-mt-1 tablet:tw-hidden tw-block">
          <div className="tw-whitespace-nowrap">{`${location.zip} ${location.city}`}</div>
        </div>
        <div className="tw-h-8 tablet:tw-block tw-hidden">
          <PinLink mapsLink={mapsLink} />
        </div>
      </td>
    </tr>
  );
};

type PinLinkProps = {
  mapsLink: string;
};

const PinLink = ({ mapsLink }: PinLinkProps) => {
  return (
    <a href={mapsLink} target="_blank" className="tw-h-8">
      <GoogleMapsIcon />
    </a>
  );
};
