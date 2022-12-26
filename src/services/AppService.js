import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
};

export function createApp(body) {
    const url = "/app/create";
    return axios.post(url, body, config);
}

export function updateApp(body) {
    const url = "/app/update";
    return axios.post(url, body, config);
}

export function getAllApps(body) {
    const url = "/app/getAllApps";
    return axios.post(url, body, config);
}

export function lockApp(code) {
    const url = "/app/lockApp/";
    return axios.post(url + code, "", config);
}

export function unlockApp(code) {
    const url = "/app/unlockApp/";
    return axios.post(url + code, "", config);
}

export function deleteApp(code) {
    const url = "/app/deleteApp/";
    return axios.post(url + code, "", config);
}