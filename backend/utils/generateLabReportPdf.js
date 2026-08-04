import puppeteer from "puppeteer-core";
import labReportTemplate from "../server/templates/labReportTemplate.js";

const generateLabReportPdf = async (report) => {
  const browser = await puppeteer.launch({
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    const html = labReportTemplate(report);

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
};

export default generateLabReportPdf;