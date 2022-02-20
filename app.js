function checkData() {
  const form_data = window.document.myForm;
  let error;
  if (form_data.feedback.value == null) {
    error = "Field is empty";
    alert(error);
  }
  alert(
    form_data.Nome.value +
      form_data.Cognome.value +
      " sesso: " +
      form_data.gender.value +
      "\n" +
      form_data.feedback.value
  );
}
