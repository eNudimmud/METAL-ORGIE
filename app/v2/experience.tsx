'use client';
/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from 'react';
import { withBasePath } from '@/lib/base-path';
import { Picture } from './picture';
import { categories, categoryLabel, getPhoto, noteFor, photos, series, seriesFor, type Photo } from './data';
import s from './v2.module.css';

const HOME = withBasePath('/v2/');
const GALLERY = withBasePath('/v2/realisations/');
const STORAGE = 'metalorgie-inspirations-v2';
let temporarySaved = '[]';
function subscribeSaved(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('metalorgie-carnet-change', callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener('metalorgie-carnet-change', callback); };
}
function savedSnapshot() { try { return localStorage.getItem(STORAGE) ?? temporarySaved; } catch { return temporarySaved; } }
function subscribeLocation(callback: () => void) { window.addEventListener('popstate', callback); return () => window.removeEventListener('popstate', callback); }
function categorySnapshot() { const value = new URLSearchParams(window.location.search).get('famille'); return categories.some(c => c.id === value) ? value! : 'all'; }
const materialCopy = [
  'De la structure à la pièce de caractère. Une matière pour dessiner des lignes, porter des volumes et donner corps à une idée.',
  'Des reflets, une ligne nette, le soin des finitions. L’inox s’exprime aussi bien dans l’espace que dans les détails.',
  'La légèreté ouvre d’autres possibilités. Le choix de la matière se fait avec Guillaume, selon votre projet et son usage.',
];
export function Arrow({ direction = 'up' }: { direction?: 'up' | 'right' | 'down' | 'left' }) {
  const rotations = { up: 0, right: 45, down: 135, left: 225 };
  return <svg className={s.arrow} style={{ transform: `rotate(${rotations[direction]}deg)` }} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" /></svg>;
}
function Plus({ saved = false }: { saved?: boolean }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d={saved ? 'm5 12 5 5L20 7' : 'M12 4v16M4 12h16'} stroke="currentColor" strokeWidth="1.5" /></svg>;
}
export function Header({ count = 0 }: { count?: number }) {
  const [menu, setMenu] = useState(false);
  return <header className={s.nav}>
    <a className={s.brand} href={HOME} aria-label="Métal’Orgie — accueil V2">
      <img src={withBasePath('/images/v2/embleme.webp')} width="49" height="49" alt="Emblème Métal’Orgie" />
      <span><strong>MÉTAL’ORGIE</strong><small>ACIER · INOX · ALUMINIUM</small></span>
    </a>
    <nav className={s.navLinks} aria-label="Navigation principale"><a href={GALLERY}>Réalisations</a><a href={HOME + '#matieres'}>Les matières</a><a href={HOME + '#atelier'}>L’atelier</a></nav>
    <a className={s.navCta} href={HOME + '#projet'}><span>{count ? `Mon projet · ${count} inspiration${count > 1 ? 's' : ''}` : 'Parler de votre projet'}</span><span className={s.round}><Arrow /></span></a>
    <button className={s.menuButton} aria-expanded={menu} aria-controls="v2-navigation" onClick={() => setMenu(!menu)} onKeyDown={e => { if (e.key === 'Escape') setMenu(false); }}>{menu ? 'Fermer −' : 'Menu +'}</button>
    {menu && <nav className={s.menuPanel} id="v2-navigation" aria-label="Navigation mobile" onKeyDown={e => { if (e.key === 'Escape') setMenu(false); }}>
      <a onClick={() => setMenu(false)} href={GALLERY}>Les réalisations ↗</a><a onClick={() => setMenu(false)} href={HOME + '#matieres'}>Les matières ↗</a><a onClick={() => setMenu(false)} href={HOME + '#atelier'}>L’atelier ↗</a><a onClick={() => setMenu(false)} href={HOME + '#projet'}>Parler de votre projet ↗</a>
    </nav>}
  </header>;
}
export function Footer() {
  return <footer className={s.footer}>
    <div className={s.footerTop}><p className={s.mono}>Construction métallique<br />& créations sur mesure · Suisse</p><a href="#top">Revenir en haut <Arrow /></a></div>
    <div className={s.footerWord} aria-hidden="true">MÉTAL’ORGIE</div>
    <div className={s.footerBottom}><span>Guillaume Rossier · Toutes les formes du métal.</span><div><a href={HOME + 'mentions-legales/'}>Mentions légales</a><a href={HOME + 'confidentialite/'}>Confidentialité</a><a href={withBasePath('/')}>Voir la V1</a></div></div>
  </footer>;
}
function SectionHead({ number, title, aside }: { number: string; title: string; aside: string }) {
  return <div className={s.sectionHead}><span className={s.mono}>{number} / {title}</span><span className={s.mono}>{aside}</span></div>;
}
function Work({ photo, saved, open, toggle, compact = false }: { photo: Photo; saved: boolean; open: (id: string) => void; toggle: (id: string) => void; compact?: boolean }) {
  return <article className={s.work}>
    <button className={s.workImage} onClick={() => open(photo.id)} aria-label={`Découvrir : ${photo.title}`}>
      <Picture id={photo.id} sizes={compact ? '(max-width: 1050px) 45vw, 30vw' : '(max-width: 700px) 92vw, 60vw'} />
      <span className={s.viewChip}>Découvrir la pièce <Arrow /></span>
    </button>
    <div className={s.workCaption}><p className={s.mono}>{categoryLabel(photo.category)}</p><h3>{photo.title}</h3></div>
    <button className={s.save} aria-pressed={saved} aria-label={`${saved ? 'Retirer de' : 'Ajouter à'} mon carnet : ${photo.title}`} title={saved ? 'Retirer de mon carnet' : 'Retenir comme inspiration'} onClick={() => toggle(photo.id)}><Plus saved={saved} /></button>
  </article>;
}
function ProjectDialog({ photo, saved, toggle, close }: { photo: Photo | null; saved: string[]; toggle: (id: string) => void; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const items = photo ? seriesFor(photo.id) : [];
  const current = items[index] ?? photo;
  useEffect(() => {
    const dialog = ref.current;
    if (!photo || !dialog) return;
    setIndex(Math.max(0, seriesFor(photo.id).findIndex(p => p.id === photo.id)));
    const previous = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = originalOverflow; previous?.focus({ preventScroll: true }); };
  }, [photo]);
  function move(amount: number) { setIndex(i => (i + amount + items.length) % items.length); }
  return <dialog ref={ref} className={s.dialog} aria-labelledby="piece-title" aria-describedby="piece-description" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === ref.current) close(); }} onKeyDown={e => { if (items.length > 1 && e.key === 'ArrowRight') move(1); if (items.length > 1 && e.key === 'ArrowLeft') move(-1); }}>
    {current && <><div className={s.dialogTop}><span className={s.mono}>Métal’Orgie / {categoryLabel(current.category)}</span><button onClick={close} autoFocus>Fermer <span aria-hidden="true">×</span></button></div>
      <div className={s.dialogBody}>
        <div className={s.dialogImage}><Picture id={current.id} sizes="(max-width: 700px) 94vw, 65vw" />{items.length > 1 && <div className={s.imageNav}><button aria-label="Photo précédente" onClick={() => move(-1)}><Arrow direction="left" /></button><span aria-live="polite">{index + 1} / {items.length}</span><button aria-label="Photo suivante" onClick={() => move(1)}><Arrow direction="right" /></button></div>}</div>
        <div className={s.dialogCopy}><span className={s.mono}>{current.role === 'SUPPORT' ? 'Étude visuelle' : items.length > 1 ? 'De l’idée à la matière' : 'Une réalisation, une intention'}</span><h2 id="piece-title">{current.title}</h2><p id="piece-description">{noteFor(current)}</p>
          {items.length > 1 && <div className={s.dialogThumbs} aria-label="Vues du projet">{items.map((p,i) => <button key={p.id} aria-label={p.title} aria-pressed={i===index} onClick={() => setIndex(i)}><Picture id={p.id} sizes="56px" /></button>)}</div>}
          <div className={s.dialogActions}><button className={s.secondary} aria-pressed={saved.includes(current.id)} onClick={() => toggle(current.id)}><Plus saved={saved.includes(current.id)} />{saved.includes(current.id) ? 'Ajouté à mon carnet' : 'Garder cette inspiration'}</button><a className={s.primary} href={HOME + '#projet'} onClick={() => { if (!saved.includes(current.id)) toggle(current.id); close(); }}>Une idée dans cet esprit ? <Arrow /></a></div>
        </div>
      </div></>}
  </dialog>;
}
function Brief({ saved }: { saved: string[] }) {
  const [kind, setKind] = useState('Architecture');
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [brief, setBrief] = useState('');
  const [fields, setFields] = useState({ name: '', contact: '', idea: '' });
  const fileInput = useRef<HTMLInputElement>(null);
  const result = useRef<HTMLHeadingElement>(null);
  useEffect(() => { if (brief) result.current?.focus(); }, [brief]);
  function attachments(e: ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    const valid = incoming.filter(f => f.size <= 8 * 1024 * 1024 && (f.type.startsWith('image/') || f.type === 'application/pdf' || /\.(heic|heif)$/i.test(f.name)));
    setMessage(valid.length !== incoming.length ? 'Choisissez une image ou un PDF de 8 Mo maximum par fichier.' : files.length + valid.length > 3 ? 'Vous pouvez joindre trois fichiers maximum.' : '');
    setFiles(old => [...old, ...valid].slice(0, 3));
    e.target.value = '';
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    if (fields.idea.trim().length < 10) { setMessage('Quelques mots de plus nous aideront : décrivez votre idée en au moins 10 caractères.'); return; }
    const names = saved.map(id => getPhoto(id).title);
    setBrief(`MÉTAL’ORGIE — MON PROJET\n\nUnivers : ${kind}\n${fields.name ? `Nom : ${fields.name}\n` : ''}${fields.contact ? `Contact : ${fields.contact}\n` : ''}\nMON IDÉE\n${fields.idea.trim()}\n\nINSPIRATIONS\n${names.length ? names.map(n => '• ' + n).join('\n') : 'À définir ensemble'}\n${files.length ? '\nPHOTOS / CROQUIS À JOINDRE\n' + files.map(f => '• ' + f.name).join('\n') + '\n' : ''}\nDécouvrir l’atelier : https://enudimmud.github.io/METAL-ORGIE/v2/\n\nBrief préparé par le visiteur. Aucune demande n’a été transmise à l’atelier.`);
    setMessage('');
  }
  function briefFile() { return new File([brief], 'metalorgie-mon-projet.txt', { type: 'text/plain' }); }
  function download() {
    const url = URL.createObjectURL(briefFile()); const a = document.createElement('a');
    a.href = url; a.download = 'metalorgie-mon-projet.txt'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage(files.length ? 'Brief téléchargé. Joignez aussi vos photos ou croquis lorsque vous le transmettrez.' : 'Brief téléchargé. Vous pourrez le transmettre à Guillaume.');
  }
  async function share() {
    try {
      const bundle = [briefFile(), ...files];
      if (navigator.canShare?.({ files: bundle })) await navigator.share({ title: 'Mon projet Métal’Orgie', files: bundle });
      else if (navigator.share) await navigator.share({ title: 'Mon projet Métal’Orgie', text: brief });
      else { await navigator.clipboard.writeText(brief); setMessage('Le texte du brief est copié. Vous pouvez le coller dans votre messagerie.'); }
    } catch (error) { if (error instanceof Error && error.name === 'AbortError') return; setMessage('Le partage n’est pas disponible ici. Téléchargez votre brief ou sélectionnez son texte.'); }
  }
  return <div className={s.brief}>
    {brief ? <div className={s.briefResult}><h3 ref={result} tabIndex={-1}>Votre idée a déjà une forme.</h3><p>Votre brief est prêt. Vous choisissez comment le transmettre. Aucun envoi automatique à l’atelier.</p><pre>{brief}</pre><button className={s.primary} onClick={download}>Télécharger mon brief <Arrow direction="down" /></button><button className={s.secondary} onClick={share}>Partager ou copier mon projet <Arrow /></button><button className={s.editBrief} onClick={() => setBrief('')}>← Modifier mon projet</button></div> :
      <form onSubmit={submit}>
        <fieldset><legend>01 / Quel univers vous inspire ?</legend><div className={s.typeChoices}>{['Architecture', 'Intérieur & mobilier', 'Création unique', 'Autre idée'].map(label => <label className={s.typeChoice} key={label}><input type="radio" name="universe" value={label} checked={kind===label} onChange={() => setKind(label)} /><span>{label}</span></label>)}</div></fieldset>
        {saved.length > 0 && <p className={s.inspirationSummary}>{saved.length} inspiration{saved.length > 1 ? 's' : ''} dans votre carnet : {saved.map(id => getPhoto(id).title).join(' · ')}</p>}
        <label className={s.field}><span>02 / Votre idée, même au stade du croquis</span><textarea required minLength={10} maxLength={3000} rows={3} placeholder="Une bibliothèque pour ce mur, une terrasse, une pièce qui n’existe pas encore…" value={fields.idea} onChange={e => setFields({...fields, idea: e.target.value})} /></label>
        <div className={s.fieldRow}><label className={s.field}><span>Votre nom · facultatif</span><input name="name" autoComplete="name" maxLength={120} placeholder="Comment vous appelez-vous ?" value={fields.name} onChange={e => setFields({...fields,name:e.target.value})} /></label><label className={s.field}><span>Téléphone ou e-mail · facultatif</span><input name="contact" autoComplete="email" maxLength={160} placeholder="Pour poursuivre l’échange" value={fields.contact} onChange={e => setFields({...fields,contact:e.target.value})} /></label></div>
        <label className={s.attachment}><span>Joindre une photo ou un croquis<small>Images ou PDF · 3 fichiers, 8 Mo maximum chacun</small></span><Plus /><input ref={fileInput} aria-label="Ajouter des photos ou croquis" type="file" accept="image/*,.pdf,.heic,.heif" multiple onChange={attachments} /></label>
        {!!files.length && <div className={s.fileList}>{files.map((file,i) => <button key={file.name+i} type="button" aria-label={`Retirer ${file.name}`} onClick={() => setFiles(files.filter((_,j)=>j!==i))}><span>{file.name}</span>×</button>)}</div>}
        <button className={s.primary} type="submit">Préparer mon projet <Arrow /></button>
      </form>}
    <p className={s.formMessage} role="status">{message}</p>
  </div>;
}
export function Experience({ galleryOnly = false }: { galleryOnly?: boolean }) {
  const savedJSON = useSyncExternalStore(subscribeSaved, savedSnapshot, () => '[]');
  const saved = useMemo<string[]>(() => { try { const value = JSON.parse(savedJSON); return Array.isArray(value) ? value.filter((id: unknown) => typeof id === 'string' && photos.some(p => p.id === id)) : []; } catch { return []; } }, [savedJSON]);
  const requestedCategory = useSyncExternalStore(subscribeLocation, categorySnapshot, () => 'all');
  const [active, setActive] = useState<Photo | null>(null);
  const [toast, setToast] = useState('');
  const [material, setMaterial] = useState(0);
  const [process, setProcess] = useState(3);
  const [chosenFilter, setFilter] = useState<string | null>(null);
  const filter = chosenFilter ?? requestedCategory;
  const [contactVisible, setContactVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(!galleryOnly);
  const hero = useRef<HTMLElement>(null);
  const contact = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!hero.current) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    observer.observe(hero.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: .08 });
    if (contact.current) observer.observe(contact.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2500); return () => clearTimeout(timer); }, [toast]);
  function toggle(id: string) {
    const next = saved.includes(id) ? saved.filter(x => x!==id) : [...saved,id];
    temporarySaved = JSON.stringify(next);
    try { localStorage.setItem(STORAGE, temporarySaved); } catch { /* Keep this session usable without storage. */ }
    window.dispatchEvent(new Event('metalorgie-carnet-change'));
    setToast(saved.includes(id) ? 'Inspiration retirée de votre carnet.' : 'Inspiration ajoutée à votre carnet.');
  }
  function open(id: string) { setActive(getPhoto(id)); }
  const selectedPhoto = getPhoto(series.vader[process]);
  const visible = filter === 'saved' ? photos.filter(p=>saved.includes(p.id)) : photos.filter(p=>filter==='all'||p.category===filter);
  return <div className={s.root} id="top">
    <a className="skip-link" href="#contenu-v2">Aller au contenu</a>
    <Header count={saved.length} />
    <main id="contenu-v2">
      {galleryOnly ? <>
        <section className={s.galleryIntro}><p className={s.mono}>L’atelier ouvert / Les réalisations</p><h1>À chaque idée,<br />sa forme.</h1><div className={s.galleryLead}><p>Ouvrages, pièces singulières et gestes de fabrication. Explorez les 29 vues de l’atelier et gardez ce qui vous inspire dans votre carnet.</p><a className={s.textLink} href={HOME}>Retour à l’univers <Arrow direction="left" /></a></div></section>
        <section className={`${s.galleryArea} ${s.light}`} aria-label="Galerie de réalisations"><div className={s.filters} role="group" aria-label="Filtrer les réalisations">{categories.map(c=><button key={c.id} aria-pressed={filter===c.id} onClick={()=>setFilter(c.id)}>{c.short}</button>)}<button aria-pressed={filter==='saved'} onClick={()=>setFilter('saved')}>Mon carnet ({saved.length})</button></div><div className={`${s.galleryCount} ${s.mono}`}><span aria-live="polite">{visible.length.toString().padStart(2,'0')} vue{visible.length!==1?'s':''}</span><span>Le + garde une inspiration</span></div>{visible.length ? <div className={s.galleryGrid}>{visible.map(photo=><Work compact key={photo.id} photo={photo} saved={saved.includes(photo.id)} open={open} toggle={toggle} />)}</div> : <p>Votre carnet est encore ouvert à toutes les idées. Ajoutez une réalisation avec le bouton +.</p>}</section>
        <section className={s.galleryCta}><h2>Et la prochaine idée,<br />c’est la vôtre ?</h2><a className={s.primary} href={HOME + '#projet'}>Parler de votre projet <Arrow /></a></section>
      </> : <>
        <section className={s.hero} aria-labelledby="hero-v2-title" ref={hero}>
          <div className={s.heroMeta}><span className={s.mono}><i className={s.dot} /> Atelier de construction métallique · Suisse</span><span className={s.mono}>Guillaume Rossier / Sur mesure</span></div>
          <figure className={s.heroVisual}><Picture id="finition-angle" priority sizes="(max-width: 700px) 85vw, 58vw" /><span className={s.heroCross}><Plus /></span><figcaption className={s.mono}>La précision, jusque dans l’angle.<br />Détail d’atelier — Métal’Orgie</figcaption></figure>
          <div className={s.heroCopy}><h1 id="hero-v2-title"><span>L’IDÉE</span><span>PREND</span><span>MATIÈRE.</span></h1></div>
          <div className={s.heroBottom}><p>Acier. Inox. Aluminium.<br />Toutes les formes du métal.<br />Construction métallique & créations sur mesure.</p><a className={s.primary} href="#projet">Parler de votre projet <Arrow /></a></div>
          <div className={s.heroFoot}><a className={s.mono} href="#matieres"><Arrow direction="down" /> Entrer dans l’univers</a><p className={s.mono}>Du premier trait<br />à la dernière finition.</p></div>
        </section>
        <div className={s.wordBand} aria-label="Les univers de Métal’Orgie"><span>Architecture</span><b>+</b><span>Mobilier</span><b>+</b><span>Pièces singulières</span><b>↗</b></div>
        <section className={`${s.manifest} ${s.light}`} id="matieres">
          <SectionHead number="01" title="L’atelier des possibles" aside="Trois matières. Toutes les formes." />
          <div className={`${s.manifestBody} ${s.reveal}`}><h2>Le métal a du caractère.<br /><span>Votre projet aussi.</span></h2><p>Un ouvrage qui transforme un lieu. Un meuble qui trouve sa place. Une pièce qu’on ne voit nulle part ailleurs. Métal’Orgie donne une forme concrète à vos idées.</p></div>
          <div className={s.materialChoices} aria-label="Découvrir les matières">{['Acier','Inox','Aluminium'].map((m,i)=><button key={m} aria-pressed={material===i} aria-controls="matiere-description" onClick={()=>setMaterial(i)}><small>0{i+1}</small><strong>{m}</strong><span aria-hidden="true">↗</span></button>)}</div>
          <div className={s.materialNote}><p id="matiere-description" aria-live="polite">{materialCopy[material]}</p><span className={s.mono}>La matière se choisit ensemble.</span></div>
        </section>
        <section className={`${s.selected} ${s.light}`} id="realisations">
          <SectionHead number="02" title="Réalisations choisies" aside="Des intentions devenues objets" />
          <div className={`${s.selectedTitle} ${s.reveal}`}><h2>Bien pensées.<br />Bien réelles.</h2><p>Trois façons d’habiter le métal.<br />Une même attention au dessin.</p></div>
          <div className={s.workGrid}>{['terrasse-surelevee','brasero-sur-mesure','bibliotheque-metal-bois'].map(id=><Work key={id} photo={getPhoto(id)} saved={saved.includes(id)} toggle={toggle} open={open} />)}<div className={s.work}><div className={s.workNote}>Un détail vous plaît ?<br />Gardez-le de côté.<p>Le bouton + ajoute une inspiration à votre carnet. Un bon point de départ pour parler de votre idée.</p><a className={s.textLink} href={GALLERY}>Explorer toutes les réalisations <Arrow /></a></div></div></div>
        </section>
        <section className={s.universes} aria-label="Trois univers de création"><div className={s.universeTop}><span className={s.mono}>03 / Quel sera votre terrain ?</span><span className={s.mono}>Du bâti à la pièce unique</span></div>{[
          { id:'architecture', title:<>Architecture<br />& Structure</>, text:'Porter, relier, ouvrir un espace. Les ouvrages qui donnent une nouvelle dimension à un lieu.' },
          { id:'interieur', title:<>Intérieur<br />& Mobilier</>, text:'Des lignes justes, des matières qui se répondent. Le métal dans les espaces du quotidien.' },
          { id:'creations', title:<>Créations<br />singulières</>, text:'Un brasero, une silhouette, une idée inattendue. Il reste tant de formes à inventer.' },
        ].map((universe,i)=><a className={s.universeRow} key={universe.id} href={GALLERY + '?famille=' + universe.id}><span className={s.mono}>0{i+1}</span><h3>{universe.title}</h3><p>{universe.text}</p><span className={s.round}><Arrow /></span></a>)}</section>
        <section className={s.case} id="fabrication">
          <SectionHead number="04" title="Dans les coulisses d’une pièce" aside="Une idée / Quatre états" />
          <div className={s.caseStage}><div className={s.caseText}><h2>L’INATTENDU<br />SE <em>FABRIQUE.</em></h2><p>Une silhouette reconnaissable. Des découpes, des assemblages, une finition. Cette création inspirée de Dark Vador montre le chemin entre une idée et sa présence dans le monde.</p><button className={s.textLink} style={{background:'transparent', borderTop:0,borderLeft:0,borderRight:0}} onClick={()=>open(selectedPhoto.id)}>Voir la transformation de près <Arrow /></button></div><div><button className={s.caseImage} aria-label={`Agrandir : ${selectedPhoto.title}`} onClick={()=>open(selectedPhoto.id)}><Picture id={selectedPhoto.id} sizes="(max-width:700px) 90vw, 48vw" /><span className={s.caseNumber} aria-hidden="true">0{process+1}</span></button><div className={s.caseCaption}><span className={s.mono}>Création inspirée de Dark Vador</span><span className={s.mono} aria-live="polite">{['Métal brut','Apprêt','Mise en peinture','Pièce achevée'][process]}</span></div></div></div>
          <div className={s.processControls} aria-label="Les étapes de fabrication">{['Métal brut','Apprêt','Mise en peinture','Pièce achevée'].map((label,i)=><button key={label} aria-pressed={process===i} onClick={()=>setProcess(i)}><span>0{i+1}</span><strong>{label}</strong></button>)}</div>
        </section>
        <section className={s.atelier} id="atelier"><figure className={s.atelierImage}><Picture id="cordons-soudure" sizes="(max-width:700px) 100vw, 55vw" /></figure><div className={s.atelierCopy}><span className={s.mono}>05 / La signature de l’atelier</span><h2>LE DÉTAIL<br />N’EST PAS<br />UN DÉTAIL.</h2><p>Un cordon de soudure. La rencontre de deux pièces. Une finition qu’on a envie de toucher. C’est aussi là que se lit le travail.</p><div className={s.craftList}><p>Découper <span>01</span></p><p>Assembler <span>02</span></p><p>Finir <span>03</span></p></div><a className={s.textLink} href={GALLERY + '?famille=atelier'}>Regarder de plus près <Arrow /></a></div></section>
        <section className={s.maker} aria-labelledby="guillaume-v2"><img src={withBasePath('/images/v2/embleme.webp')} alt="Logo original Métal’Orgie" width="160" height="160" loading="lazy" /><div><span className={s.mono}>Derrière la matière</span><h2 id="guillaume-v2">Guillaume<br />Rossier.</h2></div><p>Derrière Métal’Orgie, un artisan et un regard. Son terrain : l’acier, l’inox et l’aluminium. Son point de départ : ce que vous avez en tête.</p></section>
        <section className={s.contact} id="projet" ref={contact}>
          <SectionHead number="06" title="Votre prochain projet" aside="Tout commence par une idée" />
          <div className={s.contactIntro}><div><h2>ET SI ON<br />LUI DONNAIT<br />FORME ?</h2><p>Un besoin précis ou une intuition. Quelques mots suffisent pour commencer à dessiner la suite.</p><small>Version de présentation : préparez et emportez votre brief. L’envoi direct à Guillaume sera disponible après validation des coordonnées de l’atelier. Vos textes et fichiers restent sur votre appareil jusqu’au partage que vous choisissez.</small></div><Brief saved={saved} /></div>
        </section>
      </>}
    </main><Footer />
    <a className={s.carnet} href={HOME + '#projet'} hidden={contactVisible || heroVisible}><span>{saved.length ? 'Mon carnet de projet' : 'Votre projet commence ici'}</span>{saved.length ? <b>{saved.length}</b> : <Arrow />}</a>
    {toast && <div className={s.toast} role="status">{toast}</div>}
    <ProjectDialog photo={active} saved={saved} toggle={toggle} close={()=>setActive(null)} />
  </div>;
}
