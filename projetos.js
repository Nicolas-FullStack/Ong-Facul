(function () {
    const frentesAtuacao = [
        { variante: 'sucesso', badge: 'Ativo', titulo: 'Educação', texto: 'Reforço escolar e capacitação profissional para jovens e adultos em situação de vulnerabilidade.' },
        { variante: 'sucesso', badge: 'Ativo', titulo: 'Saúde', texto: 'Campanhas de prevenção e encaminhamento a atendimento médico básico em comunidades carentes.' },
        { variante: 'aviso', badge: 'Vagas limitadas', titulo: 'Meio Ambiente', texto: 'Ações de conscientização ambiental e mutirões de coleta seletiva em bairros parceiros.' }
    ];

    function renderizarCards(dados, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = dados.map(function (item) {
            return `
                <article>
                    <span class="badge badge--${item.variante}">${item.badge}</span>
                    <h3>${item.titulo}</h3>
                    <p>${item.texto}</p>
                </article>
            `;
        }).join('');
    }

    renderizarCards(frentesAtuacao, 'gridFrentes');

    // Inicialização da biblioteca externa Chart.js
    const canvas = document.getElementById('graficoDoacoes');
    if (canvas && typeof Chart !== 'undefined') {
        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Agasalho', 'Cesta Básica'],
                datasets: [{
                    label: 'Progresso da Meta (%)',
                    data: [80, 65],
                    backgroundColor: ['#2e7d32', '#0277bd']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
})();

// Exibe a listagem de projetos cadastrados e seus detalhes