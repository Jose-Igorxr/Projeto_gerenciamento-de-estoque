import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios'
import { API_URL } from './config'

// Importando os tipos corretos para a configuração da solicitação
import { InternalAxiosRequestConfig } from 'axios'

// Cria uma instância do Axios com a baseURL configurada para o URL da API e um timeout de 5000ms.
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

// Interceptador de solicitação: é executado antes de cada solicitação ser enviada.
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Recupera o token do armazenamento local.
    const token = localStorage.getItem('token')
    // Se um token existir, adiciona-o ao cabeçalho de autorização da solicitação.
    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
      }
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    // Se houver um erro, rejeita a solicitação com o erro.
    return Promise.reject(error)
  }
)

// Interceptador de resposta: é executado quando uma resposta é recebida.
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Se a resposta for bem-sucedida, retorna a resposta.
    return response
  },
  (error: AxiosError) => {
    // Se houver um erro na resposta...
    if (error.response && error.response.status === 401) {
      // ...e o erro for de token inválido (status 401), redireciona para a página de login.
      window.location.replace('/')
    }
    // Retorna o erro para que seja tratado pelo código que fez a solicitação.
    return Promise.reject(error)
  }
)

// Exporta a instância do Axios configurada como a API padrão da aplicação.
export default api
