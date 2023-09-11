import { PrismaClient } from "@prisma/client";
import app from "./app";

export const prisma = new PrismaClient();
const port = process.env.PORT || 3003;
export async function main() {
  app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
