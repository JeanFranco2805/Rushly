import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useMyStores } from "@/hooks/useStores";
import { useInventory } from "@/hooks/useProducts";
import { storesApi } from "@/api/stores";
import { productsApi } from "@/api/products";
import { STORE_CATEGORIES, PAYMENT_TYPES } from "@/utils/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Loader } from "@/components/ui/Loader";
import { Link } from "react-router-dom";
import styles from "./SellerDashboard.module.css";

export default function SellerDashboard() {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState("overview");

    if (!user) {
        return (
            <div className={styles.guestPage}>
                <div className={styles.guestCard}>
                    <StoreIcon size={40} />
                    <h2>Manage your store</h2>
                    <p>Sign in to create and manage your store, products and orders.</p>
                    <Link to="/profile" className={styles.signInBtn}>Sign in</Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarBrand}>Seller Hub</div>
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={[styles.sidebarItem, activeTab === tab.id ? styles.sidebarActive : ""].join(" ")}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className={styles.tabIcon}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                {activeTab === "overview"  && <OverviewTab user={user} setActiveTab={setActiveTab} />}
                {activeTab === "store"     && <StoreTab user={user} />}
                {activeTab === "products"  && <ProductsTab user={user} />}
                {activeTab === "inventory" && <InventoryTab user={user} />}
                {activeTab === "payments"  && <PaymentsTab user={user} />}
                {activeTab === "orders"    && <SellerOrdersTab />}
            </div>
        </div>
    );
}

const TABS = [
    { id: "overview",  label: "Overview",        icon: <OverviewIcon /> },
    { id: "store",     label: "My Store",         icon: <StoreIcon /> },
    { id: "products",  label: "Products",         icon: <BoxIcon /> },
    { id: "inventory", label: "Inventory",        icon: <LayersIcon /> },
    { id: "payments",  label: "Payment Methods",  icon: <CardIcon /> },
    { id: "orders",    label: "Orders",           icon: <OrdersIcon /> },
];

