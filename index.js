class Post {
  constructor(titulo, imagem, texto) {
    this.titulo = titulo;
    this.imagem = imagem;
    this.texto = texto;
  }

  static adicionarPost() {
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
        Post.exibirPost();
        Post.close();
        Post.limpar();
      };
      reader.readAsDataURL(file);
    } else {
      window.alert('Todos os campos devem estar preenchidos!');
    }
  }

  static close() {
    const postDialog = document.getElementById('dialogBox');
    postDialog.close();
  }

  static limpar() {
    document.getElementById('postTitle').value = '';
    document.getElementById('postImage').value = '';
    document.getElementById('postText').value = '';
  }

  static exibirPost() {
    const postsDiv = document.querySelector('.post');
    postsDiv.innerHTML = '';

    posts.reverse().forEach((post, index) => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post-item');

      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('button-div');

      const editBt = document.createElement('button');
      const editImg = document.createElement('img');
      editImg.src = 'media/lapis.png';
      editImg.alt = 'Editar';
      editBt.classList.add('bt-editar');
      editBt.addEventListener('click', () => Post.abrirEditar(index));
      editBt.appendChild(editImg);
      buttonDiv.appendChild(editBt);

      const delBt = document.createElement('button');
      const delImg = document.createElement('img');
      delImg.src = 'media/lixo.svg';
      delImg.alt = 'Excluir';
      delBt.classList.add('bt-del');
      delBt.addEventListener('click', () => Post.excluirPost(index));
      delBt.appendChild(delImg);
      buttonDiv.appendChild(delBt);

      postDiv.appendChild(buttonDiv);

      const postTitulo = document.createElement('h2');
      postTitulo.classList.add('titulo-post');
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

  static excluirPost(index) {
    posts.splice(index, 1);
    Post.exibirPost();
  }

  static abrirEditar(index) {
    const post = posts[index];
    const tituloInput = document.getElementById('tituloEditar');
    const textoInput = document.getElementById('textoEditar');
    const dialogEdit = document.getElementById('dialogEditar');
    const cancelarBtn = document.getElementById('cancelarEditar');
    const salvarBtn = document.getElementById('salvarEditar');
    dialogEdit.showModal();

    tituloInput.value = post.titulo;
    textoInput.value = post.texto;

    cancelarBtn.addEventListener('click', () => {
      dialogEdit.close();
    });

    salvarBtn.addEventListener('click', () => {
      post.titulo = tituloInput.value;
      post.texto = textoInput.value;

      dialogEdit.close();
      Post.exibirPost();
    });
  }

  static buscarPost(){
    const buscaInput = document.getElementById('txtBusca');
    
    buscaInput.addEventListener('keyup', () => {
      const postsDivs = document.querySelectorAll('.post-item');
      const buscaTexto = buscaInput.value.toLowerCase();
      
      postsDivs.forEach((postDiv) => {
        const postTitulo = postDiv.querySelector('.titulo-post').textContent.toLowerCase();

        if(postTitulo.includes(buscaTexto)){
          postDiv.style.display = 'block';
        }else{
          postDiv.style.display = 'none';
        }
      });
    });
  }
}

// Armazenar dados coletados no dialog em um array
const posts = [];

Post.buscarPost();

// Adicionando evento de clique ao botão "Adicionar Post"
const addPostBt = document.getElementById('addPost');
addPostBt.addEventListener('click', Post.adicionarPost);

// Outros eventos e funções relacionados ao dialog
const novoPostBt = document.getElementById('novo-post');
const closeBt = document.querySelector('.close');

novoPostBt.addEventListener('click', function() {
  const postDialog = document.getElementById('dialogBox');
  postDialog.showModal();
});

closeBt.addEventListener('click', function() {
  Post.close();
});