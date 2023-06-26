class Post {
  constructor(titulo, imagem, texto) {
    this.titulo = titulo;
    this.imagem = imagem;
    this.texto = texto;
  }

  static adicionarPost() {
    const imgInput = document.getElementById('postImage');
    const img = imgInput.files[0];
    const titulo = document.getElementById('postTitle').value;
    const texto = document.getElementById('postText').value;

    if(Post.validaTitulo(titulo) && Post.validaTexto(texto) && Post.validaImagem(img)){
      const reader = new FileReader();
      reader.onload = function() {
        const imagem = reader.result;
        const post = new Post(titulo, imagem, texto);
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
  
        localStorage.setItem('posts', JSON.stringify(posts));
  
        Post.exibirPost();
        Post.limpar();
        Post.close();
      };
      reader.readAsDataURL(img);
    }
  }
 
  static limpar() {
    document.getElementById('postTitle').value = '';
    document.getElementById('postImage').value = '';
    document.getElementById('postText').value = '';
  }

  static close() {
    const postDialog = document.getElementById('dialogBox');
    postDialog.close();
  }

  static exibirPost() {
    const postsDiv = document.querySelector('.post');
    postsDiv.innerHTML = '';

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    
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

  static validaTitulo(titulo){
    const tituloInput = document.getElementById('postTitle');
    const tituloErro = document.getElementById('titulo-erro');

    if(titulo.length < 5 || titulo.length > 80){
      tituloInput.classList.add('erro');
      tituloErro.textContent = 'O titulo deve conter entre 5 e 80 caracteres!';
      return false;
    }else{
      tituloInput.classList.remove('erro');
      tituloErro.textContent = '';
      return true;
    }
  }

  static validaTituloEd(titulo){
    const tituloInput = document.getElementById('tituloEditar');
    const tituloErro = document.getElementById('titulo-erro-ed');

    if(titulo.length < 5 || titulo.length > 80){
      tituloInput.classList.add('erro');
      tituloErro.textContent = 'O titulo deve conter entre 5 e 80 caracteres!';
      return false;
    }else{
      tituloInput.classList.remove('erro');
      tituloErro.textContent = '';
      return true;
    }
  }

  static validaTexto(texto){
    const textoInput = document.getElementById('postText');
    const textoErro = document.getElementById('texto-erro');

    if(texto.length < 50 || texto.length > 1000){
      textoInput.classList.add('erro');
      textoErro.textContent = 'O texto deve conter entre 50 e 1000 caracteres!';
      return false;
    }else{
      textoInput.classList.remove('erro');
      textoErro.textContent = '';
      return true;
    }
  }

  static validaTextoEd(texto){
    const textoInput = document.getElementById('textoEditar');
    const textoErro = document.getElementById('texto-erro-ed');

    if(texto.length < 50 || texto.length > 1000){
      textoInput.classList.add('erro');
      textoErro.textContent = 'O texto deve conter entre 50 e 1000 caracteres!';
      return false;
    }else{
      textoInput.classList.remove('erro');
      textoErro.textContent = '';
      return true;
    }
  }

  static validaImagem(imagem){
    const extensao = ['.jpg', '.jpeg', '.png'];
    const imgInput = document.getElementById('postImage');
    const imgErro = document.getElementById('imagem-erro');

    if(imagem){
      const nomeImg = imagem.name;
      const extensaoImg = nomeImg.substring(nomeImg.lastIndexOf('.')).toLowerCase();

      if(!extensao.includes(extensaoImg)){
        imgInput.classList.add('erro');
        imgErro.textContent = 'A imagem deve ter alguma das extensoes: JPG, PNG ou JPEG';
        return false;
      }else{
        imgInput.classList.remove('erro');
        imgErro.textContent = '';
        return true;
      }
    }else{
      imgInput.classList.add('erro');
      imgErro.textContent = 'Selecione uma imagem!';
      return false;
    }
  }

  static excluirPost(index) {
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    storedPosts.reverse().splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(storedPosts));
    Post.exibirPost();
  }

  static abrirEditar(index) {
    let storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = storedPosts.reverse()[index];
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
      const novoTitulo = tituloInput.value;
      const novoTexto = textoInput.value;

      if(Post.validaTituloEd(novoTitulo) && Post.validaTextoEd(novoTexto)){
        post.titulo = novoTitulo;
        post.texto = novoTexto;

        storedPosts.reverse();
        localStorage.setItem('posts', JSON.stringify(storedPosts));

        dialogEdit.close();
        Post.exibirPost();
      }
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

const posts = [];

Post.exibirPost();
Post.buscarPost();

const addPostBt = document.getElementById('addPost');
addPostBt.addEventListener('click', Post.adicionarPost);

const novoPostBt = document.getElementById('novo-post');
novoPostBt.addEventListener('click', function() {
  const postDialog = document.getElementById('dialogBox');
  postDialog.showModal();
});

const closeBt = document.querySelector('.close');
closeBt.addEventListener('click', function() {
  Post.close();
});