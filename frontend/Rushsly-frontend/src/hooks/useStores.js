import { useState, useEffect, useCallback } from "react";
import { storesApi } from "@/api/stores";

export function useStores() {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStores = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await storesApi.findAllActive();
            setStores(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
            setStores([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    return { stores, loading, error, refetch: fetchStores };
}

export function useStore(id) {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        storesApi
            .findById(id)
            .then(setStore)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    return { store, loading, error };
}

export function useMyStores(ownerId) {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMyStores = useCallback(async () => {
        if (!ownerId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await storesApi.findByOwner(ownerId);
            setStores(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
            setStores([]);
        } finally {
            setLoading(false);
        }
    }, [ownerId]);

    useEffect(() => {
        fetchMyStores();
    }, [fetchMyStores]);

    return { stores, loading, error, refetch: fetchMyStores };
}

export function useStoresByCategory(category) {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category) return;
        setLoading(true);
        setError(null);
        storesApi
            .findByCategory(category)
            .then((data) => setStores(Array.isArray(data) ? data : []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [category]);

    return { stores, loading, error };
}