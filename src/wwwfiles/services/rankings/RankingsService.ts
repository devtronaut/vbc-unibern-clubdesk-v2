import fetchUtil from '../../common/utils/FetchUtil';

class RankingsService {
  fetchRankings = async (teamId: number): Promise<any> => {
    const rankings = await fetchUtil.fetchTableData<any>('rankings-service', teamId);
    return rankings.message;
  }
}

export default new RankingsService();