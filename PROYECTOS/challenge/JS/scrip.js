const textArea = document.querySelector(".cajaTexto");
const mensaje = document.querySelector(".cajaMensaje");
const btnCopiarEl = document.querySelector(".copiar");

function btnEncriptar() {
    if (!textArea.value.trim()) {
        textArea.focus();
        return;
    }
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    mensaje.style.outline = "none";
}

function encriptar(stringEncriptar) {
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    stringEncriptar = stringEncriptar.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptar.includes(matrizCodigo[i][0])) {
            stringEncriptar = stringEncriptar.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptar;
}

function btnDesencriptar() {
    const textoFuente = textArea.value.trim() ? textArea.value : mensaje.value;
    if (!textoFuente.trim()) {
        textArea.focus();
        return;
    }
    const textoDesencriptado = desencriptar(textoFuente);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
    mensaje.style.outline = "none";
}

function desencriptar(stringDesencriptar) {
    let matrizCodigo = [
        ["e", "enter"],
        ["i", "imes"],
        ["a", "ai"],
        ["o", "ober"],
        ["u", "ufat"]
    ];
    stringDesencriptar = stringDesencriptar.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptar.includes(matrizCodigo[i][1])) {
            stringDesencriptar = stringDesencriptar.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptar;
}

async function btnCopiar() {
    if (!mensaje.value) return;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(mensaje.value);
        } else {
            mensaje.select();
            mensaje.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }

        // Visual feedback
        if (btnCopiarEl) {
            const originalHTML = btnCopiarEl.innerHTML;
            btnCopiarEl.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
            btnCopiarEl.style.backgroundColor = '#966179';
            btnCopiarEl.style.color = '#ffffff';
            setTimeout(() => {
                btnCopiarEl.innerHTML = originalHTML;
                btnCopiarEl.style.backgroundColor = '';
                btnCopiarEl.style.color = '';
            }, 1500);
        }
    } catch (err) {
        console.error('Error al copiar:', err);
    }
}
