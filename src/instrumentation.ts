import type { Instrumentation } from "next";

/**
 * Runs once when a server instance starts. Initialise tracing or an error
 * tracker here (OpenTelemetry via `@vercel/otel`, Sentry, Datadog…).
 */
export function register() {}

/**
 * Called for every uncaught server error: rendering, Route Handlers, Server
 * Actions and Proxy. Forward it to your error tracker. Sentry, for example,
 * exports `captureRequestError` with this exact signature.
 */
export const onRequestError: Instrumentation.onRequestError = async (
  error,
  request,
  context,
) => {
  const { message, digest } = error as Error & { digest?: string };
  console.error(
    JSON.stringify({
      level: "error",
      message,
      digest,
      method: request.method,
      path: request.path,
      routePath: context.routePath,
      routeType: context.routeType,
    }),
  );
};
