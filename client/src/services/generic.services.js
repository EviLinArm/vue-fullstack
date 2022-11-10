import axios from "axios";

const API_URL = 'https://api.smarthabr.ru/api/v1'

export const request = async ({url, method, data = {} }) => {
    const response = await axios[method](`${API_URL}/${url}`, data)
    return response.data;
}