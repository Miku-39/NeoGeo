import axios from 'axios'
import querystring from 'querystring'

export const API_SERVER_URL = 'http://213.251.249.30:8090'
//export const FILE_SERVER_URL = 'https://saas.claris.su/UserSettings/9323/Docs/'

const conf = {
    baseURL: API_SERVER_URL,
    headers: { 'Cache-Control': 'no-cache' },
    timeout: 15000
}

const instance = axios.create(conf)

const onError = (error) => {
  console.log(error)
  if (error.response) {
    if (error.response.status === 400) {
      throw Error('Не верный логин или пароль')
    } else if (error.response.status > 400) {
      throw Error('При обработке запроса на сервере произошла ошибка, мы ее зафиксировали и уже разбираемся в причинах.')
    }
  } else if (error.request) {
    console.warn('axios onError', error.request)
    throw Error('Сервер недоступен. Проверьте свое интернет-соединение')
  } else {
    console.warn('Error', error.message)
  }
}


const login = (user, password) =>  {
  const body = `grant_type=password&username=${user}&password=${password}`
  const conf = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}

  return instance.post('/token', body, conf).catch(onError)
}

const addFile = (uri) =>  {
//  const conf = { headers: { 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryfYmc9zCbpTtmSCuM',
//                            'Accept': 'application/json'}}
//  const body = `${file}`
//  return instance.post('/vNext/v1/files', body, conf).catch(onError)
    let bodyFormData = new FormData()
    bodyFormData.append("file", {
      uri: uri,
      type: "image/jpeg", // or photo.type
      name: "NeoGeoMobile.jpg"
    });
    return instance.post("/vNext/v1/files", bodyFormData, { headers: {'Content-Type': 'multipart/form-data' }} );
}

const authorize = () => instance.get('/vNext/v1/users/current')
const setAuthHeader = (token) => instance.defaults.headers.authorization = `Bearer ${token}`

const fetchParkingsForCars = () => instance.get(`/vNext/v1/parkings?filterBy=Type.Id="3590481191000"`)
const fetchParkingsForGoods = () => instance.get(`/vNext/v1/parkings?filterBy=Type.Id="3590077188000"`)
const fetchServices = () => instance.get(`/vNext/v1/services?filterBy=IsNeoGeo=true`)
const fetchAllTickets = () => instance.get(`vNext/v1/requests?orderBy=number+desc,&filters=RequestsForTenant,NotClosedRequests`)
const fetchIssueReasons = () => instance.get(`/vNext/v1/issueReasons?filterBy=Id!="2658836526000"`)
const fetchBlockReasons = () => instance.get(`vNext/v1/blockReasons/?filters=TemporaryBlockingOrDeletePass`)

const updateTicketStatus = (ticket) => instance.patch(`/vnext/v1/requests/${ticket.id}`, {status: ticket.status})

const addTicket = (ticket) => instance.post('/vNext/v1/requests', ticket).catch(onError)

export default {  login, authorize, setAuthHeader,
                  fetchParkingsForCars, fetchParkingsForGoods,
                  fetchServices, fetchAllTickets, updateTicketStatus,
                  addTicket, addFile, fetchIssueReasons, fetchBlockReasons }
