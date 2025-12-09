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

/* =========================================
   2. TERMINAL INTERATIVO (Apenas na Home)
   ========================================= */
const cmdInput = document.getElementById("cmdInput");
const terminalOutput = document.getElementById("terminalOutput");

// O "if" abaixo impede o erro na página de Contato ou Projetos
if (cmdInput && terminalOutput) {
    cmdInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const comando = this.value.toLowerCase().trim();
            processarComando(comando);
            this.value = ""; // Limpa o input
        }
    });
}

function processarComando(cmd) {
    // Cria linha do histórico
    const novaLinha = document.createElement("p");
    novaLinha.innerHTML = `<span style="color:#00ff00">visitor@kelwin:~$</span> ${cmd}`;
    terminalOutput.appendChild(novaLinha);

    // Comandos
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

/* =========================================
   3. FORMULÁRIO (Apenas no Contato)
   ========================================= */
const formularioContato = document.querySelector(".retro-form");

// O "if" abaixo impede o erro na Home ou outras páginas
if (formularioContato) {
    formularioContato.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o reload real da página
        const btn = document.querySelector(".btn-submit");

        // Feedback visual de envio
        const textoOriginal = btn.innerHTML;
        btn.innerHTML = ">> ENVIADO COM SUCESSO <<";
        btn.style.backgroundColor = "#00ff00";
        btn.style.color = "#000";

        // Reseta após 3 segundos
        setTimeout(() => {
            formularioContato.reset();
            btn.innerHTML = textoOriginal;
            btn.style.backgroundColor = "transparent";
            btn.style.color = "#00ff00";
        }, 3000);
    });
}
