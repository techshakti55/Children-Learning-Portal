import { lessons, topic, upcomingTopics } from './features/number-types.sample.js';
import { escapeHtml as e, badge, button, card, breadcrumb, meadowArt } from './components/ui.js';
const main = document.querySelector('main');
const positionKey = 'clp-ui:last-lesson:v1';
let lastLesson;
try { lastLesson = localStorage.getItem(positionKey); } catch { /* Storage is optional. */ }
const lessonUrl = (lesson) => `#/topics/number-types/lessons/${lesson.id}`;
function home() {
  const last = lessons.find(lesson => lesson.id === lastLesson);
  return `<section class="hero"><div>${badge('A small adventure in maths', 'light')}<h1>Big discoveries.<br><em>Little steps.</em></h1><p>Wonder, explore, and make numbers your friends.<br>Your next “I get it!” starts here.</p>${button('Explore Number Types', '#/topics/number-types')}<p class="hero-note">Simple lessons · Go at your own pace</p></div>${meadowArt()}</section>
  <section class="continue-strip" aria-labelledby="continue-title"><span class="round-icon" aria-hidden="true">↗</span><div><h2 id="continue-title">${last ? 'Pick up where you left off' : 'Your first discovery is waiting'}</h2><p>${last ? e(last.title) + ' · Last opened on this browser' : 'Start with Counting World. No rush, just curiosity.'}</p></div>${button(last ? 'Continue lesson' : 'Start first lesson', lessonUrl(last || lessons[0]), true)}</section>
  <section aria-labelledby="topics-title"><div class="section-heading"><div><p class="eyebrow">YOUR EXPLORING MAP</p><h2 id="topics-title">What will you discover?</h2></div><span class="muted">Class 4 · Maths</span></div><div class="topic-grid">${card(`<div class="card-top"><span class="topic-icon mint" aria-hidden="true">123</span>${badge('Ready to explore')}</div><h3>${topic.label}</h3><p>${e(topic.description)}</p><div class="card-bottom"><span>3 lessons + 1 extra</span><a class="text-link" href="#/topics/number-types">Let’s explore <span aria-hidden="true">→</span></a></div>`, 'ready')}${upcomingTopics.map(t => card(`<div class="card-top"><span class="topic-icon ${t.tone}" aria-hidden="true">${t.symbol}</span>${badge('Coming soon', 'quiet')}</div><h3>${t.title}</h3><p>${t.description}</p><div class="card-bottom"><span>More discoveries are growing</span><span aria-hidden="true">✳</span></div>`, 'coming-soon')).join('')}</div></section>
  <aside class="gentle-note"><span aria-hidden="true">✧</span><p><strong>Curiosity is your superpower.</strong> You can take your time, go back, and explore again.</p></aside>`;
}
function overview() {
  return `${breadcrumb('Number Types')}<section class="topic-hero"><div><p class="eyebrow">NUMBER TYPES · SAMPLE LESSONS</p><h1>${topic.title}</h1><p>${e(topic.description)}</p><p class="muted">Start with counting. Finish with a new way to see numbers.</p></div><span class="large-number" aria-hidden="true">2<span>3</span>5</span></section>
  <div class="overview-layout"><section aria-labelledby="path-title"><div class="section-heading"><h2 id="path-title">Your discovery path</h2><span class="muted">Go at your own pace</span></div><div class="lesson-list">${lessons.map((l, i) => card(`<span class="lesson-number" aria-hidden="true">${l.symbol}</span><div><div class="inline-title"><h3><a href="${lessonUrl(l)}">${l.title}</a></h3>${l.optional ? badge('Optional extra', 'quiet') : ''}</div><p>${l.subtitle}</p><small>${l.time} · ${l.optional ? 'After Lesson 3' : 'Lesson ' + (i + 1)}</small></div><a class="circle-link" href="${lessonUrl(l)}" aria-label="Open ${l.title}">→</a>`, 'lesson-row')).join('')}</div></section><aside class="side-note"><span class="topic-icon yellow" aria-hidden="true">✦</span><h2>A detective’s toolkit</h2><p>Bring your curiosity, a pencil and some paper.</p><ul><li>Read one idea at a time.</li><li>Think before revealing an answer.</li><li>Go back whenever you like.</li></ul><hr><strong>Before you begin</strong><p>You can count to 10. For prime numbers, simple multiplication helps.</p><p class="muted">Games, practice and print resources will come in a later milestone.</p></aside></div>`;
}
function lessonPage(lesson) {
  const index = lessons.indexOf(lesson);
  lastLesson = lesson.id;
  try { localStorage.setItem(positionKey, lastLesson); } catch { /* Private/shared browser settings may block storage. */ }
  return `${breadcrumb(lesson.title, true)}<div class="lesson-layout"><aside class="lesson-nav"><p class="eyebrow">NUMBER DETECTIVES</p><nav aria-label="Lessons">${lessons.map((l, i) => `<a href="${lessonUrl(l)}" ${l === lesson ? 'aria-current="page"' : ''}><span>${i + 1}</span>${l.title}${l.optional ? '<small>Optional</small>' : ''}</a>`).join('')}</nav><a class="text-link" href="#/topics/number-types">← All lessons</a></aside><article class="lesson-content"><p class="eyebrow">${lesson.optional ? 'OPTIONAL ENRICHMENT' : 'LESSON ' + (index + 1) + ' OF 3'} · ${lesson.time.toUpperCase()}</p><h1>${lesson.title}</h1><p class="lesson-subtitle">${lesson.subtitle}</p><div class="learning-goal"><strong>Today’s discovery</strong><p>${e(lesson.objective)}</p><small>Before you start: ${e(lesson.prerequisite)}</small></div><section class="idea"><h2>Let’s understand it</h2><p>${e(lesson.explanation)}</p><figure class="number-visual"><div>${lesson.visual.map(n => `<span>${e(n)}</span>`).join('')}</div><figcaption>${e(lesson.caption)}</figcaption></figure></section><section><p class="eyebrow">THINK FIRST, THEN TAKE A LOOK</p><h2>Let’s see some examples</h2><div class="examples">${lesson.examples.map((example, i) => card(`<span class="example-label">EXAMPLE ${i + 1}</span><h3>${e(example.question)}</h3><details><summary>Show the explanation</summary><p>${e(example.answer)}</p></details>`, 'example')).join('')}</div></section><aside class="takeaway"><span aria-hidden="true">✦</span><p><strong>A clue to keep</strong><br>${e(lesson.takeaway)}</p></aside><nav class="lesson-actions" aria-label="Lesson navigation">${button(index ? 'Previous lesson' : 'Topic overview', index ? lessonUrl(lessons[index - 1]) : '#/topics/number-types', true)}${button(index === 2 ? 'Explore the optional extra' : index === 3 ? 'Back to topic' : 'Next lesson', index === 3 ? '#/topics/number-types' : lessonUrl(lessons[index + 1]))}</nav>${index === 2 ? '<p class="muted">You have reached the end of the three core lessons. The next lesson is optional.</p>' : ''}</article></div>`;
}
function render({ focus = true } = {}) {
  const path = location.hash === '#main' ? '/' : location.hash.slice(1) || '/';
  let markup;
  let title;
  if (path === '/') { markup = home(); title = 'Home'; }
  else if (path === '/topics/number-types') { markup = overview(); title = topic.title; }
  else {
    const lesson = lessons.find(l => path === lessonUrl(l).slice(1));
    if (lesson) { markup = lessonPage(lesson); title = lesson.title; }
    else { markup = `<section class="empty-state"><span aria-hidden="true">⌕</span><h1>Let’s find your path</h1><p>This page is not here. Your lessons are waiting on the home page.</p>${button('Back to home', '#/')}</section>`; title = 'Page not found'; }
  }
  main.innerHTML = markup;
  document.title = `${title} · Maths Meadow`;
  if (focus) { main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
}
window.addEventListener('hashchange', () => {
  if (location.hash === '#main') { main.focus(); return; }
  render();
});
render({ focus: false });
