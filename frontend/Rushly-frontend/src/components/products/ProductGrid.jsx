import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Loader";
import { PRODUCT_CATEGORIES } from "@/utils/constants";
import styles from "./ProductGrid.module.css";

export default function ProductGrid({ products, loading }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const categories = ["All", ...PRODUCT_CATEGORIES];

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "name") result.sort((a, b) => a.name?.localeCompare(b.name));

    return result;
  }, [products, activeCategory, search, sortBy]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <SearchIcon />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      <div className={styles.categories}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={[
              styles.categoryChip,
              activeCategory === cat ? styles.active : "",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {!loading && filtered.length > 0 && (
        <p className={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>
      )}

      <div className={styles.grid}>
        {loading
          ? Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)
          : filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {!loading && filtered.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No products found</p>
          <p className={styles.emptyHint}>Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}
