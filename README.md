To install dependencies:

```sh
bun install
```

For the local PostgreSQL database, start the Compose service:

```sh
docker compose up -d
```

If you do not already have a `.env` file, create one from the example:

```powershell
Copy-Item .env.example .env
```

The example URL matches the development credentials in `compose.yml`. If `.env` already exists, update only its `DATABASE_URL` to match your database. Do not commit `.env`.

To run:

```sh
bun run dev
```

The server starts on the first available port starting from 3000. Override it with `PORT` if needed:

```sh
# macOS / Linux
PORT=4000 bun run dev

# Windows PowerShell
$env:PORT = "4000"; bun run dev
```
