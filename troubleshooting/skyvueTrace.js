document.addEventListener("DOMContentLoaded", () => {
  const codeSnippet = document.getElementById("snippet");
  const resetBtn = document.getElementById("resetBtn");
  const copyBtn = document.getElementById("copyBtn");

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

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet.innerText.trim());
      copyBtn.textContent = "Copied!";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1500);
    } catch (error) {
      console.error("Unable to copy the code snippet:", error);
    }
  });

  function updateSnippet() {
    //add additional packages
    const joined = selectedPackages.join(" ");
    codeSnippet.innerText = templateText.replace(/<package>/g, joined || "<package>");
  }
});
