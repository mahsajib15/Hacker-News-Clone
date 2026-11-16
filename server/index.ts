import net from "node:net";
import { Hono } from "hono";

import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const getAvailablePort = async (preferredPort: number, maxAttempts = 20) => {
  for (
    let port = preferredPort;
    port < preferredPort + maxAttempts;
    port += 1
  ) {
    const isFree = await new Promise<boolean>((resolve) => {
      const probe = net.createServer();
      probe.once("error", () => resolve(false));
      probe.listen(port, "127.0.0.1", () => {
        probe.close(() => resolve(true));
      });
    });

    if (isFree) {
      return port;
    }
  }

  return preferredPort;
};

void (async () => {
  const port = await getAvailablePort(Number(process.env["PORT"] ?? 3000));

  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    },
  );
})();

export default app;
