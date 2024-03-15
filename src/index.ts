import app from "./app";
import configs from "./config";

app.listen(configs.PORT, () => {
  console.log(`Server running on ${configs.PORT}`);
});
