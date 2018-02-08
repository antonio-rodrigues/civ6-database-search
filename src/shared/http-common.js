import axios from 'axios' // http helper lib

export const HTTP = axios.create({
  // change URL to your base endpoint!
  baseURL: 'http://www.acloudfor4.com/civ6datasvc/Service1.svc/rest/civ6data.api'
  // headers: {
  //   Authorization: 'Bearer {token}'
  // }
})

export const ApiMethod = 'GetDataProps'
