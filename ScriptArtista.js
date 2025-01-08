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
        
        // Rendi popularSongs globale
        window.popularSongs = popularSongs;
        
        mostraTop5(popularSongs);
        
    }catch(error){
        console.log(error);
    }
}

// Nuova funzione per mostrare le prime 5 canzoni
function mostraTop5(songs) {
    let count = 1;
    let popularSongsContainer = document.getElementById("canzoni-popolarix5");
    popularSongsContainer.innerHTML = `
        <table class='table table-striped'>
            <thead>
                <tr>
                    <th>Popolari</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tabella-popolarix5">
    `;
    let tabella = document.getElementById("tabella-popolarix5");
    songs.forEach(song => {
        if(count <= 5){
            let minute = Math.floor(song.duration / 60);
            let secondi = song.duration % 60;
            tabella.innerHTML += `
                <tr>
                    <td>${count}</td>
                    <td><img src="${song.album.cover_small}" alt="${song.album.title}"></td>
                    <td>${song.title}</td>
                    <td>${song.rank}</td>
                    <td>${minute}:${secondi}</td>
                </tr>`;
            count++;  
        }
    });
    popularSongsContainer.innerHTML += "</tbody></table>";
    popularSongsContainer.innerHTML += "<button id='btn-visualizza-altri-ST'>Visualizza altri</button>";
    popularSongsContainer.innerHTML += "<button id='riduci-ST' style='display: none;'>Riduci</button>";
    
    // Aggiungi gli event listener dopo aver creato i bottoni
    aggiungiEventListeners();
}

// Nuova funzione per mostrare tutte le canzoni
function visualizzaAltri(songs) {
    let popularSongsContainer = document.getElementById("canzoni-popolarix10");
    popularSongsContainer.style.display = "block";
    let popolarix5 = document.getElementById("canzoni-popolarix5");
    popolarix5.style.display = "none";

    popularSongsContainer.innerHTML = `
        <table class='table table-striped'>
            <thead>
                <tr>
                    <th>Popolari</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tabella-popolarix5">
    `;
    let tabella = document.getElementById("tabella-popolarix5");
    songs.forEach((song, index) => {
        if(index <= 10){
        let minute = Math.floor(song.duration / 60);
        let secondi = song.duration % 60;
        tabella.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${song.album.cover_small}" alt="${song.album.title}"></td>
                <td>${song.title}</td>
                <td>${song.rank}</td>
                <td>${minute}:${secondi}</td>
            </tr>`;
        }
    });
    popularSongsContainer.innerHTML += "</tbody></table>";
    popularSongsContainer.innerHTML += "<button id='btn-visualizza-altri-ST' style='display: none;'>Visualizza altri</button>";
    popularSongsContainer.innerHTML += "<button id='riduci-ST'>Riduci</button>";
    
    // Aggiungi gli event listener dopo aver creato i bottoni
    aggiungiEventListeners();
}

// Nuova funzione per gestire gli event listener
function aggiungiEventListeners() {
    let btnx10 = document.getElementById("btn-visualizza-altri-ST");
    let riducix5 = document.getElementById("riduci-ST");
    
    btnx10.addEventListener("click", function(){
        visualizzaAltri(window.popularSongs);
    });
    
    riducix5.addEventListener("click", function(){
        let popolarix10 = document.getElementById("canzoni-popolarix10");
        popolarix10.style.display = "none";
        let popolarix5 = document.getElementById("canzoni-popolarix5");
        popolarix5.style.display = "block";
    });
}

document.addEventListener("DOMContentLoaded", function(){
    getArtistInfo();
});





