import client from "./client";

const PREFIX = "/stores";

export const storesApi = {
    create: (payload) =>
        client.post(`${PREFIX}/create`, payload).then((r) => r.data),

    update: (id, payload) =>
        client.put(`${PREFIX}/update/${id}`, payload).then((r) => r.data),

    findById: (id) =>
        client.get(`${PREFIX}/find/${id}`).then((r) => r.data),

    findAll: () =>
        client.get(`${PREFIX}/all`).then((r) => r.data),

    findAllActive: () =>
        client.get(`${PREFIX}/active`).then((r) => r.data),

    findByOwner: (ownerId) =>
        client.get(`${PREFIX}/owner/${ownerId}`).then((r) => r.data),

    findByCategory: (category) =>
        client.get(`${PREFIX}/category/${category}`).then((r) => r.data),

    deleteById: (id) =>
        client.delete(`${PREFIX}/delete/${id}`).then((r) => r.data),

    toggleOpen: (id) =>
        client.patch(`${PREFIX}/toggle/${id}`).then((r) => r.data),

    // Métodos de pago
    addPaymentMethod: (storeId, payload) =>
        client.post(`${PREFIX}/${storeId}/payment-methods`, payload).then((r) => r.data),

    getPaymentMethods: (storeId) =>
        client.get(`${PREFIX}/${storeId}/payment-methods`).then((r) => r.data),

    deletePaymentMethod: (id) =>
        client.delete(`${PREFIX}/payment-methods/${id}`).then((r) => r.data),

    deleteAllPaymentMethods: (storeId) =>
        client.delete(`${PREFIX}/${storeId}/payment-methods`).then((r) => r.data),
};