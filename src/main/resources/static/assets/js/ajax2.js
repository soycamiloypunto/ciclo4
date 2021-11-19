console.log('Conectado')

//if (document.addEventListener){
//    window.addEventListener('load',cargar_categoria(),false);
//    window.addEventListener('load',cargarTablaPatineta,false);
//    window.addEventListener('load',cargarTablaCategoria(),false);
//    //window.addEventListener('load',cargarTablaCliente,false);
//    //window.addEventListener('load',cargarTablaMensaje,false);
//    
//} 

//Borrar Desplegable
function removeOptions(selectElement) {
   var i, L = selectElement.options.length - 1;
   for(i = L; i >= 0; i--) {
      selectElement.remove(i);
   }
}


// -----------------------------------Patineta---------------------------
//CargarDesplegable
function cargar_categoria() {
    removeOptions(document.getElementById('categoriaBox'));
    
    $.ajax({
        url:"http://144.22.237.78:8080/api/Category/all/",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("entro a cargar la categoría");
            //console.log(respuesta);
            items=respuesta;
            var options = ''
            options='<option value="Seleccione una categoría..."</option>';
            //console.log(respuesta);
            //mostrarTablaMensajes(respuesta.items);
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle Categoria");
//                console.log(items[i].id);
//                console.log(items[i].name);
//                console.log(items[i].description);
                options += '<option value="'+items[i].id+'">'+items[i].name+'</option>';
            }

            //console.log(options);
            $('#categoriaBox').append(options);
           
        }

    })
    
 
}


function guardarInformacion_Patineta(){
    console.log("entra a guardar informacion Patineta")
    var select = document.getElementById('categoriaBox').value;//obtengo el valor del select value
    var categoriaseleccionada = {};//creo un json (objeto vacío)
    categoriaseleccionada.id=select; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json
        
    
    let myData={
        id: $("#id_p").val(),
        brand: $("#brand_p").val(),
        description: $("#description_p").val(),
        name: $("#name_p").val(),
        year: $("#year_p").val(),
        category: categoriaseleccionada,//Agrego mi Categoria como objeto a mi nuevo json global
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Skate/save", 
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id_p").val("");
            $("#brand_p").val("");
            $("#description_p").val("");
            $("#name_p").val("");
            $("#year_p").val("");
            $("#categoriaBox").val(0);
            cargarTablaPatineta();
            alert("Se ha Agregado una Patineta");
        }
    });
}

function cargarTablaPatineta(){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Skate/all/",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            items=respuesta;
            //mostrarTablaMensajes(respuesta.items);
            tabla_patineta.innerHTML="";
            
            tpatineta='<div class="container"><div class="row">';
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle Patineta");
                //console.log(mensajes.id);
                //console.log(mensajes.messagetext);
                
                tpatineta+=`
                
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${items[i].name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${items[i].brand}</h6>
                        <p class="card-text">${items[i].description}</p>
                        <button class="btn btn-info" onclick="edicionPatineta(${items[i].id})">Editar</button>
                        <button class="btn btn-danger" onclick="borrarPatineta(${items[i].id})">Borrar</button>
                    </div>
                </div>
                
                `
                
//                tabla_patineta.innerHTML += `
//                    <tr>
//                        <td>${items[i].id}</td>
//                        <td>${items[i].brand}</td>
//                        <td>${items[i].description}</td>
//                        <td>${items[i].name}</td>
//                        <td>${items[i].year}</td>
//                        <td>${items[i].category.name}</td>
//                        <td><button class="btn btn-primary" onclick="edicionPatineta(${items[i].id})">Editar</button></td>
//                        <td><button class="btn btn-primary" onclick="borrarPatineta(${items[i].id})">Borrar</button></td>
//                        
//                    </tr>
//                `
            }
            
            tpatineta+="</div></div>";
            $("#tabla_patineta").append(tpatineta);

        }

    })
  
}

