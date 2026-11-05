const dialog=document.querySelector('#lightbox');
const manifest={};
for(const img of document.querySelectorAll('.image-stage img')){const s=img.closest('.showcase-section');const active=s.querySelector('.variant-btn.is-active');const key=active?.dataset.key; if(key){s.dataset.active=key;}}
const setVariant=(section,btn)=>{
  const key=btn.dataset.key;
  const image=section.querySelector('.image-stage img');
  const current=section.dataset.active;
  if(current===key)return;
  section.dataset.active=key;
  const list=section.querySelectorAll('.variant-btn');
  list.forEach(b=>{const on=b===btn;b.classList.toggle('is-active',on);b.setAttribute('aria-selected',String(on));});
  const url=`assets/${key}.webp`, full=`assets/${key}.png`;
  image.src=url;
  image.alt=`${section.querySelector('h2').textContent} — ${btn.dataset.name}`;
  section.querySelector('.current-version').textContent=btn.dataset.name;
  section.querySelector('.current-description').textContent=btn.dataset.desc;
  section.querySelector('.image-original').href=full;
};
for(const section of document.querySelectorAll('.showcase-section')){
  section.querySelectorAll('.variant-btn').forEach(btn=>btn.addEventListener('click',()=>setVariant(section,btn)));
  section.querySelector('.image-stage').addEventListener('click',()=>{
    const key=section.dataset.active;
    dialog.querySelector('#lightbox-label').textContent=`${section.querySelector('h2').textContent} · ${section.querySelector('.current-version').textContent}`;
    const image=dialog.querySelector('#lightbox-img');image.src=`assets/${key}.png`;image.alt=section.querySelector('h2').textContent;
    dialog.querySelector('#lightbox-full').href=`assets/${key}.png`;
    dialog.showModal();
    dialog.querySelector('.lightbox-body').scrollTop=0;
  });
}
dialog.querySelector('#close-lightbox').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
