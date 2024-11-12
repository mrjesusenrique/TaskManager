document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#configForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedLanguage = document.querySelector("#language").value;
    const speed = document.querySelector("#speed").value;

    console.log(`Idioma seleccionado: ${selectedLanguage}`);
    console.log(`Velocidad de reproducción: ${speed}`);

    localStorage.setItem("language", selectedLanguage);
    localStorage.setItem("speed", speed);
    alert("Configuración guardada correctamente.");
  });

  const cancelButton = document.querySelector("#cancelar");
  cancelButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
