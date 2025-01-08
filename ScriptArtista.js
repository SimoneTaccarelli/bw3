document.addEventListener("DOMContentLoaded", function(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    console.log(id);

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let url = data.tracklist;
        getPopularSongs(url);
    })
    .catch(error => console.log(error));
});

function getPopularSongs(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let popularSongs = data.data;
        popularSongs.sort((a, b) => b.rank - a.rank);
        
        let popularSongsContainer = document.getElementById("popular-songsST");
        popularSongs.forEach(song => {
            popularSongsContainer.innerHTML += `<li>${song.title} ${song.rank} ${song.duration}</li>`;
        });
        
    })
    .catch(error => console.log(error));
}


