let getSel = sel => document.querySelector(sel);

function findMovie(method, title) {
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
            console.log(data.Search);
            let newBox;
            for (let i = 0; i < data.Search.length; i++) {
                newBox = document.createElement('div');
                newBox.classList.add('movie');
                let details = document.createElement('div');
                details.classList.add('details');
                let title = document.createElement('h1');
                title.classList.add('title');
                let year = document.createElement('h3');
                year.classList.add('year');
                console.log(year);
                let idMovie = document.createElement('h3');
                idMovie.classList.add('idMovie');
                let picture = document.createElement('div');
                const element = data.Search[i];
                console.log(element);
                picture.style.backgroundImage = `url(${element.Poster})`;
                picture.classList.add('picture');
                year.textContent = element.Year;
                title.textContent = element.Title;
                idMovie.textContent = element.imdbID;
                details.appendChild(year);
                details.appendChild(idMovie);
                newBox.appendChild(title);
                newBox.appendChild(details);
                newBox.appendChild(picture);
                getSel('main').appendChild(newBox);
                console.log(newBox);
            }
        })
}
getSel('.findBtn').onclick = () => {
    let title = getSel('.findMovie').value;
    findMovie('GET', title)
        .then(result => console.log(result))
        .catch(error => console.log(error))
}