import { RankingSchema } from '../../common/types/RankingByTeam.type';
import FetchUtil from '../../common/utils/fetch/FetchUtil';

class RankingsService {
  fetchRankings = async (teamId: number): Promise<RankingSchema> => {
    return await FetchUtil.fetchTableData<RankingSchema>('rankings-service', teamId);
  }
}

export default new RankingsService();