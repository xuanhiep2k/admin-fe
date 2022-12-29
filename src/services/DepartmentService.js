import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
};

export function createDepartment(body) {
    const url = "/department/create";
    return axios.post(url, body, config);
}


export function updateDepartment(body) {
    const url = "/department/update";
    return axios.post(url, body, config);
}

export function getAllDepartments(body) {
    const url = "/department/getAllDepartments";
    return axios.post(url, body, config);
}

export function getAllByPartnerCode(body) {
    const url = "/department/getAllByPartnerCode";
    return axios.post(url, body, config);
}


