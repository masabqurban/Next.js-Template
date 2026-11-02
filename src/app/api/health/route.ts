import { connection } from "next/server";

/**
 * Liveness probe for load balancers, Docker and uptime monitors.
 * `connection()` opts out of prerendering so every call hits the live server.
 */
export async function GET() {
  await connection();
  return Response.json(
    { status: "ok", uptime: Math.round(process.uptime()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
