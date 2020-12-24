import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

// axios request interceptor
http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.token}`

  return config
}, err => {

  return Promise.reject(err)
})

// axios response interceptor
http.interceptors.response.use(res => {
  return res
}, err => {
  alert(err.response.data.message)
  return Promise.reject(err)
})

export default http