function borrarPatineta(idelemento){
    let myData={
        id:idelemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Skate/"+idelemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Se ha eliminado la Patineta");
            cargarTablaPatineta();
        }
    });
}


function edicionPatineta(idelemento){
    var id = idelemento;
    $.ajax({
        url:"http://144.22.237.78:8080/api/Skate/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#id_p").val(respuesta.id);
            $("#brand_p").val(respuesta.brand);
            $("#description_p").val(respuesta.description);
            $("#name_p").val(respuesta.name);
            $("#year_p").val(respuesta.year);
            $("#categoriaBox").val(respuesta.category.id);
        }

    })
}

function editarPatineta(){
    var select = document.getElementById('categoriaBox').value;//obtengo el valor del select value
    var categoriaseleccionada = {};//creo un json (objeto vacío)
    categoriaseleccionada.id=select; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json
     
    let myData={
        id: $("#id_p").val(),
        brand: $("#brand_p").val(),
        model: $("#model_p").val(),
        description: $("#description_p").val(),
        name: $("#name_p").val(),
        year: $("#year_p").val(),
        category: categoriaseleccionada,
    };

    let datatosend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Skate/update",
        type:"PUT",
        data: datatosend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#id_p").val("");
            $("#brand_p").val("");
            $("#description_p").val("");
            $("#name_p").val("");
            $("#year_p").val("");
            $("#categoriaBox").val(0);
            cargarTablaPatineta();
            alert("Se ha editado la Patineta con éxito.")
        }
    });
}

// -----------------------------------Categoria---------------------------
function guardarInformacion_Categoria(){
    console.log("entra a guardar informacion Categoria")
    let myData={
        id: $("#id_ca").val(),
        name: $("#name_ca").val(),
        description: $("#description_ca").val(),
        
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Category/save", 
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id_ca").val("");
            $("#name_ca").val("");
            $("#description_ca").val("");
            cargarTablaCategoria();
            alert("Se ha Agregado una Categoria");
        }
    });
}

function cargarTablaCategoria(){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Category/all/",
        type:"GET",
        datatype:"JSON",
        success:function(items){
            console.log(items);
            tabla_categorias.innerHTML="";
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle Categorias");
                //console.log(mensajes.id);
                //console.log(mensajes.messagetext);
                tabla_categorias.innerHTML += `
                    <tr>
                        <td>${items[i].id}</td>
                        <td>${items[i].name}</td>
                        <td>${items[i].description}</td>
                        <td><button class="btn btn-primary" onclick="edicionCategoria(${items[i].id})">Editar</button></td>
                        <td><button class="btn btn-primary" onclick="borrarCategoria(${items[i].id})">Borrar</button></td>
                        
                    </tr>
                `
            }

            $("#resultado").append(tabla_categorias);

        }

    })

  
}

function borrarCategoria(idelemento){
    let myData={
        id:idelemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Category/"+idelemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            cargarTablaCategoria();
            alert("Se ha eliminado la categoría");
        }
    });
}

function edicionCategoria(idelemento){
    var id = idelemento;
    $.ajax({
        url:"http://144.22.237.78:8080/api/Category/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            console.log("encontré la categoría");
            $("#id_ca").val(respuesta.id);
            $("#name_ca").val(respuesta.name);
            $("#description_ca").val(respuesta.description);
                
        }

    })
}

function editarCategoria(){
    let myData={
        id: $("#id_ca").val(),
        name: $("#name_ca").val(),
        description: $("#description_ca").val(),
    };

    let datatosend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Category/update",
        type:"PUT",
        data: datatosend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#id_ca").val("");
            $("#name_ca").val("");
            $("#description_ca").val("");
            cargarTablaCategoria();
            alert("Se ha editado una Categoría con éxito.")
        }
    });
}




