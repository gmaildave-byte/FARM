import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'suppress-hmr-client',
        transformIndexHtml: {
          order: 'pre',
          handler() {
            return [
              {
                tag: 'script',
                injectTo: 'head-prepend',
                children: `
                  (function() {
                    if (typeof window === 'undefined') return;
                    try {
                      var RealWebSocket = window.WebSocket;
                      if (RealWebSocket) {
                        window.WebSocket = function(url, protocols) {
                          var isViteHmr = 
                            protocols === 'vite-hmr' || 
                            (Array.isArray(protocols) && protocols.indexOf('vite-hmr') !== -1) ||
                            (typeof url === 'string' && (url.indexOf('vite-hmr') !== -1 || url.indexOf('@vite/client') !== -1));
                          
                          if (isViteHmr) {
                            var mock = {
                              binaryType: 'blob',
                              readyState: 1,
                              send: function() {},
                              close: function() {},
                              addEventListener: function(event, cb) {
                                if (event === 'open') setTimeout(function() { try { cb({ type: 'open' }); } catch(e){} }, 0);
                              },
                              removeEventListener: function() {},
                              dispatchEvent: function() { return true; },
                              onopen: null,
                              onmessage: null,
                              onerror: null,
                              onclose: null
                            };
                            setTimeout(function() {
                              if (typeof mock.onopen === 'function') {
                                try { mock.onopen({ type: 'open' }); } catch(e) {}
                              }
                            }, 0);
                            return mock;
                          }
                          return new RealWebSocket(url, protocols);
                        };
                        window.WebSocket.prototype = RealWebSocket.prototype;
                      }

                      var isWsError = function(err) {
                        if (!err) return false;
                        var str = typeof err === 'string' ? err : ((err.message || '') + ' ' + (err.stack || '') + ' ' + String(err));
                        return str.indexOf('WebSocket') !== -1 || 
                               str.indexOf('closed without opened') !== -1 || 
                               str.indexOf('[vite]') !== -1 || 
                               str.indexOf('ws://') !== -1 || 
                               str.indexOf('wss://') !== -1;
                      };

                      var origErr = console.error;
                      console.error = function() {
                        var args = Array.prototype.slice.call(arguments);
                        for (var i = 0; i < args.length; i++) {
                          if (isWsError(args[i])) return;
                        }
                        origErr.apply(console, args);
                      };

                      var origWarn = console.warn;
                      console.warn = function() {
                        var args = Array.prototype.slice.call(arguments);
                        for (var i = 0; i < args.length; i++) {
                          if (isWsError(args[i])) return;
                        }
                        origWarn.apply(console, args);
                      };

                      window.addEventListener('error', function(e) {
                        if (isWsError(e && (e.error || e.message))) {
                          e.preventDefault();
                          e.stopImmediatePropagation();
                          return true;
                        }
                      }, true);

                      window.addEventListener('unhandledrejection', function(e) {
                        if (isWsError(e && e.reason)) {
                          e.preventDefault();
                          e.stopImmediatePropagation();
                        }
                      });
                    } catch (e) {}
                  })();
                `,
              },
            ];
          },
        },
      },
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'AgriHub',
          short_name: 'AgriHub',
          description: 'Grow Knowledge. Share Progress. Build the Future.',
          theme_color: '#0f3d26',
          background_color: '#FAF8F5',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          orientation: 'portrait-primary',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'unsplash-images-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

