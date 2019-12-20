import axios from 'axios'
import qs from 'qs'

export default {
    async _apiAuth(method, data, callback) {
        return axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url: `/backend/${method}`,
            data: qs.stringify(data),
        })
    },
    async _apiFull(method, data, callback) {
        return axios({
            method: 'get',
            url: `/backend/${method}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            data: data,
        })
    },
}