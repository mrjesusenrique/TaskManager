document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#configForm");
  const speedSlider = document.getElementById("speed");
  const allowedValues = [-2, -1, 0, 1, 2];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedLanguage = document.querySelector("#language").value;
    const speed = speedSlider.value;

    console.log(`Idioma seleccionado: ${selectedLanguage}`);
    console.log(`Velocidad de reproducción: ${speed}`);

    localStorage.setItem("language", selectedLanguage);
    localStorage.setItem("speed", speed);
    alert("Configuración guardada correctamente.");
  });

  document.querySelector("#cancelar").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  speedSlider.addEventListener("input", () => {
    const value = parseFloat(speedSlider.value);
    const closestValue = allowedValues.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
    speedSlider.value = closestValue;
  });
});
