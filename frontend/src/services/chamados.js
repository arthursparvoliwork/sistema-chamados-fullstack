const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "index.html";
}

fetch("http://127.0.0.1:5000/chamados", {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => {
  console.log(data);
})
.catch(err => console.error(err));
