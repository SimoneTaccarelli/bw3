function getArtistInfo(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    console.log(id);

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let tracklistUrl = data.tracklist;
        getPopularSongs(tracklistUrl);
        let imgContainer = document.getElementById("first-container-ab");
        imgContainer.style.backgroundImage = `url(${data.picture_xl})`;
        imgContainer.style.backgroundSize = 'cover';
        imgContainer.style.backgroundPosition = 'center';
        let nomeArtista = document.getElementById("nomeArtista-ab");
        nomeArtista.innerHTML = data.name;
    })
    .catch(error => console.log(error));
}

async function getPopularSongs(tracklistUrl){
    try{
        let response = await fetch(tracklistUrl);
        let data = await response.json();
        let popularSongs = data.data;
        popularSongs.sort((a, b) => b.rank - a.rank);
        
        let popularSongsContainer = document.getElementById("canzoni-popolari");
        popularSongsContainer.innerHTML = "<table class='table table-striped'> <thead><tr><th>Titolo</th><th>Rank</th><th>Durata</th></tr></thead><tbody>";
        popularSongs.forEach(song => {
            if(song.rank <= 5){ 
                popularSongsContainer.innerHTML += `<tr><td>${song.title}</td><td>${song.rank}</td><td>${song.duration}</td></tr>`;
            }
        });
        popularSongsContainer.innerHTML += "</tbody></table>";
    }catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getArtistInfo();
    getPopularSongs();
});


