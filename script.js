function atualizarRelogio() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const segundos = String(agora.getSeconds()).padStart(2, "0");

    const elementoRelogio = document.getElementById("relogio");
    if (elementoRelogio) {
        elementoRelogio.textContent = `${horas}:${minutos}:${segundos}`;
    }
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

const cmdInput = document.getElementById("cmdInput");
const terminalOutput = document.getElementById("terminalOutput");

if (cmdInput && terminalOutput) {
    cmdInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const comando = this.value.toLowerCase().trim();
            processarComando(comando);
            this.value = "";
        }
    });
}

function processarComando(cmd) {
    const novaLinha = document.createElement("p");
    novaLinha.innerHTML = `<span style="color:#00ff00">visitor@kelwin:~$</span> ${cmd}`;
    terminalOutput.appendChild(novaLinha);

    switch (cmd) {
        case "ajuda":
        case "help":
            imprimirResultado("Comandos: [sobre] [projetos] [game] [contato] [clear]");
            break;
        case "sobre":
            imprimirResultado("Carregando perfil...");
            setTimeout(() => (window.location.href = "sobre.html"), 1000);
            break;
        case "projetos":
            imprimirResultado("Acedendo diretório...");
            setTimeout(() => (window.location.href = "projetos.html"), 1000);
            break;
        case "game":
        case "jogar":
            imprimirResultado("INICIANDO SISTEMA DE DEFESA...");
            setTimeout(() => (window.location.href = "game.html"), 1000);
            break;
        case "contato":
            imprimirResultado("Abrindo canal de comunicação...");
            setTimeout(() => (window.location.href = "contato.html"), 1000);
            break;
        case "clear":
        case "limpar":
            terminalOutput.innerHTML = "";
            break;
        case "":
            break;
        default:
            imprimirResultado(`Erro: Comando '${cmd}' desconhecido.`, "red");
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function imprimirResultado(texto, cor = "#ccffcc") {
    const resposta = document.createElement("p");
    resposta.style.color = cor;
    resposta.innerHTML = `>> ${texto}`;
    terminalOutput.appendChild(resposta);
}
