function checkData() {
  const form_data = window.document.myForm;
  if (form_data.Nome.value == "" || form_data.Cognome.value == "") {
    alert("Riempire i campi Nome e Cognome");
  }
}

function checkEmpty() {
  let valueofId = document.getElementById("myForm").value;
  if (!valueofId) {
    alert("empty fields");
    return false;
  }
}