function OverviewTab({ user, setActiveTab }) {
    const { stores, loading } = useMyStores(user?.id);

    if (loading) return <Loader center />;

    const store = stores[0];

    return (
        <div className={styles.tab}>
            <div>
                <h1 className={styles.tabTitle}>Welcome back, {user.name?.split(" ")[0]}</h1>
                <p className={styles.tabSubtitle}>Here is a summary of your store activity.</p>
            </div>

            {!store ? (
                <div className={styles.noStore}>
                    <StoreIcon size={36} />
                    <h3>No store yet</h3>
                    <p>Create your store to start selling your products.</p>
                    <Button onClick={() => setActiveTab("store")}>Create store</Button>
                </div>
            ) : (
                <div className={styles.statsGrid}>
                    <StatCard label="Store status" value={store.isOpen ? "Open" : "Closed"} accent={store.isOpen} />
                    <StatCard label="Category" value={STORE_CATEGORIES.find((c) => c.value === store.category)?.label || "—"} />
                    <StatCard label="City" value={store.city || "—"} />
                    <StatCard label="Store ID" value={`#${store.id}`} mono />
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, accent, mono }) {
    return (
        <div className={styles.statCard}>
            <span className={styles.statLabel}>{label}</span>
            <span className={[styles.statValue, accent ? styles.accentValue : "", mono ? styles.monoValue : ""].join(" ")}>
                {value}
            </span>
        </div>
    );
}

function StoreTab({ user }) {
    const { stores, loading, refetch } = useMyStores(user?.id);
    const [mode, setMode] = useState("view");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const store = stores[0];

    const emptyForm = {
        name: "", description: "", logoUrl: "", bannerUrl: "",
        phone: "", email: "", address: "", city: "", country: "",
        category: "OTHER",
    };

    const [form, setForm] = useState(emptyForm);

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleCreate = async () => {
        if (!form.name.trim()) {
            setError("Store name is required.");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            await storesApi.create({ ...form, ownerId: user.id });
            await refetch();
            setMode("view");
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdate = async () => {
        if (!form.name.trim()) {
            setError("Store name is required.");
            return;
        }
        setSaving(true);
        setError(null);
        try {
            await storesApi.update(store.id, form);
            await refetch();
            setMode("view");
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async () => {
        await storesApi.toggleOpen(store.id);
        await refetch();
    };

    const startEdit = () => {
        if (store) {
            setForm({
                name: store.name || "", description: store.description || "",
                logoUrl: store.logoUrl || "", bannerUrl: store.bannerUrl || "",
                phone: store.phone || "", email: store.email || "",
                address: store.address || "", city: store.city || "",
                country: store.country || "", category: store.category || "OTHER",
            });
            setMode("edit");
        } else {
            setForm(emptyForm);
            setMode("create");
        }
        setError(null);
    };

    if (loading) return <Loader center />;

    return (
        <div className={styles.tab}>
            <div className={styles.tabHeader}>
                <div>
                    <h2 className={styles.tabTitle}>My Store</h2>
                    <p className={styles.tabSubtitle}>Manage your store settings and information.</p>
                </div>
                {store && mode === "view" && (
                    <div className={styles.headerActions}>
                        <Button variant="secondary" size="sm" onClick={handleToggle}>
                            {store.isOpen ? "Close store" : "Open store"}
                        </Button>
                        <Button size="sm" onClick={startEdit}>Edit store</Button>
                    </div>
                )}
            </div>

            {mode === "view" && !store && (
                <div className={styles.noStore}>
                    <StoreIcon size={36} />
                    <h3>No store yet</h3>
                    <p>Create your store to start selling.</p>
                    <Button onClick={startEdit}>Create store</Button>
                </div>
            )}

            {mode === "view" && store && (
                <div className={styles.storePreview}>
                    <div
                        className={styles.previewBanner}
                        style={{ backgroundImage: store.bannerUrl ? `url(${store.bannerUrl})` : undefined }}
                    />
                    <div className={styles.previewBody}>
                        <div className={styles.previewInfo}>
                            <h3 className={styles.previewName}>{store.name}</h3>
                            <span className={[styles.statusDot, store.isOpen ? styles.openDot : styles.closedDot].join(" ")}>
                                {store.isOpen ? "Open" : "Closed"}
                            </span>
                        </div>
                        {store.description && <p className={styles.previewDesc}>{store.description}</p>}
                        <div className={styles.previewMeta}>
                            {store.category && <span>{STORE_CATEGORIES.find(c => c.value === store.category)?.label}</span>}
                            {store.city && <span>{store.city}</span>}
                            {store.phone && <span>{store.phone}</span>}
                        </div>
                    </div>
                </div>
            )}

            {(mode === "create" || mode === "edit") && (
                <div className={styles.formSection}>
                    <h3 className={styles.formTitle}>{mode === "create" ? "Create your store" : "Edit store"}</h3>
                    <div className={styles.formGrid}>
                        <Input label="Store name *" value={form.name} onChange={set("name")} placeholder="My Store" />
                        <Input label="Email" type="email" value={form.email} onChange={set("email")} placeholder="store@email.com" />
                        <div className={styles.fullWidth}>
                            <label className={styles.fieldLabel}>Description</label>
                            <textarea
                                className={styles.textarea}
                                rows={3}
                                value={form.description}
                                onChange={set("description")}
                                placeholder="Tell customers about your store..."
                            />
                        </div>
                        <div>
                            <label className={styles.fieldLabel}>Category</label>
                            <select className={styles.select} value={form.category} onChange={set("category")}>
                                {STORE_CATEGORIES.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>
                        <Input label="Phone" value={form.phone} onChange={set("phone")} placeholder="+1 234 567 8900" />
                        <Input label="Logo URL" value={form.logoUrl} onChange={set("logoUrl")} placeholder="https://..." />
                        <Input label="Banner URL" value={form.bannerUrl} onChange={set("bannerUrl")} placeholder="https://..." />
                        <Input label="Address" value={form.address} onChange={set("address")} placeholder="123 Main St" />
                        <Input label="City" value={form.city} onChange={set("city")} placeholder="New York" />
                        <Input label="Country" value={form.country} onChange={set("country")} placeholder="United States" />
                    </div>
                    {error && <p className={styles.errorMsg}>{error}</p>}
                    <div className={styles.formActions}>
                        <Button loading={saving} onClick={mode === "create" ? handleCreate : handleUpdate}>
                            {mode === "create" ? "Create store" : "Save changes"}
                        </Button>
                        <Button variant="ghost" onClick={() => { setMode("view"); setError(null); }}>Cancel</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function ProductsTab({ user }) {
    const { stores } = useMyStores(user?.id);
    const store = stores[0];
    const { products, loading, refetch } = useInventory(store?.id);
    const [mode, setMode] = useState("list");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        name: "", description: "", price: "", imageUrl: "",
        brand: "", stock: "100", category: { name: "Other" },
    });

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    const handleCreate = async () => {
        if (!store) { setError("Create a store first."); return; }
        if (!form.name.trim() || !form.price) { setError("Name and price are required."); return; }
        setSaving(true);
        setError(null);
        try {
            await productsApi.create({
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                imageUrl: form.imageUrl,
                brand: form.brand,
                stock: parseInt(form.stock) || 100,
                category: { name: form.category?.name || "Other" },
                storeId: store.id,
            });
            await refetch();
            setMode("list");
            setForm({ name: "", description: "", price: "", imageUrl: "", brand: "", stock: "100", category: { name: "Other" } });
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this product?")) return;
        await productsApi.deleteById(id);
        await refetch();
    };

    const handleToggle = async (id) => {
        await productsApi.toggleActive(id);
        await refetch();
    };

    if (!store) return (
        <div className={styles.noStore}>
            <StoreIcon size={36} />
            <h3>Create a store first</h3>
        </div>
    );
    if (loading) return <Loader center />;

    return (
        <div className={styles.tab}>
            <div className={styles.tabHeader}>
                <div>
                    <h2 className={styles.tabTitle}>Products</h2>
                    <p className={styles.tabSubtitle}>{products.length} products in your store.</p>
                </div>
                {mode === "list" && (
                    <Button size="sm" onClick={() => setMode("create")}>+ Add product</Button>
                )}
            </div>

            {mode === "create" && (
                <div className={styles.formSection}>
                    <h3 className={styles.formTitle}>Add new product</h3>
                    <div className={styles.formGrid}>
                        <Input label="Product name *" value={form.name} onChange={set("name")} />
                        <Input label="Brand" value={form.brand} onChange={set("brand")} />
                        <Input label="Price *" type="number" value={form.price} onChange={set("price")} placeholder="0.00" />
                        <Input label="Stock quantity" type="number" value={form.stock} onChange={set("stock")} />
                        <Input label="Image URL" value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://..." />
                        <Input label="Category" value={form.category?.name || ""} onChange={(e) => setForm(f => ({ ...f, category: { name: e.target.value } }))} placeholder="Electronics, Clothing..." />
                        <div className={styles.fullWidth}>
                            <label className={styles.fieldLabel}>Description</label>
                            <textarea className={styles.textarea} rows={3} value={form.description} onChange={set("description")} />
                        </div>
                    </div>
                    {error && <p className={styles.errorMsg}>{error}</p>}
                    <div className={styles.formActions}>
                        <Button loading={saving} onClick={handleCreate}>Add product</Button>
                        <Button variant="ghost" onClick={() => { setMode("list"); setError(null); }}>Cancel</Button>
                    </div>
                </div>
            )}

            {mode === "list" && (
                <div className={styles.productTable}>
                    {products.length === 0 ? (
                        <div className={styles.emptyTable}>
                            <BoxIcon size={32} />
                            <p>No products yet. Add your first product.</p>
                        </div>
                    ) : (
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className={styles.productCell}>
                                            <img
                                                src={p.imageUrl}
                                                alt={p.name}
                                                className={styles.productThumb}
                                                onError={(e) => { e.target.src = "https://placehold.co/40x40/181818/888?text=?"; }}
                                            />
                                            <div>
                                                <span className={styles.productName}>{p.name}</span>
                                                <span className={styles.productBrand}>{p.brand}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={styles.priceCell}>${p.price?.toFixed(2)}</td>
                                    <td className={styles.stockCell}>{p.stock ?? "—"}</td>
                                    <td>
                                            <span className={[styles.activeBadge, p.active !== false ? styles.activeOn : styles.activeOff].join(" ")}>
                                                {p.active !== false ? "Active" : "Inactive"}
                                            </span>
                                    </td>
                                    <td>
                                        <div className={styles.rowActions}>
                                            <button className={styles.rowBtn} onClick={() => handleToggle(p.id)}>
                                                {p.active !== false ? "Deactivate" : "Activate"}
                                            </button>
                                            <button className={[styles.rowBtn, styles.rowBtnDanger].join(" ")} onClick={() => handleDelete(p.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

function InventoryTab({ user }) {
    const { stores } = useMyStores(user?.id);
    const store = stores[0];
    const { products, loading, refetch } = useInventory(store?.id);
    const [editingId, setEditingId] = useState(null);
    const [stockValue, setStockValue] = useState("");

    const handleSaveStock = async (id) => {
        await productsApi.updateStock(id, parseInt(stockValue));
        await refetch();
        setEditingId(null);
    };

    if (!store) return (
        <div className={styles.noStore}>
            <StoreIcon size={36} />
            <h3>Create a store first</h3>
        </div>
    );
    if (loading) return <Loader center />;

    const lowStock = products.filter((p) => (p.stock ?? 100) < 10);
    const outOfStock = products.filter((p) => (p.stock ?? 100) === 0);

    return (
        <div className={styles.tab}>
            <h2 className={styles.tabTitle}>Inventory</h2>
            <p className={styles.tabSubtitle}>Manage stock levels for your products.</p>

            <div className={styles.statsGrid}>
                <StatCard label="Total products" value={products.length.toString()} />
                <StatCard label="Low stock" value={lowStock.length.toString()} />
                <StatCard label="Out of stock" value={outOfStock.length.toString()} />
            </div>

            <div className={styles.productTable}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Product</th>
                        <th>Current stock</th>
                        <th>Status</th>
                        <th>Update stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p) => {
                        const stock = p.stock ?? 100;
                        return (
                            <tr key={p.id}>
                                <td>
                                    <div className={styles.productCell}>
                                        <img
                                            src={p.imageUrl}
                                            alt={p.name}
                                            className={styles.productThumb}
                                            onError={(e) => { e.target.src = "https://placehold.co/40x40/181818/888?text=?"; }}
                                        />
                                        <span className={styles.productName}>{p.name}</span>
                                    </div>
                                </td>
                                <td className={styles.stockCell}>
                                        <span className={[styles.stockNum, stock === 0 ? styles.stockOut : stock < 10 ? styles.stockLow : styles.stockOk].join(" ")}>
                                            {stock}
                                        </span>
                                </td>
                                <td>
                                        <span className={[styles.activeBadge, stock > 0 ? styles.activeOn : styles.activeOff].join(" ")}>
                                            {stock > 0 ? "In stock" : "Out of stock"}
                                        </span>
                                </td>
                                <td>
                                    {editingId === p.id ? (
                                        <div className={styles.stockEdit}>
                                            <input
                                                className={styles.stockInput}
                                                type="number"
                                                value={stockValue}
                                                onChange={(e) => setStockValue(e.target.value)}
                                                autoFocus
                                            />
                                            <button className={styles.saveBtn} onClick={() => handleSaveStock(p.id)}>Save</button>
                                            <button className={styles.cancelBtn} onClick={() => setEditingId(null)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <button className={styles.rowBtn} onClick={() => { setEditingId(p.id); setStockValue(String(stock)); }}>
                                            Update
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PaymentsTab({ user }) {
    const { stores } = useMyStores(user?.id);
    const store = stores[0];
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [adding, setAdding] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ type: "CREDIT_CARD", details: "", isDefault: false });

    useState(() => {
        if (store?.id) {
            storesApi.getPaymentMethods(store.id).then(setPaymentMethods).catch(() => {});
        }
    }, [store?.id]);

    const handleAdd = async () => {
        setSaving(true);
        try {
            await storesApi.addPaymentMethod(store.id, { ...form, storeId: store.id });
            const updated = await storesApi.getPaymentMethods(store.id);
            setPaymentMethods(updated);
            setAdding(false);
            setForm({ type: "CREDIT_CARD", details: "", isDefault: false });
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        await storesApi.deletePaymentMethod(id);
        setPaymentMethods((prev) => prev.filter((p) => p.id !== id));
    };

    if (!store) return (
        <div className={styles.noStore}>
            <StoreIcon size={36} />
            <h3>Create a store first</h3>
        </div>
    );

    return (
        <div className={styles.tab}>
            <div className={styles.tabHeader}>
                <div>
                    <h2 className={styles.tabTitle}>Payment Methods</h2>
                    <p className={styles.tabSubtitle}>Configure how customers can pay.</p>
                </div>
                {!adding && (
                    <Button size="sm" onClick={() => setAdding(true)}>+ Add method</Button>
                )}
            </div>

            {adding && (
                <div className={styles.formSection}>
                    <h3 className={styles.formTitle}>New payment method</h3>
                    <div className={styles.formGrid}>
                        <div>
                            <label className={styles.fieldLabel}>Payment type</label>
                            <select className={styles.select} value={form.type} onChange={(e) => setForm(f => ({ ...f, type: e.target.value }))}>
                                {PAYMENT_TYPES.map((pt) => (
                                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                                ))}
                            </select>
                        </div>
                        <Input
                            label="Details (optional)"
                            value={form.details}
                            onChange={(e) => setForm(f => ({ ...f, details: e.target.value }))}
                            placeholder="e.g. account name, last 4 digits"
                        />
                    </div>
                    <div className={styles.formActions}>
                        <Button loading={saving} onClick={handleAdd}>Add method</Button>
                        <Button variant="ghost" onClick={() => setAdding(false)}>Cancel</Button>
                    </div>
                </div>
            )}

            <div className={styles.paymentList}>
                {paymentMethods.length === 0 ? (
                    <div className={styles.emptyTable}>
                        <CardIcon size={32} />
                        <p>No payment methods configured yet.</p>
                    </div>
                ) : (
                    paymentMethods.map((pm) => (
                        <div key={pm.id} className={styles.paymentCard}>
                            <div className={styles.paymentInfo}>
                                <span className={styles.paymentType}>
                                    {PAYMENT_TYPES.find((p) => p.value === pm.type)?.label || pm.type}
                                </span>
                                {pm.details && <span className={styles.paymentDetails}>{pm.details}</span>}
                                {pm.isDefault && <span className={styles.defaultBadge}>Default</span>}
                            </div>
                            <button className={[styles.rowBtn, styles.rowBtnDanger].join(" ")} onClick={() => handleDelete(pm.id)}>
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

function SellerOrdersTab() {
    return (
        <div className={styles.tab}>
            <h2 className={styles.tabTitle}>Orders</h2>
            <p className={styles.tabSubtitle}>View and manage orders placed in your store.</p>
            <div className={styles.emptyTable}>
                <OrdersIcon size={32} />
                <p>Order management coming soon.</p>
            </div>
        </div>
    );
}

function OverviewIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
    );
}

function StoreIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

function BoxIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
    );
}

function LayersIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    );
}

function CardIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
    );
}

function OrdersIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
    );
}