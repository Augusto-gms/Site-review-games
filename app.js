/**
 * Arquivo de dados e lógica principal do GameReview.
 * Contém dados fictícios (mock data) para reviews e comunidades e funções para renderizar o HTML dinamicamente.
 */

// --- Dados dos Reviews ---
const reviewsData = [
    {
        id: "darksouls",
        title: "Dark Souls",
        score: 9,
        image: "https://picsum.photos/id/1025/200/200", // URL fictícia da imagem
        description: "Um jogo desafiador, sombrio e extremamente recompensador. Os detalhes do review incluem análise de combate, nível de dificuldade e o design de mundo interconectado que se tornou marca registrada da série.",
        // Este URL já está configurado para passar o ID
        detailsUrl: "detalhes.html?game=darksouls", 
        communityId: "soulslike_fans" 
    },
    {
        id: "zelda_botw",
        title: "Zelda: Breath of the Wild",
        score: 10,
        image: "https://picsum.photos/id/1035/200/200", // URL fictícia da imagem
        description: "Mundo aberto incrível, liberdade total e muitas aventuras. A física e a química do jogo permitem que os jogadores abordem problemas de maneiras criativas e inesperadas.",
        // Este URL já está configurado para passar o ID
        detailsUrl: "detalhes.html?game=zelda_botw",
        communityId: "nintendo_fans" 
    }
    // Adicione mais reviews aqui conforme necessário
];

// --- Dados das Comunidades ---
const communitiesData = [
    {
        id: "fifa_lovers",
        name: "FIFA Lovers",
        image: "https://picsum.photos/id/1040/200/200", // URL fictícia da imagem
        members: 5200 
    },
    {
        id: "soulslike_fans",
        name: "Soulslike Fans",
        image: "https://picsum.photos/id/1041/200/200",
        members: 810
    },
    {
        id: "hollow_knight",
        name: "Hollow Knight",
        image: "https://picsum.photos/id/1042/200/200",
        members: 345
    },
    {
        id: "minecraft_br",
        name: "Minecraft",
        image: "https://picsum.photos/id/1043/200/200",
        members: 9800
    },
    {
        id: "nintendo_fans",
        name: "Nintendo Fans",
        image: "https://picsum.photos/id/237/200/200",
        members: 2500
    }
    // Adicione mais comunidades aqui conforme necessário
];


function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return; 

    let htmlContent = '';
    reviewsData.forEach(review => {
        // O link (<a>) usa a propriedade detailsUrl do objeto de dados
        htmlContent += `
            <div class="col-md-6">
                <article class="review card p-3 h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="d-flex align-items-start mb-3">
                            <img src="${review.image}" class="me-3 rounded-circle" alt="Capa do jogo ${review.title}">
                            <div>
                                <h3>${review.title}</h3>
                                <p class="m-0"><strong>Nota:</strong> ${review.score}/10</p>
                            </div>
                        </div>
                        <p>${review.description}</p>
                    </div>
                    <a href="${review.detailsUrl}" class="btn btn-primary mt-2 w-100">Ver Detalhes</a>
                </article>
            </div>
        `;
    });
    container.innerHTML = htmlContent;
}

function renderCommunities() {
    const container = document.getElementById('communities-container');
    if (!container) return;

    let htmlContent = '';
    communitiesData.forEach(community => {
        htmlContent += `
            <div class="col-6 col-md-3">
                <article class="comunidade card text-center p-3">
                    <img src="${community.image}" class="rounded-circle mx-auto mb-2" alt="Comunidade ${community.name}">
                    <h3>${community.name}</h3>
                    <button class="btn btn-dark mt-2">Entrar</button>
                </article>
            </div>
        `;
    });
    container.innerHTML = htmlContent;
}


function loadReviewDetails() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('game');
    
    if (!gameId) {
        document.getElementById('review-details-container').innerHTML = '<h1 class="text-danger">Erro: Jogo não especificado!</h1>';
        return;
    }

    const review = reviewsData.find(r => r.id === gameId);

    if (!review) {
        document.getElementById('review-details-container').innerHTML = `<h1 class="text-danger">Review para o jogo "${gameId}" não encontrado.</h1>`;
        return;
    }

    const community = communitiesData.find(c => c.id === review.communityId);

    const reviewContainer = document.getElementById('review-details-container');
    document.title = `GameReview | ${review.title}`;
    
    reviewContainer.innerHTML = `
        <div class="row g-4 align-items-center mb-4">
            <div class="col-md-4 text-center">
                <img src="${review.image}" class="img-fluid rounded shadow" alt="Capa de ${review.title}" style="max-height: 250px; width: auto;">
            </div>
            <div class="col-md-8">
                <h1 class="display-4">${review.title}</h1>
                <p class="lead"><strong>Nota Geral:</strong> <span class="badge bg-success fs-5">${review.score}/10</span></p>
            </div>
        </div>
        <div class="p-3 border-top mt-3">
            <h3>Análise Completa</h3>
            <p class="fs-5">${review.description}</p>
        </div>
        <a href="index.html" class="btn btn-secondary mt-4 w-100">Voltar para a Home</a>
    `;

    const communityContainer = document.getElementById('community-details-container');
    if (community) {
        communityContainer.innerHTML = `
            <article class="comunidade card text-center p-3">
                <img src="${community.image}" class="rounded-circle mx-auto mb-3" alt="Comunidade ${community.name}" style="width: 100px; height: 100px; object-fit: cover;">
                <h3>${community.name}</h3>
                <p class="text-muted">${community.members.toLocaleString('pt-BR')} membros</p>
                <button class="btn btn-primary mt-2">Entrar na Comunidade</button>
            </article>
        `;
    } else {
         communityContainer.innerHTML = `
            <p class="text-muted">Nenhuma comunidade relacionada encontrada para este jogo.</p>
        `;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('detalhes.html')) {
        loadReviewDetails();
    } else {
        renderReviews();
        renderCommunities();
    }
});