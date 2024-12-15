// Comentario
// Variable
//let nombre;
/*console.log(nombre);
nombre = "Itzel";*/

//console.log("HolaMundo");
//alert("HolaMundoalert");
//let texto = "Soy un texto";
//let numero = 42;
//let verdadero = true; `

//Definir mis constantes y mis variables
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonagregar = document.querySelector('#botonagregar');
const check = 'bi-record-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST;
let id;

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{ 
    weekday: 'long', 
    month: 'short',
    day: 'numeric',   
});

function agregartarea(tarea,id,hecho,eliminar) {
    if (eliminar) {
        return
    }
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = ` <li id="elemento">
    <i id="${id}" data="hecho" class="bi ${realizado} "></i> 
    <p class="tarea-lista text ${LINE}">${tarea}</p>
    <i id="${id}" data="eliminar" class="bi bi-x"></i>
</li> `  
lista.insertAdjacentHTML("beforeend",elemento);
};

function tarearealizada(element){
    elemento.classlist.toggle(check);
    elemento.classlist.toggle(uncheck);
    elemento.parentNode.querySelector('.text').classlist.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true;
};

function tareaeliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true;
};
botonagregar.addEventListener("click",() =>{
    const tarea = input.value; 
    if (tarea){
        agregartarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});
lista.addEventListener("click", function(event){
const element = event.target;
const elementData = element.attributes.data.value;
if (elementData == "hecho") {
    tarearealizada(element);
} else if (elementData == "eliminar") {
    tareaeliminada(element);
};
localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarlista(LIST);
} else {
    LIST = [];
    id = 0;
};

function cargarlista(array){
    array.array.forEach(
        function(item){
            agregartarea(item.nombre, item.id, item.hecho, item.eliminar);
        }
    );
};