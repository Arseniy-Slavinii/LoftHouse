// Selector for links that should trigger the YouTube lightbox
const linksBtnsSelector = 'a[data-youtubeLightbox]';

// Load YouTube API code asynchronously
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Boolean check for iOS devices
var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null;

var youtubelightbox = document.getElementById('youtubelightbox');
var player; // Variable to hold new YT.Player() instance

// Hide lightbox when clicked on
youtubelightbox.addEventListener(
	'click',
	function () {
		this.style.display = 'none';
		if (player) {
			player.stopVideo();
		}
	},
	false
);

// Exclude YouTube iframe from above action
youtubelightbox
	.querySelector('.youtubelightbox__centeredchild')
	.addEventListener(
		'click',
		function (e) {
			e.stopPropagation();
		},
		false
	);

// Define onYouTubeIframeAPIReady() function and initialize lightbox when API is ready
function onYouTubeIframeAPIReady() {
	console.log('YouTube API is ready');
	createlightbox();
}

// Extracts the YouTube video ID from a well-formed YouTube URL
function getyoutubeid(link) {
	var youtubeidreg =
		/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
	var match = youtubeidreg.exec(link);
	if (match && match[1]) {
		return match[1]; // Return YouTube video ID portion of link
	} else {
		console.error('Invalid YouTube URL:', link);
		return null;
	}
}

// Creates a new YT.Player() instance
function createyoutubeplayer(videourl) {
	player = new YT.Player('youtubelightboxPlayer', {
		videoId: videourl,
		playerVars: { autoplay: 1 },
	});
}

// Main YouTube lightbox function
function createlightbox() {
	var targetlinks = document.querySelectorAll(linksBtnsSelector);

	for (var i = 0; i < targetlinks.length; i++) {
		var link = targetlinks[i];
		var videoId = getyoutubeid(link.href);
		if (videoId) {
			link._videoid = videoId; // Store YouTube video ID portion of link inside _videoid property
			targetlinks[i].addEventListener(
				'click',
				function (e) {
					e.preventDefault();
					youtubelightbox.style.display = 'block';
					if (typeof player == 'undefined') {
						// If video player hasn't been created yet
						createyoutubeplayer(this._videoid);
					} else {
						if (isiOS) {
							// iOS devices can only use the "cue" related methods
							player.cueVideoById(this._videoid);
						} else {
							player.loadVideoById(this._videoid);
						}
					}
				},
				false
			);
		} else {
			console.error('Failed to extract video ID for link:', link);
		}
	}
}

// Check if `onYouTubeIframeAPIReady` is globally accessible
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;