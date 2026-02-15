# Monitoring & Observability

This document describes the monitoring, logging, and performance measurement setup for the .smpl project.

## Architecture Overview

All monitoring is built on top of **Vercel's native infrastructure** + the `web-vitals` library. No third-party APM tools are required.

```
Client (Browser)                         Server (Vercel)
┌─────────────────────┐                  ┌─────────────────────────┐
│ SpeedInsights       │───────────────►  │ Vercel Speed Insights   │
│ Analytics           │───────────────►  │ Vercel Analytics        │
│ WebVitalsReporter   │──── /api/vitals ─►  Structured JSON Logs   │
└─────────────────────┘                  │                         │
                                         │ withLogging (API)       │
                                         │ withDbTiming (Prisma)   │
                                         │ instrumentation.ts      │
                                         └────────┬────────────────┘
                                                  │
                                                  ▼
                                         Vercel Dashboard (Logs)
```

## Where to View

| What | Where |
|------|-------|
| Web Vitals (overview) | Vercel Dashboard → **Speed Insights** |
| Web Vitals (detailed attribution) | Vercel Dashboard → **Logs** → filter `"Web Vital"` |
| API requests (status, duration) | Vercel Dashboard → **Logs** → filter `"API request"` |
| Slow DB queries (>500ms) | Vercel Dashboard → **Logs** → filter `"Slow DB query"` |
| Unhandled render/routing errors | Vercel Dashboard → **Logs** → filter `"Unhandled error"` |
| Page views & visitors | Vercel Dashboard → **Analytics** |

## Structured Logger

**Location:** `src/shared/utils/logger/logger.ts`

All logs are output as JSON with the following schema:

```json
{
    "timestamp": "2026-02-15T12:30:45.123Z",
    "level": "info",
    "message": "API request completed",
    "context": { "method": "GET", "path": "/api/task", "status": 200, "duration_ms": 47 }
}
```

### Available functions

| Function | Level | Usage |
|----------|-------|-------|
| `loggerLog(…msgs)` | `log` | General purpose logging |
| `loggerInfo(…msgs)` | `info` | Informational messages |
| `loggerWarn(…msgs)` | `warn` | Warnings, degraded performance |
| `loggerError(…msgs)` | `error` | Errors, failures |
| `loggerLogCtx(ctx, …msgs)` | `log` | Same as above but with context object |
| `loggerInfoCtx(ctx, …msgs)` | `info` | |
| `loggerWarnCtx(ctx, …msgs)` | `warn` | |
| `loggerErrorCtx(ctx, …msgs)` | `error` | |

The `ctx` parameter is a `Record<string, unknown>` and gets serialized into the `context` field of the JSON output.

## API Request Logging — `withLogging`

**Location:** `src/shared/utils/logger/withLogging.ts`

Every API route handler is wrapped with `withLogging`, which automatically logs:

- HTTP method
- Request path
- Query string
- Response status code
- Execution duration (ms)

Responses with status >= 400 are logged at `warn` level. Unhandled exceptions are logged at `error` level and return a 500 response.

### Example log output

```json
{"level":"info","message":"API request completed","context":{"method":"GET","path":"/api/task","search":"?workspace=5","status":200,"duration_ms":47}}
{"level":"warn","message":"API request completed","context":{"method":"GET","path":"/api/user/999","search":"","status":404,"duration_ms":12}}
{"level":"error","message":"API request failed","context":{"method":"POST","path":"/api/task","search":"","duration_ms":3,"error":"Error: ..."}}
```

### Usage

```ts
import { withLogging } from '@/shared/utils/logger/withLogging';

export const GET = withLogging(async (req: NextRequest) => {
    // handler logic
});

export const GET = withLogging(async (req: NextRequest, { params }: RouteParams) => {
    // handler with route params
});
```

## DB Query Timing — `withDbTiming`

**Location:** `src/shared/utils/logger/withDbTiming.ts`

Wraps individual Prisma queries and logs their execution time. Queries exceeding **500ms** are logged at `warn` level with the message `"Slow DB query"`.

### Example log output

