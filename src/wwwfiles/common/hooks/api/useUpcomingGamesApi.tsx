import { UpcomingGamesPerTeamSchema } from '../../types/UpcomingGamesByTeam.type';
import { useTablesApi } from './useFetch';

export const useUpcomingGamesApi = (
  teamId: number
): [boolean, UpcomingGamesPerTeamSchema, boolean] => {
  const [loading, data, error] = useTablesApi<UpcomingGamesPerTeamSchema>(
    'games-service',
    teamId
  );

  return [loading, data, error];
};
