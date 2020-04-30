const progressEl = document.querySelector('.loader .progress');
const layerStartEl = document.querySelector('.layer-start');
const bubblesEl = layerStartEl.querySelector('.bubbles');
const layerArticleEl = document.querySelector('.layer-article');

const progress = function(value) {
	value = Math.max(0, Math.min(90, value));
	progressEl.style.top = (100-value) + '%';
}

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

const progressiveLoad = function(state) {
	if(state >= 100) return loaded();
	state += Math.round(Math.random()*5);
	progress(state);
	(state % 2) && bubble();
	setTimeout(progressiveLoad.bind(this, state), Math.random()*400);
}

const loaded = function() {
	document.body.classList.add('loaded');
	layerArticleEl.classList.add('slide-show');
	layerStartEl.classList.add('slide-hide');	
}
progressiveLoad(0);

