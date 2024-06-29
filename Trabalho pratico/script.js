document.addEventListener('DOMContentLoaded', function () {
    const apiUrlColegas = 'https://22bbdc37-97b0-45bb-9f47-57bb3a05fc6a-00-2rdz3436bue6o.worf.replit.dev/colegas';
    const apiUrlSugestoes = 'https://22bbdc37-97b0-45bb-9f47-57bb3a05fc6a-00-2rdz3436bue6o.worf.replit.dev/sugestoes';

    // Função para carregar os dados dos colegas
    async function carregarColegas() {
        try {
            const response = await fetch(apiUrlColegas);
            if (!response.ok) {
                throw new Error('Erro ao carregar dados dos colegas');
            }
            const data = await response.json();

            // Seleciona o container onde os cards de colegas serão inseridos
            const colegasContainer = document.querySelector('.row.colegas');

            // Itera sobre os colegas e cria os cards dinamicamente
            data.forEach(colega => {
                const cardHTML = `
                    <div class="col-md-3 col-sm-6 mb-4 mx-5">
                        <div class="card h-100">
                            <img src="${colega.image}" alt="${colega.name}" />
                            <div class="card__content">
                                <a href="${colega.github}" target="_blank" class="card__title">${colega.name}</a>
                            </div>
                        </div>
                    </div>
                `;
                colegasContainer.innerHTML += cardHTML;
            });
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // Função para carregar os vídeos sugeridos
    async function carregarVideosSugeridos() {
        try {
            const response = await fetch(apiUrlSugestoes);
            if (!response.ok) {
                throw new Error('Erro ao carregar vídeos sugeridos');
            }
            const data = await response.json();

            // Limpar os slides existentes
            const slidesContainer = document.querySelector('.inner.carrosel');
            slidesContainer.innerHTML = '';

            // Iterar sobre os vídeos e criar os slides
            data.forEach((video, index) => {
                const slide = document.createElement('div');
                slide.classList.add('slide', `slide_${index + 1}`);
                slide.innerHTML = `
                <div class="slide-content">
                    <iframe width="914" height="514" src="https://www.youtube.com/embed/${video.videoId}" title="${video.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            `;
                slidesContainer.appendChild(slide);
            });

        } catch (error) {
            console.error('Erro ao carregar vídeos sugeridos:', error);
        }
    }

    // Função para carregar o perfil do GitHub
    async function carregarPerfil() {
        try {
            const response = await fetch('https://api.github.com/users/henriqueboson');
            if (!response.ok) {
                throw new Error('Erro ao carregar perfil do GitHub');
            }
            const data = await response.json();
            const img_github = document.getElementById('img_github');
            const name_github = document.getElementById('name');
            const info = document.getElementById("info")
            img_github.src = data.avatar_url
            name_github.textContent = data.name
            info.innerHTML = `
                <div>
                    <h2>${data.name}</h2>
                </div>
                <div class="text mt-4">
                    <p>${data.bio}</p>
                </div>
                <div class="info mt-4 fw-bold">
                    <p>Localização: <a href="#">${data.location}</a></p>
                    <p>Site: <a href="${data.html_url}" target="_blank">github.com/henriqueboson</a></p>
                    <p>Instagram: <a href="https://www.instagram.com/henriqueboson/" target="_blank">instagram.com/henriqueboson</a></p>
                    <p>LinkedIn: <a href="https://www.linkedin.com/in/henriqueboson/" target="_blank">linkedin.com/henriqueboson</a></p>
                </div>
            `
            
        } catch (error) {
            console.error('Erro ao carregar perfil do GitHub:', error);
        }
    }

    // Função para carregar os repositórios do GitHub
    async function carregarRepositorios() {
        try {
            const response = await fetch('https://api.github.com/users/henriqueboson/repos');
            if (!response.ok) {
                throw new Error('Erro ao carregar repositórios do GitHub');
            }
            const data = await response.json();
            const repositoriosGitHub = document.getElementById('repositorios-github');
            if (repositoriosGitHub) {
                data.forEach(repo => {
                    const repoElement = document.createElement('div');
                    repoElement.className = 'col-md-3 col-sm-6 mb-4';
                    repoElement.innerHTML = `
                        <div class="card h-100">
                            <a href="${repo.html_url}" target="_blank">
                                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="${repo.name}" style="width: 100%; height: auto;" />
                            </a>
                            <div class="card__content">
                                <a href="${repo.html_url}" target="_blank" class="card__title">${repo.name}</a>
                                <p class="card__description">${repo.description || ''}</p>
                            </div>
                        </div>`;
                    repositoriosGitHub.appendChild(repoElement);
                });
            }
        } catch (error) {
            console.error('Erro ao carregar repositórios do GitHub:', error);
        }
    }

    // Chamar a função para carregar os vídeos sugeridos ao carregar a página
    carregarVideosSugeridos();

    // Chama as funções para carregar perfil e repositórios
    carregarPerfil();
    carregarRepositorios();
    carregarColegas();
});
