import { RankingSchema } from '../types/RankingByTeam.type';
import { useTablesApi } from './useFetch';

export const useRankingApi = (teamId: number): [boolean, RankingSchema, boolean] => {
  const [loading, data, error] = useTablesApi<RankingSchema>(
    'rankings-service',
    teamId
  );
  return [loading, data, error];
};