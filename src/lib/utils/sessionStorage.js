import { isString } from "./typeOf.js"

const { sessionStorage: storage } = window

export const setSessionStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    if (isString(key)) {
      storage.setItem(key, JSON.stringify(value))
      resolve()
    } else {
      reject({ message: "key는 문자 타입 이어야 합니다." })
    }
  })
}

export const getSessionStorage = (key) => {
  return new Promise((resolve, reject) => {
    if (isString(key)) {
      resolve(JSON.parse(storage.getItem(key)))
    } else {
      reject({ message: "key는 문자 타입 이어야 합니다." })
    }
  })
}

export const deleteSessionStorage = (key) => {
  return new Promise((resolve) => {
    !key ? storage.clear() : storage.removeItem(key)
    resolve()
  })
}
