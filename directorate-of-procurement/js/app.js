(function () {
  'use strict';
  var data = window.PROCUREMENT;
  var section = 'overview';
  var history = [];
  var current = 0;
  var page = 0;
  var pageSize = 6;
  var sections = ['overview', 'structure', 'responsibilities'];
  function el(id) { return document.getElementById(id); }
  function number(value) { return String(value).padStart(2, '0'); }
  function go(target, fromBack) {
    if (sections.indexOf(target) === -1 || target === section) return;
    if (!fromBack) history.push(section);
    section = target;
    sections.forEach(function (id) { el(id).hidden = id !== section; });
    document.querySelectorAll('nav [data-go]').forEach(function (button) {
      if (button.dataset.go === section) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
    el('back-button').hidden = history.length === 0;
    el('footer-index').textContent = number(sections.indexOf(section) + 1) + ' — 03';
    document.title = 'Directorate of Procurement · ' + {overview:'Overview',structure:'Organizational structure',responsibilities:'Core responsibilities'}[section];
    window.scrollTo(0, 0);
    el(section + '-title').focus({ preventScroll: true });
  }
  document.querySelectorAll('[data-go]').forEach(function (button) {
    button.addEventListener('click', function () { go(button.dataset.go); });
  });
  el('back-button').addEventListener('click', function () { if (history.length) go(history.pop(), true); });
  el('administration').textContent = data.administration;
  data.overview.forEach(function (fact) {
    var row = document.createElement('div');
    var term = document.createElement('dt');
    var description = document.createElement('dd');
    term.textContent = fact[0]; description.textContent = fact[1];
    row.append(term, description); el('overview-facts').appendChild(row);
  });
  function selectCell(key) {
    var director = key === 'director';
    var main = key.indexOf('main-') === 0;
    var index = Number(key.split('-')[1]);
    var name = director ? data.director.name : (main ? data.mainCells[index] : data.supportCells[index]);
    el('cell-category').textContent = director ? 'HEAD OF DIRECTORATE' : main ? 'MAIN CELL' : 'SUPPORTING CELL';
    el('cell-name').textContent = name;
    el('cell-role').textContent = director ? 'Director of Procurement · D Proc' : main ? 'Headed by a Deputy Director' : 'Overseen by an Assistant Director';
    el('cell-description').textContent = director ? data.director.text : 'One of the three ' + (main ? 'main cells' : 'supporting cells') + ' in the Directorate of Procurement.';
    document.querySelectorAll('[data-cell]').forEach(function (button) {
      var selected = button.dataset.cell === key;
      button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected));
    });
  }
  [['main',data.mainCells],['support',data.supportCells]].forEach(function (group) {
    group[1].forEach(function (name, index) {
      var button = document.createElement('button'); button.type = 'button'; button.className = 'org-node';
      button.dataset.cell = group[0] + '-' + index;
      var title = document.createElement('strong'); title.textContent = name;
      var role = document.createElement('span'); role.textContent = group[0] === 'main' ? 'Deputy Director' : 'Assistant Director';
      var arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true'); role.appendChild(arrow);
      button.append(title, role); el(group[0] + '-cells').appendChild(button);
    });
  });
  document.querySelectorAll('[data-cell]').forEach(function (button) { button.addEventListener('click', function () { selectCell(button.dataset.cell); }); });
  selectCell('director');
  function renderList(focusFirst) {
    el('responsibility-list').replaceChildren();
    var start = page * pageSize;
    data.responsibilities.slice(start, start + pageSize).forEach(function (item, offset) {
      var index = start + offset;
      var button = document.createElement('button'); button.type = 'button'; button.className = 'responsibility-item';
      button.dataset.responsibility = index;
      button.setAttribute('aria-pressed', String(current === index));
      button.setAttribute('aria-controls', 'responsibility-content');
      var num = document.createElement('span'); num.className = 'item-number'; num.textContent = number(index + 1);
      var title = document.createElement('span'); title.textContent = item[0];
      var arrow = document.createElement('span'); arrow.className = 'item-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden','true');
      button.append(num,title,arrow); button.addEventListener('click', function () { showResponsibility(index); });
      el('responsibility-list').appendChild(button);
    });
    el('list-range').textContent = number(start + 1) + '–' + number(Math.min(start + pageSize, data.responsibilities.length));
    el('list-page').textContent = 'Page ' + (page + 1) + ' of 2';
    el('list-prev').disabled = page === 0;
    el('list-next').disabled = page === 1;
    if (focusFirst) el('responsibility-list').firstElementChild.focus();
  }
  function showResponsibility(index) {
    current = Math.max(0, Math.min(data.responsibilities.length - 1, index));
    var nextPage = Math.floor(current / pageSize);
    if (page !== nextPage) { page = nextPage; renderList(false); }
    document.querySelectorAll('[data-responsibility]').forEach(function (button) { button.setAttribute('aria-pressed', String(Number(button.dataset.responsibility) === current)); });
    el('responsibility-number').textContent = number(current + 1);
    el('responsibility-count').textContent = number(current + 1) + ' / 11';
    el('responsibility-title').textContent = data.responsibilities[current][0];
    el('responsibility-text').textContent = data.responsibilities[current][1];
    el('responsibility-prev').disabled = current === 0;
    el('responsibility-next').disabled = current === data.responsibilities.length - 1;
  }
  el('list-prev').addEventListener('click', function () { page = 0; showResponsibility(0); renderList(true); });
  el('list-next').addEventListener('click', function () { page = 1; showResponsibility(6); renderList(true); });
  el('responsibility-prev').addEventListener('click', function () { showResponsibility(current - 1); if (this.disabled) el('responsibility-next').focus(); });
  el('responsibility-next').addEventListener('click', function () { showResponsibility(current + 1); if (this.disabled) el('responsibility-prev').focus(); });
  renderList(false); showResponsibility(0);
}());
