
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



    var db = window.openDatabase("DatabasePHPH", "1.0", "barras", 2000000);
    db.transaction(createDB, errorDB, successDB);
    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady(){
        
        db.transaction(createDB, errorDB, successDB);
    }

	function nova_simulação(){

var decisao = confirm("Deseja EXCLUIR todos os componentes?");
if (decisao){

	db.transaction(function delete_table(tx) {
	tx.executeSql('DROP TABLE barras');
	tx.executeSql('DROP TABLE linhas');
	});

	}
	window.location = 'lista de componentes.html';
	}

    function errorDB(err){
		
        alert("Operação inválida.\nErro no cadastro de componentes.");
		window.location = "lista de componentes.html";
    }
    function successDB(){
		
	}



    //Criar a tabela se a mesma não existir    
    function createDB(tx){
        tx.executeSql('CREATE TABLE IF NOT EXISTS barras (id INTEGER PRIMARY KEY, nome VARCHAR(500), Tipo_de_Barra VARCHAR(500), P FLOAT(53), Q FLOAT(53), V FLOAT(53), theta FLOAT(53) )');            
		tx.executeSql('CREATE TABLE IF NOT EXISTS linhas (id1 INTEGER PRIMARY KEY, nome VARCHAR(500), rs FLOAT(53), xs FLOAT(53), bsh FLOAT(53), origem FLOAT(53), destino FLOAT(53) )');
	}
	
	
	    //Insere informações no banco de dados
    function barras_insert()
    {
		//window.location = 'lista de componentes.html';
        db.transaction(barras_insert_db, errorDB, successDB);
    }
    function barras_insert_db(tx){

        var nome = $("#box").val();
        var Tipo_de_Barra = $("#tipobar").val();
		var P = $("#P").val();// add agr
		var Q = $("#Q").val();// add agr
		var V = $("#V").val();// add agr
		var theta = $("#theta").val();// add agr
		
		var Tipo_de_Componente = $("#tipocomp").val();
		var rs = $("#rs").val();
		var xs = $("#xs").val();// add agr
		var bsh = $("#bsh").val();// add agr
		var origem = $("#linhaorig").val();// add agr
		var destino = $("#linhadest").val();// add agr
	
	if(Tipo_de_Componente=="Barra")
	{

		if((Tipo_de_Barra=="PV"  && P==="" || V==="")&& (Tipo_de_Barra=="PQ" && P==="" || Q==="")){
			alert("Preencha Todos os Campos!")
		}
		
		else{
		tx.executeSql('INSERT INTO barras (nome, Tipo_de_Barra, P, Q, V, theta) VALUES ("'+ nome +'", "'+ Tipo_de_Barra +'", "'+ P +'", "'+ Q +'", "'+ V +'", "'+ theta +'")');
		window.location = 'lista de componentes.html';
		}

	}
	
	if(Tipo_de_Componente=="Linha")
	{
		if(rs&&xs&&bsh&&origem&&destino !==""){
		tx.executeSql('INSERT INTO linhas (nome, rs, xs, bsh, origem, destino) VALUES ("'+ nome +'", "'+ rs +'", "'+ xs +'", "'+ bsh +'", "'+ origem +'", "'+ destino +'")');
		window.location = 'lista de componentes.html';
		}
		
		else{
			alert("Preencha Todos os Campos!")
		}

	}
    }



    function barras_delete(barras_id){

    	$("#barras_id_delete").val(barras_id);
var decisao = confirm("Deseja realmente EXCLUIR esta Barra?");
if (decisao){
//alert ("Barra EXCLUÍDA com Sucesso!");
db.transaction(barras_delete_db, errorDB, successDB);
}
}
	
	function linhas_delete(linhas_id){

    	$("#linhas_id_delete").val(linhas_id);
var decisao = confirm("Deseja realmente EXCLUIR esta Linha?");
if (decisao){
//alert ("Linha EXCLUÍDA com Sucesso!");
db.transaction(linhas_delete_db, errorDB, successDB);
}		
}
	
	    function barras_delete_db(tx){
        
        var barras_id_delete = $("#barras_id_delete").val();
       	tx.executeSql('DELETE FROM barras WHERE id = '+ barras_id_delete +' ');
        barras_view();
    }

    function linhas_delete_db(tx){
        
        var linhas_id_delete = $("#linhas_id_delete").val();
       	
       	tx.executeSql('DELETE FROM linhas WHERE id1 = '+ linhas_id_delete +' ');
        linhas_view();
    }


    //Efetua a leitura do banco de dados
    function barras_view(){
        db.transaction(barras_view_db, errorDB, successDB);
    }
	
    function linhas_view(){
        db.transaction(linhas_view_db, errorDB, successDB);

    }	

    function barras_view_db(tx){
        tx.executeSql('SELECT * FROM barras', [], barras_view_data, errorDB);
    }
	
    function linhas_view_db(tx){
        tx.executeSql('SELECT * FROM linhas', [], linhas_view_data, errorDB);
    }	
	
	
    function barras_view_data(tx, results){

        $("#barras_listagem").empty();

        var len = results.rows.length;
		

        for (var i=0; i<len; i++){
 if(results.rows.item(i).Tipo_de_Barra=="PV"){

            $("#barras_listagem").append("<tr class='barras_item_lista'>"+
			"<td width='100'><img src='img/Barra.png' class='LT_icon'></td>"+
                                            "<td width='200'><h5 class='título'>Barra&nbsp" + results.rows.item(i).id + "</h5><h5>" + results.rows.item(i).nome + "</h5><h5>Tipo:" + results.rows.item(i).Tipo_de_Barra + "</h5><h5>P:" + results.rows.item(i).P + "&nbspV:" + results.rows.item(i).V + "</h5></td>"+
                                            "<td><input type='button' class='button_del' onclick='barras_delete(" + results.rows.item(i).id + ")'></td>"+
                                            "<td><input type='button' class='button_edit' onclick='barras_update(" + results.rows.item(i).id + ")'></td>"+
										"<tr>");
 }

 if(results.rows.item(i).Tipo_de_Barra=="PQ"){
            $("#barras_listagem").append("<tr class='barras_item_lista'>"+
			"<td width='100'><img src='img/Barra.png' class='LT_icon'></td>"+
                                            "<td width='200'><h5 class='título'>Barra&nbsp" + results.rows.item(i).id + "</h5><h5>" + results.rows.item(i).nome + "</h5><h5>Tipo:&nbsp" + results.rows.item(i).Tipo_de_Barra + "</h5><h5>P:" + results.rows.item(i).P + "&nbspQ:" + results.rows.item(i).Q + "</h5></td>"+
                                            "<td><input type='button' class='button_del' onclick='barras_delete(" + results.rows.item(i).id + ")'></td>"+
                                            "<td><input type='button' class='button_edit' onclick='barras_update(" + results.rows.item(i).id + ")'></td>"+
										"<tr>");
 } 

 if(results.rows.item(i).Tipo_de_Barra=="V0"){
            $("#barras_listagem").append("<tr class='barras_item_lista'>"+
			"<td width='100'><img src='img/Barra.png' class='LT_icon'></td>"+
                                            "<td width='200'><h5 class='título'>Barra&nbsp" + results.rows.item(i).id + "</h5><h5>" + results.rows.item(i).nome + "</h5><h5>Tipo:&nbsp" + results.rows.item(i).Tipo_de_Barra + "</h5><h5>V:" + results.rows.item(i).V + "&nbsp&theta;:" + results.rows.item(i).theta + "</h5></td>"+
                                            "<td><input type='button' class='button_del' onclick='barras_delete(" + results.rows.item(i).id + ")'></td>"+
											"<td><input type='button' class='button_edit'  onclick='barras_update(" + results.rows.item(i).id + ")'></td>"+
										"<tr>");
 } 
 
 
        }
    }

    function linhas_view_data(tx, results){

        $("#linhas_listagem").empty();

        var len1 = results.rows.length;	

        for (var i=0; i<len1; i++){

            $("#linhas_listagem").append("<tr class='linhas_item_lista'>"+
			"<td width='100'><img src='img/LT.png' class='LT_icon'></td>"+
                                            "<td width='200'><h5 class='título'>Linha&nbsp" + results.rows.item(i).id1 + "</h5><h5>" + results.rows.item(i).nome + "</h5><h5>Rs:&nbsp" + results.rows.item(i).rs + "&nbsp&nbspXs:&nbsp" + results.rows.item(i).xs + "</h5><h5>Bsh:&nbsp" + results.rows.item(i).bsh + "</h5><h5>Entre barras&nbsp" + results.rows.item(i).origem + "&nbspe&nbsp" + results.rows.item(i).destino + "</h5></td>"+
                                            "<td><input type='button' class='button_del' onclick='linhas_delete(" + results.rows.item(i).id1 + ")'></td>"+
											"<td><input type='button' class='button_edit' onclick='linhas_update(" + results.rows.item(i).id1 + ")'></td>"+
										"<tr>");
        }
    }
	
	
	// Este trecho do código é destinado a alteração (update) de dados cadastrados no banco de dados
	 function barras_update(barras_id){
	sessionStorage.setItem("guardaid", barras_id);
	sessionStorage.setItem("tipo_elemento", "barra");
	window.location="editarcomponente.html";
    }
	
	function linhas_update(linhas_id){
	sessionStorage.setItem("guardaid", linhas_id);
	sessionStorage.setItem("tipo_elemento", "linha");
	window.location="editarcomponente.html"
    }
	
	
	//AQUI COMEÇA O CÁLCULO DO FLUXO --------------------------------------------------------------------------------------------------------------------------------
	
	ObjetoGlobal = {}
	
	function calcular_fluxo()
	{	
	
	db.transaction(linhas_view_db2, errorDB, successDB); 
	db.transaction(barras_view_db2, errorDB, successDB); 
	
	}
	
	   function linhas_view_db2(tx)
	{
		tx.executeSql('SELECT * FROM linhas', [], linhas_view_data2, errorDB);
    }

