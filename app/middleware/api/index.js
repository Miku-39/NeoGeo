import axios from 'axios'
import querystring from 'querystring'


export const API_SERVER_URL = 'https://api.claris.su/main/'
//export const FILE_SERVER_URL = 'https://saas.claris.su/UserSettings/9323/Docs/'

const conf = {
    baseURL: API_SERVER_URL,
    headers: { 'Cache-Control': 'no-cache' },
    timeout: 15000
}

const instance = axios.create(conf)

const onError = (error) => {
  if (error.response) {
    console.warn('axios onError', error.response)

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
  console.log(error.config)
}


const login = (user, password) =>  {
  const body = `grant_type=password&username=${user}&password=${password}`
  const conf = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}

  return instance.post('/token', body, conf).catch(onError)
}

const authorize = () => instance.get('/vNext/v1/users/current')
const setAuthHeader = (token) => instance.defaults.headers.authorization = `Bearer ${token}`

const fetchTicketsForCheckpoint = userId => instance.get(`/vnext/v1/requests?orderBy=carNumber&filters=RequestsForCheckpoint,CurrentDayRequests&pageSize=500&pageNumber=1`)
const fetchTicketsForSecurityChief = userId => instance.get(`/vNext/v1/requests?filters=RequestsForBolshevikSecurityChief,CurrentDayRequests&pageSize=500&pageNumber=1&orderBy=Number*-1`)

const fetchAllTickets = companyId => {
    const conf = {
        params: {
            OrderBy: 'ActualCreationDate desc',
            filterBy: `company.Id="${companyId}"`,
            pageSize: 500,
            pageNumber: 1
        }
    }

    return instance.get('/vNext/v1/requests', conf).catch(onError)
}

const updateTicketStatus = (ticket) => instance.patch(`/vnext/v1/requests/${ticket.id}`, {status: ticket.status})

const addTicket = (ticket) => instance.post('/vNext/v1/requests', ticket).catch(onError)


export default { login, authorize, setAuthHeader, fetchTicketsForCheckpoint, fetchTicketsForSecurityChief, fetchAllTickets, updateTicketStatus, addTicket }
