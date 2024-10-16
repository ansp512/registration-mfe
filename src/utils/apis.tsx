import axios from "axios";
import { GetEventsResponse } from "./api-response";

const STATIC_HEADERS ={
    headers: {
        "content-type": "application/json",
    }
}

export const getAllEvents: ()=> Promise<GetEventsResponse | any> =() => {
    return axios
        .get<GetEventsResponse>(
            `http://localhost:8001/api/events/get_all_events`
        )
        .then(r => r)}


export const getAllUnregisteredEvents: (user_id : number)=> Promise<GetEventsResponse | any> =(user_id) => {
    return axios
        .get<GetEventsResponse>(
            `http://localhost:8001/api/events/getUnregisteredEvents/${user_id}`
        )
        .then(r => r)}

export const getAllRegisteredEvents: (user_id : number)=> Promise<GetEventsResponse | any> =(user_id) => {
    return axios
        .get<GetEventsResponse>(
            `http://localhost:8001/api/events/getEvents/${user_id}`
        )
        .then(r => r)}


export const unregisterFromEvent: (userId: number, eventId: number)=> Promise<any> =(userId, eventId) => {
    return axios
        .delete<any>(
            `http://localhost:8001/api/events/unregister/${userId}/${eventId}`
        )
        .then(r => r)}

export const registerForEvent: (payload : any)=> Promise<any> =(payload) => {
    return axios
        .post<any>(
            `http://localhost:8001/api/events/register_events`,
            payload,
            STATIC_HEADERS
        )
        .then(r => r)}