// -----------------------------------CLientes---------------------------
function guardarInformacion_Cliente(){
    console.log("entra a guardar informacion Patineta")
    let myData={
        idClient: $("#id_c").val(),
        email: $("#email_c").val(),
        password: $("#password_c").val(),
        name: $("#name_c").val(),
        age: $("#age_c").val(),
        
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Client/save", 
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id_c").val("");
            $("#email_c").val("");
            $("#password_c").val("");
            $("#name_c").val("");
            $("#age_c").val("");
            cargarTablaCliente();
            alert("Se ha Agregado un cliente");
        }
    });
}

function cargarTablaCliente(){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Client/all/",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            items=respuesta;
            //mostrarTablaMensajes(respuesta.items);
            tabla_clientes.innerHTML='';
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle CLiente");
                //console.log(mensajes.id);
                //console.log(mensajes.messagetext);
                tabla_clientes.innerHTML += `
                    <tr>
                        <td>${items[i].idClient}</td>
                        <td>${items[i].email}</td>
                        <td>*****</td>
                        <td>${items[i].name}</td>
                        <td>${items[i].age}</td>
                        <td><button class="btn btn-primary" onclick="edicionCliente(${items[i].idClient})">Editar</button></td>
                        <td><button class="btn btn-primary" onclick="borrarCliente(${items[i].idClient})">Borrar</button></td>
                        
                    </tr>
                `
            }

            $("#resultado").append(tabla_clientes);

        }

    })

  
}

function borrarCliente(idelemento){
    let myData={
        idClient:idelemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Client/"+idelemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            cargarTablaCliente();
            alert("Se ha eliminado el Cliente");
        }
    });
}

function edicionCliente(idelemento){
    var id = idelemento;
    $.ajax({
        url:"http://144.22.237.78:8080/api/Client/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            console.log("encontré el cliente");
            $("#id_c").val(respuesta.idClient);
            $("#email_c").val(respuesta.email);
            $("#password_c").val(respuesta.password);
            $("#name_c").val(respuesta.name);
            $("#age_c").val(respuesta.age);   
                
        }

    })
}

function editarCliente(){
    let myData={
        idClient: $("#id_c").val(),
        email: $("#email_c").val(),
        password: $("#password_c").val(),
        name: $("#name_c").val(),
        age: $("#age_c").val(),
    };

    let datatosend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Client/update",
        type:"PUT",
        data: datatosend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#id_c").val("");
            $("#email_c").val("");
            $("#password_c").val("");
            $("#name_c").val("");
            $("#age_c").val("");
            cargarTablaCliente();
            alert("Se ha editado el Cliente con éxito.")
        }
    });
}



//-----------------------------Mensajes------------------------------------
//CargarDesplegable
function cargar_desplegable_patineta() {
    removeOptions(document.getElementById('patinetaBox'));
    
    $.ajax({
        url:"http://144.22.237.78:8080/api/Skate/all/",
        type:"GET",
        datatype:"JSON",
        success:function(items){
            console.log("entro a cargar el desplegable Patineta");
            var options = ''
            options='<option value="Seleccione una Patineta..."</option>';
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle desplegable Patinetas");
                options += '<option value="'+items[i].id+'">'+items[i].name+'</option>';
            }
            $('#patinetaBox').append(options);
        }
    })
}

//CargarDesplegable
function cargar_desplegable_cliente() {
    removeOptions(document.getElementById('clienteBox'));
    
    $.ajax({
        url:"http://144.22.237.78:8080/api/Client/all/",
        type:"GET",
        datatype:"JSON",
        success:function(items){
            console.log("entro a cargar el desplegable Cliente");
            var options = ''
            options='<option value="Seleccione un Cliente..."</option>';
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle desplegable Clientes");
                options += '<option value="'+items[i].idClient+'">'+items[i].name+'</option>';
            }
            $('#clienteBox').append(options);
        }
    })
}

