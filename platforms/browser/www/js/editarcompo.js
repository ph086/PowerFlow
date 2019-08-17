
	var tipo_elemento = sessionStorage.getItem("tipo_elemento");
	// conexão do banco de dados
	var db = window.openDatabase("DatabasePHPH", "1.0", "barras", 2000000);
    db.transaction(createDB, errorDB, successDB);
    document.addEventListener("deviceready", onDeviceReady, false);
		
	function onDeviceReady(){    
        db.transaction(createDB, errorDB, successDB);
    }

	function errorDB(err){
        alert("Erro: "+err);
    }
    function successDB(){
	}

    function createDB(tx){
	}
	// ----------------------------------------------
	
	if(tipo_elemento == "barra")
	{  	
	var id_da_barra=sessionStorage.getItem("guardaid");
	barras_view();
	}
	else
	{
	var id_da_linha=sessionStorage.getItem("guardaid");
	linhas_view()
	}
	

// se for barra: LEITURA ---------------------------------------------------------------------------------------------
	function barras_view(){
        db.transaction(barras_view_db, errorDB, successDB);
    }

// se for barra: LEITURA ---------------------------------------------------------------------------------------------
	function linhas_view(){
        db.transaction(linhas_view_db, errorDB, successDB);
    }

    function barras_view_db(tx){
		tx.executeSql('SELECT * FROM barras where id='+id_da_barra+'', [], barras_view_data, errorDB);
    }
	
    function linhas_view_db(tx){
		tx.executeSql('SELECT * FROM linhas where id1='+id_da_linha+'', [], linhas_view_data, errorDB);
    }
	
   function barras_view_data(tx, results){

if(results.rows.item(0).Tipo_de_Barra==="V0"){
document.getElementById("box").value = results.rows.item(0).nome;
document.getElementById("tipobar").value = results.rows.item(0).Tipo_de_Barra;
document.getElementById("V").value = results.rows.item(0).V; 
document.getElementById("theta").value = results.rows.item(0).theta; 
document.getElementById("indicadorV").style.display = "inline";
document.getElementById("V").style.display = "inline";
document.getElementById("V").disabled = true;
document.getElementById("indicadortheta").style.display = "inline";
document.getElementById("theta").style.display = "inline";
document.getElementById("theta").disabled = true;
document.getElementById("indicadorP").style.display = "none";
document.getElementById("P").style.display = "none";
document.getElementById("P").value = "";
document.getElementById("P").disabled = true;// add agr
document.getElementById("indicadorQ").style.display = "none";
document.getElementById("Q").style.display = "none";
document.getElementById("Q").value = "";
document.getElementById("Q").disabled = true;

}

else if(results.rows.item(0).Tipo_de_Barra==="PV"){
document.getElementById("box").value = results.rows.item(0).nome;
document.getElementById("tipobar").value = results.rows.item(0).Tipo_de_Barra;
document.getElementById("P").value = results.rows.item(0).P; 
document.getElementById("V").value = results.rows.item(0).V;
document.getElementById("indicadorV").style.display = "inline";
document.getElementById("V").style.display = "inline";
document.getElementById("V").disabled = false;
document.getElementById("indicadortheta").style.display = "none";
document.getElementById("theta").style.display = "none";
document.getElementById("theta").value = "";
document.getElementById("theta").disabled = true;// original era disabled
document.getElementById("indicadorP").style.display = "inline";
document.getElementById("P").style.display = "inline";
document.getElementById("P").disabled = false;
document.getElementById("indicadorQ").style.display = "none";
document.getElementById("Q").style.display = "none";
document.getElementById("Q").disabled = true; // add agr
document.getElementById("Q").value = "";

}	
		
else{
document.getElementById("box").value = results.rows.item(0).nome;
document.getElementById("tipobar").value = results.rows.item(0).Tipo_de_Barra;
document.getElementById("P").value = results.rows.item(0).P; 
document.getElementById("Q").value = results.rows.item(0).Q;
document.getElementById("indicadorV").style.display = "none";
document.getElementById("V").style.display = "none";
document.getElementById("V").value = "";
document.getElementById("V").disabled = true;
document.getElementById("indicadortheta").style.display = "none";
document.getElementById("theta").style.display = "none";
document.getElementById("theta").value = "";
document.getElementById("theta").disabled = true;
document.getElementById("indicadorP").style.display = "inline";
document.getElementById("P").style.display = "inline";
document.getElementById("P").disabled = false;// add agr
document.getElementById("indicadorQ").style.display = "inline";
document.getElementById("Q").style.display = "inline";
document.getElementById("Q").disabled = false;// add agr

}		
}

function linhas_view_data(tx, results){
document.getElementById("opcoes_barra").style.display = "none";
document.getElementById("opcoes_linha").style.display = "inline";
document.getElementById("box").value = results.rows.item(0).nome;
document.getElementById("rs").value = results.rows.item(0).rs; 
document.getElementById("xs").value = results.rows.item(0).xs; 
document.getElementById("bsh").value = results.rows.item(0).bsh; 
document.getElementById("linhaorig").value = results.rows.item(0).origem; 
document.getElementById("linhadest").value = results.rows.item(0).destino; 
}
// -------------------------------------------------------------------------------------------------------

 function alterar_componente(){

db.transaction(componente_update_db, errorDB, successDB);
}
 
 
	function componente_update_db(tx){
		var nome = $("#box").val();
		
		if(tipo_elemento == "barra")
		{
        var Tipo_de_Barra = $("#tipobar").val();
		var P = $("#P").val();// add agr
		var Q = $("#Q").val();// add agr
		var V = $("#V").val();// add agr
		var theta = $("#theta").val();// add agr
				
		if((Tipo_de_Barra=="PV"  && P==="" || V==="")&& (Tipo_de_Barra=="PQ" && P==="" || Q==="")){
		alert("Preencha Todos os Campos!")
		}
		
		else{
		tx.executeSql('update barras set nome = "'+nome+'",Tipo_de_Barra = "'+Tipo_de_Barra+'",P = "'+P+'",Q = "'+Q+'",V = "'+V+'",theta = "'+theta+'" where id = '+id_da_barra+' ', [], componente_update_data, errorDB);
		}
		}
		if(tipo_elemento == "linha")
		{
		var rs = $("#rs").val();
		var xs = $("#xs").val();// add agr
		var bsh = $("#bsh").val();// add agr
		var origem = $("#linhaorig").val();// add agr
		var destino = $("#linhadest").val();// add agr
		
		if(rs&&xs&&bsh&&origem&&destino !==""){
		tx.executeSql('update linhas set nome = "'+nome+'",rs = "'+rs+'",xs = "'+xs+'",bsh = "'+bsh+'",origem = "'+origem+'",destino = "'+destino+'" where id1 = '+id_da_linha+' ', [], componente_update_data, errorDB);
		}
		
		else{
		alert("Preencha Todos os Campos!")	
		}
		}

   }  
 
 function componente_update_data(tx, results){
window.location = 'lista de componentes.html'; 
 }

 
 
 
 

