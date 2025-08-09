const dibujargrafica=document.getElementById("dibujargrafica");
const botoneje1=document.getElementById("ejercicio1")
const botoneje2=document.getElementById("ejercicio2")
const botoneje3=document.getElementById("ejercicio3")
const botoningresar=document.getElementById("botoningresar")
const ingresar_lg = document.getElementById("ingresar_lg");
const grafica=document.getElementById("grafica")
const dibujargraficaAN=document.getElementById("dibujargraficaAN")
const tableEjercicio1=document.getElementById("tableEjercicio1")
const tableEjercicio2=document.getElementById("tableEjercicio2")
const tableEjercicio3=document.getElementById("tableEjercicio3")

let An=[],ejerciciosA=[],ejerciciosB=[],ejerciciosC=[],puntosx=[],restaA=[],restaB=[],restaC=[];
let maximo=10;
grafica.style.display="none"
function LlenarAn(An,maximo){
    for (let i = 0; i <= maximo; i++) {
        An[i]=(1/2)**i;
    }
    return An;
}
function LlenarPuntosx(maximo){
    let puntosx = [];
    for (let i = 0; i < maximo; i++) {
        puntosx[i] = i+1;
    }
    return puntosx;
}
function sucesionA(ejercicios,maximo){
    ejercicios=[0.99998]
    for (let i = 1; i <= maximo; i++) {
        ejercicios[i]=(1/2)*ejercicios[i-1];
    }
    return ejercicios;
}
function sucesionB(ejercicios,maximo) {
    ejercicios=[1,0.50001]
    for (let i = 2; i <= maximo; i++) {
        ejercicios[i]=(5/2)*ejercicios[i-1]-ejercicios[i-2];
    }
    return ejercicios;
}
function sucesionC(ejercicios,maximo) {
    ejercicios=[1,0.5,0.250001]
    for (let i = 3; i <= maximo; i++) {
       ejercicios[i]=(15/2)*ejercicios[i-1]-20*ejercicios[i-2]+24*ejercicios[i-3];
        
    }
    return ejercicios;
}
function restarSucesiones(sucesion1,sucesion2,maximo){
    let resultado=[];
    for (let i = 0; i <= maximo; i++) {
        resultado[i] = sucesion1[i]-sucesion2[i];
    }
    return resultado;
}
function preparardatos(ejercicio,resta,puntosx){
    let datos = [
        {
            mode: 'markers',
            x: puntosx,
            y: ejercicio,
            name: "{Sn}", 
            marker: {
                color: "red"
            }
        },
        {
            mode: 'markers',
            x: puntosx,
            y: resta,
            name: "{Sn-An}", 
            marker: {
                color: "blue"
            }
        }
    ];
    return datos;
}
function dibujarpuntos(entrada,datos){
    let layout = {
        title: "Gráfico de Sucesión", 
        autosize: true, 
        responsive: true 
    };
    Plotly.newPlot(entrada,datos,layout);
}
function rellenarTabla(ejercicios,resta,maximo,idTabla){
    let tabla="",insertarTabla
    for (let i = 0; i <= maximo; i++) {
        tabla=`<tr><td>${i}</td><td>${ejercicios[i]}</td><td>${resta[i]}</td></tr>`+tabla;
    }
    idTabla.innerHTML = tabla;
}
 window.addEventListener('resize', function(){
        // Usa Plotly.relayout() para forzar el redimensionamiento del gráfico
        Plotly.relayout(dibujargrafica, {
            'autosize': true
        });
});
An=LlenarAn(An,maximo);
puntosx=LlenarPuntosx(maximo);
let datoAn = [
        {
            mode: 'markers',
            x: puntosx,
            y: An,
            name: "{An}", 
            marker: {
                color: "red"
            }
        },
    ];
dibujarpuntos(dibujargraficaAN,datoAn);

botoningresar.addEventListener("click",()=>{
    maximo=parseInt(ingresar_lg.value)
    An=LlenarAn(An,maximo);
    ejerciciosA=sucesionA(ejerciciosA,maximo);
    ejerciciosB=sucesionB(ejerciciosB,maximo);
    ejerciciosC=sucesionC(ejerciciosC,maximo);
    restaA=restarSucesiones(An,ejerciciosA,maximo);
    restaB=restarSucesiones(An,ejerciciosB,maximo);
    restaC=restarSucesiones(An,ejerciciosC,maximo);
    rellenarTabla(ejerciciosA,restaA,maximo,tableEjercicio1)
    rellenarTabla(ejerciciosB,restaB,maximo,tableEjercicio2)
    rellenarTabla(ejerciciosC,restaC,maximo,tableEjercicio3)
    console.log(restaA);
    puntosx=LlenarPuntosx(maximo);
    An=LlenarAn(An,maximo);
})
botoneje1.addEventListener("click",()=>{
    grafica.style.display="block"
     console.log(restaA);
    dibujarpuntos(dibujargrafica,preparardatos(ejerciciosA,restaA,puntosx));
})
botoneje2.addEventListener("click",()=>{
    grafica.style.display="block"
    dibujarpuntos(dibujargrafica,preparardatos(ejerciciosB,restaB,puntosx));
})
botoneje3.addEventListener("click",()=>{
    grafica.style.display="block"
    dibujarpuntos(dibujargrafica,preparardatos(ejerciciosC,restaC,puntosx));
})
