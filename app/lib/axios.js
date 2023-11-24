import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://booking-api.test',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios