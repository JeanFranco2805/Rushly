import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { ordersApi } from "@/api/orders";
import { formatCurrency } from "@/utils/formatters";
import { ROUTES } from "@/utils/constants";
import Button from "@/components/ui/Button";
import CartItemRow from "@/components/cart/CartItem";
import styles from "./Cart.module.css";

export default function Cart() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!user) {
      navigate(ROUTES.PROFILE);
      return;
    }

    setPlacing(true);
    setError(null);

    try {
      await ordersApi.save({
        userId: user.id,
        totalAmount: totalItems,
        price: totalPrice,
        status: "PENDING",
        orderDate: new Date().toISOString(),
      });
      clearCart();
      navigate(ROUTES.ORDERS);
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className="container">
          <div className={styles.emptyState}>
            <EmptyIcon />
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyDesc}>
              Browse our products and add items to get started.
            </p>
            <Link to={ROUTES.PRODUCTS}>
              <Button>Browse products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Review your cart</h1>

        <div className={styles.layout}>
          <section className={styles.itemsSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
              <button
                className={styles.clearButton}
                onClick={clearCart}
              >
                Remove all
              </button>
            </div>

            <ul className={styles.itemsList}>
              {items.map((item) => (
                <CartItemRow key={item.productId} item={item} />
              ))}
            </ul>
          </section>

          <aside className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order summary</h2>

            <div className={styles.summaryRows}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Delivery</span>
                <span className={styles.freeLabel}>Free</span>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span className={styles.totalValue}>{formatCurrency(totalPrice)}</span>
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <Button
              fullWidth
              size="lg"
              onClick={handleCheckout}
              loading={placing}
            >
              {user ? "Place order" : "Sign in to checkout"}
            </Button>

            <Link to={ROUTES.PRODUCTS} className={styles.continueLink}>
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

function EmptyIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--color-text-muted)", marginBottom: "var(--space-6)" }}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
