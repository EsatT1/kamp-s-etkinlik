import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // Gelen JSON verilerini okumak için

// Health Check Endpoint (Okul numaran ile)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2321032067"
  });
});

app.use("/events", eventRoutes);

// Tanımsız adresler için 404 yanıtı
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;