import { isString } from "./typeOf.js";

const { localStorage: storage } = window;

export const setLocalStorage = (key, value) => {
  return new Promise((resolve, reject) => {
    if (isString(key)) {
      storage.setItem(key, JSON.stringify(value));
      resolve();
    } else {
      reject({ message: "key는 문자 타입 이어야 합니다." });
    }
  });
};

export const getLocalStorage = (key) => {
  return new Promise((resolve, reject) => {
    if (isString(key)) {
      resolve(JSON.parse(storage.getItem(key)));
    } else {
      reject({ message: "key는 문자 타입 이어야 합니다." });
    }
  });
};

export const deleteLocalStorage = (key) => {
  return new Promise((resolve) => {
    !key ? storage.clear() : storage.removeItem(key);
    resolve();
  });
};
