import { CadastroUsuarios } from "./classes/CadastroUsuarios.js";

const app = new CadastroUsuarios(
  "https://crudcrud.com/api/9614f272cfbd4e138a4941c37d6581cd/cadastro",
  {
    nome: "nome",
    email: "email",
    lista: ".lista",
    form: ".container__form",
  },
);
