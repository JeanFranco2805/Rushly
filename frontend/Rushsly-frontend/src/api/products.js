import client from "./client";

const PREFIX = "/products";

export const productsApi = {
    getAll: () => client.get(`${PREFIX}/all`).then((r) => r.data),

    getById: (id) => client.get(`${PREFIX}/find/${id}`).then((r) => r.data),

    getByName: (name) =>
        client.get(`${PREFIX}/findByName/${name}`).then((r) => r.data),

    getByCategory: (category) =>
        client.get(`${PREFIX}/findByCategory/${category}`).then((r) => r.data),

    // Por tienda
    getByStore: (storeId) =>
        client.get(`${PREFIX}/store/${storeId}`).then((r) => r.data),

    getActiveByStore: (storeId) =>
        client.get(`${PREFIX}/store/${storeId}/active`).then((r) => r.data),

    create: (payload) =>
        client.post(`${PREFIX}/create`, payload).then((r) => r.data),

    update: (payload) =>
        client.put(`${PREFIX}/update`, payload).then((r) => r.data),

    deleteById: (id) =>
        client.delete(`${PREFIX}/delete?id=${id}`).then((r) => r.data),

    deleteAll: () =>
        client.delete(`${PREFIX}/deleteAll`).then((r) => r.data),

    // Stock e inventario
    updateStock: (id, stock) =>
        client.patch(`${PREFIX}/${id}/stock`, null, { params: { stock } }).then((r) => r.data),

    decrementStock: (id, amount = 1) =>
        client.patch(`${PREFIX}/${id}/stock/decrement`, null, { params: { amount } }).then((r) => r.data),

    toggleActive: (id) =>
        client.patch(`${PREFIX}/${id}/toggle-active`).then((r) => r.data),

    getLowStock: (storeId, threshold = 10) =>
        client.get(`${PREFIX}/store/${storeId}/low-stock`, { params: { threshold } }).then((r) => r.data),
};