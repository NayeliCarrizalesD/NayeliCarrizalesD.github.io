const textArea = document.querySelector(".cajaTexto");
const mensaje = document.querySelector(".cajaMensaje");

function btnEncriptar(){
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value ="";
    mensaje.style.backgroundImage = "none";
    mensaje.style.outline = "none";

}

function encriptar(stringEncriptar){
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u","ufat"]];
    stringEncriptar = stringEncriptar.toLowerCase();

    for(let i = 0; i< matrizCodigo.length; i++){
        if(stringEncriptar.includes(matrizCodigo[i][0])){
            stringEncriptar = stringEncriptar.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }
    }
    return stringEncriptar;
}

function btnDesencriptar(){
    const textoEncriptado = desencriptar(mensaje.value);
    textArea.value = textoEncriptado;
    mensaje.value ="";
    mensaje.style.backgroundImage = 'url("../../img/compu.jpg")';
    mensaje.style.outline = "none";

}

function desencriptar(stringDesencriptar){
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u","ufat"]];
    stringDesencriptar = stringDesencriptar.toLowerCase();

    for(let i = 0; i< matrizCodigo.length; i++){
        if(stringDesencriptar.includes(matrizCodigo[i][1])){
            stringDesencriptar = stringDesencriptar.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }
    }
    return stringDesencriptar;
}

function btnCopiar(){
    mensaje.style.outline = "solid";
    mensaje.select();
    mensaje.setSelectionRange(0, 99999);
    document.execCommand('copy');
}


