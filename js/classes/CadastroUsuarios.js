export class CadastroUsuarios {
  constructor(apiUrl, seletores) {
    this.API = apiUrl;

    this.inputNome = document.getElementById(seletores.nome);
    this.inputMail = document.getElementById(seletores.email);
    this.lista = document.querySelector(seletores.lista);
    this.form = document.querySelector(seletores.form);


    this.lista.addEventListener("click", (e) => this.handleListaClick(e));


    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    this.carregarUsers();
  }

  async carregarUsers() {
    const res = await fetch(this.API);
    const data = await res.json();

    this.lista.innerHTML = "";
    data.forEach((user) => this.renderItem(user));
  }

  renderItem(user) {
    const item = document.createElement("li");
    item.dataset.id = user._id;
    item.innerHTML = `${user.nome} <button class="buttonX" data-id="${user._id}">X</button>`;
    this.lista.appendChild(item);
  }

  async criarUser(nome, email) {
    const res = await fetch(this.API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });
    const data = await res.json();
    this.renderItem(data);
  }

  async removerUser(id) {
    await fetch(`${this.API}/${id}`, { method: "DELETE" });
    await this.carregarUsers();
  }

  handleSubmit(e) {
    e.preventDefault();
    const nome = this.inputNome.value;
    const email = this.inputMail.value;

    if (!nome || !email) return;

    this.criarUser(nome, email);

    this.inputNome.value = "";
    this.inputMail.value = "";
  }

  handleListaClick(e) {
    if (e.target.classList.contains("buttonX")) {
      const id = e.target.dataset.id;
      this.removerUser(id);
    }
  }
}
