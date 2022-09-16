const BASE_URL = "https://api.emporiaenergy.com"

class Request {
    constructor(token) {
        if(token === ""){
            this.token = localStorage.getItem('tkn');
        } else {
            localStorage.setItem('tkn',token);
            this.token = token
        }
    }

    async getDevices() {
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
        .then(response => response.json());
    }

    async getChartUsage(deviceGid, channel) {
        const url = BASE_URL +
                    "/AppAPI?apiMethod=getChartUsage&deviceGid=" +
                    deviceGid +
                    "&channel=" + 
                    channel + 
                    "&start=2022-09-08T20:00:00.000Z&end=2022-09-12T19:00:00.000Z&scale=1H&energyUnit=KilowattHours";
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
        .then(response => response.json());
    }
}

export default Request;