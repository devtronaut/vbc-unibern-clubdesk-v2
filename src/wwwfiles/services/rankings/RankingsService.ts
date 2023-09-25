import { RankingByTeamResponse, RankingSchema } from '../../common/types/RankingByTeam.type';
import FetchUtil from '../../common/utils/fetch/FetchUtil';

class RankingsService {
  fetchRankings = async (teamId: number): Promise<RankingSchema> => {
    const rankings = await FetchUtil.fetchTableData<RankingByTeamResponse>('rankings-service', teamId);
    return rankings.message;
  }
}

export default new RankingsService();