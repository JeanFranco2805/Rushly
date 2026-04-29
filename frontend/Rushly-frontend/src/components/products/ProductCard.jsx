import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatters";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import Button from "@/components/ui/Button";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    openCart();
  };

  return (
    <Link to={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.imageUrl || PLACEHOLDER_IMAGE}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        <div className={styles.overlay}>
          <Button size="sm" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
        {product.brand && (
          <span className={styles.brandTag}>{product.brand}</span>
        )}
      </div>

      <div className={styles.body}>
        {product.category && (
          <span className={styles.category}>{product.category}</span>
        )}
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>{formatCurrency(product.price)}</p>
      </div>
    </Link>
  );
}
