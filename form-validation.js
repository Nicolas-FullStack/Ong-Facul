const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const regexCep = /^\d{5}-\d{3}$/;
const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

export function validarCampoRegex(campo, tipo) {
    const valor = campo.value.trim();
    if (!valor) {
        campo.setCustomValidity('');
        return;
    }

    let valido = true;
    let mensagem = '';

    if (tipo === 'cpf') {
        valido = regexCpf.test(valor);
        mensagem = 'CPF deve seguir o formato 000.000.000-00.';
    } else if (tipo === 'cep') {
        valido = regexCep.test(valor);
        mensagem = 'CEP deve seguir o formato 00000-000.';
    } else if (tipo === 'telefone') {
        valido = regexTelefone.test(valor);
        mensagem = 'Telefone deve seguir o formato (00) 00000-0000.';
    }

    campo.setCustomValidity(valido ? '' : mensagem);
}

export function calcularIdade(dataString) {
    const nascimento = new Date(dataString);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const aindaNaoFezAniversario =
        hoje.getMonth() < nascimento.getMonth() ||
        (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
    if (aindaNaoFezAniversario) idade--;
    return idade;
}

export function validarIdadeMinima(campoNascimento) {
    if (!campoNascimento.value) {
        campoNascimento.setCustomValidity('');
        return;
    }
    const idade = calcularIdade(campoNascimento.value);
    campoNascimento.setCustomValidity(
        idade < 18 ? 'É necessário ter 18 anos ou mais para se cadastrar.' : ''
    );
}