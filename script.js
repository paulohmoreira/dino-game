const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
let isJumping = false;
let position = 0;
let score = 0;
let positionLevel = 6;

//Função para identificar o clique no botão 'espaço' do teclado
function handleKeyUp(event) {
  //Código gerado ao pressionar espaço = 32
  if (event.keyCode === 32 || event.keyCode === 38) {
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
  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
      score += 10;
      document.getElementById("score").innerHTML = "Score: " + score;
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      document.body.innerHTML =
        '<h1 class="game-over">Fim de Jogo</h1><p>Você fez ' +
        score +
        ' pontos.</p><a class="restart" href="javascript:window.location.reload(true)"><p>Clique aqui para jogar novamente</p></a>';
    } else {
      cactusPosition -= positionLevel;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);
  setTimeout(levelUp, 10000);
  setTimeout(createCactus, ramdomTime);
}

function levelUp() {
  positionLevel += 1;
}

createCactus();
document.addEventListener("keyup", handleKeyUp);
