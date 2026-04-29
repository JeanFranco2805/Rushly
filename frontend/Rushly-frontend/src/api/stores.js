import client from "./client";

export const storesApi = {
    getAll: (params = {}) =>
        client.get("/stores", { params }).then((r) => r.data),
    getById: (id) =>
        client.get(`/stores/${id}`).then((r) => r.data),
    getByCategory: (category) =>
        client.get("/stores", { params: { category } }).then((r) => r.data),
    getMyStores: () =>
        client.get("/stores/my").then((r) => r.data),
    create: (data) =>
        client.post("/stores/create", data).then((r) => r.data),
    update: (id, data) =>
        client.put(`/stores/${id}`, data).then((r) => r.data),
    delete: (id) =>
        client.delete(`/stores/${id}`).then((r) => r.data),
    toggleOpen: (id) =>
        client.patch(`/stores/${id}/toggle-open`).then((r) => r.data),
    addPaymentMethod: (id, data) =>
        client.post(`/stores/${id}/payment-methods`, data).then((r) => r.data),
    getPaymentMethods: (id) =>
        client.get(`/stores/${id}/payment-methods`).then((r) => r.data),
};