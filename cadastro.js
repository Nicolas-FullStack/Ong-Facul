// Módulo responsável pela validação e envio dos dados do formulário de cadastro

(function () {
    const form = document.getElementById('frmCadastro');
    if (form) {
        const txtCpf = document.getElementById('txtCpf');
        const txtCep = document.getElementById('txtCep');
        const txtTelefone = document.getElementById('txtTelefone');
        const txtNascimento = document.getElementById('txtNascimento');
        const txtNome = document.getElementById('txtNome');
        const slcTipo = document.getElementById('slcTipo');

        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const regexCep = /^\d{5}-\d{3}$/;
        const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;

        function validarComRegex(campo, regex, obrigatorio, mensagemPadrao) {
            const valor = campo.value.trim();
            if (!valor) { campo.setCustomValidity(''); return; }
            campo.setCustomValidity(regex.test(valor) ? '' : mensagemPadrao);
        }

        function calcularIdade(dataString) {
            const nascimento = new Date(dataString);
            const hoje = new Date();
            let idade = hoje.getFullYear() - nascimento.getFullYear();
            const aindaNaoFezAniversario =
                hoje.getMonth() < nascimento.getMonth() ||
                (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate());
            if (aindaNaoFezAniversario) idade--;
            return idade;
        }

        function validarIdadeMinima() {
            if (!txtNascimento.value) { txtNascimento.setCustomValidity(''); return; }
            const idade = calcularIdade(txtNascimento.value);
            txtNascimento.setCustomValidity(idade < 18 ? 'É necessário ter 18 anos ou mais para se cadastrar.' : '');
        }

        const CHAVE_STORAGE = 'ongMaosAmigas.cadastrosLocais';

        function obterCadastrosSalvos() {
            const dados = localStorage.getItem(CHAVE_STORAGE);
            if (!dados) return [];
            try {
                return JSON.parse(dados);
            } catch (erro) {
                return [];
            }
        }

        function jaExisteCadastro(nome) {
            const cadastros = obterCadastrosSalvos();
            return cadastros.some(function (item) {
                return item.nome.toLowerCase() === nome.toLowerCase();
            });
        }

        function salvarCadastro(nome, tipo) {
            const cadastros = obterCadastrosSalvos();
            cadastros.push({ nome: nome, tipo: tipo });
            localStorage.setItem(CHAVE_STORAGE, JSON.stringify(cadastros));
        }

        txtCpf.addEventListener('input', function () {
            validarComRegex(txtCpf, regexCpf, true, 'CPF deve seguir o formato 000.000.000-00.');
        });
        txtCep.addEventListener('input', function () {
            validarComRegex(txtCep, regexCep, true, 'CEP deve seguir o formato 00000-000.');
        });
        txtTelefone.addEventListener('input', function () {
            validarComRegex(txtTelefone, regexTelefone, false, 'Telefone deve seguir o formato (00) 00000-0000.');
        });
        txtNascimento.addEventListener('input', validarIdadeMinima);
        txtNascimento.addEventListener('change', validarIdadeMinima);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            validarComRegex(txtCpf, regexCpf, true, 'CPF deve seguir o formato 000.000.000-00.');
            validarComRegex(txtCep, regexCep, true, 'CEP deve seguir o formato 00000-000.');
            validarComRegex(txtTelefone, regexTelefone, false, 'Telefone deve seguir o formato (00) 00000-0000.');
            validarIdadeMinima();

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
                    mostrarToast('Cadastro já existente', 'sucesso');
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
    }
})();