async function getArtist(){
    try{
        let response = await fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen");
        let data = await response.json();
        let artist = data.data;
        let artistContainer = document.getElementById("artist-container");
        artist.forEach(artist => {
            artistContainer.innerHTML += `
                <div class="col-3">
                    <img src="${artist.artist.picture_medium}" alt="${artist.artist.name}">
                    <h3>${artist.artist.name}</h3>
                    <a href="artista.html?id=${artist.artist.id}"><button class="btn btn-primary">Vai alla pagina artista</button></a>
                </div>
            `;
        });
    }catch(error){
        console.log(error);
    }
}

getArtist();