```json
{"level":"info","message":"DB query completed","context":{"query":"task.findByWorkspace","duration_ms":23}}
{"level":"warn","message":"Slow DB query","context":{"query":"user.findMany","duration_ms":612}}
```

### Usage

```ts
import { withDbTiming } from '@/shared/utils/logger/withDbTiming';

const user = await withDbTiming('user.findByTelegramId', () =>
    db.user.findByTelegramId(BigInt(telegramId))
);
```

## Web Vitals (Detailed Attribution) — `WebVitalsReporter`

**Location:** `src/shared/components/web-vitals-reporter/WebVitalsReporter.tsx`

A client component that collects detailed Web Vitals with attribution data via the `web-vitals` library and sends them to `/api/vitals` using `navigator.sendBeacon`.

### Collected attribution per metric

| Metric | Attribution fields |
|--------|--------------------|
| **LCP** | `target` (CSS selector of LCP element), `url` (resource URL), `timeToFirstByte`, `resourceLoadDelay`, `resourceLoadDuration`, `elementRenderDelay` |
| **INP** | `interactionTarget` (CSS selector), `interactionType` (pointer/keyboard), `inputDelay`, `processingDuration`, `presentationDelay` |
| **CLS** | `largestShiftTarget` (CSS selector of shifted element), `largestShiftValue` |
| **FCP** | `timeToFirstByte`, `firstByteToFCP` |
| **TTFB** | `dnsDuration`, `connectionDuration`, `requestDuration`, `waitingDuration` |

### Poor performance thresholds (logged at `warn` level)

| Metric | Threshold |
|--------|-----------|
| LCP | > 2500 ms |
| FCP | > 1800 ms |
| INP | > 200 ms |
| CLS | > 0.1 |
| TTFB | > 800 ms |

### Example log output

```json
{"level":"info","message":"Web Vital: LCP","context":{"metric":"LCP","value":1200,"unit":"ms","rating":"good","target":"main > section > img.hero","url":"/images/hero.webp","timeToFirstByte":180,"resourceLoadDelay":50,"resourceLoadDuration":600,"elementRenderDelay":370}}
{"level":"warn","message":"Web Vital: LCP","context":{"metric":"LCP","value":3100,"unit":"ms","rating":"poor","target":"main > div.content","timeToFirstByte":900,"resourceLoadDelay":200,"resourceLoadDuration":1200,"elementRenderDelay":800}}
```

## Server Instrumentation

**Location:** `src/instrumentation.ts`

Next.js instrumentation hooks for server-side monitoring:

- **`register()`** — runs once when the server starts. Logs the runtime environment.
- **`onRequestError()`** — catches unhandled errors during rendering, routing, and middleware execution. Logs error digest, request method/path, route type, and router kind.

### Example log output

```json
{"level":"info","message":"Instrumentation registered","context":{"runtime":"nodejs","node_version":"v20.11.0"}}
{"level":"error","message":"Unhandled error: Cannot read properties of null","context":{"digest":"abc123","method":"GET","path":"/workspace/5","routePath":"/workspace/[id]","routeType":"render","routerKind":"App Router"}}
```

## Vercel Analytics & Speed Insights

Both are mounted in `src/app/layout.tsx`:

```tsx
<Analytics />       // @vercel/analytics — page views, visitors, custom events
<SpeedInsights />   // @vercel/speed-insights — Core Web Vitals dashboard
<WebVitalsReporter /> // web-vitals — detailed attribution logging
```

**Important:** `@vercel/analytics`, `@vercel/speed-insights`, and `web-vitals` must be in `dependencies` (not `devDependencies`) to be included in the production build.

## Tests

Logger utilities are covered by unit tests:

| File | Tests | Coverage |
|------|-------|----------|
| `src/shared/utils/logger/logger.spec.ts` | 9 | JSON format, log levels, context serialization |
| `src/shared/utils/logger/withLogging.spec.ts` | 5 | Response passthrough, log levels by status, error handling, context forwarding |
| `src/shared/utils/logger/withDbTiming.spec.ts` | 5 | Return values, timing measurement, slow query threshold, error propagation |
