import { ResultPerTeamSchema } from '../../common/types/ResultsByTeam.type';
import FetchUtil from '../../common/utils/fetch/FetchUtil'

class ResultsService {
  fetchResults = async (teamId: number): Promise<ResultPerTeamSchema> => {
    return await FetchUtil.fetchTableData<ResultPerTeamSchema>('results-service', teamId);
  }
}

export default new ResultsService();