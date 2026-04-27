import client from "./client";

const PREFIX = "/products";

export const productsApi = {
  getAll: () => client.get(`${PREFIX}/all`).then((r) => r.data),

  getById: (id) => client.get(`${PREFIX}/find/${id}`).then((r) => r.data),

  getByName: (name) =>
    client.get(`${PREFIX}/findByName/${name}`).then((r) => r.data),

  getByCategory: (category) =>
    client.get(`${PREFIX}/findByCategory/${category}`).then((r) => r.data),

  create: (payload) => client.post(`${PREFIX}/create`, payload).then((r) => r.data),

  update: (payload) => client.put(`${PREFIX}/update`, payload).then((r) => r.data),

  deleteById: (id) => client.delete(`${PREFIX}/delete?id=${id}`).then((r) => r.data),

  deleteAll: () => client.delete(`${PREFIX}/deleteAll`).then((r) => r.data),
};
