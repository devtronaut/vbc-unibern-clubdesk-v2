import { UpcomingGamesPerTeamSchema } from '../../common/types/UpcomingGamesByTeam.type';
import FetchUtil from '../../common/utils/fetch/FetchUtil';

class UpcomingGamesService {
  fetchUpcomingGames = async (teamId: number): Promise<UpcomingGamesPerTeamSchema> => {
    return await FetchUtil.fetchTableData<UpcomingGamesPerTeamSchema>('games-service', teamId);
  }
}

export default new UpcomingGamesService();