{
    titulo: "O que é Inteligência Artificial?",

    icone: "🤖",

    pergunta:
      "Qual alternativa explica melhor o conceito de Inteligência Artificial?",

    opcoes: [

      "Tecnologia capaz de executar tarefas que normalmente exigem capacidades humanas, usando dados e algoritmos.",

      "Um robô que obrigatoriamente possui aparência humana.",

      "Um programa que funciona sem nenhum dado ou regra.",

      "Uma tecnologia usada somente para criar imagens."

    ],

    correta: 0,

    explicacao:
      "IA é um campo da computação que cria sistemas capazes de realizar tarefas como reconhecer padrões, interpretar informações e apoiar decisões."

  },


  {
    titulo: "Funções em JavaScript",

    icone: "⚙️",

    pergunta:
      "Em programação, qual é a principal vantagem de criar uma função?",

    opcoes: [

      "Deixar o código maior e mais difícil de entender.",

      "Reutilizar um conjunto de instruções para realizar uma tarefa.",

      "Impedir que o programa receba informações.",

      "Fazer o computador desligar automaticamente."

    ],

    correta: 1,

    explicacao:
      "Uma função reúne instruções que podem ser chamadas várias vezes. Isso evita repetição e deixa o código mais organizado."

  },


  {
    titulo: "IA e dados",

    icone: "🧠",

    pergunta:
      "Por que os dados são importantes para muitos sistemas de IA?",

    opcoes: [

      "Porque os dados podem ajudar o sistema a encontrar padrões e produzir resultados.",

      "Porque a IA só funciona quando os dados são impressos.",

      "Porque os dados substituem totalmente os seres humanos.",

      "Porque nenhum algoritmo é necessário quando existem dados."

    ],

    correta: 0,

    explicacao:
      "Muitos sistemas de IA analisam grandes conjuntos de dados para identificar padrões. A qualidade e a representatividade dos dados também são importantes."

  },


  {
    titulo: "IA responsável",

    icone: "🛡️",

    pergunta:
      "Qual atitude ajuda a usar a Inteligência Artificial de forma responsável?",

    opcoes: [

      "Aceitar qualquer resposta de uma IA sem conferir.",

      "Compartilhar dados pessoais de qualquer pessoa com ferramentas de IA.",

      "Verificar informações, proteger dados pessoais e analisar possíveis erros e vieses.",

      "Usar IA para substituir toda decisão humana importante."

    ],

    correta: 2,

    explicacao:
      "Usar IA com responsabilidade envolve conferir resultados, cuidar da privacidade e reconhecer que sistemas de IA podem cometer erros ou reproduzir vieses."

  }

];


let atual = 0;

let pontos = 0;

let respondeu = false;


/* TROCAR DE TELA */

function mostrar(id) {

  document
    .querySelectorAll(".screen")
    .forEach(
      s => s.classList.remove("active")
    );

  document
    .getElementById(id)
    .classList.add("active");

}


/* INICIAR */

function iniciarMissao() {

  atual = 0;

  pontos = 0;

  carregarMissao();

  mostrar("jogo");

}


/* CARREGAR MISSÃO */

function carregarMissao() {

  respondeu = false;

  const m = missoes[atual];


  document.getElementById("numero")
    .textContent =
    String(atual + 1).padStart(2, "0");


  document.getElementById("titulo")
    .textContent =
    m.titulo;


  document.getElementById("icone")
    .textContent =
    m.icone;


  document.getElementById("pergunta")
    .textContent =
    m.pergunta;


  document.getElementById("score")
    .textContent =
    pontos;


  document.getElementById("barra")
    .style.width =
    ((atual + 1) /
      missoes.length *
      100) + "%";


  const opcoes =
    document.getElementById("opcoes");


  opcoes.innerHTML = "";


  m.opcoes.forEach(
    (texto, i) => {

      const btn =
        document.createElement("button");

      btn.className = "option";

      btn.textContent =
        String.fromCharCode(65 + i)
        + " — "
        + texto;

      btn.onclick =
        () => responder(i);

      opcoes.appendChild(btn);

    }
  );


  document.getElementById("feedback")
    .innerHTML = "";


  document.getElementById("proximo")
    .classList.add("hidden");

}


/* RESPONDER */

function responder(escolha) {

  if (respondeu) return;

  respondeu = true;


  const m = missoes[atual];

  const botoes =
    document.querySelectorAll(".option");


  botoes.forEach(
    (b, i) => {

      b.disabled = true;


      if (i === m.correta) {

        b.classList.add("correct");

      }


      if (
        i === escolha &&
        i !== m.correta
      ) {

        b.classList.add("wrong");

      }

    }
  );


  const feedback =
    document.getElementById("feedback");


  if (escolha === m.correta) {

    pontos += 25;

    document.getElementById("score")
      .textContent =
      pontos;


    feedback.innerHTML =
      "✅ <strong>Resposta correta!</strong> "
      + m.explicacao;

  }

  else {

    feedback.innerHTML =
      "❌ <strong>Resposta incorreta.</strong> "
      + m.explicacao;

  }


  document.getElementById("proximo")
    .classList.remove("hidden");

}


/* PRÓXIMA MISSÃO */

function proximaMissao() {

  if (
    atual <
    missoes.length - 1
  ) {

    atual++;

    carregarMissao();

  }

  else {

    finalizar();

  }

}


/* FINALIZAR */

function finalizar() {

  document.getElementById("pontuacaoFinal")
    .textContent =
    pontos;


  const titulo =
    document.getElementById(
      "resultadoTitulo"
    );


  const texto =
    document.getElementById(
      "resultadoTexto"
    );


  if (pontos === 100) {

    titulo.textContent =
      "Missão perfeita!";

    texto.textContent =
      "Você acertou todos os desafios e demonstrou que entendeu os principais conceitos de IA e funções.";

  }

  else if (pontos >= 50) {

    titulo.textContent =
      "Boa missão!";

    texto.textContent =
      "Você avançou bem. Revise os conceitos apresentados e tente novamente para alcançar 100 pontos.";

  }

  else {

    titulo.textContent =
      "Missão concluída!";

    texto.textContent =
      "Você terminou o desafio. Use as explicações para revisar os conceitos e tente novamente.";

  }


  mostrar("final");

}


/* REINICIAR */

function reiniciar() {

  iniciarMissao();

}
