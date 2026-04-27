import styles from "./Loader.module.css";

export function Loader({ size = "md", center = false }) {
  return (
    <div className={[styles.wrapper, center ? styles.center : ""].join(" ")}>
      <span className={[styles.spinner, styles[size]].join(" ")} />
    </div>
  );
}

export function Skeleton({ width, height, borderRadius, className = "" }) {
  return (
    <div
      className={[styles.skeleton, className].join(" ")}
      style={{
        width: width || "100%",
        height: height || "1rem",
        borderRadius: borderRadius || "var(--radius-sm)",
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton height="220px" borderRadius="var(--radius-lg)" />
      <div className={styles.cardSkeletonBody}>
        <Skeleton height="12px" width="60%" />
        <Skeleton height="18px" width="85%" />
        <Skeleton height="14px" width="40%" />
      </div>
    </div>
  );
}
