function drawMatrix() {
  let method = document.getElementById("method").value;
  let text = "010011";//document.getElementById("text").value;
  
  let rows;
  let cols = text.length;
  let altGraph = 6;

  let matrixHTML;

  switch (method){
    case "RZ":
      rows = 1;
      matrixHTML = drawRZ(rows,cols,text, altGraph);

      break;
    case "NRZ":
      rows = 1;
      break;
    case "Manchester":
      // Tem que duplicar o texto pois cada codigo do mnchester esta em duas partes
      rows = 3;
      matrixHTML = drawManchester(rows,cols,`${[...text].map((char) => char.repeat(2)).join("")}`,altGraph);
      break;
    case "ManchesterDiferencial":
      rows = 3;
      matrixHTML = drawDifferentialManchester(rows,cols,`${[...text].map((char) => char.repeat(2)).join("")}`,altGraph);
      break;
    default:
      break;
  }

  document.getElementById("text").value = "";
  document.getElementById("matriz").innerHTML = matrixHTML;
}

function drawDifferentialManchester(rows, cols, text, altGraph){
  let altLeg = altGraph - 1;

  let matrixHTML = "<table class='table'>";

  for (let i = 0; i < rows+altGraph-1; i++){

    //Faz a borda esquerda do grafico
    matrixHTML += graphLeftBorder();

    let cont = 0;
    let inv = 0;

    for (let j = 0; j < cols*2; j++){

      // Linhas adicionais
      if (i !== altGraph && i !== altLeg){
        matrixHTML += `<td style='border: 1px solid white; width: 50px;'></td>`
        continue;
      }

      // Linha de legenda
      if(i === altLeg){

        if(j % 2 === 0)
          matrixHTML += `<td colspan="2" class='legenda'><p>${text[j]}</p></td>`;

        continue;
      }

      // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
      if (cont === 0){
        if(text[j] === "0"){

          //let cellClass = (j === 0 || text[j-2] === 0) ? "dmch0p1" : "";
          matrixHTML += (inv === 0) ? "<td class='dmch0p1'></td>" : "<td class='dmch0p1Inv' style='border-top: 3px solid #800000;'></td>";
        }else{

          //var styles = (j === 0 || text[j - 2] === "1") ? ""
          matrixHTML += (inv === 0) ? "<td class='dmch1p1'  style='border-top: 3px solid #800000'></td>" : "<td class='dmch1p1Inv'></td>";

          // Caso seja 1 repetido o estado de inversão é ativado
        }
      }else{
        if(text[j] === "0"){
          matrixHTML += (inv === 0) ? "<td class='dmch0p2' style='border-top: 3px solid #800000'></td>" : "<td class='dmch0p2Inv'></td>";

        }else{
          //matrixHTML += (j === 0 || text[j - 2] === "1") ?

          matrixHTML += (inv === 0) ? "<td class='dmch1p2'></td>" : "<td class='dmch1p2Inv' style='border-top: 3px solid #800000;'></td>";

          if(inv !== 1)
            inv = 1;
          else
            inv = 0;

        }
      }

      if (cont === 1){
        cont = 0;
      }else{
        cont += 1;
      }

    }

    matrixHTML += "</tr>";
  }

  //Borda inferior do grafico
  matrixHTML += graphBottomBorder();

  matrixHTML += "</table>";

  return matrixHTML;

}

function drawManchester(rows, cols, text, altGraph){
  let altLeg = altGraph - 1;

  let matrixHTML = "<table class='table'>";

  for (let i = 0; i < rows+altGraph-1; i++){

    //Faz a borda esquerda do grafico
    matrixHTML += graphLeftBorder();

    let cont = 0;
    for (let j = 0; j < cols*2; j++){

      // Linhas adicionais
      if (i !== altGraph && i !== altLeg){
        matrixHTML += `<td style='border: 1px solid white; width: 50px;'></td>`
        continue;
      }

      // Linha de legenda
      if(i === altLeg){

        if(j % 2 === 0)
          matrixHTML += `<td colspan="2" class='legenda'><p>${text[j]}</p></td>`;

        continue;

      }

      // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
      if (cont === 0){
        if(text[j] === "0"){
          var cellClass = (text[j - 2] === "0") ? 'mch0p11' : 'mch0p1';
          matrixHTML += "<td class='" + cellClass + "' style='border-top: 3px solid #800000;'></td>";
        }else{
          //var styles = (j === 0 || text[j - 2] === "1") ? ""
          matrixHTML += (j === 0 || text[j - 2] === "1") ? "<td class='mch1p11' ></td>" : "<td class='mch1p1'></td>";
        }
      }else{
        if(text[j] === "0"){
          matrixHTML += "<td class='mch0p2'></td>";
        }else{
          matrixHTML += "<td class='mch1p2' style='border-top: 3px solid #800000;' ></td>";
        }
      }

      if (cont === 1){
        cont = 0;
      }else{
        cont += 1;
      }

    }
    matrixHTML += "</tr>";
  }

  //Borda inferior do grafico
  matrixHTML += graphBottomBorder();

  matrixHTML += "</table>";

  return matrixHTML;

}

function drawRZ(rows, cols, text, altGraph){
  let altLeg = altGraph - 1;

  let matrixHTML = "<table class='table'>";
  for (let i = 0; i < rows+altGraph+1; i++){

    //Faz a borda esquerda do grafico
    matrixHTML += graphLeftBorder();

    for (let j = 0; j < cols; j++){

      // Linhas adicionais
      if (i !== altGraph && i !== altLeg){
        matrixHTML += `<td style='border: 1px solid white; width: 50px;'></td>`
        continue;
      }

      // Linha de legenda
      if(i === altLeg){
        matrixHTML += `<td class='legenda'1><p>${text[j]}</p></td>`
        continue;
      }

      // aqui e necessario cuidar do valor anterior por isso os ifs ternarios
      if(text[j] === "0"){
        var cellClass = (j === 0 || text[j - 1] === "0") ? 'rz00' : 'rz0';
        matrixHTML += "<td class='" + cellClass + "' style='height: 80px; border-top: 1px solid white;'></td>";
      }else{
        matrixHTML += (j === 0 || text[j - 1] === "1") ? "<td style='height:80px; border-top: 3px solid #800000'></td>" : "<td style='border-top: 3px solid #800000' class='rz1'></td>";
      }
    }

    matrixHTML += "</tr>";
  }

  //Borda inferior do grafico
  matrixHTML += graphBottomBorder();

  matrixHTML += "</table>";

  return matrixHTML;

}

function duplica(text){
  return `${[...text].map((char) => char.repeat(2)).join("")}`;
}

function graphLeftBorder(){
  return "<tr class='leftBorder'>"
}

function graphBottomBorder(){
  return "<tr class='bottomBorder'></tr>";
}
