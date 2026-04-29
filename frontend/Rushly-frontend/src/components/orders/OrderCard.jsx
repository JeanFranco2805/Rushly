import { formatCurrency, formatDateTime, getOrderStatusColor } from "@/utils/formatters";
import { ORDER_STATUS_LABELS } from "@/utils/constants";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import styles from "./OrderCard.module.css";

export default function OrderCard({ order, onCancel }) {
  const statusColor = getOrderStatusColor(order.status);
  const canCancel = order.status === "PENDING" || order.status === "PROCESSING";

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.orderId}>Order #{order.id}</p>
          <p className={styles.date}>{formatDateTime(order.orderDate)}</p>
        </div>
        <Badge variant={statusColor}>
          {ORDER_STATUS_LABELS[order.status?.toUpperCase()] || order.status}
        </Badge>
      </div>

      <div className={styles.body}>
        <div className={styles.row}>
          <span className={styles.label}>Total amount</span>
          <span className={styles.value}>{order.totalAmount} items</span>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Order total</span>
          <span className={styles.priceValue}>{formatCurrency(order.price)}</span>
        </div>
      </div>

      {canCancel && (
        <div className={styles.footer}>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCancel?.(order.id)}
          >
            Cancel order
          </Button>
        </div>
      )}
    </article>
  );
}
