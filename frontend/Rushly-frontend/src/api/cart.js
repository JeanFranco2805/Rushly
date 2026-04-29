import client from "./client";

const PREFIX = "/carts";

export const cartApi = {
  findById: (id) => client.get(`${PREFIX}/findById?id=${id}`).then((r) => r.data),

  findAll: () => client.get(`${PREFIX}/findAll`).then((r) => r.data),

  save: (payload) => client.get(`${PREFIX}/save`, { params: payload }).then((r) => r.data),

  addItem: (payload) => client.post(`${PREFIX}/addItem`, payload).then((r) => r.data),

  deleteItem: (payload) =>
    client.post(`${PREFIX}/deleteItem`, payload).then((r) => r.data),

  updateCartItem: (payload) =>
    client.post(`${PREFIX}/updateCartItem`, payload).then((r) => r.data),

  deleteById: (id) =>
    client.get(`${PREFIX}/deleteById?id=${id}`).then((r) => r.data),

  deleteAll: () => client.get(`${PREFIX}/deleteAll`).then((r) => r.data),
};
