import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatters";
import { PLACEHOLDER_IMAGE } from "@/utils/constants";
import styles from "./CartItem.module.css";

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <li className={styles.item}>
      <img
        src={item.imageUrl || PLACEHOLDER_IMAGE}
        alt={item.name}
        className={styles.image}
        onError={(e) => {
          e.target.src = PLACEHOLDER_IMAGE;
        }}
      />

      <div className={styles.info}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.unitPrice}>{formatCurrency(item.price)} each</p>

        <div className={styles.controls}>
          <button
            className={styles.qtyButton}
            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <MinusIcon />
          </button>
          <span className={styles.qty}>{item.quantity}</span>
          <button
            className={styles.qtyButton}
            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      <div className={styles.right}>
        <p className={styles.total}>{formatCurrency(item.price * item.quantity)}</p>
        <button
          className={styles.removeButton}
          onClick={() => removeItem(item.productId)}
          aria-label="Remove item"
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}

function MinusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
