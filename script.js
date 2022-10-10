const fatherDiv = document.getElementById('color-palette');
const fatherButton = document.querySelector('#pai-do-botão');
let tamanho = 5;
if (localStorage.getItem('boardSize')) {
  tamanho = localStorage.getItem('boardSize');
}

function createRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const cores = `rgb(${r}, ${g}, ${b})`;
  return cores;
}
// eslint-disable-next-line max-lines-per-function
function createDiv() {
  for (let i = 0; i < 4; i += 1) {
    const createNewDiv = document.createElement('div');
    createNewDiv.style.width = '211px';
    createNewDiv.style.height = '211px';
    // createNewDiv.style.border = '1px solid black';
    createNewDiv.style.borderRadius = '20%';
    createNewDiv.style.margin = '8px';
     createNewDiv.style.display = 'inline-block';
    createNewDiv.className = 'color';
    createNewDiv.id = i;
    createNewDiv.classList.add('inset');
    fatherDiv.appendChild(createNewDiv);
  }
  const paleta = localStorage.getItem('colorPalette');
  const divEspecifica = document.getElementById('0');
  divEspecifica.style.backgroundColor = 'black';
  divEspecifica.classList.add('selected');
  const divColorida = document.getElementById('1');
  divColorida.style.backgroundColor = paleta ? paleta[0] : createRandomColor();
  const newColor = document.getElementById('2');
  newColor.style.backgroundColor = paleta ? paleta[1] : createRandomColor();
  const lastColor = document.getElementById('3');
  lastColor.style.backgroundColor = paleta ? paleta[2] : createRandomColor();
}

function attPage(param) {
  localStorage.setItem('colorPalette', JSON.stringify(param));
}

function getColor() {
  const colors = document.querySelectorAll('.color');
  const paleta = localStorage.getItem('colorPalette');
  if (paleta) {
    const teste = JSON.parse(paleta);
    for (let i = 1; i < colors.length; i += 1) {
      colors[i].style.backgroundColor = teste[`${i}key`];
    }
  }
}

function regenerationColor() {
  const color = document.getElementsByClassName('color');
  const guardarCores = {};
  for (let i = 1; i < color.length; i += 1) {
    color[i].style.backgroundColor = createRandomColor();
    // attPage(color.style.backgroundColor);
    guardarCores[`${i}key`] = color[i].style.backgroundColor;
  }
  attPage(guardarCores);
}

function button() {
  const captureButton = document.querySelector('#button-random-color');
  // const btnElement = document.createElement('button');
  captureButton.id = 'button-random-color';
  captureButton.innerText = 'Cores aleatórias';
  fatherButton.appendChild(captureButton);
  captureButton.addEventListener('click', regenerationColor);
}

function table(value) {
  const tableBoard = document.getElementById('pixel-board');
  // tableBoard.style.width = '220px';
  for (let i = 0; i < value; i += 1) {
    let line = document.createElement('section');
    for (let index = 0; index < value; index += 1) {
      const pixels = document.createElement('div');
      pixels.style.border = '1px solid black';
      pixels.style.display = 'inline-block';
      pixels.style.width = '50px';
      pixels.style.height = '50px';
      pixels.style.margin = '-3px';
      pixels.style.backgroundColor = 'white';
      pixels.setAttribute('class', 'pixel');
      line.appendChild(pixels);
    }
    tableBoard.appendChild(line);
  }
  localStorage.setItem('boardSize', value);
}

function clickOnColor() {
  fatherDiv.addEventListener('click', (event) => {
    const color = document.querySelector('.selected');
    color.classList.remove('selected');
    const eventClick = event.target;
    eventClick.classList.add('selected');
    const colorBlack = eventClick.style.backgroundColor;
    return colorBlack;
  });
}
function save() {
  const coresDoArray = [];
  const quadrado = document.querySelectorAll('.pixel');
  for (let i = 0; i < quadrado.length; i += 1) {
    coresDoArray.push(quadrado[i].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(coresDoArray));
}
document.addEventListener('click', function () {
  if (event.target.className === 'pixel') {
    const colors = document.getElementsByClassName('selected')[0];
    event.target.style.backgroundColor = colors.style.backgroundColor;
    save();
  }
});
// function newColor() {
//   const capture = document.querySelectorAll('.pixel');
//   for (let i = 0; i < capture.length; i += 1) {
//     capture[i].addEventListener('click', (event) => {
//       const findColor = document.querySelector('.selected');
//       const bgc =
//         getComputedStyle(findColor).getPropertyValue('background-color');
//       const eventoDeClick = event.target;
//       eventoDeClick.style.backgroundColor = bgc;
//       save();
//     });
//   }
// }

function whiteColor() {
  const colorClear = document.querySelectorAll('.pixel');
  for (let i = 0; i < colorClear.length; i += 1) {
    colorClear[i].style.backgroundColor = 'white';
  }
  save();
}

function clear() {
  const clearButton = document.querySelector('#button-clear');
  clearButton.id = 'clear-board';
  clearButton.innerText = 'Limpar';
  fatherButton.appendChild(clearButton);
  clearButton.addEventListener('click', whiteColor);
}

function restaurarInformacao() {
  const guardarArray = JSON.parse(localStorage.getItem('pixelBoard'));
  if (guardarArray) {
    const quadrado = document.getElementsByClassName('pixel');
    console.log(quadrado);
    for (let i = 0; i < guardarArray.length; i += 1) {
      quadrado[i].style.backgroundColor = guardarArray[i];
    }
  }
}

const btn = document.querySelector('#generate-board');
btn.addEventListener('click', newBoard);

function deleteAll() {
  const allPixels = document.getElementsByClassName('pixel');
  for (let i = allPixels.length - 1; i >= 0; i -= 1) {
    allPixels[i].remove();
  }
  localStorage.removeItem('pixelBoard');
}

// function tableOfPixels(value) {
//   deleteAll();
//   const board = document.querySelector('#pixel-board');
//   for (let i = 0; i < value * value; i += 1) {
//     const pixels = document.createElement('div');
//     pixels.className = 'pixel';
//     pixels.style.border = '1px solid black';
//     pixels.style.display = 'inline-block';
//     pixels.style.width = '40px';
//     pixels.style.height = '40px';
//     // pixels.style.margin = '84rem';
//     pixels.style.backgroundColor = 'white';
//     // pixels.setAttribute('class', 'pixel');
//     board.appendChild(pixels);
//   }
// }

function newBoard() {
  deleteAll();
  const inputs = document.querySelector('#board-size').value;
  if (inputs === '') {
    window.alert('Board inválido!');
  } else if (inputs < 5) {
    table(5);
  } else if (inputs > 50) {
    table(50);
  } else {
    table(inputs);
  }

  save();
}

window.onload = function () {
  table(tamanho);
  createDiv();
  createRandomColor();
  button();
  getColor();
  // newColor();
  clickOnColor();
  clear();
  restaurarInformacao();
};

btn.addEventListener('click', newBoard);
