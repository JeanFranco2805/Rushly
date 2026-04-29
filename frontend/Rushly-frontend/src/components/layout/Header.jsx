import { Link, NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { ROUTES } from "@/utils/constants";
import styles from "./Header.module.css";

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const { user, logout } = useUser();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to={ROUTES.HOME} className={styles.brand}>
          <span className={styles.brandMark} />
          Rushly
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to={ROUTES.PRODUCTS}
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : ""].join(" ")
            }
          >
            Products
          </NavLink>
          {user && (
            <NavLink
              to={ROUTES.ORDERS}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.active : ""].join(" ")
              }
            >
              Orders
            </NavLink>
          )}
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.cartButton}
            onClick={toggleCart}
            aria-label={`Open cart, ${totalItems} items`}
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems > 99 ? "99+" : totalItems}</span>
            )}
          </button>

          {user ? (
            <div className={styles.userMenu}>
              <Link to={ROUTES.PROFILE} className={styles.avatar}>
                {user.name?.[0]?.toUpperCase() || "U"}
              </Link>
              <button onClick={logout} className={styles.logoutButton}>
                Sign out
              </button>
            </div>
          ) : (
            <Link to={ROUTES.PROFILE} className={styles.signIn}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
