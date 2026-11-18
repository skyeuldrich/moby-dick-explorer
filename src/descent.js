export const voices = [
  {chapter:41, title:'Moby Dick', speaker:'Ishmael narrating Ahab’s inner recognition', text:'Now, in his heart, Ahab had some glimpse of this, namely: all my means are sane, my motive and my object mad.', window:[.735,.75,.77,.79]},
  {chapter:37, title:'Sunset', speaker:'Ahab', text:'They think me mad—Starbuck does; but I’m demoniac, I am madness maddened! That wild madness that’s only calm to comprehend itself!', window:[.795,.81,.83,.85]},
  {chapter:132, title:'The Symphony', speaker:'Ahab', text:'Is it Ahab, Ahab? Is it I, God, or who, that lifts this arm?', window:[.855,.87,.89,.91]},
];
const link = v => `https://www.gutenberg.org/files/2701/2701-h/2701-h.htm#link2HCH${String(v.chapter).padStart(4,'0')}`;
const content = v => `<blockquote>“${v.text}”</blockquote><p>${v.speaker}<br>Herman Melville · Chapter ${v.chapter}, “${v.title}”</p><a href="${link(v)}" target="_blank" rel="noopener noreferrer">Read Chapter ${v.chapter}</a>`;
export const descentQuotes = voices.map(v=>`<section class="descent-quote" inert aria-hidden="true">${content(v)}</section>`).join('');
export const descentTranscript = `<details class="quote-transcript"><summary>Three voices from the descent</summary><p>Chapters 41 → 37 → 132 form a thematic sequence, rather than the order of the novel.</p>${voices.map(v=>`<article>${content(v)}</article>`).join('')}</details>`;
// Preserve the original approach distance, tripling the physical descent range.
export const toScroll = p => (p <= .72 ? p : .72 + (p-.72)*3) / 1.56;
export const fromScroll = p => { const distance=p*1.56; return distance<=.72 ? distance : .72+(distance-.72)/3; };
