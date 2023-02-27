

import jwtDecode from "jwt-decode";

export type JWTPayload = {
  id: number;
  email: string;
  name: string;
  access_level_id: number;
};

export function getLocalStorage() {

  let token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

  if (token) {
    let decode: JWTPayload = jwtDecode(token);

    let user = {
      id: decode.id,
      email: decode.email,
      name: decode.name,
      access_level_id: decode.access_level_id,
    };
    return user;
  } else {
    return null;
  }

}

export function clearLocalStorage() {
  localStorage.removeItem("token");
}
