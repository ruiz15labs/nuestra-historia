const reasons = [
  "Te elegiría porque eres una mujer que realmente vale la pena. Si la vida me pusiera otra vez frente a ti y me diera a elegir entre tú y cualquier otra persona, creo que volvería a elegirte a ti.",
  "Te elegiría porque fuiste mi lugar seguro. Porque contigo pude ser yo, sin tener que aparentar nada, y me sentí libre de querer, de reír, de hacer el tonto y de mostrarte partes de mí que no había mostrado antes.",
  "Te elegiría por tus ojos. Desde aquella primera vez hubo algo que no sé explicar. Siempre me encantó mirarte. Incluso cuando estabas dormida, podía quedarme un rato observándote y pensar en lo increíble que era tenerte ahí conmigo.",
  "Te elegiría porque lo que pasó entre nosotros se sintió diferente desde el principio. Hubo una conexión que yo nunca había sentido con nadie. Todo empezó con una mirada, una fresa y un simple “hola”, y terminó convirtiéndose en una parte enorme de mi vida.",
  "Te elegiría porque apareciste cuando yo no estaba buscando a nadie. Yo no estaba pensando en enamorarme ni en compartir mi vida con alguien. Y llegaste tú, sin avisar, y cambiaste completamente esa idea.",
  "Te elegiría porque sé que no fui perfecto. Sé que fallé y que hubo momentos en los que pude haberte hecho sentir cosas que nunca quise provocarte. Pero aun así decidiste intentarlo conmigo. Incluso después de nuestros errores, hubo una parte de ti que quiso darnos otra oportunidad, y eso nunca voy a dejar de valorarlo.",
  "Te elegiría porque eres una mujer luchadora. Admiro esa manera tuya de seguir adelante, de buscar lo que quieres y no esperar a que alguien venga a hacerlo por ti. Esa mujer que eres, con tu carácter, tus ideas, tus cosas buenas y tus cosas no tan buenas, es precisamente la mujer que aprendí a amar.",
  "Y quizá esa sea una de las razones más importantes: entre todas las personas que pude haber conocido, la vida hizo que te encontrara a ti. Y si pudiera volver al principio, sabiendo todo lo que sé ahora, volvería a caminar hacia aquel puesto de fresas, volvería a decirte “hola” y volvería a elegirte."
];

const songs = [
  {title:"CON UN BESO", artist:"KHEA", id:"4c0sHnOrLTGtzmSm9pj9sE", text:"Una canción que quedó ligada a esa parte de nosotros que empezó con un beso y terminó convirtiéndose en mucho más."},
  {title:"Eazt", artist:"Jay Wheeler", id:"3rEzO2Zj7srV4bK1Q07Cay", text:"Una de esas canciones que pueden quedarse asociadas a una etapa, a una sensación y a la persona con la que la viviste."},
  {title:"Te Quiero Así", artist:"Jay Wheeler", id:"4rXnC48NKyCzmtW9omA4rJ", text:"Porque hay canciones que no necesitan explicar toda una historia: basta escucharlas para que una persona aparezca en la memoria."},
  {title:"Me Enamoré", artist:"Jay Wheeler, DJ Nelson", id:"00nvL9u5K8jEJ6TSxGdtPK", text:"Porque hay canciones que parecen decir en voz alta algo que uno ya llevaba tiempo sintiendo por dentro."}
];


