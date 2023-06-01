function drawMatrix() {
    let method = document.getElementById("method").value;
    let text = "11001010110001";//document.getElementById("text").value;

    let rows;
    let matrixHTML;
    let altGraph = 6;
    let altLeg = altGraph - 1;
    let cols = text.length;
    switch (method) {
        case "NRZ":
            rows = 1;
            matrixHTML = drawNRZUnipolar(rows, cols, text, altGraph, altLeg);
            break;
        case "NRZL":
            rows = 3;
            matrixHTML = drawNRZLevel(rows, cols, text, altGraph, altLeg);
            break;
        case "NRZI":
            rows = 1;
            break;
        case "Manchester":
            // Tem que duplicar o texto pois cada codigo do manchester esta em duas partes
            rows = 3;
            matrixHTML = drawManchester(rows, cols, duplica(text), altGraph, altLeg);
            break;
        case "ManchesterDiferencial":
            // Tem que duplicar o texto pois cada codigo do manchester diferencial esta em duas partes
            rows = 3;
            matrixHTML = drawDifferentialManchester(rows, cols, duplica(text), altGraph, altLeg);
            break;
        default:
            break;
    }

    document.getElementById("text").value = "";
    document.getElementById("matriz").innerHTML = matrixHTML;
}

function drawNRZUnipolar(rows, cols, text, altGraph, altLeg) {

    let matrixHTML = "<table class='table'>";
    //Se por o +1 dps do altgraph apartece a linha de baixo, mas tem q ver
    for (let i = 0; i < rows + altGraph + 1; i++) {

        //Faz a borda esquerda do grafico
        matrixHTML += graphLeftBorder();

        for (let j = 0; j < cols; j++) {

            // Linhas adicionais
            if (i !== altGraph && i !== altLeg) {
                matrixHTML += `<td class='normRow' style='border-top: transparent; width: 50px;'></td>`
                continue;
            }

            // Linha de legenda
            if (i === altLeg) {
                matrixHTML += `<td class='legenda' style='border-top: transparent;'><p>${text[j]}</p></td>`
                continue;
            }

            // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
            if (text[j] === "0") {
                var cellClass = (j === 0 || text[j - 1] === "0") ? 'nrz00' : 'nrz0';
                matrixHTML += "<td class='" + cellClass + "' style='border-top: transparent;'></td>";
            } else {


                matrixHTML += (j === 0 || text[j - 1] === "1") ? "<td class='nrz11' style='border-top: 3px solid #800000'></td>" : "<td style='border-top: 3px solid #800000' class='nrz1'></td>";
            }
        }

        matrixHTML += "</tr>";
    }

    //Borda inferior do grafico
    matrixHTML += graphBottomBorder();

    matrixHTML += "</table>";

    return matrixHTML;

}

function drawNRZLevel(rows, cols, text, altGraph, altLeg) {

    let matrixHTML = "<table class='table'>";
    //Se por o +1 dps do altgraph apartece a linha de baixo, mas tem q ver
    for (let i = 0; i < rows + altGraph; i++) {

        //Faz a borda esquerda do grafico
        matrixHTML += graphLeftBorder();

        for (let j = 0; j < cols; j++) {

            // Linhas adicionais
            if (i !== altGraph && i !== altLeg) {
                matrixHTML += `<td class='normRow'style='border-top: transparent;'></td>`
                continue;
            }

            // Linha de legenda
            if (i === altLeg) {
                matrixHTML += `<td class='legenda' style='border-top: transparent;'><p>${text[j]}</p></td>`
                continue;
            }

            // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
            if (text[j] === "0") {
                var cellClass = (j === 0 || text[j - 1] === "0") ? 'nrzl00' : 'nrzl0';
                matrixHTML += "<td  class=' l0 " + cellClass + "' style='border-top: 3px solid #800000'></td>";
            } else {
                matrixHTML += (j === 0 || text[j - 1] === "1") ? "<td class=' l1 nrzl11' style='border-top: transparent;'></td>" : "<td class='l1 nrzl1' style='border-top: transparent;'></td>";
            }
        }

        matrixHTML += "</tr>";
    }

    matrixHTML += "</table>";

    return matrixHTML;

}

