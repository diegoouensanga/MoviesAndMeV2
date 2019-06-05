
const API_TOKEN = "f73d32a0b9fb2864b5b69f53a6ebab79"

export function getFilmsFromApiWithSearchedText(text){
    const url ="https://api.themoviedb.org/3/search/movie?api_key=" + API_TOKEN + "&language=fr&query=" + text
return fetch(url)
    .then((response) => response.json() )
    .catch((error) => console.log(error))
}

