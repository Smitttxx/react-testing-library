module.exports = {
  ci: {
    assert: {
      assertions: {
        'apple-touch-icon': 'off',
        'content-width': 'off',
        'font-size': 'off',
        'installable-manifest': 'off',
        'maskable-icon': 'off',
        'meta-description': 'off',
        'offline-start-url': 'off',
        'service-worker': 'off',
        'splash-screen': 'off',
        'tap-targets': 'off',
        'themed-omnibox': 'off',
        'unused-javascript': 'off',
        'uses-rel-preconnect': 'off',
        'uses-text-compression': 'off',
        viewport: 'off',
        'without-javascript': 'off',
        'works-offline': 'off',
      },
    },
    collect: {
      url: ['http://localhost:3030/'],
      startServerCommand: 'node server.js',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
