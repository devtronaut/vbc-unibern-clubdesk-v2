import { useEffect, useState } from 'react';
import { TeamProps } from '../../App';
import { ResultPerTeamSchema, ResultsSchema, ResultTeamSchema } from '../../common/types/ResultsByTeam.type';
import DateTransformer from '../../common/utils/transform/DateTransformer';
import ResultsService from '../../services/results/ResultsService';
import { Spinner } from '../Loading/Spinner';
import { Toast } from '../Toast/Toast';


export const ResultsTable = (teamProps: TeamProps) => {
  const [isLoading, setLoading] = useState(true);
  const [results, setResults] = useState({} as ResultPerTeamSchema);

  useEffect(() => {
    ResultsService.fetchResults(teamProps.teamId)
      .then(results => {
        setResults(results);
        setLoading(false);
      })
      .catch(_ => {
        setLoading(false);
      })
  }, []);

  if (isLoading) {
    return (<Spinner text='Lade Resultate ...' />);
  }

  if (!results.results || results.results.length === 0) {
    return (<Toast text='Für deine Mannschaft sind noch keine Resultate vorhanden.' />)
  }

  return (
    <table className='tw-w-full tablet:tw-table-auto phone:tw-table-auto tw-border-collapse'>
      <thead className='tw-sticky tw-top-0'>
        <tr className='tw-bg-col-table-header tw-text-white'>
          <th className='tw-text-center tw-py-1'>DATUM</th>
          <th className='tw-text-center tw-py-1'>TEAMS</th>
          <th className='tw-text-center tw-py-1'>SÄTZE</th>
          <th colSpan={5} className='tw-text-center tw-py-1 phone:tw-hidden'>PUNKTE</th>
        </tr>
      </thead>
        {
          results.results.map((result: ResultsSchema, index: number) => {
            return (<TableRow key={index} {...result} />)
          })
        }
    </table>
  );
}

const TableRow = (props: ResultsSchema) => {
  const [result, setResult] = useState({} as ResultsSchema);
  const [shortDate, setShortDate] = useState('');
  const [loser, setLoser] = useState({} as ResultTeamSchema);
  const [winner, setWinner] = useState({} as ResultTeamSchema);

  useEffect(() => {
    setResult(props);
    setLoser(props.loser);
    setWinner(props.winner);

    const [, short,] = DateTransformer.transformDate(props.dateUtc);
    setShortDate(short);
  }, [])

  return (
    <tbody className='even:tw-bg-slate-50 hover:tw-bg-slate-100'>
      <tr>
        <td rowSpan={2} className='tw-text-center tw-py-1'>{shortDate}</td>
        <td className='tw-text-center tw-pt-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis'><strong>{winner.caption}</strong></td>
        <td className='tw-text-center tw-pt-1'><strong>{winner.setsWon}</strong></td>
        {winner.sets?.map((set, index) => { return <td className='tw-text-center tw-pt-1 phone:tw-hidden' key={index}>{set > loser.sets[index] ? (<strong>{set}</strong>) : (<span className='tw-text-neutral-600'>{set}</span>)}</td> })}
      </tr>
      <tr className='tw-border-0 tw-border-b-2 tw-border-solid tw-border-slate-200 hover:tw-bg-slate-100'>
        <td className='tw-text-center tw-pb-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis'>{loser.caption}</td>
        <td className='tw-text-center tw-pb-1'>{loser.setsWon}</td>
        {loser.sets?.map((set, index) => { return <td className='tw-text-center tw-pt-1 phone:tw-hidden' key={index}>{set > winner.sets[index] ? (<strong>{set}</strong>) : (<span className='tw-text-neutral-600'>{set}</span>)}</td> })}
      </tr>
    </tbody>
  )
}