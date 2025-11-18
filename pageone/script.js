document.querySelectorAll('.sprite-container').forEach(sprite => {
  sprite.addEventListener('click', () => {
    const bubble = sprite.querySelector('.speech-bubble');
    const character = sprite.querySelector('.sprite');

    // show text
    bubble.style.display = 'block';
    character.classList.add('active');

    // hide text and reset animation after 1s
    setTimeout(() => {
      bubble.style.display = 'none';
      character.classList.remove('active');
    }, 1000);
  });
});
