import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/tasks";

export const addNewTask = (task, completed) => {
    return axios.post(`${REST_API_BASE_URL}`, {
      task, completed
    });
  };

export const fetchAllTask = () => {
  return axios.get(`${REST_API_BASE_URL}`)
}

export const deleteTask = (id) => {
  return axios.delete(`${REST_API_BASE_URL}`, {id})
}
  