document.addEventListener("DOMContentLoaded", () => {
  const MEDIA_DATA = window.MEDIA || {photos:[], videos:[], videoStills:[]};
  const photos = [...(MEDIA_DATA.photos || []), ...(MEDIA_DATA.videoStills || [])];
  const videos = MEDIA_DATA.videos || [];
  const photoCount = document.getElementById("photoCount");
  if (photoCount) photoCount.textContent = `${photos.length} recuerdos`;
  setupCarousel("photoTrack","photoCounter",photos,"image");
  setupCarousel("videoTrack","videoCounter",videos,"video");
  renderReasons();
  renderSongs();

  function startDurationCounter(){
    const main=document.getElementById("durationMain");
    const h=document.getElementById("durationHours"), m=document.getElementById("durationMinutes"), sec=document.getElementById("durationSeconds");
    if(!main||!h||!m||!sec) return;
    const start=new Date(2023,7,15,0,0,0);
    function diffCalendar(from,to){
      let years=to.getFullYear()-from.getFullYear();
      let anchor=new Date(from); anchor.setFullYear(from.getFullYear()+years);
      if(anchor>to){years--; anchor=new Date(from); anchor.setFullYear(from.getFullYear()+years);}
      let months=to.getMonth()-anchor.getMonth();
      if(months<0) months+=12;
      let monthAnchor=new Date(anchor); monthAnchor.setMonth(anchor.getMonth()+months);
      if(monthAnchor>to){months--; monthAnchor=new Date(anchor); monthAnchor.setMonth(anchor.getMonth()+months);}
      const days=Math.floor((to-monthAnchor)/86400000);
      return {years,months,days};
    }
    function update(){
      const now=new Date();
      const d=diffCalendar(start,now);
      const elapsed=Math.max(0,now-start);
      const totalSeconds=Math.floor(elapsed/1000);
      const seconds=totalSeconds%60;
      const minutes=Math.floor(totalSeconds/60)%60;
      const hours=Math.floor(totalSeconds/3600)%24;
      main.textContent=`${d.years} años · ${d.months} meses · ${d.days} días`;
      h.textContent=String(hours).padStart(2,"0");
      m.textContent=String(minutes).padStart(2,"0");
      sec.textContent=String(seconds).padStart(2,"0");
    }
    update(); setInterval(update,1000);
  }
  startDurationCounter();

  document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener("click", e => {
    const t=document.querySelector(a.getAttribute("href"));
    if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"});}
  }));

  function renderReasons(){
    const track=document.getElementById("reasonsList"), counter=document.getElementById("reasonCounter");
    const carousel=track?.closest(".reasons-carousel"); if(!track||!counter||!carousel) return;
    let index=0;
    reasons.forEach((text,i)=>{
      const card=document.createElement("article"); card.className="reason-card";
      const num=document.createElement("div"); num.className="reason-big-number"; num.textContent=String(i+1).padStart(2,"0");
      const label=document.createElement("div"); label.className="reason-word"; label.textContent="PORQUE";
      const body=document.createElement("p"); body.textContent=text;
      card.append(num,label,body); track.appendChild(card);
    });
    carousel.querySelector(".prev").addEventListener("click",()=>move(index-1));
    carousel.querySelector(".next").addEventListener("click",()=>move(index+1));
    const viewport=carousel.querySelector(".reason-viewport"); let sx=0,sy=0;
    viewport.addEventListener("touchstart",e=>{sx=e.changedTouches[0].clientX;sy=e.changedTouches[0].clientY;},{passive:true});
    viewport.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))move(index+(dx<0?1:-1));},{passive:true});
    function move(n){index=Math.max(0,Math.min(reasons.length-1,n));track.style.transform=`translate3d(-${index*100}%,0,0)`;counter.textContent=`${index+1} / ${reasons.length}`;}
    move(0);
  }

  function renderSongs(){
    const track=document.getElementById("songsList"), counter=document.getElementById("songCounter"), carousel=track?.closest(".songs-carousel");
    if(!track||!counter||!carousel) return;
    let index=0;
    songs.forEach((song,i)=>{
      const card=document.createElement("article"); card.className="song-card";
      card.innerHTML=`<div class="song-number">${String(i+1).padStart(2,"0")}</div><div class="song-info"><h3>${song.title}</h3><p>${song.artist}</p><span>${song.text}</span></div><iframe src="https://open.spotify.com/embed/track/${song.id}?utm_source=generator&theme=0" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="${song.title} — ${song.artist}"></iframe>`;
      track.appendChild(card);
    });
    carousel.querySelector(".prev").addEventListener("click",()=>move(index-1));
    carousel.querySelector(".next").addEventListener("click",()=>move(index+1));
    const viewport=carousel.querySelector(".song-viewport"); let sx=0,sy=0;
    viewport.addEventListener("touchstart",e=>{sx=e.changedTouches[0].clientX;sy=e.changedTouches[0].clientY;},{passive:true});
    viewport.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))move(index+(dx<0?1:-1));},{passive:true});
    function move(n){index=Math.max(0,Math.min(songs.length-1,n));track.style.transform=`translate3d(-${index*100}%,0,0)`;counter.textContent=`${index+1} / ${songs.length}`;}
    move(0);
  }

  function setupCarousel(trackId,counterId,items,type){
    const track=document.getElementById(trackId), counter=document.getElementById(counterId);
    if(!track||!counter) return;
    if(!items.length){counter.textContent="No hay archivos cargados";return;}
    let index=0;
    items.forEach((item,i)=>{
      const slide=document.createElement("article"); slide.className="carousel-slide";
      if(type==="image"){
        const img=document.createElement("img");
        img.src=item.url; img.alt=`Recuerdo ${i+1}`;
        img.loading=i===0?"eager":"lazy"; img.decoding="async";
        img.addEventListener("click",()=>openImage(item.url,img.alt));
        slide.appendChild(img);
      }else{
        const video=document.createElement("video");
        video.controls=true; video.playsInline=true;
        video.preload=i===0?"metadata":"none";
        if(item.poster) video.poster=item.poster;
        const source=document.createElement("source"); source.src=item.url; source.type="video/mp4";
        video.appendChild(source);
        video.addEventListener("play",()=>{
          document.querySelectorAll("video").forEach(v=>{if(v!==video)v.pause();});
        });
        slide.appendChild(video);
      }
      track.appendChild(slide);
    });

    const carousel=track.closest(".media-carousel"), viewport=carousel.querySelector(".carousel-viewport");
    carousel.querySelector(".prev").addEventListener("click",()=>move(index-1));
    carousel.querySelector(".next").addEventListener("click",()=>move(index+1));
    let sx=0,sy=0;
    viewport.addEventListener("touchstart",e=>{sx=e.changedTouches[0].clientX;sy=e.changedTouches[0].clientY;},{passive:true});
    viewport.addEventListener("touchend",e=>{
      const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
      if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))move(index+(dx<0?1:-1));
    },{passive:true});

    function move(n){
      index=Math.max(0,Math.min(items.length-1,n));
      track.style.transform=`translate3d(-${index*100}%,0,0)`;
      counter.textContent=`${index+1} / ${items.length}`;
      track.querySelectorAll("video").forEach(v=>v.pause());
    }
    move(0);
  }

  function openImage(src,alt){
    const overlay=document.createElement("div");
    overlay.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.94);display:flex;align-items:center;justify-content:center;padding:18px;z-index:1000;cursor:zoom-out";
    const img=document.createElement("img"); img.src=src; img.alt=alt;
    img.style.cssText="max-width:100%;max-height:100%;object-fit:contain;border-radius:12px";
    overlay.appendChild(img);
    overlay.addEventListener("click",()=>overlay.remove());
    document.body.appendChild(overlay);
  }
});
