import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
};

export function getAllPartners(body) {
    const url = "/partner/getAllPartners";
    return axios.post(url, body, config);
}

export function createPartner(body) {
    const url = "/partner/create";
    return axios.post(url, body, config);
}

export function updatePartner(body) {
    const url = "/partner/update";
    return axios.post(url, body, config);
}

export function lockPartner(code) {
    const url = "/partner/lock/";
    return axios.post(url + code, "", config);
}

export function unlockPartner(code) {
    const url = "/partner/unlock/";
    return axios.post(url + code, "", config);
}

export function deletePartner(code) {
    const url = "/partner/delete/";
    return axios.post(url + code, "", config);
}