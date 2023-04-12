import axios from 'axios'

export default class MakeRequests {
  async makeExternalGetRequest(url) {
    try {
      const queryUrl = 'https://fantasy.premierleague.com/api/'+url
      console.log('queryUrl', queryUrl)
      const data = await axios.get(queryUrl,
        {
          headers: {
            Accept: ['application/json', 'html/text']
          },
        },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        return error;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }


  async makeInternalGetRequest(url) {
    try {
      const data = await axios.get(
        'http://localhost:3000/'+url,
        {
          headers: {
            Accept: ['application/json', 'html/text']
          },
        },
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        return error;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
}
