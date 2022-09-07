function buscarCedula(){
    document.getElementById('nombre1s').disabled=true;   
    document.getElementById('nombre2s').disabled=true;  
    document.getElementById('apellido1s').disabled=true; 
    document.getElementById('apellido2s').disabled=true;     
    document.getElementById('sexos').disabled=true;    
    document.getElementById('fecha_nacs').disabled=true; 
    document.getElementById('nombre1s').value="";   
    document.getElementById('nombre2s').value=""; 
    document.getElementById('apellido1s').value=""; 
    document.getElementById('apellido2s').value="";     
    document.getElementById('sexos').selectedIndex=0;   
    document.getElementById('fecha_nacs').value="";   
    document.getElementById('b1').disabled=true;     
    document.getElementById('telefono').value="";   
    document.getElementById('rep').value='0';    
    document.getElementById('telefono').style.backgroundColor="#FFFFFF"; 
    document.getElementById('nombre1s').style.backgroundColor="#FFFFFF";   
    document.getElementById('nombre2s').style.backgroundColor="#FFFFFF";
    document.getElementById('apellido1s').style.backgroundColor="#FFFFFF";
    document.getElementById('apellido2s').style.backgroundColor="#FFFFFF";    
    document.getElementById('sexos').style.backgroundColor="#FFFFFF";  
    document.getElementById('fecha_nacs').style.backgroundColor="#FFFFFF";     
    var colorFaltante='#ec7211';
    var colorDisabled='#e9ecef';

    titulo = 'Atención'
    parrafo = "<span class='text-info'>Espere mientras proceamos su petición</span><p  align='center'><img src='../../assets/images/wait2.gif' width='50' height='50'>"
    $('#title_modal').html(titulo)
    $('#content_modal').html(parrafo)
    $('#myModal').modal()
    var nacv=document.getElementById('nacionalidad').value;
    var cedv=document.getElementById('cedula').value;
    if (nacv !='' && cedv!=''){
        $.ajax({
            url: "/cne/search",
            type: "post",
            dataType: "html",
            data: {
                nac:nacv,
                ced:cedv
            } 
        }).done(function (res) {
            console.log(res);
            var data = JSON.parse(res); 
            console.log(data);
            if (data.length > 0) {
                if (data[0]['salida']=="1"){
                    titulo = 'Atención'
                    parrafo = "<span class='text-success'>Registro encontrado</span>"
                    $('#title_modal').html(titulo)
                    $('#content_modal').html(parrafo)
                    $('#myModal').modal()
                    /*{"salida":"1","nacionalidad":"V",
                    "cedula":"12110077",
                    "apellido1":"O\u00d1ATE",
                    "apellido2":"DE GONZALEZ",
                    "nombre1":"YESSDY",
                    "nombre2":"MAYBETH",
                    "sexo":"F",
                    "fecha_nac":"1974-11-12",
                    "id_estado":"7",
                    "id_municipio":"11",
                    "id_parroquia":"1",
                    "id_centro":"71101006"}]
                    */
                    document.getElementById('nombre1s').value=data[0]['nombre1'];   
                    document.getElementById('nombre2s').value=data[0]['nombre2'];  
                    document.getElementById('apellido1s').value=data[0]['apellido1']; 
                    document.getElementById('apellido2s').value=data[0]['apellido2']; 
                    if (data[0]['sexo']=="F"){
                        document.getElementById('sexos').selectedIndex=1;               
                    } else {
                        document.getElementById('sexos').selectedIndex=0;    
                    }  
                    document.getElementById('fecha_nacs').value=data[0]['fecha_nac']; 
                    document.getElementById('b1').disabled=false;
                    document.getElementById('rep').value=data[0]['rep'];
                    document.getElementById('telefono').value=data[0]['telefono'];
                    if (data[0]['telefono']=="") {
                        // datos tomados de la base de datos pero falta el telefono
                        titulo = 'Atención'
                        parrafo = "<span class='text-info'>Por favor suministre la data faltante</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal() 
                        document.getElementById('b1').disabled=false;   
                        document.getElementById('b2').disabled=true;
                        document.getElementById('telefono').style.backgroundColor=colorFaltante;

                    } else {
                        titulo = 'Atención'
                        parrafo = "<span class='text-info'>Puede registrar la asistencia</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()                         
                        // data completa puede registrar la asistencia
                        document.getElementById('nombre1s').disabled=true;   
                        document.getElementById('nombre2s').disabled=true;  
                        document.getElementById('apellido1s').disabled=true; 
                        document.getElementById('apellido2s').disabled=true;                                                                  
                        document.getElementById('fecha_nacs').disabled=true; 
                        document.getElementById('sexos').disabled=true;   
                        document.getElementById('telefono').disabled=true;   
                        document.getElementById('telefono').style.backgroundColor=colorDisabled; 
                        document.getElementById('nombre1s').style.backgroundColor=colorDisabled;   
                        document.getElementById('nombre2s').style.backgroundColor=colorDisabled;
                        document.getElementById('apellido1s').style.backgroundColor=colorDisabled;
                        document.getElementById('apellido2s').style.backgroundColor=colorDisabled;    
                        document.getElementById('sexos').style.backgroundColor=colorDisabled;  
                        document.getElementById('fecha_nacs').style.backgroundColor=colorDisabled;                         
                        
                        document.getElementById('b1').disabled=true;   
                        document.getElementById('b2').disabled=false;
                    }
                } else {
                    titulo = 'Atención'
                    parrafo = "<span class='text-info'>Por favor suministre la data faltante</span>"
                    $('#title_modal').html(titulo)
                    $('#content_modal').html(parrafo)
                    $('#myModal').modal()  
                    document.getElementById('nombre1s').disabled=false;   
                    document.getElementById('nombre2s').disabled=false;  
                    document.getElementById('apellido1s').disabled=false; 
                    document.getElementById('apellido2s').disabled=false;                                                                  
                    document.getElementById('fecha_nacs').disabled=false; 
                    document.getElementById('sexos').disabled=false;  
                    document.getElementById('b1').disabled=false;   
                    document.getElementById('b2').disabled=true;    
                    document.getElementById('telefono').style.backgroundColor=colorFaltante; 
                    document.getElementById('nombre1s').style.backgroundColor=colorFaltante;   
                    document.getElementById('nombre2s').style.backgroundColor=colorFaltante;
                    document.getElementById('apellido1s').style.backgroundColor=colorFaltante;
                    document.getElementById('apellido2s').style.backgroundColor=colorFaltante;    
                    document.getElementById('sexos').style.backgroundColor=colorFaltante;  
                    document.getElementById('fecha_nacs').style.backgroundColor=colorFaltante;                                                                                 

                }
            } else {
                titulo = 'Atención'
                parrafo = "<span class='text-danger'>Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo</span>"
                $('#title_modal').html(titulo)
                $('#content_modal').html(parrafo)
                $('#myModal').modal()
            } 
        });    
    } else {
        titulo = 'Atención'
        parrafo = "<span class='text-danger'>Debe suministrar una cédula para la búsqueda</span>"
        $('#title_modal').html(titulo)
        $('#content_modal').html(parrafo)
        $('#myModal').modal()        

    }
}

