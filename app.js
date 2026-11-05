const dialog = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-img');

async function initializeGallery() {
  const response = await fetch('gallery.json');
  if (!response.ok) throw new Error('Gallery unavailable');
  const groups = await response.json();

  groups.forEach(group => {
    const section = document.getElementById(group.id);
    const tabs = [...section.querySelectorAll('.variant-btn')];
    const stage = section.querySelector('.image-stage');
    const image = stage.querySelector('img');
    const panel = section.querySelector('[role="tabpanel"]');
    const link = section.querySelector('.image-original');
    let selected = group.variants[0];

    function choose(variant) {
      selected = variant;
      section.dataset.active = variant.key;
      tabs.forEach(tab => {
        const active = tab.dataset.key === variant.key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      image.src = variant.src;
      image.width = variant.width;
      image.height = variant.height;
      image.alt = group.title + ' — ' + variant.label;
      panel.setAttribute('aria-labelledby', 'tab-' + variant.key);
      section.querySelector('.current-version').textContent = variant.label;
      link.href = variant.src;
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => choose(group.variants[index]));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 :
          (index + (event.key === 'ArrowLeft' ? 1 : -1) + tabs.length) % tabs.length;
        choose(group.variants[next]);
        tabs[next].focus();
      });
    });

    choose(group.variants[0]);
    stage.addEventListener('click', () => {
      document.querySelector('#lightbox-label').textContent = group.title + ' — ' + selected.label;
      lightboxImage.src = selected.src;
      lightboxImage.alt = image.alt;
      document.querySelector('#lightbox-full').href = selected.src;
      dialog.showModal();
      document.body.classList.add('modal-open');
      dialog.querySelector('.lightbox-body').scrollTop = 0;
    });
  });
  document.documentElement.dataset.galleryReady = 'true';
}

document.querySelector('#close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
initializeGallery().catch(error => console.error(error));
