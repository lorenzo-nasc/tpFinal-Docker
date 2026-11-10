# Imagem base oficial do Node.js (alpine, mais leve)
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o código da API
COPY server.js ./

# Variável de ambiente com a porta interna
ENV APP_PORT=3000

# Documenta a porta usada pela API
EXPOSE 3000

# Comando executado quando o container inicia
CMD ["node", "server.js"]
