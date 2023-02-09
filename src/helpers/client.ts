import axios from "axios"

class HttpRequest {
    get (endpoint: string) {

        axios.get(endpoint)
        .then( (response) => {
            
            return response
        })
        .catch( (error) => {
            return error
        })
    }

    post (endpoint: string, options?: any) {

        axios.post(endpoint, options)
        .then( (response) => {

            return response
        })
        .catch( (error) => {

            return error
        })
    }
}

export default new HttpRequest()