import express, { Request, Response } from "express";
import { GradeModel } from "./models/GradeModel";

const app = express();
const PORT = process.env.PORT || 8000;

// Log when the server starts
console.log("Initializing server setup...");

// Serve static files from the "public" directory
app.use(express.static("public"));

// Initialize the JSON data if not exists
console.log("Checking or generating JSON data...");
GradeModel.checkOrGenerateData();
console.log("JSON data setup complete...");

// API endpoints
app.get("/api/header/:courseId", async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    const header = await GradeModel.getHeader(courseId);
    res.json(header);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.get("/api/gradebook/:courseId", async (req: Request, res: Response) => {
  try {
    const courseId = req.params.courseId;
    const gradebook = await GradeModel.getGradebook(courseId);
    res.json({ courseId, gradebook });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Catch-all route for the landing page
app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