function guardarInformacion_Mensaje(){
    console.log("entra a guardar informacion Mensaje")
    var selectP = document.getElementById('patinetaBox').value;//obtengo el valor del select value
    var selectC = document.getElementById('clienteBox').value;//obtengo el valor del select value
    var patinetaseleccionada = {};//creo un json (objeto vacío)
    var clienteseleccionado = {};//creo un json (objeto vacío)
    patinetaseleccionada.id=selectP; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json
    clienteseleccionado.idClient=selectC; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json    
    
    let myData={
        idMessage: $("#message_id_m").val(),
        messageText: $("#messagetext_m").val(),
        client: clienteseleccionado,//Agrego mi cliente como objeto a mi nuevo json global
        skate: patinetaseleccionada,//Agrego mi Patineta como objeto a mi nuevo json global
    };

    let dataToSend=JSON.stringify(myData);
    console.log("JSON Mensajes: "+dataToSend);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Message/save", 
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#message_id_m").val("");
            $("#messagetext_m").val("");
            $("#patinetaBox").val(0);
            $("#clienteBox").val(0);
            cargarTablaMensaje();
            alert("Se ha Agregado un Mensaje");
        }
    });
}

function cargarTablaMensaje(){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Message/all/",
        type:"GET",
        datatype:"JSON",
        success:function(items){
            tabla_mensajes.innerHTML="";
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle Mensaje");
                tabla_mensajes.innerHTML += `
                    <tr>
                        <td>${items[i].idMessage}</td>
                        <td>${items[i].messageText}</td>
                        <td>${items[i].skate.name}</td>
                        <td>${items[i].client.name}</td>
                        <td><button class="btn btn-primary" onclick="edicionMensaje(${items[i].idMessage})">Editar</button></td>
                        <td><button class="btn btn-primary" onclick="borrarMensaje(${items[i].idMessage})">Borrar</button></td>
                        
                    </tr>
                `
            }
            
            $("#tabla_mensajes").append(tabla_mensajes);

        }

    })
  
}

function borrarMensaje(idelemento){
    let myData={
        id:idelemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Message/"+idelemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Se ha eliminado un Mensaje");
            cargarTablaMensaje();
        }
    });
}


function edicionMensaje(idelemento){
    var id = idelemento;
    $.ajax({
        url:"http://144.22.237.78:8080/api/Message/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#message_id_m").val(respuesta.idMessage);
            $("#messagetext_m").val(respuesta.messageText);
            $("#patinetaBox").val(respuesta.skate.id);
            $("#clienteBox").val(respuesta.client.idClient);
        }

    })
}

function editarMensaje(){
    var selectP = document.getElementById('patinetaBox').value;//obtengo el valor del select value
    var selectC = document.getElementById('clienteBox').value;//obtengo el valor del select value
    var patinetaseleccionada = {};//creo un json (objeto vacío)
    var clienteseleccionado = {};//creo un json (objeto vacío)
    patinetaseleccionada.id=selectP; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json
    clienteseleccionado.idClient=selectC; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json   
     
    let myData={
        idMessage: $("#message_id_m").val(),
        messageText: $("#messagetext_m").val(),
        client: clienteseleccionado,
        skate: patinetaseleccionada,
    };

    let datatosend=JSON.stringify(myData);
    console.log("JSON Edición: "+datatosend)
    $.ajax({
        url:"http://144.22.237.78:8080/api/Message/update",
        type:"PUT",
        data: datatosend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#message_id_m").val("");
            $("#messagetext_m").val("");
            $("#patinetaBox").val(0);
            $("#clienteBox").val(0);
            cargarTablaMensaje();
            alert("Se ha editado en el Mensaje con éxito.")
        }
    });
}


