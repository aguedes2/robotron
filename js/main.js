const robotron = document.querySelector('.robotron')
const btnsControle = document.querySelectorAll('[data-operacao]') //somente botão
const estatisticas = document.querySelectorAll('[data-estatistica]') //estatísticas do robô

const pecas = {
  bracos: {
    forca: 29,
    poder: 35,
    energia: -21,
    velocidade: -5
  },

  blindagem: {
    forca: 41,
    poder: 20,
    energia: 0,
    velocidade: -20
  },
  nucleos: {
    forca: 0,
    poder: 7,
    energia: 48,
    velocidade: -24
  },
  pernas: {
    forca: 27,
    poder: 21,
    energia: -32,
    velocidade: 42
  },
  foguetes: {
    forca: 0,
    poder: 28,
    energia: 0,
    velocidade: -2
  }
}

const cores = {
  Amarelo: '#EFC821',
  Azul: '#9BCBD9',
  Branco: '#FAFEFE',
  Preto: '#1E0C10',
  Rosa: '#EA95BD',
  Vermelho: '#C15B48'
}

const corRobotron = (cor) => {
  let img = document.querySelector('[imgRobotron]')
  let pathImg = `../img/cores/Robotron 2000 - ${cor}.png`
  img.src = pathImg
  return img
}

function alterarCorRobotron() {
  let dialog = document.querySelector('[dialog]')
  let btnsDialog = dialog.querySelectorAll('[data-acao]')
  let select = dialog.querySelector('[select]')
  let mostraCores = dialog.querySelector('[mostra]')
  mostraCores.setAttribute('width', '50px')

  robotron.addEventListener('click', () => {
    for (const item in cores) {
      let opcao = document.createElement('option')
      opcao.setAttribute('value', item)
      opcao.style.fontSize = '16px'
      opcao.textContent = item

      select.appendChild(opcao)
    }

    select.addEventListener('mouseup', (e) => {
      let corDeFundo = e.target.value
      mostraCores.style.background = cores[corDeFundo]
    })
    dialog.showModal()
  })

  btnsDialog.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (e.target.dataset.acao === 'confirmar') {
        corRobotron(select.value)
        select.innerHTML = ''
      }
    })
  })
}

alterarCorRobotron()

function alterarCorContador(peca) {
  const atributoFraco = '#EB4F3B'
  const atributoMedio = '#EBD43F'
  const atributoForte = '#3EEB55'

  let vlrPeca = parseInt(peca.value)
  let nivel = vlrPeca < 3 ? 'fraco' : vlrPeca < 7 ? 'medio' : 'forte'

  switch (nivel) {
    case 'fraco':
      peca.style.color = atributoFraco
      break
    case 'medio':
      peca.style.color = atributoMedio
      break
    case 'forte':
      peca.style.color = atributoForte
      break
  }
}

function manipularDados(operacao, controle) {
  let peca = controle.querySelector('[data-contador]')
  peca.value =
    operacao === '-'
      ? limitarValorMinimoPeca(peca)
        ? parseInt(peca.value) - 1
        : peca.value
      : limitarValorMaximoPeca(peca)
      ? parseInt(peca.value) + 1
      : peca.value

  alterarCorContador(peca)
}

function atualizarEstatistica(peca) {
  estatisticas.forEach((item) => {
    let vlrEstatistica = parseInt(item.textContent)

    item.textContent = vlrEstatistica + pecas[peca][item.dataset.estatistica]
  })
}

//limitar valores das peçasde 0 a 9
function limitarValorMinimoPeca(peca) {
  let vlrPeca = parseInt(peca.value)
  let minimo = vlrPeca === 0 ? false : true
  return minimo
}

function limitarValorMaximoPeca(peca) {
  let vlrPeca = parseInt(peca.value)
  let maximo = vlrPeca === 9 ? false : true
  return maximo
}
//fim limitar valor das peças

/**Manipulando vários elementos */
btnsControle.forEach((element) => {
  element.addEventListener('click', (evento) => {
    let operacao = evento.target.dataset.operacao //botão de operações
    let controle = evento.target.parentNode //todo o componente de controle da peça (input e botões)
    let peca = evento.target.dataset.peca

    manipularDados(operacao, controle) //parenteNode é o controle da peça toda (btns e input)
    atualizarEstatistica(peca)
  })
})
