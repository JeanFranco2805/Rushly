FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY . .

# Create missing CSS file directly (ensures it exists regardless of local disk)
RUN mkdir -p src/components/stores && cat > src/components/stores/StoreCard.module.css << 'CSS'
.card{display:flex;flex-direction:column;border-radius:14px;overflow:hidden;background:#1a1a1a;text-decoration:none;color:inherit;box-shadow:0 2px 12px rgba(0,0,0,.3);transition:transform .2s ease,box-shadow .2s ease}
.card:hover{transform:translateY(-4px);box-shadow:0 8px 28px rgba(0,0,0,.45)}
.banner{position:relative;width:100%;height:130px;overflow:hidden;background:#111}
.bannerImg{width:100%;height:100%;object-fit:cover;display:block}
.overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.55) 100%)}
.badgeOpen,.badgeClosed{position:absolute;top:10px;right:10px;font-size:.68rem;font-weight:700;padding:3px 9px;border-radius:20px;text-transform:uppercase}
.badgeOpen{background:#22c55e;color:#fff}
.badgeClosed{background:#ef4444;color:#fff}
.body{padding:14px 16px 16px;display:flex;flex-direction:column;gap:8px}
.identity{display:flex;align-items:center;gap:12px}
.logoWrap{flex-shrink:0;width:44px;height:44px;border-radius:10px;overflow:hidden;border:2px solid #2a2a2a;background:#222}
.logo{width:100%;height:100%;object-fit:cover;display:block}
.nameGroup{display:flex;flex-direction:column;gap:2px;min-width:0}
.name{margin:0;font-size:.95rem;font-weight:700;color:#f0f0f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.category{font-size:.73rem;color:#888}
.desc{margin:0;font-size:.8rem;color:#777;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.4}
.city{display:inline-flex;align-items:center;gap:4px;font-size:.75rem;color:#666}
CSS

# Also ensure stores.js exists in src/api/
RUN mkdir -p src/api && [ -f src/api/stores.js ] || cat > src/api/stores.js << 'JS'
import client from "./client";
export const storesApi = {
  getAll:(p={})=>client.get("/stores",{params:p}).then(r=>r.data),
  getById:(id)=>client.get(`/stores/${id}`).then(r=>r.data),
  getByCategory:(cat)=>client.get("/stores",{params:{category:cat}}).then(r=>r.data),
  getMyStores:()=>client.get("/stores/my").then(r=>r.data),
  create:(data)=>client.post("/stores/create",data).then(r=>r.data),
  update:(id,data)=>client.put(`/stores/${id}`,data).then(r=>r.data),
  delete:(id)=>client.delete(`/stores/${id}`).then(r=>r.data),
  toggleOpen:(id)=>client.patch(`/stores/${id}/toggle-open`).then(r=>r.data),
  addPaymentMethod:(id,data)=>client.post(`/stores/${id}/payment-methods`,data).then(r=>r.data),
  getPaymentMethods:(id)=>client.get(`/stores/${id}/payment-methods`).then(r=>r.data),
};
JS

RUN npm pkg set scripts.build="vite build"
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]