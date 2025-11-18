window.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bgVideo");

  // Auto-play with sound, no controls, no loop
  video.loop = false;
  video.muted = false;
  video.controls = false;

  // Try to play with sound; if blocked, start muted then unmute
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      video.muted = true;
      video.play().then(() => {
        setTimeout(() => (video.muted = false), 1000);
      });
    });
  }

  // Fade out credits after 68 seconds
  setTimeout(() => {
    document.getElementById("credits-container").style.opacity = "0";
  }, 68000);
});

