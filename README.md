# Merenda (server)

<p align="center">
  <img alt="Contador de linguagens" src="https://img.shields.io/github/languages/count/ifpeopensource/merenda-server?color=%2304D361">

  <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/ifpeopensource/merenda-server">

  <a href="https://ifpeopensource.com.br">
    <img src="https://img.shields.io/badge/IFPE Open Source-0a0a0a?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTUgMjUyIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzJmOWU0MTt9LmNscy0ye2ZpbGw6I2M4MTkxZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkJyYW5kIElGUEUgT3BlbiBTb3VyY2U8L3RpdGxlPjxnIGlkPSJMb2dvbWFyayI+PGcgaWQ9IkxvZ29tYXJrLTIiIGRhdGEtbmFtZT0iTG9nb21hcmsiPjxyZWN0IGNsYXNzPSJjbHMtMSIgeD0iMTQyLjMiIHk9IjEwLjUyIiB3aWR0aD0iMTA3LjIiIGhlaWdodD0iMTA3LjIiIHJ4PSI5Ii8+PHJlY3QgY2xhc3M9ImNscy0xIiB4PSIxNDIuMyIgeT0iMTM5LjE2IiB3aWR0aD0iMTA3LjIiIGhlaWdodD0iMTA3LjIiIHJ4PSI5Ii8+PHJlY3QgY2xhc3M9ImNscy0xIiB4PSIxMy42NiIgeT0iMTM5LjE2IiB3aWR0aD0iMTA3LjIiIGhlaWdodD0iMTA3LjIiIHJ4PSI5Ii8+PGcgaWQ9Ik9wZW5fU291cmNlX1N5bWJvbCIgZGF0YS1uYW1lPSJPcGVuIFNvdXJjZSBTeW1ib2wiPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTY2LjczLDUuNjRBNjAuODUsNjAuODUsMCwwLDAsNDQuOSwxMjMuM2EzLjc0LDMuNzQsMCwwLDAsMy0uMTMsMy44NSwzLjg1LDAsMCwwLDItMi4yOUw2MS4zMSw4NC40MkEzLjgxLDMuODEsMCwwLDAsNTkuNTIsODAsMTUuMjMsMTUuMjMsMCwxLDEsNzQsODBhMy44LDMuOCwwLDAsMC0xLjc5LDQuNDdsMTEuNDIsMzYuNDZhMy44NCwzLjg0LDAsMCwwLDIsMi4zLDMuOTEsMy45MSwwLDAsMCwxLjY2LjM4LDQsNCwwLDAsMCwxLjM2LS4yNUE2MC44NSw2MC44NSwwLDAsMCw2Ni43Myw1LjY0WiIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="></img>
  </a>

  <a href="https://github.com/ifpeopensource/merenda-server/commits/main">
    <img alt="Último commit" src="https://img.shields.io/github/last-commit/ifpeopensource/merenda-server">
  </a>

  <a href="https://github.com/ifpeopensource/merenda-server/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/ifpeopensource/merenda-server">
  </a>
  <a href="https://github.com/ifpeopensource/merenda-server/blob/main/LICENSE" target="_blank">
    <img alt="License" src="https://img.shields.io/badge/licença-MIT-brightgreen"/>
  </a>
</p>

Servidor da aplicação de entrega da merenda escolar do IFPE - _Campus_ Recife.

## 🔧 Como funciona?

O projeto é feito em Node.js utilizando bibliotecas como o [Express](https://expressjs.com/) e o [Prisma](https://prisma.io/).

### :book: Documentação

A documentação da API pode ser encontrada [aqui](https://projetos.ifpeopensource.com.br/merenda-server/).

Caso ocorra algum problema, existe também uma versão em [Swagger UI](https://projetos.ifpeopensource.com.br/merenda-server/swagger-ui.html).

O arquivo OpenAPI da API pode ser encontrado em [`/docs/swagger.yaml`](/docs/swagger.yaml).

## 🚀 Como executar

- Verifique se você tem o [Node.js](https://nodejs.org/en/) e o [Docker](https://docker.io/) instalados;
- Suba o banco de dados com o comando `docker-compose up -d`;
- Instale as dependências com o comando `npm install`;
- Duplique o arquivo `.env.example` e renomeie para `.env`;
- Nele, preencha as variáveis de ambiente com os valores corretos do banco de dados;
- Execute as migrations com o comando `npx prisma migrate dev`;
- Rode o servidor com o comando `npm run dev`.

## 👥 Time

Este projeto é mantido por esses [incríveis contribuidores](https://github.com/ifpeopensource/merenda-server/graphs/contributors).

## 🤝 Contribuir

Contribuições, issues e pedidos de features são bem-vindos!<br />Sinta-se livre para checar a [página de issues](https://github.com/ifpeopensource/merenda-server/issues).

- Crie um fork;
- Crie um branch com a sua feature: `git checkout -b minha-feature`;
- Faça um commit com as mudanças: `git commit -m 'feat: Minha nova feature'`;
- Faça um push para o seu branch: `git push origin minha-feature`.
- Abra uma pull request.

Após a sua pull request ser aceita, você pode excluir o seu branch.

## 🌟 Demonstre o seu apoio

Dê uma ⭐️ se este projeto lhe ajudou!

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com ♥ no [<img src="https://github.com/ifpeopensource.png" width="15px"/> IFPE Open Source](https://ifpeopensource.com.br)
