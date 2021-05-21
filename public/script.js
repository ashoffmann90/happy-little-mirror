const socket = io('/');

const videoGrid = document.getElementById('video-grid');

// We want to mute OUR video stream to prevent it from being played back to us
const myVideo = document.createElement('video');
myVideo.muted = true;

let myVideoStream;
// Allows us to grab video and audio from Chrome
navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true,
    })
    .then((stream) => {
        myVideoStream = stream;
        addVideoStream(myVideo, stream);
    })
    .catch((err) => console.log(err));

socket.emit('join-room', ROOM_ID);

socket.on('user-connected', () => {
    connectToNewUser();
});

const connectToNewUser = () => {
    console.log('new user');
};

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
};
