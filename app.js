import { serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 ADICIONAR
async function adicionar(){

let valor = document.getElementById("valor").value;
let tipo = document.getElementById("tipo").value;
let categoria = document.getElementById("categoria").value;

if(!valor){
alert("Digite um valor");
return;
}

console.log("clicou adicionar"); // 🔥 TESTE

await addDoc(collection(db, "registros"), {
valor: parseFloat(valor),
tipo: tipo,
categoria: categoria,
data: new Date().toLocaleString(),
timestamp: serverTimestamp()
});

document.getElementById("valor").value = "";

listar();
}

// 🔹 LISTAR
async function listar(){

let lista = document.getElementById("lista");
lista.innerHTML = "";

let saldo = 0;

import { query, orderBy } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const q = query(
collection(db, "registros"),
orderBy("timestamp", "desc")
);

const querySnapshot = await getDocs(q);

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
<td class="${dados.tipo}">${dados.tipo.toUpperCase()}</td>
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

// 🔹 LIBERAR GLOBAL (ESSENCIAL)
window.adicionar = adicionar;
window.listar = listar;
window.remover = remover;

// 🔹 INICIAR
listar();
