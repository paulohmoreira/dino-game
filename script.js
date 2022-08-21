const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;

//Função para identificar o clique no botão 'espaço' do teclado
function handleKeyUp(event) {
  //Código gerado ao pressionar espaço = 32
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

//Função que faz o dino pular
function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      //Descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      //Subindo
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

//Função que gera os Cactus
function createCactus() {
  // cria uma div no nosso documento html
  const cactus = document.createElement("div");
  let cactusPosition = 1000;
  let ramdomTime = Math.random() * 6000;
  // adiciona uma classe à div que foi criada logo acima
  cactus.classList.add("cactus");
  cactus.style.left = 1000 + "px";
  // adiciona o cactus criado na div background que está no nosso documento html
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
    } else {
      cactusPosition -= 8;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);
  setTimeout(createCactus, ramdomTime);
}

createCactus();
document.addEventListener("keyup", handleKeyUp);
