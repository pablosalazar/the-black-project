import axios from 'axios';
import { BASE_URL } from '../constants/defaultValues';
export const EMPLOYEE_URL = `${BASE_URL}/users`;

export function getEmployees(paginate, search) {
  return axios.get(
    `${EMPLOYEE_URL}?page=${paginate.page + 1}&pageSize=${
      paginate.pageSize
    }&orderBy=${paginate.orderBy}&order=${paginate.order}&search=${search}`
  );
}

export function getEmployeeById(id) {
  return axios.get(`${EMPLOYEE_URL}/${id}`);
}

export function createEmployee(user) {
  return axios.post(`${EMPLOYEE_URL}`, user);
}
