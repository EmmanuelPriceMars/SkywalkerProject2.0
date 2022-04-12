

export const player = document.querySelector('.player');

export const video = player.querySelector('.viewer');

export const progress = player.querySelector('.progress');

export const progressBar = player.querySelector('.progress__filled');

export const toggle = player.querySelector('.toggle');

export const skipButtons = player.querySelectorAll('[data-skip]');

export const ranges = player.querySelectorAll('.player__slider');


export function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

export function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';

    toggle.textContent = icon;
}

export function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

export function handleRangeUpdate() {
    video[this.name] = this.value;
}

export function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

export function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}


video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);

progress.addEventListener('mouseup', () => mousedown = false);