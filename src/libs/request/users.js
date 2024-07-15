import axios from "axios";

export const getUsers = async () => {
  const req = await axios.get("http://localhost:3000/api/admin");
  return req.data;
};

export const getUserById = async (id) => {
  const req = await axios.get(`http://localhost:3000/api/admin/${id}`);
  return req.data;
};

export const saveUser = async (data) => {
  const req = await axios.post(`http://localhost:3000/api/register`, data);
  return req.data;
};

export const updateUserById = async (id, data) => {
  const req = await axios.put(`http://localhost:3000/api/admin/${id}`, data);
  return req.data;
};

export const deleteUsers = async (id) => {
  const req = await axios.delete(`http://localhost:3000/api/admin/${id}`);
  return req.data;
};
