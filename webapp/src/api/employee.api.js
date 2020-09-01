import axios from 'axios';
import { BASE_URL } from '../constants/defaultValues';
export const USER_URL = `${BASE_URL}/users`;

export function getEmployees(paginate, search) {
  return axios.get(
    `${USER_URL}?page=${paginate.page}&pageSize=${paginate.pageSize}&orderBy=${paginate.orderBy}&order=${paginate.order}&search=${search}`
  );
}

export function createEmployee(user) {
  return axios.post(`${USER_URL}`, user);
}
