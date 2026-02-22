const API = "http://127.0.0.1:5000";

function login() {
    fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value
        })
    })
    .then(res => res.json())
    .then(data => alert(data.msg));
}

function criarChamado() {
    fetch(API + "/chamados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            titulo: document.getElementById("titulo").value,
            descricao: document.getElementById("descricao").value
        })
    })
    .then(res => res.json())
    .then(() => listarChamados());
}

function listarChamados() {
    fetch(API + "/chamados")
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("lista");
            lista.innerHTML = "";
            data.forEach(c => {
                lista.innerHTML += `<li>${c.titulo} - ${c.status}</li>`;
            });
        });
}

listarChamados();
