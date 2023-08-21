import axios from "axios";

export async function BuildBaseRequest() {
    return (
        axios.create({
            baseURL: 'http://<url of pi here>/'
        })
    )
}
