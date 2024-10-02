import { ResultPerTeamSchema } from '../types/ResultsByTeam.type';
import { useTablesApi } from './useFetch';

export const useResultsApi = (
  teamId: number
): [boolean, ResultPerTeamSchema, boolean] => {
  const [loading, data, error] = useTablesApi<ResultPerTeamSchema>(
    'results-service',
    teamId
  );

  return [loading, data, error];
};
