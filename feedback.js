// Gerencia o envio e exibição de feedbacks dos usuários

function mostrarToast(mensagem, variante) {
    var container = document.getElementById('toastContainer');
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'toast' + (variante ? ' toast--' + variante : '');
    toast.setAttribute('role', 'status');
    toast.textContent = mensagem;

    container.appendChild(toast);

    setTimeout(function () {
        toast.remove();
    }, 4000);
}

function abrirModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.removeAttribute('hidden');
    var primeiroFoco = modal.querySelector('button, input, select, a');
    if (primeiroFoco) primeiroFoco.focus();
}

function fecharModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.setAttribute('hidden', '');
}

var botaoToast = document.getElementById('botaoMostrarToast');
if (botaoToast) {
    botaoToast.addEventListener('click', function () {
        mostrarToast('Ação realizada com sucesso.', 'sucesso');
    });
}

var botaoAbrirModal = document.getElementById('botaoAbrirModal');
var modalFechar = document.getElementById('modalFechar');
var modalCancelar = document.getElementById('modalCancelar');
var modalConfirmar = document.getElementById('modalConfirmar');

if (botaoAbrirModal) {
    botaoAbrirModal.addEventListener('click', function () {
        abrirModal('modalExemplo');
    });
}
if (modalFechar) modalFechar.addEventListener('click', function () { fecharModal('modalExemplo'); });
if (modalCancelar) modalCancelar.addEventListener('click', function () { fecharModal('modalExemplo'); });
if (modalConfirmar) {
    modalConfirmar.addEventListener('click', function () {
        fecharModal('modalExemplo');
        mostrarToast('Confirmado com sucesso.', 'sucesso');
    });
}

var overlay = document.getElementById('modalExemplo');
if (overlay) {
    overlay.addEventListener('click', function (evento) {
        if (evento.target === overlay) fecharModal('modalExemplo');
    });
}