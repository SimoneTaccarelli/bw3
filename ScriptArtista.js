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
        imgContainer.style.backgroundPosition = '100% 30%';
        imgContainer.style.height = '50vh';
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
    let popolarix5 = document.getElementById("canzoni-popolarix5");
    let count = 1;
    popolarix5.innerHTML = `
        <table class='table'>
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
                    <td>${song.title.substring(0, 40)}...</td>
                    <td>${song.rank}</td>
                    <td>${minute}:${secondi}</td>
                </tr>`;
            count++;  
        }
    });
    popolarix5.innerHTML += "</tbody></table>";
    popolarix5.innerHTML += "<button id='btn-visualizza-altri-ST'>Visualizza altro</button>";
    
    
    // Aggiungi gli event listener dopo aver creato i bottoni
    aggiungiEventListeners();
}

// Nuova funzione per mostrare tutte le canzoni
function visualizzaAltri(songs) {
    let popolarix10 = document.getElementById("canzoni-popolarix10");
    let popolarix5 = document.getElementById("canzoni-popolarix5");
    
    // Mostra popolarix10 e nascondi popolarix5
    popolarix10.classList.remove("d-none");
    popolarix10.classList.add("d-block");
    popolarix5.classList.remove("d-block");
    popolarix5.classList.add("d-none");
   

    let count = 1
    popolarix10.innerHTML = `
        <table class='table'>
            <thead>
                <tr>
                    <th>Popolari</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tabella-popolarix10">
    `;
    let tabella = document.getElementById("tabella-popolarix10");
    songs.forEach((song) => {
        if(count <= 10){
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
    popolarix10.innerHTML += "</tbody></table>";
    popolarix10.innerHTML += "<button id='btn-visualizza-altri-ST' style='display: none;'>Visualizza altro</button>";
    popolarix10.innerHTML += "<button id='riduci-ST'>Riduci</button>";
    
    // Aggiungi gli event listener dopo aver creato i bottoni
    aggiungiEventListeners();
}


function riduci(){
    let popolarix10 = document.getElementById("canzoni-popolarix10");
    let popolarix5 = document.getElementById("canzoni-popolarix5");
    
    // Mostra popolarix5 e nascondi popolarix10
    popolarix5.classList.remove("d-none");
    popolarix5.classList.add("d-block");
    popolarix10.classList.remove("d-block");
    popolarix10.classList.add("d-none");
    
}
// Nuova funzione per gestire gli event listener
function aggiungiEventListeners() {
    let btnx10 = document.getElementById("btn-visualizza-altri-ST");
    let riducix5 = document.getElementById("riduci-ST");
    
    btnx10.addEventListener("click", function(){
        visualizzaAltri(window.popularSongs);
    });
    
    riducix5.addEventListener("click", function(){
         riduci();
    });
}

document.addEventListener("DOMContentLoaded", function(){
    getArtistInfo();
});





