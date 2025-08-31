import { execSync } from "child_process";

module.exports = async () => {
  try {
    console.log("Stopping Redis container...");

    // Detiene el contenedor Redis
    execSync("docker-compose down", { stdio: "inherit" });
    console.log("Redis container stopped!");
  } catch (e) {
    console.error("Error stopping Redis container:", e);
    return e;
  }
};
