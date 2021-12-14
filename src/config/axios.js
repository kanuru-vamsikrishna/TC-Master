import Axios from 'axios'

const axios = Axios.create({
    baseURL : 'http://localhost:3031'
})

export default axios