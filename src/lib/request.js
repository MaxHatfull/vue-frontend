const BASE_URL = "https://api.emporiaenergy.com"

class Request {
    constructor(token) {
        this.token = token;
        console.log("This is a test" + token);
    }

    async makeRequest() {
        const url = BASE_URL + "/customers/devices";
        const header = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "authtoken": this.token,
                "Access-Control-Allow-Origin": "*"
            },
        }
            
        return fetch(url, header)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
}

export default Request;