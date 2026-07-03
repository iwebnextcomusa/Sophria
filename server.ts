import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client to prevent crash if key is missing on startup
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Chatbot API Endpoint
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    
    const systemPrompt = `You are "Sophria AI", an intelligent, warm, and highly professional customer service representative for Sophria, a premium residential and commercial flooring contractor.
    
Your mission is to represent Sophria with luxury branding, answer user queries with expert details, and capture leads (name, phone, email, project details) for a Free Estimate!

Key Company Context:
- Company Name: Sophria
- Industry: High-end residential & commercial flooring installations and refinishing.
- Core Values: Exceptional craftsmanship, transparent pricing, premium customer service, and lifetime durability.
- Service Area: Hamilton, Ontario and nearby regions (Burlington, Oakville, Mississauga, Brampton, Milton, Ancaster, Dundas, Stoney Creek, Grimsby, Niagara Region).
- Phone: (437) 605-4750
- Emails: estimating@sophria.ca, mansoor@sophria.ca
- Head Office: 226-6465 Millcreek Dr., Mississauga, Ontario, Canada L5N 5R3

Our Services:
1. Hardwood Flooring: Professional solid hardwood installations, custom staining, outstanding longevity.
2. Luxury Vinyl Plank (LVP): Fully waterproof, scratch-proof, indentation-proof, perfect for active families, kitchens, and basements.
3. Laminate Flooring: Cost-effective, high-density fiberboard core with realistic wood patterns.
4. Engineered Hardwood: Real wood veneer over premium cross-ply layers, structurally stable against temperature/humidity fluctuations (great for concrete subfloors).
5. Tile Installation: Ceramic, porcelain, natural stone for kitchens, bathrooms, elegant backsplashes, and entries.
6. Stair Refinishing: Professional sanding, staining, custom wood matching, handrail/baluster installations.
7. Floor Repair: Squeak remediation, board replacement, scratch removal, water damage repair.
8. Floor Removal: Dust-controlled removal of old carpets, hard tiles, wood, or vinyl.
9. Commercial Flooring: High-performance sheet vinyl, heavy-duty carpet tiles, commercial laminate for high-traffic environments.
10. Residential Flooring: Bespoke room-by-room design and installation.
11. Custom Flooring Solutions: Herringbone patterns, borders, customized transitions, and custom-stained accents.

Response Guidelines:
- Tone: Highly professional, upscale, friendly, and trustworthy. Use bullet points and paragraphs for beautiful scannability.
- Conversion Intent: If the customer shows any interest in pricing, planning, booking, or remodeling, offer to log their details for a Free Estimate. Gently prompt for their name, contact info (phone/email), service type, and location.
- Call to Action: Remind them that they can call us directly at (437) 605-4750 or email estimating@sophria.ca for instant bookings!`;

    // Map history to the required format
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        });
      });
    }
    
    // Append the active message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chatbot API Error:", error);
    // If API key is missing or invalid, output a clear helpful error message
    res.status(500).json({ 
      error: "Our assistant is temporarily offline.",
      details: error.message || "Please verify the GEMINI_API_KEY secret is configured in the AI Studio settings."
    });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running successfully at http://0.0.0.0:${PORT}`);
  });
}

startServer();
