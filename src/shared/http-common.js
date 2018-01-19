import axios from 'axios' // http helper lib

export const HTTP = axios.create({
  // TODO: change URL to your base endpoint!
  // Example: http://www.acloudfor4.com/civ6sql/api/search/
  baseURL: `http://jsonplaceholder.typicode.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})
