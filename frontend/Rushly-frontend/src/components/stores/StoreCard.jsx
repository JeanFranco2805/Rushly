import { Link } from "react-router-dom";
import { STORE_CATEGORIES } from "@/utils/constants";
import styles from "./StoreCard.module.css";

const PLACEHOLDER_BANNER = "https://placehold.co/600x200/181818/888580?text=Store";
const PLACEHOLDER_LOGO   = "https://placehold.co/80x80/222/888?text=Logo";

export default function StoreCard({ store }) {
    const categoryInfo = STORE_CATEGORIES.find((c) => c.value === store.category);

    return (
        <Link to={`/stores/${store.id}`} className={styles.card}>
            <div className={styles.banner}>
                <img
                    src={store.bannerUrl || PLACEHOLDER_BANNER}
                    alt={store.name}
                    className={styles.bannerImg}
                    onError={(e) => { e.target.src = PLACEHOLDER_BANNER; }}
                />
                <div className={styles.overlay} />
                <span className={store.isOpen ? styles.badgeOpen : styles.badgeClosed}>
                    {store.isOpen ? "Open" : "Closed"}
                </span>
            </div>

            <div className={styles.body}>
                <div className={styles.identity}>
                    <div className={styles.logoWrap}>
                        <img
                            src={store.logoUrl || PLACEHOLDER_LOGO}
                            alt={`${store.name} logo`}
                            className={styles.logo}
                            onError={(e) => { e.target.src = PLACEHOLDER_LOGO; }}
                        />
                    </div>
                    <div className={styles.nameGroup}>
                        <h3 className={styles.name}>{store.name}</h3>
                        {categoryInfo && (
                            <span className={styles.category}>{categoryInfo.label}</span>
                        )}
                    </div>
                </div>

                {store.description && (
                    <p className={styles.desc}>{store.description}</p>
                )}

                {store.city && (
                    <span className={styles.city}>
                        <PinIcon />
                        {store.city}
                    </span>
                )}
            </div>
        </Link>
    );
}

function PinIcon() {
    return (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}