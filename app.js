let dados = JSON.parse(localStorage.getItem("financeiro")) || [];

function salvar(){

localStorage.setItem("financeiro",JSON.stringify(dados));

}

function adicionar(){

let valor = parseFloat(document.getElementById("valor").value);

let tipo = document.getElementById("tipo").value;

let categoria = document.getElementById("categoria").value;

let parcelas = parseInt(document.getElementById("parcelas").value);

let agora = new Date().toLocaleString();

for(let i=1;i<=parcelas;i++){

dados.push({

valor:valor,
tipo:tipo,
categoria:categoria,
data:agora,
parcela:i+"/"+parcelas

});

}

salvar();

listar();

}

function listar(){

let tabela = document.getElementById("lista");

tabela.innerHTML="";

let saldo = 0;

dados.forEach((item,index)=>{

if(item.tipo=="entrada") saldo+=item.valor;
else saldo-=item.valor;

tabela.innerHTML += `
<tr>

<td>${item.data}</td>

<td class="${item.tipo}">
${item.tipo}
</td>

<td>${item.categoria}</td>

<td>R$ ${item.valor}</td>

<td>
<button onclick="apagar(${index})">
Excluir
</button>
</td>

</tr>
`;

});

document.getElementById("saldo").innerText="R$ "+saldo.toFixed(2);

previsao();

grafico();

}

function apagar(i){

dados.splice(i,1);

salvar();

listar();

}

function pesquisar(){

let termo = document.getElementById("pesquisa").value.toLowerCase();

let linhas = document.querySelectorAll("#lista tr");

linhas.forEach(l=>{

if(l.innerText.toLowerCase().includes(termo))
l.style.display="";
else
l.style.display="none";

});

}

function previsao(){

let entradas = 0;
let gastos = 0;

dados.forEach(d=>{

if(d.tipo=="entrada") entradas+=d.valor;
else gastos+=d.valor;

});

let previsao = entradas-gastos;

document.getElementById("previsao").innerText =
"Saldo previsto: R$ "+previsao.toFixed(2);

}

function grafico(){

let categorias={};

dados.forEach(d=>{

if(d.tipo=="gasto"){

if(!categorias[d.categoria])
categorias[d.categoria]=0;

categorias[d.categoria]+=d.valor;

}

});

let labels = Object.keys(categorias);
let valores = Object.values(categorias);

new Chart(document.getElementById("grafico"),{

type:"pie",

data:{

labels:labels,

datasets:[{

data:valores

}]

}

});

}

listar();
