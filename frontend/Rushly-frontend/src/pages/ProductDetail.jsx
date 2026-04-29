import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatters";
import { PLACEHOLDER_IMAGE, ROUTES } from "@/utils/constants";
import Button from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Loader";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addItem, openCart } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    openCart();
  };

  if (error) {
    return (
      <div className={styles.errorState}>
        <p>Product not found.</p>
        <Link to={ROUTES.PRODUCTS}>Back to products</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link to={ROUTES.PRODUCTS} className={styles.backLink}>
          <ChevronIcon /> Back to products
        </Link>

        <div className={styles.layout}>
          <div className={styles.imageSection}>
            {loading ? (
              <Skeleton height="480px" borderRadius="var(--radius-xl)" />
            ) : (
              <img
                src={product?.imageUrl || PLACEHOLDER_IMAGE}
                alt={product?.name}
                className={styles.image}
                onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
              />
            )}
          </div>

          <div className={styles.info}>
            {loading ? (
              <div className={styles.loadingInfo}>
                <Skeleton height="12px" width="40%" />
                <Skeleton height="36px" width="85%" />
                <Skeleton height="28px" width="30%" />
                <Skeleton height="80px" />
                <Skeleton height="52px" />
              </div>
            ) : (
              <>
                <div className={styles.meta}>
                  {product?.category && (
                    <span className={styles.category}>{product.category}</span>
                  )}
                  {product?.brand && (
                    <span className={styles.brand}>{product.brand}</span>
                  )}
                </div>

                <h1 className={styles.name}>{product?.name}</h1>
                <p className={styles.price}>{formatCurrency(product?.price)}</p>

                {product?.description && (
                  <p className={styles.description}>{product.description}</p>
                )}

                <div className={styles.actions}>
                  <Button size="lg" onClick={handleAddToCart} fullWidth>
                    Add to cart
                  </Button>
                </div>

                <div className={styles.details}>
                  <div className={styles.detailRow}>
                    <span>Product ID</span>
                    <span className={styles.detailMono}>{product?.id}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
