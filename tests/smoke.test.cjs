// Offline smoke tests for the public, fictional EventFlow Studio.
// Run from the repository root: node --test tests/smoke.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const base = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(base, 'studio.js'), 'utf8');
const styles = fs.readFileSync(path.join(base, 'studio.css'), 'utf8');
const entry = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
const saved = Object.create(null);
const handlers = Object.create(null);
const downloaded = [];
let output = '';

const root = {
  get innerHTML() { return output; },
  set innerHTML(html) { output = html; },
  addEventListener(type, callback) { handlers[type] = callback; },
  querySelector(selector) {
    if (selector === '#demo-form input') return { focus() {} };
    if (selector === '[data-search]') return {
      focus() {}, value: '', setSelectionRange() {}
    };
    return null;
  }
};
const document = {
  getElementById(id) { return id === 'app' ? root : null; },
  createElement() {
    return {
      set download(filename) { downloaded.push(filename); },
      set href(_) {}, click() {}, remove() {}
    };
  },
  body: { appendChild() {} }
};
const window = {
  localStorage: {
    getItem(key) { return saved[key] || null; },
    setItem(key, value) { saved[key] = value; },
    removeItem(key) { delete saved[key]; }
  },
  addEventListener(name, callback) { handlers['window:' + name] = callback; },
  scrollTo() {},
  confirm() { return true; },
  open() {}
};
class MockFormData {
  constructor(form) { this.data = form.fake; }
  entries() { return Object.entries(this.data); }
}
vm.runInNewContext(script, {
  window, document, FormData: MockFormData,
  Blob: class { constructor(parts, options) { this.parts = parts; this.options = options; } },
  URL: { createObjectURL() { return 'blob:test'; }, revokeObjectURL() {} },
  console
}, { filename: 'studio.js', timeout: 3000 });

const fire = (attribute, payload) => handlers.click({
  target: {
    dataset: {},
    closest(selector) {
      return selector === '[data-' + attribute + ']' ? { dataset: payload } : null;
    }
  }
});
const page = name => fire('page', { page: name });
const action = (name, id = 0) => fire('action', { action: name, id: String(id) });
const submit = values => handlers.submit({
  preventDefault() {},
  target: { id: 'demo-form', fake: values }
});
const data = () => JSON.parse(Object.values(saved)[0]);

test('entrypoint references current studio assets', () => {
  assert.match(entry, /studio\.js/);
  assert.match(entry, /studio\.css/);
});
test('global SVG icons have a bounded size', () => {
  assert.match(styles, /svg\s*\{[^}]*width\s*:\s*18px/);
});
test('application initialises with dashboard and fictional events', () => {
  assert.equal(window.__eventflowReady, true);
  assert.match(output, /Aurora Music Festival/);
  assert.match(output, /Upcoming productions/);
});
test('sidebar contains exactly eight complete navigation buttons', () => {
  assert.equal((output.match(/class="nav-link/g) || []).length, 8);
  assert.doesNotMatch(output, /<nav class="nav-list">\s*n type=/);
});
test('each of eight product sections renders', () => {
  for (const name of ['overview', 'events', 'crew', 'assignments', 'calendar', 'analytics', 'activity', 'about']) {
    page(name);
    assert.match(output, /class="view-header"/, name);
  }
});
test('event filters and search work', () => {
  page('events');
  fire('filter', { filter: 'Draft' });
  assert.match(output, /Atlas Product Launch/);
  assert.doesNotMatch(output, /Aurora Music Festival/);
  fire('filter', { filter: 'All' });
  handlers.input({ target: { value: 'aurora', matches: s => s === '[data-search]' } });
  assert.match(output, /Aurora Music Festival/);
  assert.doesNotMatch(output, /Prisma Tech Summit/);
  handlers.input({ target: { value: '', matches: s => s === '[data-search]' } });
});
test('event creation, editing and deletion work', () => {
  page('events'); action('event-add');
  submit({ name: 'QA Event', date: '2026-11-27', venue: 'Sample Hall', type: 'Concert', status: 'Confirmed', budget: '2000' });
  const id = data().events.find(e => e.name === 'QA Event').id;
  assert.match(output, /QA Event/);
  action('event-edit', id);
  submit({ name: 'QA Event Updated', date: '2026-11-27', venue: 'Sample Hall', type: 'Theatre', status: 'Draft', budget: '2500' });
  assert.match(output, /QA Event Updated/);
  action('event-delete', id);
  assert.doesNotMatch(output, /QA Event Updated/);
});
test('crew creation and removal work', () => {
  page('crew'); action('crew-add');
  submit({ name: 'QA Fictional Crew', role: 'FOH', location: 'Valencia', availability: 'Available' });
  const id = data().crew.find(w => w.name === 'QA Fictional Crew').id;
  assert.match(output, /QA Fictional Crew/);
  action('crew-delete', id);
  assert.doesNotMatch(output, /QA Fictional Crew/);
});
test('assignment and simulated payment work', () => {
  page('assignments'); action('job-add');
  submit({ eventId: '101', crewId: '201', role: 'QA Assignment', hours: '8', rate: '25' });
  const id = data().jobs.find(j => j.role === 'QA Assignment').id;
  assert.match(output, /QA Assignment/);
  action('pay-add', id); submit({ amount: '40' });
  assert.match(output, /€40\.00/);
  action('job-delete', id);
  assert.doesNotMatch(output, /QA Assignment/);
});
test('calendar renders and navigates months', () => {
  page('calendar');
  assert.equal((output.match(/class="cal-day/g) || []).length, 42);
  action('month-next'); assert.match(output, /December 2026/);
  action('month-prev'); assert.match(output, /November 2026/);
});
test('fictional exports work', () => {
  page('analytics'); action('export-csv');
  page('activity'); action('export-json');
  assert.ok(downloaded.includes('eventflow-fictional-report.csv'));
  assert.ok(downloaded.includes('eventflow-fictional-data.json'));
});
test('demo restores sample data without server access', () => {
  action('reset');
  assert.match(output, /Aurora Music Festival/);
  assert.equal(Object.keys(saved).length, 0);
});
test('no external APIs or production integrations in demo script', () => {
  assert.doesNotMatch(script, /\bfetch\s*\(|\bXMLHttpRequest\b|\bWebSocket\b/);
  assert.doesNotMatch(script, /TURSO_DATABASE_URL|JWT_SECRET|DATABASE_AUTH_TOKEN/);
});
