import { useEffect, useState } from 'react';
import { TeamProps } from '../../../App';
import { LocationSchema, UpcomingGamesPerTeamSchema, UpcomingGamesSchema } from '../../../common/types/UpcomingGamesByTeam.type';
import UpcomingGamesService from '../../../services/games/UpcomingGamesService';
import DateTransformer from '../../../common/utils/transform/DateTransformer';
import MapsLinkTransformer from '../../../common/utils/transform/MapsLinkTransformer';

export const UpcomingGamesTable = (teamProps: TeamProps) => {
  const [isLoading, setLoading] = useState(true);
  const [games, setGames] = useState({} as UpcomingGamesPerTeamSchema);

  useEffect(() => {
    UpcomingGamesService.fetchUpcomingGames(teamProps.teamId)
      .then(games => {
        setGames(games);
        setLoading(false);
      })
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <table className='tw-w-full tablet:tw-table-fixed phone:tw-table-auto tw-border-collapse'>
      <thead className='tw-sticky tw-top-0'>
        <tr className='tw-bg-col-table-header tw-text-white'>
          <th className='tw-text-center tw-py-1'>DATUM</th>
          <th className='tw-text-center tw-py-1'>GEGNER</th>
          <th className='tw-text-center tw-py-1 phone:tw-hidden'>TYP</th>
          <th className='tw-text-center tw-py-1'>ORT</th>
        </tr>
      </thead>
      <tbody>
        {
          games.upcomingGames.map((game: UpcomingGamesSchema) => {
            return (<TableRow {...game} />);
          })
        }
      </tbody>
    </table>
  );
}

const TableRow = (props: UpcomingGamesSchema) => {
  const [game, setGame] = useState({} as UpcomingGamesSchema);
  const [longDate, setLongDate] = useState('');
  const [shortDate, setShortDate] = useState('');
  const [time, setTime] = useState('');
  const [loc, setLocation] = useState({} as LocationSchema)

  useEffect(() => {
    setGame(props);
    setLocation(props.location);

    const [long, short, time] = DateTransformer.transformDate(props.dateUtc);
    setLongDate(long);
    setShortDate(short);
    setTime(time);
  }, []);

  return (
    <tr className='tw-border-0 tw-border-y-2 tw-border-solid tw-border-slate-200 tw-duration-200 hover:tw-bg-slate-100 even:tw-bg-slate-50 first:tw-border-t-0 last:tw-border-b-0'>
      <td className='tw-text-center tw-py-1 tablet:tw-hidden'>
        {`${longDate}`}<br />
        {`${time} Uhr`}
      </td>
      <td className='tw-text-center tw-py-1 tablet:tw-table-cell tw-hidden'>
        {`${shortDate}`}<br />
        {`${time} Uhr`}
      </td>
      <td className='tw-text-center tw-py-1 tablet:tw-hidden'>{game.opponent}</td>
      <td className='tw-text-center tw-py-1 tw-hidden tablet:tw-table-cell tw-whitespace-nowrap  tw-overflow-hidden tw-text-ellipsis'>{game.opponent}</td>
      <td className='tw-text-center tw-py-1 phone:tw-hidden'>{game.type}</td>
      <td className='tw-text-center tw-py-1 tablet:tw-hidden tw-whitespace-nowrap  tw-overflow-hidden tw-text-ellipsis'>
        {`${loc.caption} `}
        <a href={MapsLinkTransformer.transformPlusCode(loc.plusCode)} target='_blank' rel='noopener noreferrer'>
          <i className="bi bi-pin-map-fill"></i>
        </a>
        <br />
        {`${loc.street} ${loc.number}, ${loc.zip} ${loc.city}`}
      </td>
      <td className='tw-text-center tw-py-1 tw-hidden tablet:tw-table-cell'>
        <a href={MapsLinkTransformer.transformPlusCode(loc.plusCode)} target='_blank' rel='noopener noreferrer'>
          <i className="bi bi-pin-map-fill"></i>
        </a>
      </td>
    </tr>
  )
}