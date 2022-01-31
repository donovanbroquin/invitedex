import axios from 'axios'

export default function () {
  return axios.get(import.meta.env.VITE_API)
}
