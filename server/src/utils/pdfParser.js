// import fs from "fs";
// import pdf from "pdf-parse";

// const extractTextFromPDF = async (filePath) => {
//   try {
//     const dataBuffer = fs.readFileSync(filePath);

//     const data = await pdf(dataBuffer);

//     return data.text;
//   } catch (error) {
//     console.error("PDF Parse Error:", error);
//     return "";
//   }
// };

// export default extractTextFromPDF;


import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractTextFromPDF = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(data),
    });

    const pdf = await loadingTask.promise;

    let extractedText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const textContent = await page.getTextContent();

      extractedText +=
        textContent.items.map((item) => item.str).join(" ") + "\n";
    }

    return extractedText.trim();
  } catch (error) {
    console.error("PDF Parse Error:", error);
    return "";
  }
};

export default extractTextFromPDF;