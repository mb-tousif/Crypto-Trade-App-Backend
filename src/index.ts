import app from "./app";
import config from "./config";

export async function main() {
  app.listen(config.port, () => {
    console.log(`Server running at ${config.port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
