# Usar uma imgem do Node.js
FROM node:18-alpine

#Criar e definir diretorio
WORKDIR /app

# Copiar arquivo de dependência
COPY package.json yarn.lock ./

# Instalar dependencias
RUN yarn install

# Copiar o restante
COPY . .

# Construir a aplicação
RUN yarn build

# Servir a aplicação usando uma imagem do servidor HTTP (como o nginx)
FROM nginx:1.25-alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expor a porta 80 para o host
EXPOSE 80

# Comando para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]