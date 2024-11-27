import express, { Request, Response } from "express";
import { readdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

const app = express();
const PORT = process.env.PORT || 3000;
const IMAGE_DIR = join(__dirname, "data", "cat-images");

// Define route parameters explicitly
interface Params {
  width: string;
  height: string;
}

app.get("/api/cats/:width/:height", async (req: Request<Params>, res: Response) => {
  const { width, height } = req.params;
  const targetWidth = parseInt(width, 10);
  const targetHeight = parseInt(height, 10);

  try {
    // Read all images from the directory
    const files = await readdir(IMAGE_DIR);
    if (files.length === 0) {
      return res.status(404).json({ error: "No images available" });
    }

    // Pick a random image
    const randomImage = files[Math.floor(Math.random() * files.length)];
    const imagePath = join(IMAGE_DIR, randomImage);

    // Resize the image using sharp
    const imageBuffer = await sharp(imagePath)
      .resize(targetWidth, targetHeight)
      .toBuffer();

    res.set("Content-Type", "image/jpeg");
    res.send(imageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process the image" });
  }
});

app.listen(PORT, () => {
  console.log("Server started successfully.");
});
