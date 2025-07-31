const form   = document.getElementById('todo-form');
const input  = document.getElementById('todo-input');
const listEl = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos') || '[]');

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  listEl.innerHTML = '';
  todos.forEach((todo, index) => {
    const li    = document.createElement('li');
    li.className = todo.done ? 'completed' : '';

    const span  = document.createElement('span');
    span.textContent = todo.text;

    const toggleBtn = document.createElement('input');
    toggleBtn.type = 'checkbox';
    toggleBtn.checked = todo.done;
    toggleBtn.addEventListener('change', () => {
      todos[index].done = toggleBtn.checked;
      save();
      render();
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = '×';
    delBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      save();
      render();
    });

    li.append(toggleBtn, span, delBtn);
    listEl.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  save();
  input.value = '';
  render();
});

render(); // initial paint