var tempo_msg;

	   function linhas_view_data2(tx, results)
{
var qtde_barras=0;
for(i=0;i<results.rows.length;i++){
if (results.rows.item(i).origem > results.rows.item(i).destino && results.rows.item(i).origem > qtde_barras )
{
	qtde_barras=results.rows.item(i).origem
}
if (results.rows.item(i).destino > results.rows.item(i).origem && results.rows.item(i).destino > qtde_barras )
{
	qtde_barras=results.rows.item(i).destino
}

}

	var qtde_linhas = results.rows.length; 
	const c = math.matrix(math.ones([qtde_barras,qtde_barras]));

	
//CRIA MATRIZ CHEIA DE ZEROS	 ------------------------------------------------------
var matriz_rs = new Array(qtde_barras);
var matriz_bsh = new Array(qtde_barras);
for (var i = 0; i < qtde_barras; i++)
{
	matriz_rs[i] = new Array(qtde_barras);
	matriz_bsh[i] = new Array(qtde_barras);
	for (var j = 0; j < qtde_barras; j++){
		matriz_rs[i][j] = 0;
		matriz_bsh[i][j] = 0;
	}

}
// END ----------------------------------------------------------------------------------
//ATRIBUI VALORES DE "rs" À MATRIZ CONFORME ORIGEM E DESTINO ----------------------------

	// laço das colunas da matriz
	for (var i = 0; i < qtde_barras; i++)
	{
		
		// laço das linhas da matriz (e das linhas inseridas)
		for (var j = 0; j < qtde_barras; j++)
		{
		
			if(i == qtde_linhas)
		{
			break;
		}
		
			for(var a = 0; a < qtde_linhas; a++)
			{
		
/* 		if(i == qtde_linhas)
		{
			break;
		} */
		
		if(((results.rows.item(a).origem-1) == i && (results.rows.item(a).destino-1) == j) || ((results.rows.item(a).origem-1) == j && (results.rows.item(a).destino-1) == i))
		{
			matriz_rs[j][i] = math.divide(-1,math.complex(results.rows.item(a).rs,results.rows.item(a).xs)) ;
			matriz_rs[i][j] = math.divide(-1,math.complex(results.rows.item(a).rs,results.rows.item(a).xs));
			matriz_bsh[j][i] = math.complex(0,results.rows.item(a).bsh) ;
			matriz_bsh[i][j] = math.complex(0,results.rows.item(a).bsh);
			//alert("i = " +i+ " j = " +j);
			
			
		}
		
			}
		}
		
	}
	
	
	//QUANDO FOR 11, 22, 33,...
	var soma_colunas;
	var soma_bsh;
	// laço das colunas da matriz
	for (var coluna = 0; coluna < qtde_barras; coluna++)
	{	
		soma_bsh = 0;
		soma_colunas = 0;
		// laço das linhas da matriz
		for (var linha = 0; linha < qtde_barras; linha++)
		{
			if(coluna != linha)
			{
				soma_colunas = math.subtract(soma_colunas,matriz_rs[linha][coluna]); //arrumou
				soma_bsh = math.add(soma_bsh,matriz_bsh[linha][coluna]); //arrumou
			}
		}	
		
		matriz_rs[coluna][coluna] = math.add(soma_colunas,soma_bsh); //arrumou
	
	}
	
	
	for(var a=0;a<qtde_barras;a++){

 for(var b=0;b<qtde_barras;b++){
  c.subset(math.index(a,b),matriz_rs[a][b]);
 }
  
 
 }



//END ---------------------------------------------------------------------------------------
Callback(matriz_rs,matriz_bsh,qtde_linhas); 	
		
}

	function Callback(retorno_rs,retorno_bsh,qtde_linhas) // Aqui eu transformo a matriz_rs em GLOBAL
	{
		ObjetoGlobal.matriz_rs = retorno_rs;
		ObjetoGlobal.matriz_bsh = retorno_bsh;
		ObjetoGlobal.qtde_linhas = qtde_linhas;
	}


	   function barras_view_db2(tx)
	{
		$( '#status_message' ).text('Definindo Equações...')
		setTimeout(status_do_processamento(tx),null);

	function status_do_processamento(tx)
	{
		tx.executeSql('SELECT * FROM barras', [], barras_view_data2, errorDB);
    }
	}	
	

	   function barras_view_data2(tx, results)
{ 
var qtde_barras = results.rows.length
const equacoes = math.matrix() ;
const tensao = math.matrix();
const theta = math.matrix();
const valor_da_tensao = math.matrix();
const valor_do_theta = math.matrix();
//ALERTA DE ERRO INSERÇÃO DE BARRAS-------------------------------------------------------------------------------
var zx=0
if((qtde_barras==0&&ObjetoGlobal.qtde_linhas==0)||(qtde_barras==1&&ObjetoGlobal.qtde_linhas==1)){
	  alert("Operação inválida.\nMínimo de 2 barras e 1 linha.");
	  window.location="lista de componentes.html"
	  zx++
	}
//END-------------------------------------------------------------	
//Escreve matriz com as incognitas(theta1, theta2, V1, V2...)--------------------------------------------------
const deltaPQ = math.matrix()
const deltaMod = math.matrix()
const Valores_de_entrada = math.matrix()
const matrizadmitancia = math.matrix()

	for(var a=0;a<qtde_barras;a++){

 for(var b=0;b<qtde_barras;b++){
  matrizadmitancia.subset(math.index(a,b),ObjetoGlobal.matriz_rs[a][b]);
 }
  
 
 }


for(var a=0;a<qtde_barras;a++){
	var d=0;
	var e =0;
	
if (results.rows.item(a).P !=""){

for(var i = 0;i<qtde_barras; i++){
var Vmm= results.rows.item(i).V
var thetamm= results.rows.item(i).theta
if(results.rows.item(i).V==="")
{
Vmm='V'+(i+1)+''
tensao.subset(math.index(d, 0), Vmm) 
d++
}


if(results.rows.item(i).theta==="")
{
thetamm='theta'+(i+1)+''
theta.subset(math.index(e, 0), thetamm)
e++
}

}
} 
}
 

 var m1 =0;
 const todasincognitas = math.matrix()
 for (var m=0;m<e;m++){
	 todasincognitas.subset(math.index(m1,0),theta.get([m,0]))
	 m1 ++
}
 for (m=0;m<d;m++){
	 todasincognitas.subset(math.index(m1,0),tensao.get([m,0]))
	 m1 ++

}

//----------END---------------------------------------------------------------------------


//-----------------------CRIA MATRIZ COM AS EQUAÇÕES DE POTÊNCIA-------------------------------

var equação_ativa=0;
var soma_ativa=0;
var numerodeequacoes=0;
var f=0;
var equação_ativa=0;
var equação_reativa=0;
var soma_reativa=0;

 for(var a=0;a<qtde_barras;a++){

if (results.rows.item(a).P !=""){
Valores_de_entrada.subset(math.index(f,0),results.rows.item(a).P);    
    
	f++

 for(var i = 0;i<qtde_barras; i++){
var Vk= results.rows.item(a).V
var Vm= results.rows.item(i).V
var thetak= results.rows.item(a).theta
var thetam= results.rows.item(i).theta
   

if(ObjetoGlobal.matriz_rs[a][i] == 0)
{
var Gkm= ObjetoGlobal.matriz_rs[a][i];
var Bkm= ObjetoGlobal.matriz_rs[a][i];
}
else
{
var Gkm= ObjetoGlobal.matriz_rs[a][i].re;
var Bkm= ObjetoGlobal.matriz_rs[a][i].im;
}


if(Vk==="")
{
Vk='V'+(a+1)+''


}

if(Vm==="")
{
Vm='V'+(i+1)+''



}


if(thetak==="")
{
thetak='theta'+(a+1)+''

}


if(thetam==="")
{
thetam='theta'+(i+1)+''

}

equação_ativa = math.parse(''+ Vk +'*('+ Vm +'*('+Gkm+'*cos('+thetak+'-'+thetam+')+'+Bkm+'*sin('+thetak+'-'+thetam+')))')  
soma_ativa= math.parse(''+soma_ativa+'+'+equação_ativa+'')


}
} 

var simplificaP= math.simplify(soma_ativa)

if(soma_ativa !==0){	
	equacoes.subset(math.index(numerodeequacoes,0), simplificaP);
	numerodeequacoes++
	
}
	
soma_ativa = 0
}


for(var a=0;a<qtde_barras;a++){

if (results.rows.item(a).Q !=""){
Valores_de_entrada.subset(math.index(f,0),results.rows.item(a).Q);    
f++
	
for(var i = 0;i<qtde_barras; i++){
var Vk= results.rows.item(a).V
var Vm= results.rows.item(i).V
var thetak= results.rows.item(a).theta
var thetam= results.rows.item(i).theta
   

if(ObjetoGlobal.matriz_rs[a][i] == 0)
{
var Gkm= ObjetoGlobal.matriz_rs[a][i];
var Bkm= ObjetoGlobal.matriz_rs[a][i];
}
else
{
var Gkm= ObjetoGlobal.matriz_rs[a][i].re;
var Bkm= ObjetoGlobal.matriz_rs[a][i].im;
}


if(Vk==="")
{
Vk='V'+(a+1)+''


}

if(Vm==="")
{
Vm='V'+(i+1)+''



}


if(thetak==="")
{
thetak='theta'+(a+1)+''
}


if(thetam==="")
{
thetam='theta'+(i+1)+''


}

equação_reativa = math.parse(''+ Vk +'*('+ Vm +'*('+Gkm+'*sin('+thetak+'-'+thetam+')-'+Bkm+'*cos('+thetak+'-'+thetam+')))')  
soma_reativa= math.parse(''+soma_reativa+'+'+equação_reativa+'')

 }
 } 
var simplificaQ= math.simplify(soma_reativa)

if(soma_reativa !==0){
	equacoes.subset(math.index(numerodeequacoes,0), simplificaQ);
	numerodeequacoes++

}
	
soma_reativa = 0
 }
 
//----------END---------------------------------------------------------------------------

 //CRIAÇÃO DA JACOBIANA E REALIZAÇÃO DAS DERIVADAS PARCIAIS--------------------------------------------------

  	const jacobiana = math.matrix()
	for (var i = 0; i < numerodeequacoes; i++){	
	for (var a = 0; a < m1; a++){
	jacobiana.subset(math.index(i,a),math.derivative(''+equacoes.get([i,0])+'',''+todasincognitas.get([a,0])+'' ))
	}
	}
	
 //END-----------------------------------------------------------------------------	  

 //Escreve matriz para os valores que serão atribuídos às incognitas (0,0,1,1...)--------------------------------------------------

for(var a=0;a<qtde_barras;a++){
	var d=0;
	var e =0;
	
if (results.rows.item(a).P !=""){

for(var i = 0;i<qtde_barras; i++){
if(results.rows.item(i).V==="")
{ 
valor_da_tensao.subset(math.index(d, 0), 1) 
d++
}


if(results.rows.item(i).theta==="")
{
valor_do_theta.subset(math.index(e, 0), 0)  
e++
}

 }
 } 
 }
 
 var m1 =0;
 const valor_das_incognitas = math.matrix()
 for (var m=0;m<e;m++){
	valor_das_incognitas.subset(math.index(m1,0),valor_do_theta.get([m,0]))	
	 m1 ++
 }
 for (m=0;m<d;m++){
	 valor_das_incognitas.subset(math.index(m1,0),valor_da_tensao.get([m,0]))	
	 m1 ++

 }
 
 const valorestensao =math.matrix()
  const valorestheta = math.matrix()
  const valoresfinaistheta = math.matrix()
  const valoresfinaistensao = math.matrix()
  var numerodeiteraçoes =1;
status_das_iteracoes()

function status_das_iteracoes(){
$( '#status_message' ).text('Realizando '+numerodeiteraçoes+'ª iteração...')
setTimeout(processo_de_iteracao,null);
}
//----------END---------------------------------------------------------------------------

function processo_de_iteracao(){
	
 
 //-----------PREENCHE OS VALORES DE V E THETA EM TODAS AS EQUAÇÕES-----------------
 for(var y=0;y<numerodeequacoes;y++){
 var algumacoisaae = equacoes.subset(math.index(y,0));
 

for(var x=0;x<numerodeequacoes;x++){	
var seila = math.simplify(''+algumacoisaae+'', {[''+todasincognitas.get([x,0])+'']: valor_das_incognitas.get([x,0]) })
  algumacoisaae = seila;
}

deltaPQ.subset(math.index(y,0),math.subtract(Valores_de_entrada.get([y,0]),math.eval(''+algumacoisaae+'')))
deltaMod.subset(math.index(y,0),math.abs(deltaPQ.get([y,0])))

 }
 
 //END-----------------------------------------------------------------------------

 // SUBSTITUIÇÃO DAS INCOÓGNITAS DE V E THETA NAS EQUAÇÕES RESULTANTES DAS DERIVADAS PARCIAIS DA JACOBIANA ------
  var g=0;
   
  
 for(var i=0;i<numerodeequacoes;i++){
	 
	 if(deltaMod.get([i,0])<localStorage.getItem("erromaximo")){
		 g++
	 }		 
	 }
	 if(g==numerodeequacoes||numerodeiteraçoes==localStorage.getItem("num_iter")){
		 if(numerodeiteraçoes==localStorage.getItem("num_iter")){
			 alert("Limite de iterações atingido.")
			 if(localStorage.getItem("num_iter")==1){

		 const submatrizjacob = math.matrix()
		 var preenchejacob = 0
		 var auxiliar = 0
		 var n =0
		 if(n==0){
		 for (var i = 0; i < numerodeequacoes; i++){
		

	for (var a = 0; a < m1; a++){
		preenchejacob=jacobiana.get([i,a])
	
		 for(var x=0;x<numerodeequacoes;x++){
	auxiliar= math.simplify(''+preenchejacob+'', {[''+todasincognitas.get([x,0])+'']: valor_das_incognitas.get([x,0]) })
	preenchejacob = auxiliar;

	}
	submatrizjacob.subset(math.index(i,a),math.eval(''+preenchejacob+''))
	}

	}
	
 //END-----------------------------------------------------------------------------		

 // -----DETERMINAÇÃO DO DELTA THETA E DO DELTA V ---------------------------------
	const deltathetaV = math.multiply(math.divide(1,submatrizjacob),deltaPQ)
 //END-----------------------------------------------------------------------------	

 // -----DETERMINAÇÃO DO NOVOS VALORES DAS INCÓGNITAS ---------------------------------
		for(var i=0; i<m1; i++){
		valor_das_incognitas.subset(math.index(i,0),math.add(valor_das_incognitas,deltathetaV).get([i,0]))
		
		}
			var m2=0
		 for (var m=0;m<e;m++){
	valorestheta.subset(math.index(m,0),valor_das_incognitas.get([m2,0]))
	m2++
	
	
 }
 for (m=0;m<d;m++){
	valorestensao.subset(math.index(m,0),valor_das_incognitas.get([m2,0]))	
	m2++
	
	 
 }
		

 //END-----------------------------------------------------------------------------	
		 
		
	}

	}
				 
				 
			 
		 }
		
		  final_das_iteracoes()
	 }
	 else{

		 const submatrizjacob = math.matrix()
		 var preenchejacob = 0
		 var auxiliar = 0
		 var n =0
		 if(n==0){
		 for (var i = 0; i < numerodeequacoes; i++){
		

	for (var a = 0; a < m1; a++){
		preenchejacob=jacobiana.get([i,a])
	
		 for(var x=0;x<numerodeequacoes;x++){
	auxiliar= math.simplify(''+preenchejacob+'', {[''+todasincognitas.get([x,0])+'']: valor_das_incognitas.get([x,0]) })
	preenchejacob = auxiliar;

	}
	submatrizjacob.subset(math.index(i,a),math.eval(''+preenchejacob+''))
	}

	}
	
 //END-----------------------------------------------------------------------------		

 // -----DETERMINAÇÃO DO DELTA THETA E DO DELTA V ---------------------------------
	const deltathetaV = math.multiply(math.divide(1,submatrizjacob),deltaPQ)
 //END-----------------------------------------------------------------------------	

 // -----DETERMINAÇÃO DO NOVOS VALORES DAS INCÓGNITAS ---------------------------------
		for(var i=0; i<m1; i++){
		valor_das_incognitas.subset(math.index(i,0),math.add(valor_das_incognitas,deltathetaV).get([i,0]))
		
		}
			var m2=0
		 for (var m=0;m<e;m++){
	valorestheta.subset(math.index(m,0),valor_das_incognitas.get([m2,0]))
	m2++
	
	
 }
 for (m=0;m<d;m++){
	valorestensao.subset(math.index(m,0),valor_das_incognitas.get([m2,0]))	
	m2++
	
	 
 }
		

 //END-----------------------------------------------------------------------------	
		 
		
	}
numerodeiteraçoes++
status_das_iteracoes();
	}

}

function final_das_iteracoes(){
	// -------CRIA MATRIZ COM TODOS VALORES DE TENSAO E THETA EM ORDEM ---------------------------------------------------------------
	 var q = 0;
	var u = 0;
	 for(var h=0;h<qtde_barras;h++){
			 if(results.rows.item(h).theta !== ""){
				 valoresfinaistheta.subset(math.index(h,0),results.rows.item(h).theta)
				
				
				
				 
		 }
		 else{
			
			 
			valoresfinaistheta.subset(math.index(h,0),valorestheta.get([q,0]))
			q++
		 
		
	
		
		 
		 }
		 }
		  
		 for(var z=0;z<qtde_barras;z++){
			 if(results.rows.item(z).V !== ""){
				 valoresfinaistensao.subset(math.index(z,0),results.rows.item(z).V)
				 
			 }
			 else{
				 valoresfinaistensao.subset(math.index(z,0),valorestensao.get([u,0]))
				 u++
				
				 
			 }
		 }
		 
//END---------------------------------------------------------------------------------------------		  
		
	//---------CALCULO FLUXO DE POTENCIA ATIVA E REATIVA--------------------------------------------------
		 const potenciaativa = math.matrix();
		 const potenciareativa = math.matrix();
		 for(var a=0;a<qtde_barras;a++){
			 for(var b=0;b<qtde_barras;b++){
				 
				 
				  if(matrizadmitancia.get([a,b])!==0 && a!=b){
				 potenciaativa.subset(math.index(a,b),math.subtract(math.multiply(-1,valoresfinaistensao.get([a,0]),valoresfinaistensao.get([a,0]),matrizadmitancia.get([a,b]).re),math.multiply(valoresfinaistensao.get([a,0]),valoresfinaistensao.get([b,0]),math.add(math.multiply(-1,ObjetoGlobal.matriz_rs[a][b].im,math.sin(math.subtract(valoresfinaistheta.get([a,0]),valoresfinaistheta.get([b,0])))),math.multiply(-1,matrizadmitancia.get([a,b]).re,math.cos(math.subtract(valoresfinaistheta.get([a,0]),valoresfinaistheta.get([b,0]))))))))
				 potenciareativa.subset(math.index(a,b),math.subtract(math.multiply(-1,valoresfinaistensao.get([a,0]),valoresfinaistensao.get([a,0]),math.add(math.multiply(-1,ObjetoGlobal.matriz_rs[a][b]),ObjetoGlobal.matriz_bsh[a][b]).im),math.multiply(valoresfinaistensao.get([a,0]),valoresfinaistensao.get([b,0]),math.add(math.multiply(ObjetoGlobal.matriz_rs[a][b].im,math.cos(math.subtract(valoresfinaistheta.get([a,0]),valoresfinaistheta.get([b,0])))),math.multiply(-1,matrizadmitancia.get([a,b]).re,math.sin(math.subtract(valoresfinaistheta.get([a,0]),valoresfinaistheta.get([b,0]))))))))
				 }
			 }
		 }
		  
		
		
//END---------------------------------------------------------------------------------------------	
       //----------------CALCULO PERDAS ATIVA E REATIVA---------------------------------------------------------------------------------
	 const perdaativa = math.matrix()
	 const perdareativa = math.matrix()
	 for(var a=0;a<qtde_barras;a++){
	     for(var b=0;b<qtde_barras;b++){
		 if(a!=b){
			 perdaativa.subset(math.index(a,b),math.add(potenciaativa.get([a,b]),potenciaativa.get([b,a])))
			  perdareativa.subset(math.index(a,b),math.add(potenciareativa.get([a,b]),potenciareativa.get([b,a])))
			 
		 } 
	  }
	  }
//END---------------------------------------------------------------------------------------------	  
		
		//CABEÇALHOS DA TABELA
		var titulos = ["LINHAS", "FLUXO", "PERDAS", "PERDAS"];
		var subtítulos = ["MW", "MVAr", "MW", "MVAr"];
		var tabela = document.createElement("table");
		var cabecalho = document.createElement("thead");
		var corpo = document.createElement("tbody");
		tabela.appendChild(cabecalho);
		tabela.appendChild(corpo);
		corpo.setAttribute("id", "tabela_resultado");
		 
		 
		 
		 // O i controla o número de LINHAS da TABELA
		 
		 

			 var tr = document.createElement("tr");
			corpo.appendChild(tr);
			 
			 // O j controla o número de COLUNAS da TABELA
			 for(var j=0; j<3; j++)
			 {
				 //SE FOR A LINHA INICIAL - OU SEJA, O CABEÇALHO DA TABELA (TH)
					var th = document.createElement("th");
					th.appendChild(document.createTextNode(titulos[j]));
					th.setAttribute("id", "th_resultado");
					if(j==0)
					{
						th.setAttribute("rowspan",2);
					}
					
					else if(j==1||j==2)
					{
					th.setAttribute("colspan",2);
					}
					
					tr.appendChild(th);
			 }
			 
			var tr = document.createElement("tr");
			corpo.appendChild(tr);
			
			  for(var j=0; j<4; j++)
			 {
			
					var th = document.createElement("th");
					th.appendChild(document.createTextNode(subtítulos[j]));
					th.setAttribute("id", "th_resultado");
					tr.appendChild(th);
			 }

		 
	//document.getElementById("th04").colspan = "2";
		 
		 
for(var a=0;a<qtde_barras;a++){
	     for(var b=0;b<qtde_barras;b++){
            if(a!=b){	
			
			 var tr = document.createElement("tr");
			corpo.appendChild(tr);
		
			 var td1 = document.createElement("td");
				 td1.appendChild(document.createTextNode(math.add(a,1)+"-"+math.add(b,1)));
				 tr.appendChild(td1);
				 
			var td2 = document.createElement("td");
				 td2.appendChild(document.createTextNode(math.round(math.multiply(potenciaativa.get([a,b]),localStorage.getItem("Sbase")),2)));
				 tr.appendChild(td2);
			var td3 = document.createElement("td");
				 td3.appendChild(document.createTextNode(math.round(math.multiply(potenciareativa.get([a,b]),localStorage.getItem("Sbase")),2)));
				 tr.appendChild(td3);
			var td4 = document.createElement("td");
				 td4.appendChild(document.createTextNode(math.round(math.multiply(perdaativa.get([a,b]),localStorage.getItem("Sbase")),2)));
				 tr.appendChild(td4);
			var td5 = document.createElement("td");
				 td5.appendChild(document.createTextNode(math.round(math.multiply(perdareativa.get([a,b]),localStorage.getItem("Sbase")),2)));
				 tr.appendChild(td5);
   

			}
 }
 }  

  
		document.getElementById("status_message").innerHTML=null;		
		document.getElementById("resultados").appendChild(tabela);

}

}


//---------------------ROTINA DE DEFINIÇÃO DE PARÂMETROS DE CONVERGÊNCIA---------------

	if(localStorage.getItem("erromaximo")==""||localStorage.getItem("erromaximo")==null)
	{
		localStorage.setItem("erromaximo", 0.001);	
	}

	if(localStorage.getItem("num_iter")==""||localStorage.getItem("num_iter")==null)
	{
		localStorage.setItem("num_iter", 20);	
	}

	if(localStorage.getItem("Sbase")==""||localStorage.getItem("Sbase")==null)
	{
		localStorage.setItem("Sbase", 100);	
	}


function confirmar_configurações()
{

localStorage.setItem("erromaximo", document.getElementById("Erro_max").value);
localStorage.setItem("num_iter", document.getElementById("Num_iterações").value);
localStorage.setItem("Sbase", document.getElementById("S_base").value);

window.location="lista de componentes.html"
}

function Carrega_config(){
	
document.getElementById("Erro_max").value = localStorage.getItem("erromaximo");
document.getElementById("Num_iterações").value = localStorage.getItem("num_iter");
document.getElementById("S_base").value = localStorage.getItem("Sbase");

	
}



//-----------------------------------------------------------------------------





