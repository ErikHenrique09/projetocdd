function drawMatrix() {
  var method = document.getElementById("method").value;
  var text = document.getElementById("text").value;
  
  var rows = method === "RN" ? 1 : 3;
  var cols = text.length;
  var anterior;

  var matrixHTML = "<table class='table'>";
  for (var i = 0; i < rows; i++) {
    matrixHTML += '<tr>';
    for (var j = 0; j < cols; j++) {
      console.log(text[j])
      
      anterior = j === 0 ? text[j] : text[j-1]; 
      
      if(text[j] === "0"){
        if (j != 0 && anterior == 0){
          matrixHTML += "<td style='border-top: 1px solid white; border-bottom: 3px solid #800000;'></td>";
        }else if(j == 0){
          matrixHTML += "<td style='border-top: 1px solid white; border-bottom: 3px solid #800000;'></td>";
        }else{
          matrixHTML += "<td style='border-top: 1px solid white'class='matrix-cell-white'></td>";
        }
      }else{
        if (j != 0 && anterior == 1){
          matrixHTML += "<td style='border-top: 3px solid #800000'></td>";
        }else if(j == 0){
          matrixHTML += "<td style='border-top: 3px solid #800000'></td>";
        }else{
          matrixHTML += "<td style='border-top: 3px solid #800000' class='matrix-cell-red'></td>";
        }
      }
    }
    matrixHTML += "</tr>";
  }
  matrixHTML += "</table>";

  document.getElementById("text").value = "";
  document.getElementById("matrix").innerHTML = matrixHTML;
}
