
function pagina(){
    var can_reg=document.getElementById("can_reg").value;
    titulo = 'Atención'
    parrafo = "<span class='text-success'>Espere por favor<p  align='center'><img src='../../assets/images/wait2.gif' width='50' height='50'></span>"
    $('#title_modal').html(titulo)
    $('#content_modal').html(parrafo)
    $('#myModal').modal()
    //document.location = '/indicador/?can_reg='+can_reg+'&page=1';  
    document.location = '/personales/?can_reg='+can_reg+'&page=1'; 
}
