# Estágio de Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./
RUN npm ci

# Copia o restante dos arquivos e faz o build
COPY . .
RUN npm run build

# Estágio de Produção com Nginx
FROM nginx:alpine

# Configuração customizada com suporte a SPA e porta 80
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados no build do Vite
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
