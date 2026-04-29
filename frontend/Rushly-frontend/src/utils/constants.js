export const ROUTES = {
    HOME: "/",
    STORES: "/stores",
    STORE_DETAIL: "/stores/:id",
    PRODUCTS: "/products",
    PRODUCT_DETAIL: "/products/:id",
    CART: "/cart",
    ORDERS: "/orders",
    PROFILE: "/profile",
    SELLER: "/seller",
};

export const ORDER_STATUS = {
    PENDING: "PENDING",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
};

export const ORDER_STATUS_LABELS = {
    PENDING: "Pendiente",
    PROCESSING: "En proceso",
    SHIPPED: "Enviado",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
};

export const STORE_CATEGORIES = [
    { value: "FOOD_AND_BEVERAGES",      label: "Comida y Bebidas",       emoji: "🍔" },
    { value: "ELECTRONICS",             label: "Electrónica",            emoji: "📱" },
    { value: "CLOTHING_AND_FASHION",    label: "Ropa y Moda",            emoji: "👗" },
    { value: "HEALTH_AND_BEAUTY",       label: "Salud y Belleza",        emoji: "💄" },
    { value: "HOME_AND_GARDEN",         label: "Hogar y Jardín",         emoji: "🏡" },
    { value: "SPORTS_AND_OUTDOORS",     label: "Deportes",               emoji: "⚽" },
    { value: "BOOKS_AND_STATIONERY",    label: "Libros y Papelería",     emoji: "📚" },
    { value: "TOYS_AND_GAMES",          label: "Juguetes y Juegos",      emoji: "🧸" },
    { value: "AUTOMOTIVE",              label: "Automotriz",             emoji: "🚗" },
    { value: "PET_SUPPLIES",            label: "Mascotas",               emoji: "🐾" },
    { value: "GROCERY",                 label: "Supermercado",           emoji: "🛒" },
    { value: "PHARMACY",                label: "Farmacia",               emoji: "💊" },
    { value: "JEWELRY_AND_ACCESSORIES", label: "Joyería y Accesorios",   emoji: "💍" },
    { value: "ARTS_AND_CRAFTS",         label: "Arte y Manualidades",    emoji: "🎨" },
    { value: "OTHER",                   label: "Otros",                  emoji: "📦" },
];

export const PAYMENT_TYPES = [
    { value: "CREDIT_CARD",       label: "Tarjeta de crédito" },
    { value: "DEBIT_CARD",        label: "Tarjeta débito" },
    { value: "BANK_TRANSFER",     label: "Transferencia bancaria" },
    { value: "PAYPAL",            label: "PayPal" },
    { value: "STRIPE",            label: "Stripe" },
    { value: "CASH_ON_DELIVERY",  label: "Pago contra entrega" },
    { value: "CRYPTO",            label: "Criptomonedas" },
];

export const PRODUCT_CATEGORIES = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Kitchen",
    "Sports",
    "Toys",
    "Beauty",
    "Automotive",
];

export const ITEMS_PER_PAGE = 12;

export const PLACEHOLDER_IMAGE  = "https://placehold.co/400x400/181818/888580?text=Sin+imagen";
export const PLACEHOLDER_BANNER = "https://placehold.co/600x200/181818/888580?text=Banner";
export const PLACEHOLDER_LOGO   = "https://placehold.co/80x80/222222/888580?text=Logo";