const parallaxEl = document.querySelector('.parallax');
const loadingEl = document.querySelector('#loading');
const progressEl = document.querySelector('.loader .progress');
const bubblesEl = document.querySelector('.bubbles');

const bubble = function() {
	var bubble = document.createElement('div');
	bubble.className = 'bubble';
	bubble.style.bottom = (Math.random()*20) + '%';
	bubble.style.left = (Math.random()*100) + '%';
	bubble.style.zoom = Math.random()*2;
	bubblesEl.appendChild(bubble);
	setTimeout(function() {
		bubblesEl.removeChild(bubble);
	}, 2000);
}

const progressiveLoad = function(state, done) {
	if(state >= 100) return done && done();
	state += Math.round(Math.random()*25);
	var value = Math.max(0, Math.min(90, state));
	progressEl.style.top = (100-value) + '%';

	(state % 2) && bubble();
	setTimeout(progressiveLoad.bind(this, state, done), Math.random()*400);
}

const scrollSlide = function(from, to, duration, start, done) {
	start = start || performance.now();
	const now = performance.now();
	const time = Math.min(1, ((now - start) / duration));
	const timeFn = function(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 };
	parallaxEl.scrollTop = Math.ceil((timeFn(time) * (to - from)) + from);
	if(parallaxEl.scrollTop >= to) return done && done();

	requestAnimationFrame(scrollSlide.bind(this, from, to, duration, start, done));
}

progressiveLoad(0, function() {
	document.body.classList.remove('loading');
	scrollSlide(0, window.innerHeight, 1000, null, function() {
		loadingEl.classList.add('hidden');
	});
});