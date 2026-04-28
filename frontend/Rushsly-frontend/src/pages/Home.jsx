import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStores, useStoresByCategory } from "@/hooks/useStores";
import { STORE_CATEGORIES, ROUTES } from "@/utils/constants";
import { Skeleton } from "@/components/ui/Loader";
import StoreCard from "@/components/stores/StoreCard";
import styles from "./Home.module.css";

export default function Home() {
    const [activeCategory, setActiveCategory] = useState(null);
    const navigate = useNavigate();

    const { stores: allStores, loading: allLoading } = useStores();
    const { stores: catStores, loading: catLoading } = useStoresByCategory(activeCategory);

    const displayStores = activeCategory ? catStores : allStores;
    const loading = activeCategory ? catLoading : allLoading;

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.heroBadge}>
                        <span className={styles.heroBadgeDot} />
                        Local marketplace
                    </div>
                    <h1 className={styles.heroTitle}>
                        Every local store,<br />
                        <em>one platform.</em>
                    </h1>
                    <p className={styles.heroDesc}>
                        Browse hundreds of local shops, compare prices and get
                        everything delivered to your door.
                    </p>
                    <div className={styles.heroSearch}>
                        <SearchIcon />
                        <input
                            className={styles.heroInput}
                            placeholder="Search stores, products, categories..."
                            onFocus={() => navigate(ROUTES.STORES)}
                            readOnly
                        />
                        <button className={styles.heroBtn} onClick={() => navigate(ROUTES.STORES)}>
                            Explore
                        </button>
                    </div>
                    <div className={styles.heroStats}>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>{allStores.length}+</span>
                            <span className={styles.statLabel}>Active stores</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>24h</span>
                            <span className={styles.statLabel}>Fast delivery</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>Free</span>
                            <span className={styles.statLabel}>Returns</span>
                        </div>
                    </div>
                </div>
                <div className={styles.heroDecor}>
                    <div className={styles.decorRing1} />
                    <div className={styles.decorRing2} />
                    <div className={styles.decorGrid} />
                </div>
            </section>

            {/* Category pills */}
            <section className={styles.categoriesSection}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Browse by category</h2>
                    <div className={styles.categories}>
                        <button
                            className={[styles.catPill, !activeCategory ? styles.catActive : ""].join(" ")}
                            onClick={() => setActiveCategory(null)}
                        >
                            <span className={styles.catEmoji}>🏪</span>
                            All stores
                        </button>
                        {STORE_CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                className={[styles.catPill, activeCategory === cat.value ? styles.catActive : ""].join(" ")}
                                onClick={() => setActiveCategory(activeCategory === cat.value ? null : cat.value)}
                            >
                                <span className={styles.catEmoji}>{cat.emoji}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stores grid */}
            <section className={styles.storesSection}>
                <div className="container">
                    <div className={styles.storesHeader}>
                        <h2 className={styles.sectionTitle}>
                            {activeCategory
                                ? STORE_CATEGORIES.find((c) => c.value === activeCategory)?.label
                                : "All stores"}
                        </h2>
                        <span className={styles.storeCount}>
              {!loading && `${displayStores.length} stores`}
            </span>
                    </div>

                    {loading ? (
                        <div className={styles.grid}>
                            {Array.from({ length: 6 }, (_, i) => <StoreCardSkeleton key={i} />)}
                        </div>
                    ) : displayStores.length === 0 ? (
                        <div className={styles.empty}>
                            <p className={styles.emptyTitle}>No stores in this category yet.</p>
                            <Link to={ROUTES.SELLER_STORE} className={styles.openStoreBtn}>
                                Be the first — open your store
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {displayStores.map((store) => (
                                <StoreCard key={store.id} store={store} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Sell CTA */}
            <section className={styles.sellerCta}>
                <div className="container">
                    <div className={styles.ctaCard}>
                        <div className={styles.ctaContent}>
                            <h2 className={styles.ctaTitle}>Grow your business with Rushly</h2>
                            <p className={styles.ctaDesc}>
                                Join thousands of sellers. Set up your store in minutes, manage inventory,
                                and reach customers in your city.
                            </p>
                            <Link to={ROUTES.SELLER_STORE} className={styles.ctaBtn}>
                                Open your store →
                            </Link>
                        </div>
                        <div className={styles.ctaIllustration}>
                            <div className={styles.ctaShape1} />
                            <div className={styles.ctaShape2} />
                            <span className={styles.ctaEmoji}>🏪</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function StoreCardSkeleton() {
    return (
        <div className={styles.skeletonCard}>
            <Skeleton height="140px" borderRadius="var(--radius-lg)" />
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Skeleton height="12px" width="40%" />
                <Skeleton height="20px" width="70%" />
                <Skeleton height="12px" width="55%" />
            </div>
        </div>
    );
}

function SearchIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
    );
}