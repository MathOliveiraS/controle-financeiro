import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

// 🔹 ADICIONAR
async function adicionar(){

let valor = document.getElementById("valor").value;
let tipo = document.getElementById("tipo").value;
let categoria = document.getElementById("categoria").value;

if(valor === ""){
alert("Digite um valor");
return;
}

await addDoc(collection(db, "registros"), {
valor: parseFloat(valor),
tipo: tipo,
categoria: categoria,
data: new Date().toLocaleString()
});

document.getElementById("valor").value = "";

listar();
}

// 🔹 LISTAR
async function listar(){

let lista = document.getElementById("lista");
lista.innerHTML = "";

let saldo = 0;

const querySnapshot = await getDocs(collection(db, "registros"));

querySnapshot.forEach((item)=>{

let dados = item.data();

if(dados.tipo === "entrada"){
saldo += dados.valor;
}else{
saldo -= dados.valor;
}

lista.innerHTML += `
<tr>
<td>${dados.data}</td>
<td class="${dados.tipo}">${dados.tipo}</td>
<td>${dados.categoria}</td>
<td>R$ ${dados.valor.toFixed(2)}</td>
<td><button onclick="remover('${item.id}')">Excluir</button></td>
</tr>
`;

});

document.getElementById("saldo").innerText = "R$ " + saldo.toFixed(2);

}

// 🔹 REMOVER
async function remover(id){
await deleteDoc(doc(db, "registros", id));
listar();
}

// 🔹 BOTÕES (AGORA FUNCIONA)
document.getElementById("btnAdicionar").addEventListener("click", adicionar);
document.getElementById("btnAtualizar").addEventListener("click", listar);

// 🔹 LIBERAR EXCLUIR
window.remover = remover;

// 🔹 INICIAR
listar();

});
