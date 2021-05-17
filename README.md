# kuanto-kusta-rest-api

### Funcionamento

1. Baixar o repositório:

~~~
git clone URL
~~~

2. Instalar as dependências do projeto:

~~~
yarn
~~~

3. Criar um arquivo .env com as variáveis de ambiente:

~~~
MS_PRODUCT="<<URL_MS_PRODUCT>>"
MS_CART="<<URL_MS_CART>>"
~~~

4. Configurar conexao com o banco de dados no arquivo ormconfig.json

5. Executar o script de migrations:

~~~
yarn typeorm migration:run 
~~~

6. Executar o projeto

~~~
yarn dev
~~~

### Rotas

**BASE_URL** = http://localhost:3000

## Cadastrar Usuário

~~~
POST <<BASE_URL>>/user
~~~

- Data

~~~
{
	"name": "Test",
	"email": "test@test.com",
	"password": "test"
}
~~~

- Retorno

~~~
{
  "userId": "12034aa5-b059-4f55-898a-b51b72330948",
  "name": "Test",
  "email": "test@test.com",
  "password": "$2a$10$4JZ/L4xNn3mafLIC6eAgc.x3H1b37wj1FePyj/iTOCD6kVH7EljKa"
}
~~~

## Login

~~~
POST <<BASE_URL>>/login
~~~

- Data

~~~
{
	"email": "test@test.com",
	"password": "test"
}
~~~

- Retorno

~~~
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjEyMDM0YWE1LWIwNTktNGY1NS04OThhLWI1MWI3MjMzMDk0OCIsIm5hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkNEpaL0w0eE5uM21hZkxJQzZlQWdjLngzSDFiMzd3ajFGZVB5ai9pVE9DRDZrVkg3RWxqS2EifSwiaWF0IjoxNjIxMjg0MDYxfQ.SjqKaNoTOfKSRltIfZxHYUlDoteRnYFPLE1aFdGHFwc"
}
~~~

## Listar Produtos

~~~
GET <<BASE_URL>>/product
~~~

- Header

~~~
Authorization: Bearer <<TOKEN_LOGIN>>
~~~

- Retorno

~~~
[
  {
    "productId": "60a2b6203a9f23001fd698a3",
    "price": 10
  },
  {
    "productId": "60a2b6203a9f23001fd698a4",
    "price": 20
  }
]
~~~

## Listar Carrinho

~~~
GET <<BASE_URL>>/cart
~~~

- Header

~~~
Authorization: Bearer <<TOKEN_LOGIN>>
~~~

- Retorno

~~~
{
  "shoppingCartId": 1,
  "userId": "0a168028-9aee-4c6c-84a0-f7a914560cf0",
  "totalPrice": 30,
  "totalQuantity": 3,
  "products": [
    {
      "productId": "60a2b6203a9f23001fd698a3",
      "quantity": 3,
      "price": 10
    }
  ]
}
~~~

## Adicionar Produto no Carrinho

~~~
POST <<BASE_URL>>/cart
~~~

- Header

~~~
Authorization: Bearer <<TOKEN_LOGIN>>
~~~

- Data

~~~
{
	"productId": <<ID_DO_PRODUTO>>
}
~~~

- Retorno
~~~
StatusCode: 200
~~~

## Remover Produto no Carrinho

~~~
DELETE <<BASE_URL>>/cart/<<ID_DO_PRODUTO>>
~~~

- Header

~~~
Authorization: Bearer <<TOKEN_LOGIN>>
~~~

- Retorno
~~~
StatusCode: 200
~~~
