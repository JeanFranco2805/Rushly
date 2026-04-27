import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatters";
import { ROUTES } from "@/utils/constants";
import Button from "@/components/ui/Button";
import CartItemRow from "./CartItem";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { isOpen, closeCart, items, totalPrice, totalItems, clearCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={closeCart} />}
      <aside className={[styles.drawer, isOpen ? styles.open : ""].join(" ")} role="dialog" aria-label="Shopping cart">
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Cart</h2>
            {totalItems > 0 && (
              <span className={styles.count}>
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button className={styles.closeButton} onClick={closeCart} aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <EmptyCartIcon />
              <p className={styles.emptyTitle}>Your cart is empty</p>
              <p className={styles.emptyHint}>Add products to get started.</p>
              <Button variant="secondary" onClick={closeCart} size="sm">
                <Link to={ROUTES.PRODUCTS} onClick={closeCart}>Browse products</Link>
              </Button>
            </div>
          ) : (
            <ul className={styles.items}>
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summary}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalValue}>{formatCurrency(totalPrice)}</span>
            </div>

            <Link to={ROUTES.CART} onClick={closeCart}>
              <Button fullWidth>Checkout</Button>
            </Link>

            <button className={styles.clearButton} onClick={clearCart}>
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function EmptyCartIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-4)" }}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
