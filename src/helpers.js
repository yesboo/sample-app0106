function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(reader.result || "");
      reader.readAsText(file);
    });
  }
  
  function mapCSVToArray(csv) {
    return csv.split("\n").map((row) => row.split(","));
  }
  
  export { readFileAsText, mapCSVToArray };
  