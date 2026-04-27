import { useState, useEffect, useCallback } from "react";
import { ordersApi } from "@/api/orders";

export function useOrders(userId) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await ordersApi.findByUserId(userId);
      setOrders(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const placeOrder = useCallback(
    async (payload) => {
      await ordersApi.save(payload);
      await fetchOrders();
    },
    [fetchOrders]
  );

  const cancelOrder = useCallback(
    async (id) => {
      await ordersApi.updateStatus(id, "CANCELLED");
      await fetchOrders();
    },
    [fetchOrders]
  );

  return { orders, loading, error, placeOrder, cancelOrder, refetch: fetchOrders };
}
