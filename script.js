function drawMatrix() {
  var method = document.getElementById("method").value;
  var text = document.getElementById("text").value;

  var rows = method === "RN" ? 1 : 3;
  var cols = text.length;

  var matrixHTML = "<table class='table'>";
  for (var i = 0; i < rows; i++) {
    matrixHTML += '<tr>';
    for (var j = 0; j < cols; j++) {
      console.log(text[j])
      if(text[j] === "0"){
        matrixHTML += "<td style='border-top: white'class='matrix-cell-white'></td>";
      }else{
        matrixHTML += "<td style='border-top: 3px solid red' class='matrix-cell-red'></td>";
      }
    }
    matrixHTML += "</tr>";
  }
  matrixHTML += "</table>";

  document.getElementById("matrix").innerHTML = matrixHTML;
}
