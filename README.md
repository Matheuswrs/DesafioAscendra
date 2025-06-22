# DesafioAscendra
## Youtube URL
`https://youtu.be/Kw0VKIqTsc8`
## Iniciando o Projeto

### Backend

1. Crie um arquivo `.env` na raiz do backend e copie o conteúdo do `.env.example` para ele.
2. No terminal, navegue até a pasta `backend` e execute os seguintes comandos:
```
   npm install
   composer install
   php artisan key:generate
   php artisan migrate --seed
   composer run dev
```

### Frontend

1. Crie o arquivo `.env` na pasta raiz do frontend e colar a variável que está no `.env.example` e por nela o valor da rota da api para o backend, por exemplo `VITE_API_URL=http://localhost:8000/api`, adicione o "/api" ao final da rota pois as rotas do backend estão vindo através da api
2. No terminal, navegue até a pasta `frontend` e execute os seguintes comandos:
```
    npm install
    npm run dev
```
3. Agora só acessar a rota gerada pelo VITE, podendo ser:
    `http://localhost:5173` ou `http://localhost:5174`