function drawManchester(rows, cols, text, altGraph, altLeg) {

    let matrixHTML = "<table class='table'>";

    for (let i = 0; i < rows + altGraph + 1; i++) {

        //Faz a borda esquerda do grafico
        matrixHTML += graphLeftBorder();

        let cont = 0;
        for (let j = 0; j < cols * 2; j++) {

            // Linhas adicionais
            if (i !== altGraph && i !== altLeg) {
                matrixHTML += `<td ${(j % 2 !== 0) ? "class='normRow'" : ''} style='border-top: transparent;'></td>`
                continue;
            }

            // Linha de legenda
            if (i === altLeg) {

                if (j % 2 === 0) {
                    matrixHTML += `<td colspan="2" class='legenda' style='border-top: transparent;' ><p>${text[j]}</p></td>`;
                }

                continue;

            }
            // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
            if (cont === 0) {
                if (text[j] === "0") {
                    matrixHTML += `<td class=' l0 ${(text[j - 2] === "0") ? 'mch0p11' : 'mch0p1'}' style='border-top: 3px solid #800000;'></td>`;
                } else {
                    matrixHTML += (j === 0 || text[j - 2] === "1") ? "<td class=' l1 mch1p11' style='border-top: transparent;'></td>" : "<td class=' l1 mch1p1' style='border-top: transparent;'></td>";
                }
            } else {
                matrixHTML += (text[j] === "0") ? "<td class=' l1 mch0p2' style='border-top: transparent;'></td>" : "<td class=' l0 mch1p2' style='border-top: 3px solid #800000;' ></td>";
            }

            cont = (cont === 1) ? 0 : cont + 1;

        }

        matrixHTML += "</tr>";
    }

    matrixHTML += "</table>";

    return matrixHTML;

}

function drawDifferentialManchester(rows, cols, text, altGraph, altLeg) {

  let matrixHTML = "<table class='table'>";

  for (let i = 0; i < rows + altGraph + 1; i++) {

    //Faz a borda esquerda do grafico
    matrixHTML += graphLeftBorder();

    let cont = 0;
    let inv = 0;

    for (let j = 0; j < cols * 2; j++) {

      // Linhas adicionais
      if (i !== altGraph && i !== altLeg) {
        matrixHTML += `<td ${(j % 2 !== 0) ? "class='normRow'" : ''} style='border-top: transparent;'></td>`
        continue;
      }

      // Linha de legenda
      if (i === altLeg) {

        if (j % 2 === 0)
          matrixHTML += `<td colspan="2" class='legenda' style='border-top: transparent;'><p>${text[j]}</p></td>`;

        continue;
      }

      // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
      if (cont === 0) {
        if (text[j] === "0") {
          matrixHTML += (inv === 0) ? "<td class='l1 dmch0p1' style='border-top: transparent;'></td>" : "<td class='l0 dmch0p1Inv' style='border-top: 3px solid #800000;'></td>";
        } else {
          matrixHTML += (inv === 0) ? "<td class='l0 dmch1p1'  style='border-top: 3px solid #800000'></td>" : "<td class='l1 dmch1p1Inv' style='border-top: transparent;'></td>";

        }
      } else {
        if (text[j] === "0") {
          matrixHTML += (inv === 0) ? "<td class='l0 dmch0p2' style='border-top: 3px solid #800000'></td>" : "<td class='l1 dmch0p2Inv' style='border-top: transparent;'></td>";

        } else {
          matrixHTML += (inv === 0) ? "<td class='l1 dmch1p2' style='border-top: transparent;'></td>" : "<td class='l0 dmch1p2Inv' style='border-top: 3px solid #800000;'></td>";

          // Caso seja 1 o estado de inversão precisa ser ativado
          if (inv !== 1)
            inv = 1;
          else
            inv = 0;

        }
      }

      if (cont === 1)
        cont = 0;
      else
        cont += 1;

    }

    matrixHTML += "</tr>";
  }

  matrixHTML += "</table>";

  return matrixHTML;

}

function duplica(text) {
    return `${[...text].map((char) => char.repeat(2)).join("")}`;
}

function graphLeftBorder() {
    return "<tr class='leftBorder'>"
}

function graphBottomBorder() {
    return "<tr class='bottomBorder'></tr>";
}

function middleLine() {
    // serve pra desenhar uma linha preta no meio do grafico como se fosse o eixo do tempo
}