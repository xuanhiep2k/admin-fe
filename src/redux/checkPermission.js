import * as UserService from "../services/UserService"
import * as FunctionService from "../services/FunctionService"
import {useState} from "react";

const functions = () => {
    return new Promise(((resolve, reject) => {
        UserService.getCurrentUserInfo().then(response => {
            FunctionService.getFunctionByRoleCode(response.data.data.roles).then(res => {
                resolve(res.data.data)
            }).then(res => {
                resolve(res)
            })
        }).catch(err => reject(err))
    }))
}

export async function checkPermission() {
    const roles = [];
    const functionList = await functions().then(response => response)
    functionList.map(func => {
        roles.push(func.code)
    })
    return roles.join(",");
}