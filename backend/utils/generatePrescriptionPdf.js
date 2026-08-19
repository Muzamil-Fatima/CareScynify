import puppeteer from "puppeteer-core";
import prescriptionTemplate from "../server/templates/prescriptionTemplate.js";

const generatePrescriptionPdf = async (prescription) => {
  if (!prescription) {
    throw new Error("Prescription data is required to generate PDF.");
  }

  let browser;

  try {
    /*
    
    | CHROME
    
    */

    const executablePath =
      process.env.CHROME_EXECUTABLE_PATH ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

    console.log("Launching Chrome for prescription PDF...");

    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    /*
    
    | NEW PAGE
    
    */

    const page = await browser.newPage();

    /*
    
    | VIEWPORT
    
    */

    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 1,
    });

    /*
    
    | BROWSER CONSOLE
    
    |
    | Useful if something inside the HTML/template produces an error.
    |
    */

    page.on("console", (message) => {
      console.log(
        `[Prescription PDF Browser Console - ${message.type()}]:`,
        message.text(),
      );
    });

    /*
    
    | PAGE ERROR
    
    */

    page.on("pageerror", (error) => {
      console.error(
        "Prescription PDF Browser Page Error:",
        error?.message || error,
      );
    });

    /*
    
    | REQUEST FAILED
    
    */

    page.on("requestfailed", (request) => {
      console.error(
        "Prescription PDF Resource Failed:",
        request.url(),
        request.failure()?.errorText,
      );
    });

    /*
    
    | GENERATE HTML
    
    */

    console.log(
      "Generating prescription HTML:",
      prescription?.prescriptionId || "Unknown",
    );

    let html;

    try {
      html = prescriptionTemplate(prescription);
    } catch (error) {
      console.error("Prescription Template Error:", error?.message || error);

      throw new Error(
        `Prescription template generation failed: ${
          error?.message || "Unknown template error"
        }`,
      );
    }

    /* VALIDATE HTML
    
    */

    if (!html || typeof html !== "string") {
      throw new Error("Prescription template did not return valid HTML.");
    }

    console.log(
      "Prescription HTML generated successfully. Length:",
      html.length,
    );

    /*
    
    LOAD HTML
    
    */

    try {
      await page.setContent(html, {
        waitUntil: "networkidle0",
      });
    } catch (error) {
      console.error("Prescription HTML Load Error:", error?.message || error);

      throw new Error(
        `Prescription HTML loading failed: ${
          error?.message || "Unknown HTML loading error"
        }`,
      );
    }

    console.log("Prescription HTML loaded successfully.");

    try {
      await page.evaluate(async () => {
        const images = Array.from(document.images);

        await Promise.all(
          images.map((img) => {
            if (img.complete) {
              return Promise.resolve();
            }

            return new Promise((resolve) => {
              const done = () => resolve();

              img.addEventListener("load", done, {
                once: true,
              });

              img.addEventListener("error", done, {
                once: true,
              });
            });
          }),
        );
      });

      console.log("Prescription images processed.");
    } catch (error) {
      /*
       * Image errors should not normally stop PDF generation.
       */

      console.warn(
        "Prescription image processing warning:",
        error?.message || error,
      );
    }

    /*
    
    | SMALL FONT / LAYOUT WAIT
    
    |
    | Gives Chromium a moment to finish rendering fonts/layout.
    |
    */

    await page.evaluate(() => {
      if (document.fonts?.ready) {
        return document.fonts.ready;
      }

      return Promise.resolve();
    });

    /*
    
    | GENERATE PDF
    
    */

    console.log(
      "Generating prescription PDF:",
      prescription?.prescriptionId || "Unknown",
    );

    let pdfBuffer;

    try {
      pdfBuffer = await page.pdf({
        format: "A4",

        printBackground: true,

        preferCSSPageSize: false,

        displayHeaderFooter: false,

        margin: {
          top: "20px",
          right: "20px",
          bottom: "20px",
          left: "20px",
        },
      });
    } catch (error) {
      console.error("Puppeteer PDF Generation Error:", error?.message || error);

      throw new Error(
        `Prescription PDF generation failed: ${
          error?.message || "Unknown Puppeteer error"
        }`,
      );
    }

    /*
    
    | VALIDATE PDF BUFFER
    
    */

    if (!pdfBuffer) {
      throw new Error("Prescription PDF generator returned an empty result.");
    }

    if (!Buffer.isBuffer(pdfBuffer)) {
      pdfBuffer = Buffer.from(pdfBuffer);
    }

    if (pdfBuffer.length === 0) {
      throw new Error(
        "Prescription PDF generator returned an empty PDF buffer.",
      );
    }

    /*
    
    | BASIC PDF VALIDATION
    
    |
    | A valid PDF normally starts with %PDF.
    |
    */

    const pdfHeader = pdfBuffer.subarray(0, 4).toString("utf8");

    if (pdfHeader !== "%PDF") {
      throw new Error("Generated prescription file is not a valid PDF.");
    }

    console.log(
      "Prescription PDF generated successfully:",
      pdfBuffer.length,
      "bytes",
    );

    return pdfBuffer;
  } catch (error) {
    /*
    
    | FINAL ERROR
    
    */

    console.error("generatePrescriptionPdf ERROR:", error?.message || error);

    console.error("Prescription PDF Error Stack:", error?.stack);

    throw error;
  } finally {
    /*
    
    | ALWAYS CLOSE BROWSER
    
    */

    if (browser) {
      try {
        await browser.close();

        console.log("Prescription PDF browser closed successfully.");
      } catch (closeError) {
        console.error(
          "Failed to close Prescription PDF browser:",
          closeError?.message || closeError,
        );
      }
    }
  }
};

export default generatePrescriptionPdf;
