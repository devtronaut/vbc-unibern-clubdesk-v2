import { useEffect, useState } from 'react';
import { TeamProps } from '../../../App';
import { ResultPerTeamSchema, ResultsSchema } from '../../../common/types/ResultsByTeam.type';
import ResultsService from '../../../services/results/ResultsService';
import DateTransformer from '../../../common/utils/transform/DateTransformer';

export const ResultsTable = (teamProps: TeamProps) => {
  const [isLoading, setLoading] = useState(true);
  const [results, setResults] = useState({} as ResultPerTeamSchema);

  useEffect(() => {
    ResultsService.fetchResults(teamProps.teamId)
      .then(resultsResponse => {
        const r = [resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0], resultsResponse.results[0]];
        resultsResponse.results = r;

        setResults(resultsResponse);
        setLoading(false);
      })
  }, []);

  if(isLoading){
    return <div></div>;
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
      <tbody className='[&>*:nth-child(4n)]:tw-bg-slate-50 [&>*:nth-child(4n-1)]:tw-bg-slate-50  '>
        {
          results.results.map((result: ResultsSchema) => {
            return (<TableRow {...result}/>)
          })
        }
      </tbody>
    </table>
  );
}

const TableRow = (props: ResultsSchema) => {
  const [result, setResult] = useState({} as ResultsSchema);
  const [shortDate, setShortDate] = useState('');

  useEffect(() => {
    setResult(props);

    const [, short, ] = DateTransformer.transformDate(props.dateUtc);
    setShortDate(short);
    console.log(short);
  }, [])

  return (
    <>
      <tr>
        <td rowSpan={2} className='tw-text-center tw-py-1'>{shortDate}</td>
        <td className='tw-text-center tw-pt-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis'>{result.winner?.caption}</td>
        <td className='tw-text-center tw-pt-1'>{result.winner?.setsWon}</td>
        {result.winner?.sets.map(set => { return <td className='tw-text-center tw-pt-1 phone:tw-hidden'>{set}</td>})}
      </tr>
      <tr className='tw-border-0 tw-border-b-2 tw-border-solid tw-border-slate-200 n-'>
        <td className='tw-text-center tw-pb-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis'>{result.loser?.caption}</td>
        <td className='tw-text-center tw-pb-1'>{result.loser?.setsWon}</td>
        {result.loser?.sets.map(set => { return <td className='tw-text-center tw-pb-1 phone:tw-hidden'>{set}</td> })}
      </tr>
      </>
  )
}