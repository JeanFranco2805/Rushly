import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/utils/constants";
import styles from "./Home.module.css";

export default function Home() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Fast delivery, every time</p>
          <h1 className={styles.heroTitle}>
            Everything you need,
            <br />
            <em>delivered fast.</em>
          </h1>
          <p className={styles.heroDescription}>
            Thousands of products from top brands. Order now and receive same-day
            or next-day delivery.
          </p>
          <div className={styles.heroActions}>
            <Link to={ROUTES.PRODUCTS}>
              <Button size="lg">Shop now</Button>
            </Link>
            <Link to={ROUTES.ORDERS}>
              <Button size="lg" variant="secondary">Track orders</Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroDecoration}>
          <div className={styles.decorCircle} />
          <div className={styles.decorDot} />
          <div className={styles.decorLine} />
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured products</h2>
            <Link to={ROUTES.PRODUCTS} className={styles.sectionLink}>
              View all
            </Link>
          </div>

          <div className={styles.productGrid}>
            {loading
              ? Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)
              : featured.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    title: "Same-day delivery",
    desc: "Order before 2pm and receive your items the same day.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Free returns",
    desc: "Not satisfied? Return any item within 30 days, no questions asked.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Secure payments",
    desc: "All transactions are encrypted and processed securely.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "24/7 support",
    desc: "Our team is available around the clock to help you.",
  },
];
