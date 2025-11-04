import * as fs from "fs";
import * as path from "path";

export default defineEventHandler((event) => {
  const filePath = path.join(process.cwd(), "server/api/data/products.json");

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error("Failed to read JSON-file from server:", error);
    return { error: "Failed to read JSON-file from server." };
  }
});