//--------------------------_Reservas_-----------------------------
function guardarInformacion_Reserva(){
    console.log("entra a guardar informacion Reservacion")
    var selectP = document.getElementById('patinetaBox').value;//obtengo el valor del select value
    var selectC = document.getElementById('clienteBox').value;//obtengo el valor del select value
    var patinetaseleccionada = {};//creo un json (objeto vacío)
    var clienteseleccionado = {};//creo un json (objeto vacío)
    patinetaseleccionada.id=selectP; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json
    clienteseleccionado.idClient=selectC; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json    
    
    let myData={
        idReservation: $("#id_reserva_r").val(),
        startDate: $("#fecha_inicio_r").val(),
        devolutionDate: $("#fecha_fin_r").val(),
        client: clienteseleccionado,//Agrego mi cliente como objeto a mi nuevo json global
        skate: patinetaseleccionada,//Agrego mi Patineta como objeto a mi nuevo json global
    };

    let dataToSend=JSON.stringify(myData);
    console.log("JSON Reservation: "+dataToSend);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Reservation/save", 
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id_reserva_r").val("");
            $("#fecha_inicio_r").val("");
            $("#fecha_fin_r").val("");
            $("#patinetaBox").val(0);
            $("#clienteBox").val(0);
            cargarTablaReserva();
            alert("Se ha Agregado una Reserva");
        }
    });
}

function cargarTablaReserva(){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Reservation/all/",
        type:"GET",
        datatype:"JSON",
        success:function(items){
            tabla_reservaciones.innerHTML="";
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle Reserva");
                
                //Seteo la fecha inicial
                let today = new Date(items[i].startDate)
                //console.log(today.toISOString().split('T')[0])
                
                //Seteo la fecha final
                let tomorrow = new Date(items[i].devolutionDate)
                //console.log(tomorrow.toISOString().split('T')[0])
                
                tabla_reservaciones.innerHTML += `
                    <tr>
                        <td>${items[i].idReservation}</td>
                        <td>${today.toISOString().split('T')[0]}</td>
                        <td>${tomorrow.toISOString().split('T')[0]}</td>
                        <td>${items[i].skate.name}</td>
                        <td>${items[i].client.name}</td>
                        <td><button class="btn btn-primary" onclick="edicionReserva(${items[i].idReservation})">Editar</button></td>
                        <td><button class="btn btn-primary" onclick="borrarReserva(${items[i].idReservation})">Borrar</button></td>
                        
                    </tr>
                `
            }
            
            $("#tabla_reservaciones").append(tabla_reservaciones);

        }

    })
  
}

function borrarReserva(idelemento){
    let myData={
        id:idelemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Reservation/"+idelemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Se ha eliminado una Reserva");
            cargarTablaReserva();
        }
    });
}


function edicionReserva(idelemento){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Reservation/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("Encontré un elemento para editar:  "+respuesta.startDate);
            
            
                
            $("#id_reserva_r").val(respuesta.idReservation);
            
            //Seteo la fecha inicial
            let today = new Date(respuesta.startDate)
            document.getElementById("fecha_inicio_r").value = today.toISOString().split('T')[0];
            //$("#fecha_inicio_r").val(respuesta.startDate);
            
            //Seteo la fecha final
            let tomorrow = new Date(respuesta.devolutionDate)
            document.getElementById("fecha_fin_r").value = tomorrow.toISOString().split('T')[0];
            //$("#fecha_fin_r").val(respuesta.devolutionDate);
            
            $("#patinetaBox").val(respuesta.skate.id);
            $("#clienteBox").val(respuesta.client.idClient);
        }

    })
}

