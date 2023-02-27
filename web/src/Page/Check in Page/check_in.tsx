import React from "react";
import { fetchServerDataNonGet } from "../../../utilis/fetchDataUtilis";
export async function CheckInOut(InOrOut: any, userID: any) {
  let result = await fetchServerDataNonGet("/checkin" + `/${InOrOut}`, "POST", { userID })

}
