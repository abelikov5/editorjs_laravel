<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="stylesheet" href="{{ asset('css/uikit.min.css') }}?v=55">
    <link rel="stylesheet" href="/fonts/acrom/stylesheet.css">
    <link rel="stylesheet" href="/css/style_editor.css">
    {{--    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v=55">--}}
    {{--    <link rel="stylesheet" href="{{ asset('css/media.css') }}?v=55">--}}

    {{--    @vite(['resources/sass/app.scss', 'resources/js/app.js' ])--}}

</head>
<body>
<div id="app">
    <div>
        @yield('content')
    </div>
</div>
</body>
</html>
