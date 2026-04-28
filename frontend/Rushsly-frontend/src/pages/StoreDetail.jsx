import { useParams, Link } from "react-router-dom";
import { useStore } from "@/hooks/useStores";
import { useStoreProducts } from "@/hooks/useProducts";
import { STORE_CATEGORIES, PLACEHOLDER_STORE, PLACEHOLDER_LOGO, ROUTES } from "@/utils/constants";
import ProductCard from "@/components/products/ProductCard";
import { ProductCardSkeleton, Skeleton } from "@/components/ui/Loader";
import styles from "./StoreDetail.module.css";

export default function StoreDetail() {
    const { id } = useParams();
    const { store, loading: storeLoading, error } = useStore(id);
    const { products, loading: productsLoading } = useStoreProducts(id);

    const categoryInfo = store ? STORE_CATEGORIES.find((c) => c.value === store.category) : null;

    if (error) {
        return (
            <div className={styles.errorPage}>
                <p>Store not found.</p>
                <Link to={ROUTES.HOME}>Back to home</Link>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Store banner */}
            <div className={styles.banner}>
                {storeLoading ? (
                    <Skeleton height="220px" />
                ) : (
                    <img
                        src={store?.bannerUrl || PLACEHOLDER_STORE}
                        alt={store?.name}
                        className={styles.bannerImg}
                    />
                )}
                <div className={styles.bannerOverlay} />
            </div>

            <div className="container">
                <div className={styles.storeHeader}>
                    <div className={styles.logoBox}>
                        {storeLoading ? (
                            <Skeleton width="80px" height="80px" borderRadius="var(--radius-lg)" />
                        ) : (
                            <img
                                src={store?.logoUrl || PLACEHOLDER_LOGO}
                                alt={`${store?.name} logo`}
                                className={styles.logo}
                            />
                        )}
                    </div>

                    <div className={styles.storeInfo}>
                        {storeLoading ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <Skeleton height="12px" width="120px" />
                                <Skeleton height="28px" width="200px" />
                                <Skeleton height="12px" width="160px" />
                            </div>
                        ) : (
                            <>
                                {categoryInfo && (
                                    <span className={styles.catBadge}>
                    {categoryInfo.emoji} {categoryInfo.label}
                  </span>
                                )}
                                <h1 className={styles.storeName}>{store?.name}</h1>
                                {store?.description && (
                                    <p className={styles.storeDesc}>{store.description}</p>
                                )}
                                <div className={styles.storeMeta}>
                                    {store?.city && (
                                        <span className={styles.metaItem}><PinIcon /> {store.city}</span>
                                    )}
                                    {store?.phone && (
                                        <span className={styles.metaItem}><PhoneIcon /> {store.phone}</span>
                                    )}
                                    <span className={[styles.statusBadge, store?.isOpen ? styles.open : styles.closed].join(" ")}>
                    {store?.isOpen ? "● Open now" : "● Closed"}
                  </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Products */}
                <div className={styles.productsSection}>
                    <div className={styles.productsSectionHeader}>
                        <h2 className={styles.productsTitle}>Products</h2>
                        <span className={styles.productCount}>
              {!productsLoading && `${products.length} items`}
            </span>
                    </div>

                    {productsLoading ? (
                        <div className={styles.productsGrid}>
                            {Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)}
                        </div>
                    ) : products.length === 0 ? (
                        <div className={styles.emptyProducts}>
                            <p>This store has no products yet.</p>
                        </div>
                    ) : (
                        <div className={styles.productsGrid}>
                            {products.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function PinIcon() {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function PhoneIcon() {
    return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.62 4.38 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.82-.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 17z"/></svg>;
}