function editarReserva(){
    var selectP = document.getElementById('patinetaBox').value;//obtengo el valor del select value
    var selectC = document.getElementById('clienteBox').value;//obtengo el valor del select value
    var patinetaseleccionada = {};//creo un json (objeto vacío)
    var clienteseleccionado = {};//creo un json (objeto vacío)
    patinetaseleccionada.id=selectP; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json
    clienteseleccionado.idClient=selectC; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json   
     
    let myData={
        idReservation: $("#id_reserva_r").val(),
        startDate: $("#fecha_inicio_r").val(),
        devolutionDate: $("#fecha_fin_r").val(),
        client: clienteseleccionado,
        skate: patinetaseleccionada,
    };

    let datatosend=JSON.stringify(myData);
    console.log("JSON Edición: "+datatosend)
    $.ajax({
        url:"http://144.22.237.78:8080/api/Reservation/update",
        type:"PUT",
        data: datatosend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#id_reserva_r").val("");
            $("#fecha_inicio_r").val("");
            $("#fecha_fin_r").val("");
            $("#patinetaBox").val(0);
            $("#clienteBox").val(0);
            cargarTablaReserva();
            alert("Se ha editado en la Reserva con éxito.")
        }
    });
}


//---------------------------------------Calificación de reservas------------------


function cargarTablaReserva_Calificaciones(){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Reservation/all/",
        type:"GET",
        datatype:"JSON",
        success:function(items){
            tabla_reserva_calificaciones.innerHTML="";
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle Reserva");
                
                //Seteo la fecha inicial
                let today = new Date(items[i].startDate)
                //console.log(today.toISOString().split('T')[0])
                
                //Seteo la fecha final
                let tomorrow = new Date(items[i].devolutionDate)
                //console.log(tomorrow.toISOString().split('T')[0])
                
                try {
                    tabla_reserva_calificaciones.innerHTML += `
                        <tr>
                            <td>${items[i].idReservation}</td>
                            <td>${today.toISOString().split('T')[0]}</td>
                            <td>${tomorrow.toISOString().split('T')[0]}</td>
                            <td>${items[i].skate.name}</td>
                            <td>${items[i].client.name}</td>
                            <td><button class="btn btn-primary m-3" disabled>Agregar</button></td>
                            <td><button class="btn btn-primary m-3" onclick="edicionCalificacion(${items[i].score.idScore})">Ver</button></td>
                            <td><button class="btn btn-primary m-3" onclick="borrarCalificacion(${items[i].score.idScore})">Borrar</button></td>

                        </tr>
                    `
                } catch (e) {
                    tabla_reserva_calificaciones.innerHTML += `
                        <tr>
                            <td>${items[i].idReservation}</td>
                            <td>${today.toISOString().split('T')[0]}</td>
                            <td>${tomorrow.toISOString().split('T')[0]}</td>
                            <td>${items[i].skate.name}</td>
                            <td>${items[i].client.name}</td>
                            <td><button class="btn btn-primary m-3" onclick="agregarCalificacion(${items[i].idReservation})">Agregar</button></td>
                            <td><button class="btn btn-primary m-3" disabled>Ver</button> </td>
                            <td><button class="btn btn-primary m-3" disabled>Borrar</button></td>

                        </tr>
                    `
                }

                
                
            }
            
            $("#tabla_reserva_calificaciones").append(tabla_reserva_calificaciones);

        }

    })
  
}

function agregarCalificacion(idelemento){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Reservation/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log("Encontré un elemento para editar:  "+respuesta.client.name);
            $("#id_reserva_c").val(respuesta.idReservation);
            $("#skate_ca").val(respuesta.skate.name.toString());
            $("#cliente_ca").val(respuesta.client.name);
        }
    })
}

function edicionCalificacion(idelemento){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Score/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("Encontré un elemento para editar:  "+respuesta);
            $("#id_reserva_c").val(respuesta.reservation.idReservation);
            $("#skate_ca").val(respuesta.reservation.skate.name);
            $("#cliente_ca").val(respuesta.reservation.client.name);
            $("#id_calificacion_c").val(respuesta.idScore);
            $("#messagetext_c").val(respuesta.messageText);
            $("#rate").val(respuesta.idScore);
        }
    })
}


