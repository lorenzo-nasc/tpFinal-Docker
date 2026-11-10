# TP Final: Orquestração de Containers com Docker Compose

Projeto desenvolvido para a disciplina de **Arquitetura de Serviços em Nuvem** da UNISANTA, sob orientação do Prof. Andrews Egas.

## 👥 Integrantes
* **Lorenzo Norberto** (RA 242251)
* **Ahmad Malat** (RA 244551)

*(Nota: Lembre-se de ajustar os nomes se for entregar individualmente ou com outra dupla).*

## 💻 Sobre o Projeto
Este projeto demonstra, na prática, os conceitos de escalabilidade e observabilidade através da orquestração de múltiplos containers utilizando o Docker Compose. O ambiente simulado é composto por dois serviços que se comunicam:

1. **Front-end (`site`):** Servidor web estático construído a partir de uma imagem **Nginx** (Alpine). Ele serve uma página HTML estilizada que consome informações do back-end em tempo real.
2. **Back-end (`api`):** Uma API HTTP customizada desenvolvida em **Node.js** (versão 20). Ela expõe endpoints de informações e grava logs de acesso persistentes utilizando volumes do Docker.

## 📂 Estrutura do Repositório

```text
📦 tp-final-docker
 ┣ 📂 api                   # Código e configurações do Back-end
 ┃ ┣ 📜 Dockerfile          # Receita de construção da imagem Node.js
 ┃ ┗ 📜 server.js           # Lógica da API e geração de logs
 ┣ 📂 site                  # Código e configurações do Front-end
 ┃ ┣ 📜 Dockerfile          # Receita de construção da imagem Nginx
 ┃ ┗ 📜 index.html          # Interface do usuário (Página Web)
 ┗ 📜 docker-compose.yml    # Orquestrador geral dos serviços, redes e volumes
```

## 🚀 Como Executar Localmente

### Pré-requisitos
* Ter o [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado e em execução (Daemon ativo).
* Terminal (Command Prompt, PowerShell, Terminal do Mac/Linux) disponível.

### Passo a passo

1. Faça o clone deste repositório ou baixe os arquivos para a sua máquina.
2. Pelo terminal, navegue até a pasta raiz do projeto (onde está o arquivo `docker-compose.yml`).
3. Execute o comando abaixo para construir as imagens customizadas e iniciar os containers em segundo plano (detached mode):
   ```bash
   docker compose up -d --build
   ```
4. Verifique se os containers estão rodando com o comando:
   ```bash
   docker ps
   ```

### 🌐 Endpoints de Acesso
Com os containers rodando, abra o seu navegador e acesse as seguintes URLs:

* **Site Principal (Interface):** [http://localhost:8080](http://localhost:8080)
* **Painel da API:** [http://localhost:8081](http://localhost:8081)
* **Retorno de Dados em JSON:** [http://localhost:8081/api/info](http://localhost:8081/api/info)

## 📋 Como ver os Logs
Para visualizar os registros de acesso gerados pela API, você pode usar o comando do próprio compose no terminal:
```bash
docker compose logs api
```

## 🛑 Como Encerrar o Ambiente
Para parar a execução e remover os containers criados, mantendo sua máquina limpa, execute:
```bash
docker compose down
```