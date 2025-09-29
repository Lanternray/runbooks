document.addEventListener("DOMContentLoaded", () => {
  const codeSnippet = document.getElementById("snippet");
  const resetBtn = document.getElementById("resetBtn");

  //original state, for the reset to revert to
  const templateText = codeSnippet.innerText;

    let selectedPackages = [];

  const rightColumns = document.querySelectorAll(".two-column-container .column.right");

  rightColumns.forEach(col => {
    col.addEventListener("click", () => {
      const packageText = col.innerText.trim();
      const packages = packageText.split(/\s*\n\s*/);

      packages.forEach(pkg => {
        // avoid duplicates
        if (!selectedPackages.includes(pkg)) {  
          selectedPackages.push(pkg);
        }
      });

      updateSnippet();
    });
  });

  resetBtn.addEventListener("click", () => {
    selectedPackages = [];
    codeSnippet.innerText = templateText;
  });

  function updateSnippet() {
    //add additional packages
    const joined = selectedPackages.join(" ");
    codeSnippet.innerText = templateText.replace(/<package>/g, joined || "<package>");
  }
});