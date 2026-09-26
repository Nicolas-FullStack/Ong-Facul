const routes = {
    '/': 'index-content.html',
    '/cadastro.html': 'cadastro-content.html',
    '/guia-estilo.html': 'guia-estilo-content.html',
    '/projetos.html': 'projetos-content.html'
};

const app = document.getElementById('app');

async function renderRoute(path) {
    const cleanPath = path.split('#')[0];
    const hash = path.includes('#') ? path.split('#')[1] : null;
    const page = routes[cleanPath] || routes['/'];
    try {
        const response = await fetch(page);
        if (!response.ok) throw new Error('Fragmento não encontrado');
        const html = await response.text();

        app.innerHTML = '';
        app.innerHTML = html;

        app.querySelectorAll('script').forEach(function (oldScript) {
            const newScript = document.createElement('script');
            if (oldScript.src) {
                newScript.src = oldScript.src;
            } else {
                newScript.textContent = oldScript.textContent;
            }
            oldScript.replaceWith(newScript);
        });

        if (hash) {
            const alvo = document.getElementById(hash);
            if (alvo) {
                alvo.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo(0, 0);
        }

        document.dispatchEvent(new CustomEvent('routeChanged', { detail: path }));
    } catch (err) {
        app.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
    }
}

function navigateTo(path) {
    history.pushState({}, '', path);
    renderRoute(path);
}

window.addEventListener('popstate', () => renderRoute(window.location.pathname + window.location.hash));

document.addEventListener('DOMContentLoaded', function () {
    var botao = document.getElementById('botaoMenu');
    var menu = document.getElementById('menuPrincipal');
    if (!botao || !menu) return;

    botao.addEventListener('click', function () {
        var aberto = menu.classList.toggle('nav-aberta');
        botao.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    var gatilhoDropdown = menu.querySelector('.nav-dropdown__gatilho');
    var dropdown = menu.querySelector('.nav-dropdown');
    if (gatilhoDropdown && dropdown) {
        gatilhoDropdown.addEventListener('click', function (evento) {
            if (!window.matchMedia('(max-width: 767px)').matches) return;
            evento.preventDefault();
            dropdown.classList.toggle('nav-dropdown--aberto');
        });
    }

    menu.querySelectorAll('a[data-link]').forEach(function (link) {
        link.addEventListener('click', function (evento) {
            evento.preventDefault();
            navigateTo(link.getAttribute('href'));
            if (window.matchMedia('(max-width: 767px)').matches && link !== gatilhoDropdown) {
                menu.classList.remove('nav-aberta');
                botao.setAttribute('aria-expanded', 'false');
            }
        });
    });

    renderRoute(window.location.pathname + window.location.hash);
});