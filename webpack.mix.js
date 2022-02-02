const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
.extract(['axios', 'lodash.chunk', 'lodash.padstart'])
    .postCss('resources/css/app.css', 'public/css')
    .copy('resources/assets', 'public/assets')
    .copyDirectory('resources/fonts', 'public/fonts')

if (mix.inProduction()) {
    mix.version()
}
