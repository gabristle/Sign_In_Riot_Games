class Post {
  constructor(titulo, imagem, texto) {
    this.titulo = titulo;
    this.imagem = imagem;
    this.texto = texto;
  }
}

function adicionarPost() {
  const fileInput = document.getElementById('postImage');
  const file = fileInput.files[0];
  const titulo = document.getElementById('postTitle').value;
  const texto = document.getElementById('postText').value;

  if (file && titulo && texto) {
    const reader = new FileReader();
    reader.onload = function() {
      const imagem = reader.result;
      const post = new Post(titulo, imagem, texto);
      posts.push(post);
      exibirPost();
      close();
      limpar();
    };
    reader.readAsDataURL(file);
  }else{
    window.alert('Todos os campos devem estar preenchidos!');
  }
}

//dialog
const postDialog = document.getElementById('dialogBox');
const novoPostBt = document.getElementById('novo-post');
const closeBt = document.querySelector('.close');
const addPostBt = document.getElementById('addPost');

function close(){
  postDialog.close();
}

function limpar(){
  document.getElementById('postTitle').value = '';
  document.getElementById('postImage').value = '';
  document.getElementById('postText').value = '';
}

novoPostBt.addEventListener('click', function() {
  postDialog.showModal();
});

closeBt.addEventListener('click', function() {
  close();
});

//armazenar dados coletados no dialog em um array
const posts = [];

function exibirPost(){
  const postsDiv = document.querySelector('.post');
  postsDiv.innerHTML = '';

  posts.reverse().forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post-item');

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div');

    const editBt = document.createElement('button');
    const editImg = document.createElement('img');
    editImg.src = 'media/lapis.png';
    editImg.alt = 'Editar';
    editBt.appendChild(editImg);
    buttonDiv.appendChild(editBt);

    const delBt = document.createElement('button');
    const delImg = document.createElement('img');
    delImg.src = 'media/lixo.svg';
    delImg.alt = 'Excluir';
    delBt.appendChild(delImg);
    buttonDiv.appendChild(delBt);

    postDiv.appendChild(buttonDiv);
    
    const postTitulo = document.createElement('h2');
    postTitulo.textContent = post.titulo;
    postDiv.appendChild(postTitulo);

    const postImagem = document.createElement('img');
    postImagem.src = post.imagem;
    postDiv.appendChild(postImagem);

    const postTexto = document.createElement('p');
    postTexto.textContent = post.texto;
    postDiv.appendChild(postTexto);

    postsDiv.appendChild(postDiv);
  });
}

addPostBt.addEventListener('click', adicionarPost);

console.log(posts);