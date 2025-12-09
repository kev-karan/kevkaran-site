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

document.querySelector(".retro-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o reload
    const btn = document.querySelector(".btn-submit");
    btn.innerHTML = ">> ENVIADO COM SUCESSO <<";
    btn.style.color = "#000";
    btn.style.backgroundColor = "#00ff00";
    setTimeout(() => {
        document.querySelector(".retro-form").reset();
        btn.innerHTML = ">> [ENVIAR_DADOS] <<";
        btn.style.color = "#00ff00";
        btn.style.backgroundColor = "transparent";
    }, 3000);
});
