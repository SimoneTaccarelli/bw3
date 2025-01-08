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
        let count = 1;
        let popularSongsContainer = document.getElementById("canzoni-popolari");
        popularSongsContainer.innerHTML = `
            <table class='table table-striped '>
                <thead>
                    <tr>
                        <th>Popolari</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tabella-popolari">
        `;
        let tabella = document.getElementById("tabella-popolari");
        popularSongs.forEach(song => {
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
        
    }catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getArtistInfo();
});


