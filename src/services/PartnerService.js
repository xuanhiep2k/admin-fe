import axios from "axios";

export function getAllPartners(body, config) {
    const url = "/partner/getAllPartners";
    return axios.post(url, body, config);
}

export function createPartner(body, config) {
    const url = "/partner/create";
    return axios.post(url, body, config);
}

export function updatePartner(body, config) {
    const url = "/partner/update";
    return axios.post(url, body, config);
}