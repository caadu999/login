const inputNome = document.getElementById("nome");
const inputMail = document.getElementById("email");
const lista = document.querySelector(".lista");

const button = document.getElementById("button");
const API =
  "https://crudcrud.com/api/c5adff412b694d0d8111816d5fa66a3c/cadastro";

function carregarUsers() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      lista.innerHTML = "";

      data.forEach((data) => {
        const item = document.createElement("li");
        item.innerHTML = `${data.nome} <button class="buttonX" onclick="removerUser('${data._id}')">X</button>`;

        lista.appendChild(item);
      });
    });
}

function removerUser(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
  }).then(() => carregarUsers());
}

carregarUsers();

button.addEventListener("click", function (e) {
  const nome = inputNome.value;
  const email = inputMail.value;
  e.preventDefault();

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      email: email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const item = document.createElement("li");
      item.innerHTML = `${data.nome} <button class="buttonX" onclick="removerUser('${data._id}')">X</button>`;
      lista.appendChild(item);
    });
});

const buttonX = document.querySelector(".buttonX");
