import { ResultPerTeamSchema } from '../../common/types/ResultsByTeam.type';
import FetchUtil from '../../common/utils/fetch/FetchUtil'

class ResultsService {
  fetchResults = async (teamId: number): Promise<ResultPerTeamSchema> => {
    const results = await FetchUtil.fetchTableData<ResultPerTeamSchema>('results-service', teamId);
    return results;
  }
}

export default new ResultsService();