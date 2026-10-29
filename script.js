
function validarCNPJ(cnpj) {
    cnpj = cnpj.toUpperCase().replace(/[./\-\s]/g, "");

    if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj)) {
        return false;
    }

    if (/^([A-Z0-9])\1{11}\d{2}$/.test(cnpj)) {
        return false;
    }

    function calcularDV(base, pesos) {
        let soma = 0;

        for (let i = 0; i < base.length; i++) {
            soma += (base.charCodeAt(i) - 48) * pesos[i];
        }

        let resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    let base = cnpj.substring(0, 12);

    let dv1 = calcularDV(
        base,
        [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );

    let dv2 = calcularDV(
        base + dv1,
        [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );

    return cnpj.endsWith(`${dv1}${dv2}`);
}

function validarTelefone(telefone) {
    const numeros = telefone.replace(/\D/g, "");
    return numeros.length >= 10 && numeros.length <= 11;
}

function mostrarMensagem(texto, cor) {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

document.getElementById("formEmpresa").addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cnpj = document.getElementById("cnpj").value.trim();
    const ie = document.getElementById("ie").value.trim();
    const responsavel = document.getElementById("responsavel").value.trim();

    if (!nome || nome.length < 2) {
        mostrarMensagem("Informe o nome da empresa.", "red");
        document.getElementById("nome").focus();
        return;
    }

    if (!endereco || endereco.length < 5) {
        mostrarMensagem("Informe o endereço completo da empresa.", "red");
        document.getElementById("endereco").focus();
        return;
    }

    if (!validarTelefone(telefone)) {
        mostrarMensagem("Telefone inválido. Digite um número com DDD e no mínimo 10 dígitos.", "red");
        document.getElementById("telefone").focus();
        return;
    }

    if (!validarCNPJ(cnpj)) {
        mostrarMensagem("CNPJ inválido!", "red");
        document.getElementById("cnpj").focus();
        return;
    }

    if (ie && !/^[A-Z0-9\-./\s]{2,20}$/i.test(ie)) {
        mostrarMensagem("Inscrição Estadual inválida.", "red");
        document.getElementById("ie").focus();
        return;
    }

    if (!responsavel || responsavel.length < 2) {
        mostrarMensagem("Informe a pessoa responsável pela empresa.", "red");
        document.getElementById("responsavel").focus();
        return;
    }

    mostrarMensagem("Empresa cadastrada com sucesso!", "green");
});
