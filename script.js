// ambil element yang dibutuhkan
let keyword = document.querySelector('.input-keyword');
let searchButton = document.querySelector('.search-button');
let container = document.querySelector('.container');
let movieContainer = document.querySelector('.movie-container'); // Added movieContainer selection

// tambahkan event ketika keyword ditulis
keyword.addEventListener('keyup', function () {
    // buat objek ajax
    let xhr = new XMLHttpRequest();

    // cek kesiapan ajax
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            updateUI(JSON.parse(xhr.responseText).Search); // Parse the JSON response
        }
    };

    // eksekusi ajax
    xhr.open('GET', 'https://www.omdbapi.com/?apikey=1fbac63a&s=' + keyword.value, true);
    xhr.send();
});

// event binding
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('modal-detail-button')) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    };
});

async function getMovieDetail(imdbid) { // Added 'async' keyword
    const response = await fetch('https://www.omdbapi.com/?apikey=1fbac63a&i=' + imdbid); // Added 'await' keyword
    const data = await response.json(); // Added 'await' keyword
    return data;
};

function updateUIDetail(m) {
    const movieDetail = showDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
};

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    movieContainer.innerHTML = cards; // Changed 'movieContainer' to 'container'
};

function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" 
                        data-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show details</a>
                    </div>
                </div>
            </div>`;
};

function showDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                            <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors :</strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot :</strong> <br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
};
