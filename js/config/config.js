document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#configForm");
  const speedSlider = document.getElementById("speed");
  const languageSelect = document.querySelector("#language");
  const allowedValues = [-2, -1, 0, 1, 2];

  const configuracionGuardada = JSON.parse(
    localStorage.getItem("configuracionAudio")
  );
  if (configuracionGuardada) {
    languageSelect.value = configuracionGuardada.idioma;
    speedSlider.value = configuracionGuardada.velocidad;
  } else {
    languageSelect.value = "es-AR";
    speedSlider.value = 0;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedLanguage = languageSelect.value;
    const speed = speedSlider.value;

    const configuracionAudio = {
      idioma: selectedLanguage,
      velocidad: speed,
    };

    localStorage.setItem(
      "configuracionAudio",
      JSON.stringify(configuracionAudio)
    );

    Swal.fire({
      title: "Configuración guardada",
      text: "La configuración se ha guardado correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html";
      }
    });
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
