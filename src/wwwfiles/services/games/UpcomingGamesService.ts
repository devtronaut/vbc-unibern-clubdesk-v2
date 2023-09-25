import { UpcomingGamesPerTeamSchema } from '../../common/types/UpcomingGamesByTeam.type';
import FetchUtil from '../../common/utils/fetch/FetchUtil';

class UpcomingGamesService {
  fetchUpcomingGames = async (teamId: number): Promise<UpcomingGamesPerTeamSchema> => {
    const upcomingGames = await FetchUtil.fetchTableData<UpcomingGamesPerTeamSchema>('games-service', teamId);
    return upcomingGames;
  }
}

export default new UpcomingGamesService();