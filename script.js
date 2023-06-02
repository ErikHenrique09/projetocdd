function drawMatrix() {
    let method = document.getElementById("method").value;
    let text = (validaText(document.getElementById("text").value) !== undefined) ? validaText(document.getElementById("text").value) : "01001";

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
            rows = 3;
            matrixHTML = drawNRZInvert(rows, cols, text, altGraph, altLeg);
            break;
        case "RZ":
            rows = 3;
            matrixHTML = drawRZ(rows, cols, duplica(text), altGraph, altLeg);
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
    document.getElementById("tens").innerHTML = (method === "NRZ")
                                                ? "<div class='binary'><div class='one'>1</div><div class='zero'>0</div></div>"
                                                : "<div class='tensoes'><div>+V</div><br><br><div>-V</div></div>";
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
                matrixHTML += `<td class=${(j === 0 || text[j - 1] === "0") ? 'nrz00' : 'nrz0'} style='border-top: transparent;'></td>`;
            } else {
                matrixHTML += (j === 0 || text[j - 1] === "1") ? "<td class='nrz11' style='border-top: var(--drawLineCODEC'></td>" : "<td style='border-top: var(--drawLineCODEC' class='nrz1'></td>";
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
    for (let i = 0; i < rows + altGraph +1; i++) {

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
                matrixHTML += `<td class=' l0 ${(j === 0 || text[j - 1] === "0") ? 'nrzl00' : 'nrzl0'}' style='border-top: var(--drawLineCODEC'></td>`;
            } else {
                matrixHTML += (j === 0 || text[j - 1] === "1") ? "<td class=' l1 nrzl11' style='border-top: transparent;'></td>" : "<td class='l1 nrzl1' style='border-top: transparent;'></td>";
            }
        }

        matrixHTML += "</tr>";
    }

    matrixHTML += "</table>";

    return matrixHTML;

}

function drawNRZInvert(rows, cols, text, altGraph, altLeg) {

    let matrixHTML = "<table class='table'>";

    for (let i = 0; i < rows + altGraph + 1; i++) {

        //Faz a borda esquerda do grafico
        matrixHTML += graphLeftBorder();

        let inv = 0;

        for (let j = 0; j < cols; j++) {

            // Linhas adicionais
            if (i !== altGraph && i !== altLeg) {
                matrixHTML += `<td class='normRow' style='border-top: transparent;'></td>`
                continue;
            }

            // Linha de legenda
            if (i === altLeg) {
                matrixHTML += `<td class='legenda' style='border-top: transparent;'><p>${text[j]}</p></td>`;
                continue;
            }

            // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
            if (text[j] === "0") {
                matrixHTML += (inv === 0) ? "<td class='l0 nrzi0' style='border-top:var(--drawLineCODEC);'></td>" : "<td class='l1 nrzi0Inv'></td>";
            } else {
                matrixHTML += (inv === 0) ? "<td class='l1 nrzi1'></td>" : "<td class='l0 nrzi1Inv' style='border-top: var(--drawLineCODEC'></td>";
                inv = (inv === 0) ? 1 : 0;
            }
        }
        matrixHTML += "</tr>";
    }

    matrixHTML += "</table>";

    return matrixHTML;

}

function drawRZ(rows, cols, text, altGraph, altLeg) {

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
                    matrixHTML += `<td class='rz lrz1' style='border-bottom: var(--drawLineCODEC);border-top: transparent;'></td>`;
                } else {
                    matrixHTML += `<td class='rz lrz3 lrz5' style='border-top: transparent;'></td>`;
                }
            } else {
                if(text[j] === "0"){
                    matrixHTML +=  "<td class='normRow rz lrz1 lrz2' style='border-top: transparent'></td>";
                }else{
                    matrixHTML += "<td class='normRow lrz3 lrz2' style='border-top: transparent;'></td>";
                }
            }

            cont = (cont === 1) ? 0 : cont + 1;

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
                    matrixHTML += `<td class=' l0 ${(text[j - 2] === "0") ? 'mch0p11' : 'mch0p1'}' style='border-top:var(--drawLineCODEC);'></td>`;
                } else {
                    matrixHTML += (j === 0 || text[j - 2] === "1") ? "<td class=' l1 mch1p11' style='border-top: transparent;'></td>" : "<td class=' l1 mch1p1' style='border-top: transparent;'></td>";
                }
            } else {
                matrixHTML += (text[j] === "0") ? "<td class=' l1 mch0p2' style='border-top: transparent;'></td>" : "<td class=' l0 mch1p2' style='border-top:var(--drawLineCODEC);' ></td>";
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
                    matrixHTML += (inv === 0) ? "<td class='l1 dmch0p1' style='border-top: transparent;'></td>" : "<td class='l0 dmch0p1Inv' style='border-top:var(--drawLineCODEC);'></td>";
                } else {
                    matrixHTML += (inv === 0) ? "<td class='l0 dmch1p1'  style='border-top: var(--drawLineCODEC'></td>" : "<td class='l1 dmch1p1Inv' style='border-top: transparent;'></td>";

                }
            } else {
                if (text[j] === "0") {
                    matrixHTML += (inv === 0) ? "<td class='l0 dmch0p2' style='border-top: var(--drawLineCODEC'></td>" : "<td class='l1 dmch0p2Inv' style='border-top: transparent;'></td>";
                } else {
                    matrixHTML += (inv === 0) ? "<td class='l1 dmch1p2' style='border-top: transparent;'></td>" : "<td class='l0 dmch1p2Inv' style='border-top:var(--drawLineCODEC);'></td>";

                    // Caso seja 1 o estado de inversão precisa ser ativado
                    inv = (inv !== 1) ? 1 : 0;
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

function validaText(text) {
    if (text.length === 0) {
        return undefined;
    }

    let validText = [];
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "0" || text[i] === "1") {
            validText.push(text[i]);
        }
    }

    const result = validText.join("");
    return result;
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