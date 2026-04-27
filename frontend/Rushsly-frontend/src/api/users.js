import client from "./client";

const PREFIX = "/users";

export const usersApi = {
  create: (payload) => client.post(`${PREFIX}/create`, payload).then((r) => r.data),

  findById: (id) => client.get(`${PREFIX}/find/${id}`).then((r) => r.data),

  update: (payload) => client.put(`${PREFIX}/update`, payload).then((r) => r.data),

  deleteById: (id) => client.delete(`${PREFIX}/delete/${id}`).then((r) => r.data),

  createAddress: (userId, payload) =>
    client.post(`${PREFIX}/createAddress/${userId}`, payload).then((r) => r.data),

  findAddressByUserId: (userId) =>
    client.get(`${PREFIX}/findAddressByUserId/${userId}`).then((r) => r.data),

  updateAddress: (payload) =>
    client.put(`${PREFIX}/updateAddress`, payload).then((r) => r.data),

  deleteAddress: (id) =>
    client.delete(`${PREFIX}/deleteAddress/${id}`).then((r) => r.data),
};
