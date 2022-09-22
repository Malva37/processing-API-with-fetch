let getSel = sel => document.querySelector(sel);

function findMovie(title) {
    let url = `http://www.omdbapi.com/?i=tt3896198&apikey=75e59b65&s=${title}`
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.json()
                    .then(error => {
                        const e = new Error('wrong')
                        e.data = error;
                        throw e
                    })
            }
        })
        .then(data => {
            let newBox;
            let buttonsMoreDetails = [];
            for (let i = 0; i < data.Search.length; i++) {
                newBox = document.createElement('div');
                newBox.classList.add('movie');
                moreDetails = document.createElement('input');
                moreDetails.setAttribute('value', 'More details')
                moreDetails.classList.add('btn', 'btn-success', 'moreDetails');
                buttonsMoreDetails.push(moreDetails);
                let title = document.createElement('div');
                title.classList.add('title');
                let type = document.createElement('div');
                type.classList.add('type');
                let year = document.createElement('div');
                year.classList.add('year');
                let idMovie = document.createElement('div');
                idMovie.classList.add('idMovie');
                let picture = document.createElement('img');
                const element = data.Search[i];
                picture.style.backgroundImage = `url(${element.Poster})`;
                picture.classList.add('picture');
                idMovie.textContent = element.imdbID;
                title.textContent= element.Title;
                type.textContent= element.Type;
                year.textContent= element.Year;
                newBox.append(picture, title,  type, year, moreDetails, idMovie);
                getSel('main').appendChild(newBox);
            }

            for (let i = 0; i < buttonsMoreDetails.length; i++) {
                const element = buttonsMoreDetails[i];
                element.onclick = () => {
                    let id = element.nextSibling.textContent;
                    showMovie(id)
                    getSel('.modal').style.display = 'block';
                }
            }
        })
}

function showMovie(id) {
    let url = `http://www.omdbapi.com/?i=${id}&apikey=75e59b65`;
    getSel('.modalRatings').innerHTML = '<b>Ratings:</b>';
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json()
                    .then(error => {
                        const e = new Error('wrong');
                        e.data = error;
                        throw e
                    })
            }
        })
        .then(data => {
            getSel('.modalPoster img').src = data.Poster;
            getSel('.modalTitle').textContent = data.Title;
            getSel('.modalGenre').textContent = data.Genre;
            getSel('.modalDescription').textContent = data.Plot;
            getSel('.modalWriter').innerHTML = `<b>Written by: </b> ${data.Writer}`;
            getSel('.modalDirector').innerHTML = `<b>Directed by: </b> ${data.Director}`;
            getSel('.modalActors').innerHTML = `<b>Starring by: </b> ${data.Actors}`;
            getSel('.modalBoxOffice').innerHTML = `<b>BoxOffice by: </b> ${data.BoxOffice}`;
            getSel('.modalAwards').innerHTML = `<b>Awards by: </b> ${data.Awards}`;
            for (let j = 0; j < data.Ratings.length; j++) {
                let rating = document.createElement('div');
                rating.textContent = `${data.Ratings[j].Source}: ${data.Ratings[j].Value}`;
                getSel('.modalRatings').appendChild(rating);
            }
        })
}
getSel('.findBtn').onclick = () => {
    let title = getSel('.findMovie').value;
    findMovie(title);
}
getSel('.modal').onclick = () => {
    getSel('.modal').style.display = 'none';
}