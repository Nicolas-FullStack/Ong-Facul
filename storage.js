const CHAVE_STORAGE = 'ongMaosAmigas.cadastrosLocais';

export function obterCadastrosSalvos() {
    const dados = localStorage.getItem(CHAVE_STORAGE);
    if (!dados) return [];
    try {
        return JSON.parse(dados);
    } catch (erro) {
        return [];
    }
}

export function jaExisteCadastro(nome) {
    const cadastros = obterCadastrosSalvos();
    return cadastros.some(item => item.nome.toLowerCase() === nome.toLowerCase());
}

export function salvarCadastro(nome, tipo) {
    const cadastros = obterCadastrosSalvos();
    cadastros.push({ nome, tipo });
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(cadastros));
}