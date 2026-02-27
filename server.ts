import express from "express";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import { JWT } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Google Sheets API Setup
  const SPREADSHEET_ID = "15LsLFmzbu2RtryLWnIW4LoVzBJuiiRsdmragjVwrRPo";
  const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  const auth = new JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // API route for contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message, timestamp } = req.body;

      if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
        console.warn("Google Sheets credentials missing. Form data received but not saved to cloud.");
        return res.status(200).json({ 
          status: "partial_success", 
          message: "Form received locally, but cloud sync is not configured." 
        });
      }

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A:E",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[timestamp, name, email, subject, message]],
        },
      });

      res.json({ status: "success", message: "Response saved to Google Sheets" });
    } catch (error) {
      console.error("Google Sheets Error:", error);
      res.status(500).json({ status: "error", message: "Failed to save response to cloud" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
