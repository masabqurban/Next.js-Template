# syntax=docker/dockerfile:1

# Multi-stage build for the Next.js standalone output (`output: "standalone"`).
# The runtime image carries only the server and the modules it actually uses.
#
#   docker build -t nextjs-template --build-arg NEXT_PUBLIC_SITE_URL=https://example.com .
#   docker run -p 3000:3000 nextjs-template

ARG NODE_VERSION=24-bookworm-slim

# ── deps: install once, cached until the lockfile changes ────────────────────
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# --include=dev: some platforms inject NODE_ENV=production at build time,
# which would skip the devDependencies the build needs (TypeScript, Tailwind).
# --ignore-scripts: skips the husky `prepare` hook, which needs a git checkout.
RUN npm ci --include=dev --ignore-scripts --no-audit --no-fund

# ── build ────────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the JavaScript at build time, so they
# are build arguments, not runtime settings.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ── runtime ──────────────────────────────────────────────────────────────────
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# The standalone build splits into three parts, and all three are needed:
#   .next/standalone  the server plus only the modules it reaches
#   .next/static      hashed JS and CSS (deliberately left out of standalone)
#   public            static files served as-is
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# Never run as root.
USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
