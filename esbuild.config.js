const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/game.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  sourcemap: true, // Generate sourcemaps for easier debugging
  minify: false,   // Enable minification for production builds
  target: 'es2020', // Set ECMAScript target version
}).catch(() => process.exit(1));  // Exit with error code if the build fails
