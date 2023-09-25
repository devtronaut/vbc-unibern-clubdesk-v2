import { ResultPerTeamResponse, ResultPerTeamSchema } from '../../common/types/ResultsByTeam.type';
import FetchUtil from '../../common/utils/FetchUtil'

class ResultsService {
  fetchResults = async (teamId: number): Promise<ResultPerTeamSchema> => {
    const results = await FetchUtil.fetchTableData<ResultPerTeamResponse>('results-service', teamId);
    return results.message;
  }
}