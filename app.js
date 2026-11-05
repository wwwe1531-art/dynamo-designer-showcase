const dialog = document.querySelector('#lightbox');
const availablePng = new Set();
const preview = key => 'assets/' + key + '.webp';
const full = key => 'assets/' + key + (availablePng.has(key) ? '.png' : '.webp');

document.querySelectorAll('.showcase-section').forEach(section => {
  const tabs = [...section.querySelectorAll('.variant-btn')];
  const stage = section.querySelector('.image-stage');
  const image = stage?.querySelector('img');
  const link = section.querySelector('.image-original');
  const title = section.querySelector('h2')?.textContent || '';
  if (!stage || !image || !tabs.length) return;

  function choose(button) {
    const key = button.dataset.key;
    section.dataset.active = key;
    tabs.forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    image.src = preview(key);
    image.alt = title + ' — ' + button.dataset.name;
    section.querySelector('.current-version').textContent = button.dataset.name;
    section.querySelector('.current-description').textContent = button.dataset.desc || '';
    link.href = full(key);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => choose(tab));
    tab.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const step = event.key === 'ArrowLeft' ? 1 : -1;
      const next = tabs[(i + step + tabs.length) % tabs.length];
      choose(next);
      next.focus();
    });
  });

  choose(tabs.find(tab => tab.classList.contains('is-active')) || tabs[0]);

  stage.addEventListener('click', () => {
    const key = section.dataset.active;
    dialog.querySelector('#lightbox-label').textContent =
      title + ' · ' + section.querySelector('.current-version').textContent;
    const lightboxImage = dialog.querySelector('#lightbox-img');
    lightboxImage.src = full(key);
    lightboxImage.alt = image.alt;
    dialog.querySelector('#lightbox-full').href = full(key);
    dialog.showModal();
    dialog.querySelector('.lightbox-body').scrollTop = 0;
  });
});
dialog.querySelector('#close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
