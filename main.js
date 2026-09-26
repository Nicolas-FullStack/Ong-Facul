import { validarCampoRegex, validarIdadeMinima } from './form-validation.js';
import { jaExisteCadastro, salvarCadastro } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('frmCadastro');
    if (!form) return;

    const txtCpf = document.getElementById('txtCpf');
    const txtCep = document.getElementById('txtCep');
    const txtTelefone = document.getElementById('txtTelefone');
    const txtNascimento = document.getElementById('txtNascimento');
    const txtNome = document.getElementById('txtNome');
    const slcTipo = document.getElementById('slcTipo');

    // Mapeamento de Eventos
    txtCpf.addEventListener('input', () => validarCampoRegex(txtCpf, 'cpf'));
    txtCep.addEventListener('input', () => validarCampoRegex(txtCep, 'cep'));
    txtTelefone.addEventListener('input', () => validarCampoRegex(txtTelefone, 'telefone'));
    txtNascimento.addEventListener('input', () => validarIdadeMinima(txtNascimento));
    txtNascimento.addEventListener('change', () => validarIdadeMinima(txtNascimento));

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Revalidação no submit
        validarCampoRegex(txtCpf, 'cpf');
        validarCampoRegex(txtCep, 'cep');
        validarCampoRegex(txtTelefone, 'telefone');
        validarIdadeMinima(txtNascimento);

        if (!form.checkValidity()) {
            form.reportValidity();
            if (typeof mostrarToast === 'function') {
                mostrarToast('Corrija os campos destacados antes de continuar.', 'erro');
            }
            return;
        }

        const nome = txtNome.value.trim();

        if (jaExisteCadastro(nome)) {
            if (typeof mostrarToast === 'function') {
                mostrarToast('Cadastro já existente', 'erro'); // Corrigido de 'sucesso' para 'erro' que estava errado no código original
            }
            return;
        }

        salvarCadastro(nome, slcTipo.value);

        if (typeof mostrarToast === 'function') {
            mostrarToast('Cadastro realizado com sucesso!', 'sucesso');
        }

        form.reset();
        txtCpf.setCustomValidity('');
        txtCep.setCustomValidity('');
        txtTelefone.setCustomValidity('');
        txtNascimento.setCustomValidity('');
    });
});