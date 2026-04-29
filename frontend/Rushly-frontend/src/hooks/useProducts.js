import { useState, useEffect, useCallback } from "react";
import { productsApi } from "@/api/products";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productsApi.getAll();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return { products, loading, error, refetch: fetchAll };
}

export function useProduct(id) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        productsApi
            .getById(id)
            .then(setProduct)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    return { product, loading, error };
}

export function useProductsByCategory(category) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category) return;
        setLoading(true);
        setError(null);
        productsApi
            .getByCategory(category)
            .then(setProducts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [category]);

    return { products, loading, error };
}

/** Productos activos de una tienda (para la vista de clientes) */
export function useStoreProducts(storeId) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = useCallback(async () => {
        if (!storeId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await productsApi.getActiveByStore(storeId);
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [storeId]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { products, loading, error, refetch: fetch };
}

/** Todos los productos de una tienda (para el panel de vendedor) */
export function useInventory(storeId) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = useCallback(async () => {
        if (!storeId) return;
        setLoading(true);
        setError(null);
        try {
            const data = await productsApi.getByStore(storeId);
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [storeId]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return { products, loading, error, refetch: fetch };
}