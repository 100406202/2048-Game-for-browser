window.onload = function() {

  //Definimos una variable tabs que aplicara propiedades especiales a los objetos "span" de html

  var tabnames = ["Jugar","Descripción del juego", "Autores", "Desarrollo", "Referencias"];
  var valores = ["<p>Aqui el juego</p>","<p>Aqui la descrip</p>","<p>Los autores van aqi</p>","<p>El desarrollo del juego</p>", "<p>Referencias</p>"];

  var nav = document.getElementById("main");
  tabs = nav.getElementsByTagName("span");
  //Definimos una variable sections que aplicara propiedades especiales a los objetos "section" de html
  sections = document.getElementsByTagName("section");

  // Asignar un escuchador del evento 'click'
  for(var i=0; i<tabs.length ; i++) {
    tabs[i].addEventListener("click",activarPestaña);
  }

  function activarPestaña() {

    contador = 0;
    console.log("contador = "+contador++);
    for (var i=0;i<tabs.length;i++){
      //Resaltará la nueva pestaña activa y desactivará el resto.
      //Ocultará las secciones del documento excepto la seleccionada.
      var tabClasses = tabs[i].classList;
      var sectionClasses = sections[i].classList;

      if( tabs[i] == this ) {  //Si tabs[i] ha sido pulsado añade el atributo de css que permite mostrar la pestaña
        tabClasses.add("currenttab");
        sectionClasses.add("current");
      }else {  //Quita el resto
        tabClasses.remove("currenttab");
        sectionClasses.remove("current");
      }
    }
  }
  var autor = function (nombre,apellidos,trabajo){
    this.nombre=nombre;
    this.apellidos=apellidos;
    this.trabajo=trabajo;
    this.contador=0;
    this.info=function(){
      return ("¡Hola! Me llamo "+this.nombre+" y mis funciones han sido: "+this.trabajo);
    }
  }
adrian = new autor("Adrian","Alcántara Blasco", "coordinador, desarrollador, asistente creativo y jefe de la parte gráfica del tablero. He participado en la creación de la pestaña de descripción del juego, en la asignación de contenido multimedia, en el desarrollo del funcionamiento de la lógica del juego, he dirigido a mi equipo para la creación del tablero, he ayudado con la estética general de la página, me he encargado de los títulos de la página y de la creación de los cuadros.");
juanki = new autor("Juan Carlos","Rodríguez", "coordinador, desarrollador, asistente creativo y jefe de seguimiento del proyecto para la pestaña de desarrollo. He participado en la creación de la pestaña de autores, en la asignación de contenido multimedia, en el desarrollo del funcionamiento de la lógica del juego, he dirigido a mi equipo para la creación de la pestaña de desarrollo y he ayudado con la estética general de la página.");
jorge = new autor("Jorge","Victoria Gijón", "coordinador, desarrollador y jefe creativo. He participado en la creación de la pestaña de descripción del juego, en la asignación de contenido multimedia, en el desarrollo del funcionamiento de la lógica del juego, he dirigido a mi equipo para la creación de la estética de la página, me he encargado de la estética de las pestañas.");
albert = new autor("Albert","Giménez Arnal", "coordinador, desarrollador, asistente creativo y jefe de la lógica del juego. He participado en la creación de la pestaña de autores, en la asignación de contenido multimedia, en la asignación de sonidos, he dirigido a mi equipo para el funcionamiento de la lógica del juego, he ayudado con la estética general de la página, me he encargado de elegir el fondo de la página.");

//Funciones para el juego
var perdido=0;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
const width = 4;
let table= new Array(width);
 //var casilla = canvas.width / width
 function drawGrid(){
   var context = canvas.getContext('2d');

   /*--Lineas verticales--*/
   context.moveTo(105,0);
   context.lineTo(105,430);

   context.moveTo(215,0);
   context.lineTo(215,430);

   context.moveTo(325,0);
   context.lineTo(325,430);
   /*--Lineas horizontales--*/
   context.moveTo(0,105);
   context.lineTo(430,105);

   context.moveTo(0,215);
   context.lineTo(430,215);

   context.moveTo(0,325);
   context.lineTo(430,325);

   context.strokeStyle='DarkOrange';
   context.lineWidth=10;
   context.stroke();
 }

 function numero(f,c){
   this.valor=0;
   //Inicialmente usariamos estas propiedades para crear un cuadrado de distintos colores para cada numero
   /*this.x=canvas.width/(f+1);
   this.y=canvas.width/(c+1);*/
 }

 function createArray(){
   for (let i=0;i<width;i++){
     table[i]=new Array(width);
     for (let j=0;j<width;j++){
       table[i][j]=new numero(i,j);
       }
   }
   console.log(table)
 }
 var contador512 =0;
 var contador1024 =0;
 function drawNumbers(){
   var full=0;
   ctx.rect(table.x,table.y,width,width);
   ctx.fill();
   ctx.font = "43px Arial";
   for (var i = 0; i < width; i++) {
     for (var j = 0; j < width; j++) {
       if(table[i][j].valor!=0){
         switch (table[i][j].valor) {
           case 2: ctx.fillStyle = "Black";break
           case 4: ctx.fillStyle = "#C70039";break
           case 8: ctx.fillStyle = "#0F0CC0";break
           case 16: ctx.fillStyle = "#3E165D";break
           case 32: ctx.fillStyle = "#0E9AA8";break
           case 64: ctx.fillStyle = "#762100";break
           case 128: ctx.fillStyle = "#E437C7";break
           case 256: ctx.fillStyle = "#1DEFB5";break
           case 512: ctx.fillStyle = "#151B3A";break
           case 1024: ctx.fillStyle = "#E210B8";break
           case 2048: ctx.fillStyle = "#0707C8";break
             break;
         }
         if (table[i][j].valor==2048){
           win();
         }
         if (table[i][j].valor==512 && contador512==0){
           var au = document.getElementById("dos");
           au.play();
           contador512++;
         }
         if (table[i][j].valor==1024 && contador1024==0){
           var au = document.getElementById("tres");
           au.play();
           contador1024++;
         }
         ctx.textAlign='center';
         ctx.fillText(table[i][j].valor,110*i+50,110*j+68);
       }else {
         full++;
       }
       }
     }
     if(full==0){
       repet(table);
   }

 }

  function findejuego(){
    console.log("entrado en FINDEJUEGO");
    perdido=1;
    canvas.style.opacity= '0.5';
    ctx.fillStyle = "White";
    ctx.font = "50px Arial";
    ctx.fillText("Has perdido",215,230);
    var au = document.getElementById("perder");
    au.play();

  }
  function win(){
    perdido=1;
    var grd = ctx.createLinearGradient(200, 0, 0, 0);
    grd.addColorStop(0, "#0808CD");
    grd.addColorStop(1, "#581845");
    ctx.fillStyle = grd;
    ctx.font = "50px Arial";
    ctx.fillText("HAS GANADO!",215,230);
    var au = document.getElementById("ganao");
    au.play();
  }
 function generate(){
   let cont=0;
   let randomNumberz = Math.random()
   let randomNumberx = Math.floor(Math.random()*width)
   let randomNumbery = Math.floor(Math.random()*width)
   if (table[randomNumberx][randomNumbery].valor== 0 && cont==0){
     if(randomNumberz<=0.95){
       table[randomNumberx][randomNumbery].valor= 2
       cont++;
       console.log(randomNumberx,randomNumbery);
       console.log(randomNumberz);
     }else{
       table[randomNumberx][randomNumbery].valor= 4
       console.log(randomNumberz);
     }

   }else generate()
 }

  function movDow(){
   var aux;
   let comprob_mov=0;
   for(var i=0;i<width; i++){
     for(var j=2;j>=0;j--){
       if(table[i][j].valor!=0){
         aux=j;
         while(aux+1<width){
           if(table[i][aux+1].valor==0){
             table[i][aux+1].valor=table[i][aux].valor;
             table[i][aux].valor=0;
             aux++;
             comprob_mov++;
           }
           else if (table[i][aux].valor==table[i][aux+1].valor) {
             table[i][aux+1].valor=table[i][aux+1].valor*2;
             table[i][aux].valor=0;
             comprob_mov++;
             break;
           }
           else{
             break;
         }
        }
      }
     }
   }
   if(comprob_mov!=0){
     generate();
   }
   ctx.clearRect(0,0, 430,430);
   drawGrid();
   drawNumbers();
  }

  function movUp(){
    var aux;
    let comprob_mov=0;
    for(var i=0;i<width ;i++){
      for(var j=1;j<width ;j++){
        if(table[i][j].valor!=0){
          aux=j;
          while(aux-1>=0){
            if(table[i][aux-1].valor==0){
              table[i][aux-1].valor=table[i][aux].valor;
              table[i][aux].valor=0;
              aux--;
              comprob_mov++;
            }
            else if (table[i][aux].valor==table[i][aux-1].valor) {
              table[i][aux-1].valor=table[i][aux-1].valor*2;
              table[i][aux].valor=0;
              comprob_mov++;
              break;
            }
        else {
          break;
         }
        }
       }
     }
    }
    if(comprob_mov!=0){
      generate();
    }
    ctx.clearRect(0,0, 430,430);
    drawGrid();
    drawNumbers();

   }

  function movIz(){
    var aux;
    let comprob_mov=0;
    for(var j=0;j<width ;j++){
      for(var i=1;i<width ;i++){

        if(table[i][j].valor!=0){
          aux=i;
          while(aux-1>=0){
            if(table[aux-1][j].valor==0){
              table[aux-1][j].valor=table[aux][j].valor;
              table[aux][j].valor=0;
              aux--;
              comprob_mov++;
            }
            else if (table[aux][j].valor==table[aux-1][j].valor) {
              table[aux-1][j].valor=table[aux-1][j].valor*2;
              table[aux][j].valor=0;
              comprob_mov++;
              break;
            }

        else {
            break;
        }
      }
      }
    }
  }
  if(comprob_mov){
    generate();
  }
    ctx.clearRect(0,0, 430,430);
    drawGrid();
    drawNumbers();
   }

  function movD(){
     var aux;
     let comprob_mov=0;
     for(var j=0;j<width;j++){
       for(var i=2;i>=0;i--){
         if(table[i][j].valor!=0){
           aux=i;
           while(aux+1<width){
             if(table[aux+1][j].valor==0){
               table[aux+1][j].valor=table[aux][j].valor;
               table[aux][j].valor=0;
               aux++;
               comprob_mov++;
             }
             else if (table[aux][j].valor==table[aux+1][j].valor) {
               table[aux+1][j].valor=table[aux+1][j].valor*2;
               table[aux][j].valor=0;
               comprob_mov++;
               break;
             }

         else {
            break;
          }
         }
       }
     }
   }
   if(comprob_mov!=0){
     generate();
   }
   ctx.clearRect(0,0, 430,430);
   drawGrid();
     drawNumbers();
    }

  function juego(){
    drawGrid()
    createArray()
    generate()
    generate()
    drawNumbers()

   }
   function repet(vect){
     console.log("entrado en perdido");
     let compro=0;
     let auxi=3;
     for(let i=0; i<vect.length;i++){
       auxi=3;
       for(let j=0; j<vect.length;j++){
         if(auxi==vect[i][j].valor){
           compro++;
         }
         auxi=vect[i][j].valor;
     }
   }

   for(let i=0; i<vect.length;i++){
     auxi=3;
     for(let j=0; j<vect.length;j++){
       if(auxi==vect[j][i].valor){
         compro++;
       }
       auxi=vect[j][i].valor;
   }
  }
   if(compro==0){
     findejuego();
   }
 }




juego()
document.onkeydown=function(event){
  if(perdido==0){
    if(event.keyCode==39){
      console.log("derecha");
      console.log(table);
      movD();
    }else if (event.keyCode==37){
      console.log("iz");
      movIz();
    }else if (event.keyCode==38) {
      console.log("up");
      movUp();
    }else if (event.keyCode==40) {
      console.log("abajo");
      movDow();
    }
  }
  }
}





function parrafo(nombre) {

  if(nombre=="juan"){
    var au = document.getElementById("audio1");
    juanki.contador++;
    if(juanki.contador%2==1){
      au.play();
      document.getElementById(nombre).innerHTML = juanki.info();
    }
    else {
      document.getElementById(nombre).innerHTML = " ";
    }

  }
 if(nombre=="adrian"){
     var au = document.getElementById("audio2");
     adrian.contador++;
     if(adrian.contador%2==1){
       au.play();
       document.getElementById(nombre).innerHTML = adrian.info();
     }
     else {
       document.getElementById(nombre).innerHTML = " ";
    }
  }

  if(nombre=="jorge"){
    var au = document.getElementById("audio3");
    jorge.contador++;
    if(jorge.contador%2==1){
      au.play();
      document.getElementById(nombre).innerHTML = jorge.info();
    }
    else {
      document.getElementById(nombre).innerHTML = " ";
    }
  }
  if(nombre=="albert"){
    var au = document.getElementById("audio4");
    albert.contador++;
    if(albert.contador%2==1){
      au.play();
      document.getElementById(nombre).innerHTML = albert.info();
    }
    else {
      document.getElementById(nombre).innerHTML = " ";
    }
  }
}
