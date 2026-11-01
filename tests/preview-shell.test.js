const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const appRoot = path.join(__dirname, '..');

function read(name) {
  return fs.readFileSync(path.join(appRoot, name), 'utf8');
}

test('предпросмотр админки не подключает Telegram или API магазина', () => {
  const html = read('index.html');
  const script = read('app.js');

  assert.doesNotMatch(html, /telegram/i);
  assert.doesNotMatch(script, /fetch\s*\(/);
  assert.doesNotMatch(script, /\/api\//);
  assert.match(html, /Закрытая панель управления/);
  assert.match(html, /Предпросмотр интерфейса/);
});

test('предпросмотр даёт увидеть главную без имитации входа', () => {
  const html = read('index.html');
  const script = read('app.js');

  assert.match(html, /data-screen="login"/);
  assert.match(html, /data-screen="dashboard"/);
  assert.match(html, /data-preview-open/);
  assert.match(html, /data-preview-close/);
  assert.match(script, /setPreviewOpen/);
  assert.match(html, /Данные магазина ещё не подключены/);
  assert.match(html, /Вход пока недоступен/);
});

test('стили предпросмотра остаются удобными на телефоне', () => {
  const styles = read('styles.css');

  assert.match(styles, /min-height:\s*44px/);
  assert.match(styles, /@media \(max-width:\s*430px\)/);
  assert.match(styles, /@media \(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /:focus-visible/);
});
