'use client';
import { useEffect } from 'react';
import type { MetricWithAttribution } from 'web-vitals/attribution';


const sendVital = (metric: MetricWithAttribution) => {
    const attribution = getAttribution(metric);

    const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        id: metric.id,
        navigationType: metric.navigationType,
        attribution,
    });

    if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/vitals', body);
    } else {
        fetch('/api/vitals', { body, method: 'POST', keepalive: true });
    }
};

const getAttribution = (metric: MetricWithAttribution): Record<string, unknown> => {
    switch (metric.name) {
        case 'LCP': {
            const lcp = metric.attribution;
            return {
                target: lcp.target,
                url: lcp.url,
                timeToFirstByte: Math.round(lcp.timeToFirstByte),
                resourceLoadDelay: Math.round(lcp.resourceLoadDelay),
                resourceLoadDuration: Math.round(lcp.resourceLoadDuration),
                elementRenderDelay: Math.round(lcp.elementRenderDelay),
            };
        }
        case 'CLS': {
            const cls = metric.attribution;
            return {
                largestShiftTarget: cls.largestShiftTarget,
                largestShiftValue: cls.largestShiftValue,
            };
        }
        case 'INP': {
            const inp = metric.attribution;
            return {
                interactionTarget: inp.interactionTarget,
                interactionType: inp.interactionType,
                inputDelay: Math.round(inp.inputDelay),
                processingDuration: Math.round(inp.processingDuration),
                presentationDelay: Math.round(inp.presentationDelay),
            };
        }
        case 'FCP': {
            const fcp = metric.attribution;
            return {
                timeToFirstByte: Math.round(fcp.timeToFirstByte),
                firstByteToFCP: Math.round(fcp.firstByteToFCP),
            };
        }
        case 'TTFB': {
            const ttfb = metric.attribution;
            return {
                dnsDuration: Math.round(ttfb.dnsDuration),
                connectionDuration: Math.round(ttfb.connectionDuration),
                requestDuration: Math.round(ttfb.requestDuration),
                waitingDuration: Math.round(ttfb.waitingDuration),
            };
        }
        default:
            return {};
    }
};

export default function WebVitalsReporter() {
    useEffect(() => {
        import('web-vitals/attribution').then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
            onLCP(sendVital);
            onINP(sendVital);
            onCLS(sendVital);
            onFCP(sendVital);
            onTTFB(sendVital);
        });
    }, []);

    return null;
}
