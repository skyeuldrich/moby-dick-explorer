import './desk-discovery.css';

const assets = import.meta.env.BASE_URL + 'assets/archive/';

export const deskObjects = `
  <button type="button" class="desk-object inspect-agreement" data-inspect="agreement" aria-haspopup="dialog" aria-controls="desk-inspector">
    <span class="desk-object-mark" aria-hidden="true">+</span><span>Shipping paper</span>
  </button>
  <button type="button" class="desk-object inspect-ledger" data-inspect="records" aria-haspopup="dialog" aria-controls="desk-inspector">
    <span class="desk-object-mark" aria-hidden="true">+</span><span>Voyage records</span>
  </button>
  <button type="button" class="desk-object inspect-beale" data-inspect="beale" aria-haspopup="dialog" aria-controls="desk-inspector">
    <span class="desk-object-mark" aria-hidden="true">+</span><span>Whale diagram</span>
  </button>`;

function documentImage(file, description, caption) {
  return `<figure class="inspection-facsimile">
    <a href="${assets}${file}" target="_blank" rel="noopener noreferrer" aria-label="Open the full-size document in a new tab">
      <img alt="${description}" src="${assets}${file}"/>
    </a><figcaption>${caption}</figcaption>
  </figure>`;
}

const readings = {
  beale: {
    title: 'Looking at a whale',
    record: 'Thomas Beale · The Natural History of the Sperm Whale · 1839',
    file: 'beale-1839-fig1.webp',
    description: 'Original lettered sperm-whale outline, Figure 1, page 23. The head is at right, with the lower jaw below; the flipper bears f. The extreme left fluke tip is clipped in the archive scan.',
    caption: 'Wellcome Collection · p. 23, fig. 1 · Public Domain Mark. The archive scan clips the far-left fluke tip.',
    text: `<h3>Beale’s lettered key</h3>
      <p><i>a</i> · spout-hole<br><i>b</i> · case<br><i>f</i> · fin</p>
      <h3>Inspect the figure</h3>
      <p>Follow the letters across the outline. Compare the small lower jaw beneath the head with the flipper marked <i>f</i> and the divided regions along the body. Open the full-size figure to examine the original lettering.</p>
      <h3>From diagram to living whale</h3>
      <p>What can this diagram explain, and what does it leave out about a living whale?</p>
      <p>Continue with Chapter 32, “Cetology,” and Chapters 55–57, on pictures and representations of whales.</p>
      <p class="inspection-sources"><a href="https://wellcomecollection.org/works/r9yqq4dt" target="_blank" rel="noopener noreferrer">Original volume · Wellcome Collection ↗</a>
      <a href="${assets}beale-1839-p23-source.jpg" target="_blank" rel="noopener noreferrer">Full source page ↗</a>
      <a href="https://www.gutenberg.org/ebooks/2701" target="_blank" rel="noopener noreferrer">Read Moby-Dick · Chapters 32 and 55–57 ↗</a></p>`,
  },
  agreement: {
    title: 'A share of the voyage',
    record: 'Whalemen’s Shipping Paper · late nineteenth century',
    file: 'whalemens-shipping-paper.webp',
    description: 'Crew agreement with printed conditions above handwritten names, advances and fractional shares.',
    caption: 'Nickerson Archives · Ship’s papers, p. 183',
    text: `<h3>Reading the agreement</h3>
      <p>The printed form puts three headings beside the crew’s names: <q>STATION.</q>, <q>ADVANCE.</q> and <q>LAY.</q> One gives a man’s job, another the amount advanced to him, and the last his agreed share.</p>
      <blockquote>“shall be entitled to the payment of his share of the net proceeds of the voyage”</blockquote>
      <p class="inspection-reference">From the ninth printed condition, excerpted. The adjacent endorsement names the bark <i>Cape Horn Pigeon</i>, San Francisco, December 1887.</p>
      <h3>What a lay could pay</h3>
      <p>A lay was a fraction of voyage returns. Earnings depended on the catch, and advances and purchases could reduce the settlement. On the <i>Milton</i>’s return in 1836, the captain’s one-seventeenth share came to <strong>$5,882</strong>. The lowest-paid seaman received <strong>$571</strong>. These are nominal dollars from a different voyage.</p>
      <p class="inspection-sources"><a href="https://archive.org/details/shipspapersca03ship/page/n182/mode/1up" target="_blank" rel="noopener noreferrer">Original shipping paper ↗</a>
      <a href="https://www.whalingmuseum.org/research/research-resources/whaling-history/whales-and-hunting/" target="_blank" rel="noopener noreferrer">Milton voyage figures · New Bedford Whaling Museum ↗</a>
      <a href="https://www.whalingmuseum.org/research/research-resources/whaling-history/life-aboard/" target="_blank" rel="noopener noreferrer">Crew pay and advances · New Bedford Whaling Museum ↗</a></p>`,
  },
  records: {
    title: 'One ship among hundreds',
    record: 'Thomas R. Bloomfield · Indian Chief · 1842–44',
    file: 'bloomfield-indian-chief-1842-44.webp',
    description: 'Open journal with blue whale drawings at left and dated handwritten entries in brown ink at right.',
    caption: 'Nantucket Historical Association · MS 220, Log 119',
    text: `<h3>Opening the log</h3>
      <p>Bloomfield describes his book on the right-hand page. He places its beginning in New London and names the Crozets as a destination. Later entries record winds, sails and the work aboard.</p>
      <blockquote>“A Journal of the Transactions and Remarkable Events on board the Ship Indian Chief”</blockquote>
      <p class="inspection-reference">Opening entry, October 1842. Line breaks and the divided word “Remarkable” are joined here.</p>
      <h3>The American fleet</h3>
      <p>Four years later, in 1846, an estimated <strong>735</strong> of the world’s roughly 900 whaleships were American. About <strong>20,000 men</strong> worked aboard those ships. Eric Jay Dolin estimates $70 million invested in whaling infrastructure and roughly 70,000 livelihoods directly or indirectly tied to the industry.</p>
      <p class="inspection-sources"><a href="https://archive.org/details/ms220log119/page/n3/mode/2up" target="_blank" rel="noopener noreferrer">Original logbook · Nantucket Historical Association ↗</a>
      <a href="https://www.pbs.org/wgbh/americanexperience/films/whaling/" target="_blank" rel="noopener noreferrer">Fleet estimates · Eric Jay Dolin, PBS American Experience ↗</a></p>`,
  },
};

export const deskDialog = `<dialog id="desk-inspector" aria-labelledby="inspection-title">
  <div class="inspection-bar"><button class="close inspection-close" type="button" aria-label="Close document inspection">Close <span aria-hidden="true">×</span></button></div>
  <div class="inspection-content"></div>
</dialog>`;

export function initDeskDiscoveries() {
  const dialog = document.querySelector('#desk-inspector');
  const content = dialog.querySelector('.inspection-content');
  const close = dialog.querySelector('.inspection-close');
  let opener;
  for (const button of document.querySelectorAll('[data-inspect]')) {
    button.addEventListener('click', () => {
      const item = readings[button.dataset.inspect];
      opener = button;
      content.innerHTML = `<header class="inspection-heading"><p>${item.record}</p><h2 id="inspection-title">${item.title}</h2></header>
        <div class="inspection-columns">${documentImage(item.file, item.description, item.caption)}<article class="inspection-reading">${item.text}</article></div>`;
      document.documentElement.classList.add('inspecting-desk');
      dialog.showModal();
      dialog.scrollTop = 0;
      close.focus({preventScroll: true});
    });
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('inspecting-desk');
    opener?.focus({preventScroll: true});
  });
}