function guardarInformacion_Calificacion(){
    console.log("entra a guardar informacion Calificacion")
    var ReservaS = document.getElementById('id_reserva_c').value;//obtengo el valor del select value
    var reservaSeleccionada = {};//creo un json (objeto vacío)
    reservaSeleccionada.idReservation=ReservaS; //Agrego el valor obtenido al objeto vacío para crear un json dentro del json
    
    let estrellaseleccionada = $('input[name="rate"]:checked').val();//Verifico si está seleccionada
    //console.log("estrella seleccionada: "+activoFijo);
    
    let myData={
        idScore: $("#id_calificacion_c").val(),
        messageText: $("#messagetext_c").val(),
        starts: estrellaseleccionada,
        reservation: reservaSeleccionada,
        
    };

    let dataToSend=JSON.stringify(myData);
    console.log("JSON Score: "+dataToSend);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Score/save", 
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id_calificacion_c").val("");
            $("#messagetext_c").val("");
            $("#id_reserva_c").val("");
            cargarTablaReserva_Calificaciones()();
            alert("Se ha Agregado una Calificación");
        }
    });
}


function borrarCalificacion(idelemento){
    let myData={
        id:idelemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Score/"+idelemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            alert("Se ha eliminado una Calificación");
            cargarTablaReserva_Calificaciones();
        }
    });
}

// -----------------------------------Admin---------------------------
function guardarInformacion_Admin(){
    console.log("entra a guardar informacion Admin")
    let myData={
        id: $("#id_ad").val(),
        name: $("#name_ad").val(),
        email: $("#email_ad").val(),
        password: $("#pass_ad").val(),
        
    };

    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Admin/save", 
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id_ad").val("");
            $("#name_ad").val("");
            $("#email_ad").val("");
            $("#pass_ad").val("");
            cargarTablaAdmin();
            alert("Se ha Agregado un Usuario Administrativo");
        }
    });
}

function cargarTablaAdmin(){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Admin/all/",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            items=respuesta;
            //mostrarTablaMensajes(respuesta.items);
            tabla_admin.innerHTML='';
            console.log(items.length)
            for(i=0; i<items.length; i++){
                console.log("entro al bucle admin");
                //console.log(mensajes.id);
                //console.log(mensajes.messagetext);
                tabla_admin.innerHTML += `
                    <tr>
                        <td>${items[i].id}</td>
                        <td>${items[i].name}</td>
                        <td>*****</td>
                        <td>${items[i].email}</td>
                        <td><button class="btn btn-primary" onclick="edicionAdmin(${items[i].id})">Editar</button></td>
                        <td><button class="btn btn-primary" onclick="borrarAdmin(${items[i].id})">Borrar</button></td>
                        
                    </tr>
                `
            }

            $("#resultado").append(tabla_admin);

        }

    })

  
}

function borrarAdmin(idelemento){
    let myData={
        idClient:idelemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Admin/"+idelemento, 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            cargarTablaAdmin();
            alert("Se ha eliminado el Usuario Administrativo");
        }
    });
}

function edicionAdmin(idelemento){
    $.ajax({
        url:"http://144.22.237.78:8080/api/Admin/"+idelemento,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log("encontré el Administrador");
            $("#id_ad").val(respuesta.id);
            $("#name_ad").val(respuesta.name);
            $("#pass_ad").val(respuesta.password);
            $("#email_ad").val(respuesta.email);
                
        }

    })
}

function editarAdmin(){
    let myData={
        id: $("#id_ad").val(),
        name: $("#name_ad").val(),
        password: $("#pass_ad").val(),
        email: $("#email_ad").val(),
    };

    let datatosend=JSON.stringify(myData);
    $.ajax({
        url:"http://144.22.237.78:8080/api/Admin/update",
        type:"PUT",
        data: datatosend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#id_ad").val("");
            $("#name_ad").val("");
            $("#pass_ad").val("");
            $("#email_ad").val("");
            cargarTablaAdmin();
            alert("Se ha editado el Usuario con éxito.")
        }
    });
}

