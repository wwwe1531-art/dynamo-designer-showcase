const lightbox = document.querySelector('#lightbox');
const image = document.querySelector('#lightbox-image');
const title = document.querySelector('#lightbox-title');
const original = document.querySelector('#open-original');

document.querySelectorAll('.zoom').forEach(button => {
  button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.dataset.title;
    title.textContent = button.dataset.title;
    original.href = button.dataset.image;
    lightbox.showModal();
    lightbox.querySelector('.lightbox-scroll').scrollTop = 0;
    document.body.classList.add('modal-open');
  });
});
document.querySelector('#close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('close', () => document.body.classList.remove('modal-open'));
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) {
    const bounds = lightbox.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) lightbox.close();
  }
});