function guardar(){
    document.getElementById("b1").disabled=true;
    var nacv=document.getElementById('nacionalidad').value;
    var cedv=document.getElementById('cedula').value;
    var nom1v=document.getElementById('nombre1s').value;
    var nom2v=document.getElementById('nombre2s').value;
    var ape1v=document.getElementById('apellido1s').value;    
    var ape2v=document.getElementById('apellido2s').value;
    var sexv=document.getElementById('sexos').value;         
    var fecnacv=document.getElementById('fecha_nacs').value; 
    var repv=document.getElementById('rep').value;              
    var telv=document.getElementById('telefono').value;
    titulo = 'Atención'
    parrafo = "<span class='text-info'>Espere mientras proceamos su petición</span><p  align='center'><img src='../../assets/images/wait2.gif' width='50' height='50'>"
    $('#title_modal').html(titulo)
    $('#content_modal').html(parrafo)
    $('#myModal').modal()    
    // validamos que los campos oblitorios no estén vacios
    if ((cedv!="")  &&
        (nacv !="") &&
        (nom1v !="") &&
        (ape1v !="") &&
        (sexv !="") &&
        (fecnacv !="") &&
        (repv !="") &&
        (telv !="")){
        $.ajax({
            url: "/cne/guarda_datos",
            type: "post",
            dataType: "html",
            data: {
                nac:nacv,
                ced:cedv,
                nom1:nom1v,
                nom2:nom2v,
                ape1:ape1v,
                ape2:ape2v,
                sex:sexv,
                fecnac:fecnacv,
                tel:telv,
                rep:repv,
            },

        }).done(function (res) {
            console.log(res);
            var data = JSON.parse(res); 
            console.log (data);
            if (data.length > 0) {
                switch (data[0]['salida']){
                    case "1": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-success'>Registro guardado correctamente</span><p  align='center'><img src='../../assets/images/wait2.gif' width='50' height='50'>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        setTimeout(function() {
                            //console.log('ocultando 2');
                            $('#myModal').modal('hide');
                            document.getElementById('b2').disabled=false;                           
                        }, 3000);                        

                        break;    
                    case "-1": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-danger'>No se pudo guardar el registro de datos personales<br>Inténtelo de nuevo</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break;  
                    case "-2": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-danger'>No se pudo guardar el registro de datos de contacto<br>Inténtelo de nuevo/span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break;   
                    case "-3": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-danger'>Ocurrió un error que no pudo ser controlado<<br>Inténtelo de nuevo</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break; 
                    case "-100": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-info'>Esta persona ya está registrada en el sistema<br>No puede volver a ingresarla</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break;                                                                                                              
                }
                
            } else {
                titulo = 'Atención'
                parrafo = "<span class='text-danger'>Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo</span>"
                $('#title_modal').html(titulo)
                $('#content_modal').html(parrafo)
                $('#myModal').modal()
            } 
        }); 
    } else {
            titulo = 'Atención'
            parrafo = "<span class='text-danger'>Este formulario tiene campos obligatorios, no puede omitirlos</span>"
            $('#title_modal').html(titulo)
            $('#content_modal').html(parrafo)
            $('#myModal').modal()
    }
 
}

