import { useProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/products/ProductGrid";
import styles from "./Products.module.css";

export default function Products() {
  const { products, loading, error } = useProducts();

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.subtitle}>
            {!loading && `${products.length} items available`}
          </p>
        </div>

        {error ? (
          <div className={styles.error}>
            <p>Failed to load products. Please try again.</p>
          </div>
        ) : (
          <ProductGrid products={products} loading={loading} />
        )}
      </div>
    </div>
  );
}
