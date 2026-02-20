// Script simples para gerenciar a lista de tarefas
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');
const mensagem = document.getElementById('mensagem');

function carregar() {
  const dados = JSON.parse(localStorage.getItem('tarefas') || '[]');
  lista.innerHTML = '';
  dados.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'tarefa';
    const texto = document.createElement('div');
    texto.className = 'texto';
    const span = document.createElement('span');
    span.textContent = t.text;
    if (t.done) span.classList.add('completa');
    span.addEventListener('click', () => {
      dados[idx].done = !dados[idx].done;
      salvar(dados);
      carregar();
    });
    texto.appendChild(span);

    const acoes = document.createElement('div');
    acoes.className = 'acoes';
    const btnRem = document.createElement('button');
    btnRem.className = 'remover';
    btnRem.textContent = 'Remover';
    btnRem.addEventListener('click', () => {
      dados.splice(idx, 1);
      salvar(dados);
      carregar();
    });
    acoes.appendChild(btnRem);

    li.appendChild(texto);
    li.appendChild(acoes);
    lista.appendChild(li);
  });
}

function salvar(dados) {
  localStorage.setItem('tarefas', JSON.stringify(dados));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const valor = input.value.trim();
  if (!valor) {
    mensagem.textContent = 'Digite uma tarefa válida.';
    return;
  }
  mensagem.textContent = '';
  const dados = JSON.parse(localStorage.getItem('tarefas') || '[]');
  dados.push({ text: valor, done: false });
  salvar(dados);
  input.value = '';
  carregar();
});

carregar();
