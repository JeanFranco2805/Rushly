import { useUser } from "@/context/UserContext";
import { useOrders } from "@/hooks/useOrders";
import OrderCard from "@/components/orders/OrderCard";
import { Loader } from "@/components/ui/Loader";
import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import styles from "./Orders.module.css";

export default function Orders() {
  const { user } = useUser();
  const { orders, loading, error, cancelOrder } = useOrders(user?.id);

  if (!user) {
    return (
      <div className={styles.guestState}>
        <h2 className={styles.guestTitle}>Sign in to view your orders</h2>
        <p className={styles.guestDesc}>
          Track and manage all your orders in one place.
        </p>
        <Link to={ROUTES.PROFILE} className={styles.signInLink}>
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Your orders</h1>
          {!loading && orders.length > 0 && (
            <p className={styles.count}>{orders.length} total</p>
          )}
        </div>

        {loading && <Loader center />}

        {error && (
          <div className={styles.errorState}>
            <p>Failed to load orders.</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No orders yet</h3>
            <p className={styles.emptyDesc}>
              When you place an order it will appear here.
            </p>
            <Link to={ROUTES.PRODUCTS} className={styles.shopLink}>
              Start shopping
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className={styles.grid}>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onCancel={cancelOrder} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
