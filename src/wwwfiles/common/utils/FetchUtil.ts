class FetchUtil {
  fetchTableData = async <T>(endpoint: string, teamId: number): Promise<T> => {
    const headers = {
      'Content-Type': 'application/json'
    }

    const rankingsData = await fetch(`https://8jbh3h0zi0.execute-api.eu-central-1.amazonaws.com/vbcunibern-api/${endpoint}?teamid=${teamId}`, {
      headers
    });

    const rankings = await rankingsData.json() as T;
    return rankings;
  }
}

export default new FetchUtil();