function guardarAsistencia(){
   document.getElementById("b2").disabled=true;
    var nacv=document.getElementById('nacionalidad').value;
    var cedv=document.getElementById('cedula').value;
    var evev=document.getElementById('evento').value;
    titulo = 'Atención'
    parrafo = "<span class='text-info'>Espere mientras proceamos su petición</span><p  align='center'><img src='../../assets/images/wait2.gif' width='50' height='50'>"
    $('#title_modal').html(titulo)
    $('#content_modal').html(parrafo)
    $('#myModal').modal()    
    // validamos que los campos oblitorios no estén vacios
    if ((cedv!="")  &&
        (nacv !="") ){
        $.ajax({
            url: "/cne/guarda_asistencia",
            type: "post",
            dataType: "html",
            data: {
                nac:nacv,
                ced:cedv,
                eve:evev,
            },

        }).done(function (res) {
            console.log(res);
            var data = JSON.parse(res); 
            console.log (data);
            if (data.length > 0) {
                switch (data[0]['salida']){
                    case "1": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-success'>Se registro la asistencia Correctamente</span><p  align='center'><img src='../../assets/images/wait2.gif' width='50' height='50'>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        setTimeout(function() {
                            //console.log('ocultando 2');
                            $('#myModal').modal('hide');
                            limpiar();                          
                        }, 3000);                        

                        break;    
                    case "-1": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-danger'>Esta persona no está registrada por favor revice los datos</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break;  
                    case "-2": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-danger'>No se pudo guardar el registro de asistencia</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break; 
                    case "-3": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-danger'>Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break; 
                    case "-4": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-danger'>No puede registrar asistencias en una fecha que no corresponde a la del evento</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break;  
                        
                   case "-5": 
                        titulo = 'Atención'
                        parrafo = "<span class='text-info'>Ya se encuentra registrado en el evento</span>"
                        $('#title_modal').html(titulo)
                        $('#content_modal').html(parrafo)
                        $('#myModal').modal()
                        break;                         
                }
                
            } else {
                titulo = 'Atención'
                parrafo = "<span class='text-danger'>Ocurrió un error que no pudo ser controlado<br>Inténtelo de nuevo</span>"
                $('#title_modal').html(titulo)
                $('#content_modal').html(parrafo)
                $('#myModal').modal()
            } 
        }); 
    } else {
            titulo = 'Atención'
            parrafo = "<span class='text-danger'>Este formulario tiene campos obligatorios, no puede omitirlos</span>"
            $('#title_modal').html(titulo)
            $('#content_modal').html(parrafo)
            $('#myModal').modal()
    }
}

function limpiar(){

    document.getElementById('cedula').value="";
    document.getElementById('nombre1s').value="";
    document.getElementById('nombre2s').value="";
    document.getElementById('apellido1s').value="";    
    document.getElementById('apellido2s').value="";
    document.getElementById('sexos').value="";         
    document.getElementById('fecha_nacs').value=""; 
    document.getElementById('rep').value="";              
    document.getElementById('telefono').value="";
    document.getElementById('telefono').style.backgroundColor="#FFFFFF"; 
    document.getElementById('nombre1s').style.backgroundColor="#FFFFFF";   
    document.getElementById('nombre2s').style.backgroundColor="#FFFFFF";
    document.getElementById('apellido1s').style.backgroundColor="#FFFFFF";
    document.getElementById('apellido2s').style.backgroundColor="#FFFFFF";    
    document.getElementById('sexos').style.backgroundColor="#FFFFFF";  
    document.getElementById('fecha_nacs').style.backgroundColor="#FFFFFF";    
    document.location.reload();        
}
