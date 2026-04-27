import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Rushly</span>
          <p className={styles.tagline}>Fast delivery for everything you need.</p>
        </div>

        <nav className={styles.links}>
          <Link to={ROUTES.PRODUCTS}>Products</Link>
          <Link to={ROUTES.ORDERS}>Orders</Link>
          <Link to={ROUTES.PROFILE}>Account</Link>
        </nav>

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Rushly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
