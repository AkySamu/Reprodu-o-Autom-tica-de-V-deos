let loopActive = true; // Começa com loop ativo
let player;

// Carregar API do YouTube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let currentVideoId = getVideoIdFromUrl(document.getElementById('ytplayer').src);

function getVideoIdFromUrl(url) {
    // Aceita links normais, encurtados e embed
    let regExp = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    let match = url.match(regExp);
    return match ? match[1] : '';
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    if (loopActive) {
        event.target.playVideo();
    }
}

function onPlayerStateChange(event) {
    if (loopActive && event.data === YT.PlayerState.ENDED) {
        player.seekTo(0);
        player.playVideo();
    }
}


const loopBtn = document.getElementById('loopBtn');
loopBtn.classList.toggle('active', loopActive);
loopBtn.textContent = loopActive ? 'Desativar Loop Infinito' : 'Ativar Loop Infinito';

loopBtn.addEventListener('click', function() {
    loopActive = !loopActive;
    this.classList.toggle('active', loopActive);
    this.textContent = loopActive ? 'Desativar Loop Infinito' : 'Ativar Loop Infinito';
    if (loopActive) {
        player.playVideo();
    } else {
        player.pauseVideo();
    }
});

// Carregar novo vídeo ao clicar no botão
document.getElementById('loadBtn').addEventListener('click', function() {
    const url = document.getElementById('youtubeUrl').value.trim();
    const videoId = getVideoIdFromUrl(url);
    if (videoId) {
        currentVideoId = videoId;
        player.loadVideoById(videoId);
    } else {
        alert('Link do YouTube inválido!');
    }
});
