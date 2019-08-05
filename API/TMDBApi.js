
// The Movie Database, site collaboratif qui recense tous les films sortis


const API_TOKEN = "f73d32a0b9fb2864b5b69f53a6ebab79" //clé récupéré sur le site

export function getFilmsFromApiWithSearchedText(text, page){ //Fonction pour appeller l'API
    const url ="https://api.themoviedb.org/3/search/movie?api_key=" + API_TOKEN + "&language=fr&query=" + text + '&page=' + page
    //url à appeller pour récup les datas
    return fetch(url) //appel api
        .then((response) => response.json() )
        .catch((error) => console.log(error))
}

export function getImageFromApi(name){ //récuperer l'URL complet de l'image
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi(id){
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN +'&language=fr'
    //URL pour récup le détail du film
    return fetch(url) //appel api
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
