import client from "./client";

const PREFIX = "/order";

export const ordersApi = {
  save: (payload) => client.post(`${PREFIX}/save`, payload).then((r) => r.data),

  findById: (id) => client.get(`${PREFIX}/findById/${id}`).then((r) => r.data),

  findByUserId: (userId) =>
    client.get(`${PREFIX}/findByUserId/${userId}`).then((r) => r.data),

  updateStatus: (id, status) =>
    client.put(`${PREFIX}/updateStatus/${id}?status=${status}`).then((r) => r.data),

  deleteById: (id) => client.delete(`${PREFIX}/deleteById/${id}`).then((r) => r.data),

  deleteByUserId: (userId) =>
    client.delete(`${PREFIX}/deleteByUserId/${userId}`).then((r) => r.data),

  saveOrderItem: (payload) =>
    client.post(`${PREFIX}/saveOrderItem`, payload).then((r) => r.data),

  findAllOrderItems: () =>
    client.get(`${PREFIX}/findAllOrderItems`).then((r) => r.data),

  deleteOrderItem: (id) =>
    client.delete(`${PREFIX}/deleteOrderItem/${id}`).then((r) => r.data),
};
