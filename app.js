let dados = JSON.parse(localStorage.getItem("dadosFinanceiros")) || [];

function salvar(){
localStorage.setItem("dadosFinanceiros",JSON.stringify(dados));
}

function adicionar(){

let valor = document.getElementById("valor").value;
let tipo = document.getElementById("tipo").value;
let categoria = document.getElementById("categoria").value;

if(valor == ""){
alert("Digite um valor");
return;
}

let registro = {
valor: parseFloat(valor),
tipo: tipo,
categoria: categoria,
data: new Date().toLocaleString()
};

dados.push(registro);

salvar();
listar();

document.getElementById("valor").value="";
}

function listar(){

let lista = document.getElementById("lista");
lista.innerHTML="";

let saldo = 0;

dados.forEach((item,index)=>{

if(item.tipo=="entrada"){
saldo += item.valor;
}else{
saldo -= item.valor;
}

lista.innerHTML += `
<tr>

<td>${item.data}</td>

<td class="${item.tipo}">${item.tipo}</td>

<td>${item.categoria}</td>

<td>R$ ${item.valor}</td>

<td>
<button onclick="excluir(${index})">Excluir</button>
</td>

</tr>
`;

});

document.getElementById("saldo").innerText = "R$ " + saldo.toFixed(2);

grafico();

}

function excluir(index){

dados.splice(index,1);

salvar();
listar();

}

let chart;

function grafico(){

let categorias = {};

dados.forEach(item=>{

if(item.tipo=="gasto"){

if(!categorias[item.categoria]){
categorias[item.categoria] = 0;
}

categorias[item.categoria] += item.valor;

}

});

let labels = Object.keys(categorias);
let valores = Object.values(categorias);

if(chart){
chart.destroy();
}

chart = new Chart(document.getElementById("grafico"),{

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
