import { UpcomingGamesPerTeamResponse, UpcomingGamesPerTeamSchema } from '../../common/types/UpcomingGamesByTeam.type';
import FetchUtil from '../../common/utils/FetchUtil';

class UpcomingGamesService {
  fetchUpcomingGames = async (teamId: number): Promise<UpcomingGamesPerTeamSchema> => {
    const upcomingGames = await FetchUtil.fetchTableData<UpcomingGamesPerTeamResponse>('games-service', teamId);
    return upcomingGames.message;
  }
}

export default new UpcomingGamesService();