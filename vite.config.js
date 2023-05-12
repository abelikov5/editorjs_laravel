import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                // 'resources/js/functions.js',
                'resources/js/app.js',

            ],
            refresh: true,
        }),
        // viteStaticCopy({
        //     targets: [
        //         {
        //             src: 'resources/js/helpers/functions.js',
        //             dest: 'js/functions.js'
        //         }
        //     ]
        // })
    ],
});
