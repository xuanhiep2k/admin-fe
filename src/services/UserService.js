import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": "Bearer " + localStorage.getItem("accessToken")
  }
};

export function getCurrentUserInfo() {
  const url = "/user/me";
  return axios.get(url, config);
}

export function getAllUsers(body) {
  const url = "/user/getAllUsers";
  return axios.post(url, body, config);
}

export function createUser(body, headers) {
  const url = "/user/create";
  return axios.post(url, body, headers);
}

export function updateUser(body, headers) {
  const url = "/user/update";
  return axios.post(url, body, headers);
}

function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      resolve(reader.result);
    };
  });
}

export function fetchImageAsBase64(pathFile) {
  return new Promise((resolve) => {
    const url = "/user/avatar/" + pathFile;
    window.fetch(url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    }).then((response) => response.blob())
      .then((blob) => blobToBase64(blob))
      .then((base64) => resolve(base64));
  });
}
//
// export function checkPermission() {
//   const url = "/user/checkPermission";
//   return axios.get(url, config);
// }