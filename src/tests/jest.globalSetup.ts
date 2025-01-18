import { execSync } from "child_process";

module.exports = async () => {
  console.log("Starting db container...");
  try {
    // Levanta el contenedor db si no está corriendo
    // Levanta el contenedor Redis si no está corriendo
    execSync("docker-compose up -d redis", { stdio: "inherit" });
    console.log("Redis container is running!");
  } catch (error) {
    console.error("Error starting db container:", error);
    throw error;
  }
};
