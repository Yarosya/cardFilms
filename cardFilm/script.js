const cardItems = document.querySelector(".cards__items");
const modal = document.querySelector(".modal");
const modalC = document.querySelector(".modal__content");
console.log(modal);

function filmView(id, img, title, year, genres) {
    const getGenres = genres
        .map((genresValue) => genresValue.genre)
        .join(`, `);

    const card = `
        <div class="cards__item ">
          <img src="${img}" class="cards__item-img" alt="CARD-item">
            <a href="#"class = 'cards__item-title' data-id = '${id}'>
              ${title}
               </a>
               <div class="cards__item-info">
                <p class="cards__item-genre">${getGenres}</p>
                <p class="cards__item-year">${year}</p>
               
                 </div>
        </div> `;
    cardItems.insertAdjacentHTML("beforeend", card);
}
let promise = fetch(
    "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1", {
        method: "GET",
        headers: {
            "X-API-KEY": "46878580-b52c-435f-aea1-be02a024f3a8",
            "Content-Type": "application/json",
        },
    }
);
promise
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        data.films.map(({ filmId, posterUrl, nameRu, year, genres }) => {
            filmView(filmId, posterUrl, nameRu, year, genres);
        });
    });

cardItems.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.tagName == 'A') {
        modal.style.display = "block";
        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = "none"
                modalC.innerHTML = ''
            }
        })

        let idFilm = e.target.getAttribute('data-id');
        let promiseModal = fetch(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/${idFilm}`, {
                method: "GET",
                headers: {
                    "X-API-KEY": "46878580-b52c-435f-aea1-be02a024f3a8",
                    "Content-Type": "application/json",
                },
            }
        );
        promiseModal
            .then((response) => response.json())
            .then((data) => {
                filmModalView(data)
            })
    }
})

function filmModalView(film) {
    console.log(film.ratingImdb);
    let modalContent = `
    <div class="modal__info">
                    <div class="modal__img">
                    <img src="${film.posterUrl}" class = "modal-img"alt="">
                    </div>
                   
                    <div class="modal__info-content">
                    <ul>
                        <li>${film.nameOriginal}</li>
                        <li>${film.description}</li>
                        <li>${film.shortDescription}</li>
                        <li>TV critics rating: ${film.ratingFilmCritics}</li>
                        <li> Rating Kinopoisk: ${film.ratingKinopoisk}</li>
                        <li>Year of issue: ${film.year}</li>
                    </ul>
                </div>

     </div>

    `;


    modalC.insertAdjacentHTML("beforeend", modalContent);

}