import { Link } from "react-router-dom";
import { ROUTES } from "@/utils/constants";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.description}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to={ROUTES.HOME} className={styles.homeLink}>
          Return home
        </Link>
      </div>
    </div>
  );
}
