<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="stylesheet" href="{{ asset('css/uikit.min.css') }}?v=55">
    <link rel="stylesheet" href="{{ asset('/fonts/acrom/stylesheet.css') }}">
    <link rel="stylesheet" href="{{ asset('/css/style_editor.css') }}">
    {{--    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v=55">--}}
    {{--    <link rel="stylesheet" href="{{ asset('css/media.css') }}?v=55">--}}

    <link rel="preload" as="style" href="{{ asset('/build/assets/app-3ea8b221.css') }}">
    <link rel="modulepreload" href="{{ asset('/build/assets/app-310fd588.js') }}">
    <link rel="stylesheet" href="{{ asset('/build/assets/app-3ea8b221.css') }}">
    <script type="module" src="{{ asset('/build/assets/app-310fd588.js') }}"></script>

{{--        @vite(['resources/sass/app.scss', 'resources/js/app.js' ])--}}

</head>
<body>
<div id="app">
    <div>
        @yield('content')
    </div>
</div>
</body>
</html>
