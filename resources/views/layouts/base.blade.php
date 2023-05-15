<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head itemscope itemtype="http://schema.org/WPHeader">

    <meta charset="UTF-8ок">
    <meta name="yandex-verification" content="8fe881385bfc2f8e"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @php
        $seo = SEOMeta::generate();
        $open = OpenGraph::generate('true');

        $seo = str_replace('<title', '<title itemprop="headline"', $seo);
        $seo = str_replace('<meta name="description"', '<meta name="description" itemprop="description"', $seo);
        $seo = str_replace('<meta name="keywords"', '<meta name="keywords" itemprop="keywords"', $seo);
    @endphp

    <link rel="stylesheet" href="{{ asset('css/uikit.min.css') }}?v=55">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}?v=55">
    <link rel="stylesheet" href="{{ asset('css/media.css') }}?v=55">

    @yield('extra_style')
    {!! $seo !!}

    <link rel="stylesheet" href="{{ asset('fonts/acrom/stylesheet.css') }}">
    <link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.css"/>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
</head>
<body>

<x-utm/>

<!-- Google Tag Manager (noscript) -->
<div id="google_tag"></div>
<!-- End Google Tag Manager (noscript) -->


<header>
    <style>
        .uk-navbar-nav > li:hover > a, .uk-navbar-nav > li > a[aria-expanded=true] {
            color: white !important;
            font-weight: bold !important;
        }

        .sub_head_li {
            margin-left: 45px;
        }

        .sub_head_li button a {
            text-decoration: none;
            color: #F2F2F2;
        }

        .sub_head_li button {
            padding: unset;
        }

        .uk-navbar-toggle:hover, .uk-navbar-toggle[aria-expanded=true] {
            color: white !important;
            font-weight: bold !important;
        }

        .wrap_banner img {
            height: 51px;
        }

        .sub_header {
            height: 40px;
            display: flex;
            justify-content: center;
            background: linear-gradient(84.8deg, #31404A -1.68%, #489ECF 108.41%);
            box-shadow: inset 0px 2px 1px -1px #c5c5c5,
            inset 0px -2px 1px -1px #c5c5c5;

        }

        .j_center {
            justify-content: center;
        }

        .sub_header_a {
            min-height: 40px !important;
        }

        header .uk-dropdown_desk {
            top: 40px !important;
        }

        .sub_header .uk-container {
            width: 100%;
        }

        .navbar_arow {
            margin-left: 5px;
            margin-top: -2px;
        }

        .navbar_arow_events[aria-expanded="true"] .navbar_arow {
            margin-top: 0px;
            transform: rotate(180deg);
        }

        .navbar_arow_direction[aria-expanded="true"] .navbar_arow {
            margin-top: 0px;
            transform: rotate(180deg);
        }

        .navbar_arow_about[aria-expanded="true"] .navbar_arow {
            margin-top: 0px;
            transform: rotate(180deg);
        }

        .uk-dropdown_desk a:hover {
            color: #3C93C6 !important;
        }
    </style>

    <div class="uk-container main_header">
        <div class="">
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <div class="uk-navbar-left">
                    <ul class="uk-navbar-nav">
                        <li class="uk-margin-right">
                            <a class="uk-padding-remove" href="{{ route('home') }}">
                                <img src="{{ asset('img/logo.svg') }}" width="124" height="27" alt="">
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="uk-navbar-right" style="margin-left: unset;">

                    <ul class="uk-navbar-nav">
                        <li class="main_head_info @if(Route::currentRouteName() === 'schedule') uk-active @endif"
                            style="border-left: unset;">
                            <a href="{{ route('schedule') }}">
                                <img style="margin-top: -4px;"
                                     src="{{ asset('img/svg/schedule.svg') }}" width="18" height="16" alt="">расписание
                            </a>
                        </li>
                        <li class="main_head_info">
                            <a href="#">
                                <img style="margin-top: -4px;"
                                     src="{{ asset('img/map.svg') }}" width="11" height="14" alt="">Адреса
                            </a>
                            <div class="uk-dropdown uk-width-1-1"
                                 uk-dropdown="mode:click; pos: bottom-justify;boundary: .uk-navbar-container; boundary-align: true; offset: 0">
                                <div class="uk-container">
                                    <div class="uk-grid uk-grid-divider header_dropdown_grid" uk-grid>
                                        <div class="uk-width-auto">
                                            <div class="header_dropdown_menu_block">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li class="uk-nav-header no_border uk-margin-bottom">Адреса</li>
                                                    <li class="no_border">
                                                        <div class="uk-grid uk-child-width-1-2" uk-grid>

                                                            <x-addr_grid schema/>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>

                        </li>
                        <li class="main_head_info @if(Route::currentRouteName() === 'pay') uk-active @endif">
                            <a href="{{ route('pay') }}">
                                <img style="margin-top: -4px;"
                                     src="{{ asset('img/card.svg') }}" width="18" height="16" alt="">Оплата
                            </a>
                        </li>
                        <li class="main_head_info">
                            <a class="phone" href="tel:+74950321999">
                                <img style="margin-top: -2px;" src="{{ asset('img/phone.svg') }}"
                                     width="14" height="14" alt="">
                                +7 (495) <span>032-19-99</span>
                            </a>
                        </li>
                        {{--
                                                    @if(Route::currentRouteName() !== 'pay')
                                                        <li class="lk_btn_wrapper uk-visible@l">
                                                            <a class="uk-button uk-button-default" href="{{ route('account') }}">
                                                                <div class="lk_desk">
                                                                    <img src="{{ asset('img/user.svg') }}" alt="" style="margin-top: -2px;">
                                                                    <span class="uk-visible@l">Личный кабинет ТРЦ Янтарь</span>
                                                                </div>


                                                            </a>
                                                        </li>
                                                    @endif
                                                    --}}


                        <li class="head_hamburger">
                            <a class="mobile_menu_trigger">
                                <img class="menu_close" src="{{ asset('img/menu.svg') }}" width="20" height="14" alt="">
                                <img class="menu_open" src="{{ asset('img/menu_open.svg') }}" width="17" height="16"
                                     alt="">
                            </a>
                            <div class="uk-dropdown"
                                 uk-dropdown="mode:click; pos: bottom-justify;boundary: header; boundary-align: true; offset: 0">
                                <div>
                                    <ul class="uk-accordion mobile_menu_accordion" uk-accordion="multiple: true">
                                        <li>
                                            <a class="uk-accordion-title" href="#">Направления</a>
                                            <div class="uk-accordion-content">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li class="uk-nav-header">Детский спорт</li>
                                                    <x-nav-lists.child/>
                                                </ul>
                                                <ul class="uk-nav uk-nav-default">
                                                    <li class="uk-nav-header">Взрослый спорт</li>
                                                    <x-nav-lists.adult/>
                                                </ul>
                                                <ul class="uk-nav uk-nav-default">
                                                    <li class="uk-nav-header">Спортивные школы</li>
                                                    <x-nav-lists.child_seck/>
                                                </ul>

                                                <ul class="uk-nav uk-nav-default">
                                                    <li class="uk-nav-header">Детские спортивные секции</li>
                                                    <x-nav-lists.sport_seck schema/>
                                                </ul>

                                            </div>
                                        </li>
                                        <li>
                                            <a class="uk-accordion-title" href="#">Мероприятия</a>
                                            <div class="uk-accordion-content">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li>
                                                        <a href="{{route('event')}}"
                                                           class="nav_subheader">Мероприятия</a>
                                                    </li>
                                                    <li>
                                                        <a itemprop="url"
                                                           href="https://promo.nebo-sport.ru/den-otkrytykh-dverey"
                                                           target="_blank" rel="nofollow">День открытых дверей с Уэнсдей</a>
                                                    </li>
                                                    {{--                                                    <li>--}}
                                                    {{--                                                        <a itemprop="url"--}}
                                                    {{--                                                           href="https://promo.nebo-sport.ru/chirliding"--}}
                                                    {{--                                                           target="_blank" rel="nofollow">День открытых дверей Чирлидингу</a>--}}
                                                    {{--                                                    </li>--}}
                                                    {{--                                                    <li>--}}
                                                    {{--                                                        <a itemprop="url"--}}
                                                    {{--                                                           href="https://promo.nebo-sport.ru/razvivayushchaya-gimnastika"--}}
                                                    {{--                                                           target="_blank" rel="nofollow">День открытых дверей по развивающей гимнастике</a>--}}
                                                    {{--                                                    </li>--}}
                                                    {{--                                                    <li>--}}
                                                    {{--                                                        <a itemprop="url"--}}
                                                    {{--                                                           href="https://promo.nebo-sport.ru/den-otkrytykh-dverey"--}}
                                                    {{--                                                           target="_blank" rel="nofollow">День открытых дверей м. Б.Рокоссовского</a>--}}
                                                    {{--                                                    </li>--}}
                                                    <li>
                                                        <a itemprop="url" href="{{route('osennie_sbory')}}">Осенние
                                                            сборы</a>
                                                    </li>
                                                    <li>
                                                        <a href="{{route('leto_form')}}">Летние сборы</a>
                                                    </li>
                                                    {{--                                                        <li>--}}
                                                    {{--                                                            <a href="https://promo.nebo-sport.ru/den-otkrytykh-dverej/vzroslye/"--}}
                                                    {{--                                                               target="_blank">День открытых дверей для взрослых </a>--}}
                                                    {{--                                                        </li>--}}

                                                    <li>
                                                        <a itemprop="url" href="{{route('calendar')}}">Календарь
                                                            соревнований</a>
                                                    </li>

                                                    <li>
                                                        <a href="https://league.nebo-sport.ru/" class="d_flex"
                                                           rel="nofollow">
                                                            <img src="/img/about/menu/liga_logo.svg" alt="">
                                                            <div class="layout_info">
                                                                ЛИГА НЕБО СПОРТ
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li>
                                            <a class="uk-accordion-title" href="#">О нас</a>
                                            <div class="uk-accordion-content">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li>
                                                        <a href="{{ route('about') }}">О нас</a>
                                                    </li>
                                                    {{--                                                                                                            <li>--}}
                                                    {{--                                                                                                                <a href="{{ route('tax_refund') }}">Возврат налога</a>--}}
                                                    {{--                                                                                                            </li>--}}
                                                    <li>
                                                        <a href="/contacts/">Контакты</a>
                                                    </li>

                                                </ul>
                                            </div>
                                        </li>

                                        <li>
                                            <a class="link" itemprop="url" href="/otzyvy/"
                                               style="text-decoration: none;">Отзывы</a>
                                        </li>
                                        <li>
                                            <a class="link" href="/employees/"
                                               style="text-decoration: none;">Тренеры</a>
                                        </li>
                                        <li>
                                            <a class="link" href="{{ route('news') }}" style="text-decoration: none;">Новости</a>
                                        </li>
                                        <li>
                                            <a class="link" href="{{ route('blog.list') }}" style="text-decoration: none;">Блог</a>
                                        </li>
                                        {{--
                                            <li class="lk_mob">
                                                <a href="{{ route('account') }}">
                                                    <div>
                                                        <img src="{{ asset('img/user.svg') }}" alt="">
                                                        <span style="margin-left: 5px;">Личный кабинет ТРЦ Янтарь</span>
                                                    </div>
                                                </a>
                                            </li>
                                             --}}
                                    </ul>
                                    <div class="footer mob_footer">
                                        <div class="uk-grid uk-grid-small">
                                            <div class="uk-width-expand">
                                                <div class="title">Телефон:</div>
                                                <a class="uk-link-reset" href="tel:+74950321999">+7 (495) 032-19-99</a>
                                                <div class="title uk-margin-small-top">Email:</div>
                                                <a href="mailto:welcome@nebo-sport.ru">welcome@nebo-sport.ru</a>
                                            </div>
                                            <div class="uk-width-auto">
                                                <div class="menu_social_wrapper">
                                                    <x-socilas/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </li>
                    </ul>

                </div>

            </div>
        </div>
    </div>
    <nav uk-sticky class="sub_header">
        <div class="uk-container uk-navbar-container uk-navbar-transparent j_center" uk-navbar>
            <div class="">
                <div class="d_center">
                    <ul class="uk-navbar-nav sub_navbar">

                        <li class="sub_head_li
                            @if (
                                (Request::segment(1) === 'sports-destinations' &&
                                Request::segment(2) === 'sections' &&
                                (Request::segment(3) === 'adult-sports' || Request::segment(3) === 'children-sports' )) ||
                                Request::segment(1) === 'schedule'
                            ) uk-active @endif
                            ">
                            <button class="uk-button  navbar_btn navbar_arow_direction d_center">
                                <div class="uk-hidden@m">Направления</div>
                                <a href="{{route('sportivnye_napravleniya')}}" class="uk-visible@m">Направления</a>
                                <div class="navbar_arow"><img src="/img/svg/up_svg.svg" alt=""></div>
                            </button>
                            <div class="uk-dropdown uk-width-1-1 uk-dropdown_desk"
                                 uk-dropdown="pos: bottom-justify;boundary: .uk-navbar-container; boundary-align: true; offset: 0">
                                <div class="uk-container">
                                    <div class="uk-grid uk-grid-divider header_dropdown_grid" uk-grid>
                                        <div class="uk-width-auto">
                                            <div class="header_dropdown_menu_block">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li><a href="{{route('children_sport')}}" class="nav_subheader">Детский
                                                            спорт</a></li>
                                                    <x-nav-lists.child schema/>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="uk-width-auto">
                                            <div class="header_dropdown_menu_block">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li><a href="{{route('adults_sport')}}" class="nav_subheader">Взрослый
                                                            спорт</a></li>
                                                    <x-nav-lists.adult schema/>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="uk-width-auto">
                                            <div class="header_dropdown_menu_block">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li><a href="{{ route('sports_destinations') }}"
                                                           class="nav_subheader">Спортивные школы</a></li>
                                                    <x-nav-lists.child_seck schema/>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="uk-width-auto">
                                            <div class="header_dropdown_menu_block">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li><a href="{{route('sekcii-dlya-detey')}}" class="nav_subheader">Детские
                                                            спортивные секции</a></li>
                                                    <x-nav-lists.sport_seck schema/>
                                                </ul>
                                            </div>
                                        </div>


                                        {{--                                            <div class="uk-width-expand">--}}
                                        {{--                                                <div class="header_dropdown_menu_block">--}}
                                        {{--                                                    <ul class="uk-nav uk-nav-default">--}}
                                        {{--                                                        <x-nav-lists.sections />--}}
                                        {{--                                                    </ul>--}}
                                        {{--                                                </div>--}}
                                        {{--                                            </div>--}}


                                    </div>

                                </div>

                            </div>
                        </li>
                        <li class="sub_head_li
                            @if (
                                Request::segment(1) === 'sports-destinations' &&
                                Request::segment(2) === 'event'
                            ) uk-active @endif
                            ">
                            <button class="uk-button  navbar_btn navbar_arow_events d_center">
                                <div class="uk-hidden@m">Мероприятия</div>
                                <a href="{{route('event')}}" class="uk-visible@m">Мероприятия</a>
                                <div class="navbar_arow"><img src="/img/svg/up_svg.svg" alt=""></div>
                            </button>
                            <div class="uk-dropdown uk-width-1-1 uk-dropdown_desk"
                                 uk-dropdown="pos: bottom-justify;boundary: .uk-navbar-container; boundary-align: true; offset: 0">
                                <div class="uk-container">
                                    <div class="uk-grid uk-grid-divider header_dropdown_grid" uk-grid>
                                        <div class="" style="width: 375px;">
                                            <div class="header_dropdown_menu_block">
                                                <ul class="uk-nav uk-nav-default">
                                                    <li class="uk-nav-header">
                                                        <a href="{{route('event')}}"
                                                           class="nav_subheader">Мероприятия</a>
                                                    </li>
                                                    <li>
                                                        <a itemprop="url"
                                                           href="https://promo.nebo-sport.ru/den-otkrytykh-dverey"
                                                           target="_blank" rel="nofollow">День открытых дверей с Уэнсдей</a>
                                                    </li>
                                                    {{--                                                    <li>--}}
                                                    {{--                                                        <a itemprop="url"--}}
                                                    {{--                                                           href="https://promo.nebo-sport.ru/chirliding"--}}
                                                    {{--                                                           target="_blank" rel="nofollow">День открытых дверей Чирлидингу</a>--}}
                                                    {{--                                                    </li>--}}
                                                    {{--                                                    <li>--}}
                                                    {{--                                                        <a itemprop="url"--}}
                                                    {{--                                                           href="https://promo.nebo-sport.ru/razvivayushchaya-gimnastika"--}}
                                                    {{--                                                           target="_blank" rel="nofollow">День открытых дверей по развивающей гимнастике</a>--}}
                                                    {{--                                                    </li>--}}
                                                    {{--                                                    <li>--}}
                                                    {{--                                                        <a itemprop="url"--}}
                                                    {{--                                                           href="https://promo.nebo-sport.ru/den-otkrytykh-dverey"--}}
                                                    {{--                                                           target="_blank" rel="nofollow">День открытых дверей м. Б.Рокоссовского</a>--}}
                                                    {{--                                                    </li>--}}
                                                    <li>
                                                        <a itemprop="url" href="{{route('osennie_sbory')}}">Осенние
                                                            сборы</a>
                                                    </li>
                                                    <li>
                                                        <a itemprop="url" href="{{route('leto_form')}}">Летние сборы</a>
                                                    </li>


                                                    <li>
                                                        <a itemprop="url" href="{{route('calendar_activ')}}">Календарь
                                                            активностей</a>
                                                    </li>
                                                    <li>
                                                        <a itemprop="url" href="{{route('calendar')}}">Календарь
                                                            соревнований</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="uk-width-auto">
                                            <div class="header_dropdown_menu_block layout_liga_menu">
                                                <a href="https://league.nebo-sport.ru/" class="d_flex" rel="nofollow">
                                                    <img src="/img/about/menu/liga_logo.svg" alt="">
                                                    <div class="layout_info">
                                                        ЛИГА НЕБО СПОРТ
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="sub_head_li"><a itemprop="url" href="/otzyvy/" class="sub_header_a">Отзывы</a></li>
                        <li class="sub_head_li"><a itemprop="url" href="/employees/" class="sub_header_a">Тренеры</a>
                        </li>
                        <li class="@if(Route::currentRouteName() === 'news') uk-active @endif sub_head_li">
                            <a itemprop="url" href="{{ route('news') }}" class="sub_header_a">Новости</a>
                        </li>
                        <li class="@if(Route::currentRouteName() === 'blog.list') uk-active @endif sub_head_li">
                            <a itemprop="url" href="{{ route('blog.list') }}" class="sub_header_a">Блог</a>
                        </li>
                        <li class="sub_head_li
                @if (
                        Route::currentRouteName() === 'contacts' ||
                        Route::currentRouteName() === 'tax_refund'
                    ) uk-active @endif
                            ">
                            <button class="uk-button  navbar_btn navbar_arow_events d_center">
                                <div class="uk-hidden@m">О нас</div>
                                <a href="{{route('about')}}" class="uk-visible@m">О нас</a>
                                <div class="navbar_arow"><img src="/img/svg/up_svg.svg" alt=""></div>
                            </button>
                            {{--                            <a href="#" class="sub_header_a navbar_arow_about d_center">--}}
                            {{--                                --}}

                            {{--                                О нас--}}
                            {{--                                <div class="navbar_arow"><img src="/img/svg/up_svg.svg" alt=""></div>--}}
                            {{--                            </a>--}}
                            <div class="uk-dropdown uk-width-1-1 uk-dropdown_desk"
                                 uk-dropdown="pos: bottom-justify;boundary: .uk-navbar-container; boundary-align: true; offset: 0">
                                <div class="uk-container">
                                    <div class="uk-grid uk-grid-divider header_dropdown_grid" uk-grid>
                                        <div class="uk-width-auto">
                                            <div class="header_dropdown_menu_block">
                                                <ul class="uk-nav uk-nav-default">
                                                    {{--                                                        <li>--}}
                                                    {{--                                                            <a itemprop="url" href="{{ route('account') }}">Личный кабинет</a>--}}
                                                    {{--                                                        </li>--}}
                                                    {{--                                                    <li>--}}
                                                    {{--                                                        <a itemprop="url" href="/tax-refund/">Возврат налога</a>--}}
                                                    {{--                                                    </li>--}}
                                                    <li>
                                                        <a href="{{ route('about') }}">О нас</a>
                                                    </li>
                                                    <li>
                                                        <a itemprop="url" href="/contacts/">Контакты</a>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>


                                    </div>

                                </div>

                            </div>
                        </li>


                    </ul>
                </div>
            </div>
        </div>
    </nav>


</header>

<main id="app">
    @yield('content')
</main>

<div class="mobile_sticky_menu uk-hidden@m">
    <div class="uk-grid uk-child-width-1-4 uk-grid-divider uk-grid-collapse">
        <div>
            <a class="uk-link-reset" href="tel:+74951543039">
                <img src="{{ asset('img/phone_bottom.svg') }}" width="14" height="14" alt=""><br>
                Позвонить
            </a>
        </div>
        <div>
            <a class="uk-link-reset" href="{{ route('schedule') }}">
                <img src="{{ asset('img/calendar.svg') }}" width="14" height="13" alt=""><br>
                Расписание
            </a>
        </div>
        <div>
            <a class="uk-link-reset" href="#addr_modal" uk-toggle>
                <img src="{{ asset('img/place_bottom.svg') }}" width="11" height="14" alt=""><br>
                Адреса
            </a>
        </div>
        <div>
            <a class="uk-link-reset" href="{{ route('pay') }}" uk-toggle>
                <img src="{{ asset('img/card_bottom.svg') }}" width="18" height="16" alt=""><br>
                Оплата
            </a>
        </div>
    </div>
</div>

<footer itemscope itemtype="http://schema.org/WPFooter">
    <div class="uk-container uk-position-relative">
        <div>
            <div class="footer_flex">
                <div class="footer_flex_1">
                    <div class="footer_flex_1_div">
                        <div class="footer_img">
                            <div class="flex_bottom">
                                <img class="uk-margin-bottom footer_flex_1_div_margin" uk-img
                                     data-src="{{ asset('img/logo_footer.svg') }}"
                                     width="168" height="37" alt="">
                            </div>

                            <div class="footer_flex_1_div_div">
                                <div class="uk-margin-bottom footer_flex_1_div_margin">
                                    <div class="footer_link_title">Телефон</div>
                                    <div>
                                        <a class="footer_link" href="tel:+74950321999">+7 (495) 032-19-99</a>
                                    </div>
                                </div>
                                <div class="uk-margin-medium-bottom footer_flex_1_div_margin">
                                    <div class="footer_link_title">Email</div>
                                    <div>
                                        <a class="footer_link" href="mailto:welcome@nebo-sport.ru">welcome@nebo-sport.ru
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="footer_social_wrapper footer_flex_1_div_margin flex_bottom">
                            <x-socilas/>
                        </div>
                    </div>
                </div>
                <hr class="footer_line">

                <div class="footer_flex_2">
                    <x-footer.link_list/>
                    <div>
                        <div class="footer_main_info">
                            <div class="footer_link_block">
                                <x-footer.info/>
                            </div>

                            <div class="footer_link_block">
                                <div class="footer_head">Детский спорт</div>
                                <x-footer.child/>
                            </div>

                            <div class="footer_link_block">
                                <div class="footer_head">Взрослый спорт</div>
                                <x-footer.adult/>
                            </div>

                            <div class="footer_link_block">
                                <x-footer.events/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <x-footer.adr-footer/>
        </div>
        <div class="info">
            <meta itemprop="copyrightYear" content="{{ date('Y') }}">
            <meta itemprop="copyrightHolder" content="НЕБО СПОРТ">
            Информация, представленная на сайте, не является публичной офертой<br>
            &copy; 2018 - {{ date('Y') }} НЕБО СПОРТ<br>
            Спортивная школа
        </div>
    </div>
    <style>
        .lk_mob {
            background: #B0D2E6;
            color: #155D87;
        }

        .lk_mob a {
            text-decoration: unset;
        }

        .lk_mob div {
            display: flex;
            align-content: center;
            font-family: 'Acrom';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
        }

        .mob_footer {
            background: linear-gradient(87.37deg, #31404A -6.69%, #3C93C6 117.01%);
            color: #EDEDED;
            padding: 10px;
        }


        .nav_subheader {
            font-weight: 700 !important;
            font-size: 15px !important;
            color: #8FABBC !important;
            text-transform: none;
        }

        .footer_flex {
            display: flex;
            flex-wrap: wrap;
        }

        .footer_flex_1 {
            width: 30%;
        }

        .footer_flex_2 {
            width: 70%;
        }

        .footer_main_info {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        .footer_head {
            font-family: 'Acrom';
            font-style: normal;
            font-weight: 500;
            font-size: 15px !important;
            line-height: 18px;
            color: #F2F2F2 !important;
        }

        .footer_head_right div {
            margin-bottom: 15px;
            line-height: 18px;
        }

        .footer_head_right div a {
            font-size: 15px !important;
            color: #F2F2F2 !important;
            text-decoration: none;
        }

        .footer_link_block .main_nav a {
            font-size: 15px;
        }

        .footer_main_sec {
            display: flex;
            justify-content: space-between;
        }

        .ml-6 {
            margin-left: 60px;
        }

        .footer_line {
            display: none;
        }

        @media (max-width: 1200px) {
            .sub_head_li {
                margin-left: 25px;
            }

            .footer_flex_1_div_div {
                display: flex;
                margin-left: 30px;
            }

            .footer_img {
                display: flex;
            }

            .footer_flex_1, .footer_flex_2 {
                width: 100%;
            }

            .footer_flex_1 {
                margin-bottom: 40px;
            }

            .footer_flex_1_div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
            }

            .footer_flex_1_div_margin {
                margin-bottom: unset !important;
            }

            .footer_flex_1_div_margin:first-child {
                margin-right: 20px;
            }

            .footer_links {
                margin-bottom: 55px;
            }

        }

        @media (max-width: 769px) {
            .footer_line {
                display: block;
                width: 100%;
                margin: 20px 0;
            }

            .footer_flex_1 {
                margin-bottom: 0;
            }

            .footer_flex_1_div_div {
                display: block;
            }

            .footer_flex_1_div {
                align-items: start;
            }

            .footer_flex_1_div img {
                margin-right: unset !important;
            }

            .footer_link_block {
                width: 50%;
                margin-bottom: 34px;
            }
        }

        @media (max-width: 469px) {
            .footer_img {
                display: block;

            }

            .footer_flex_1_div_div {
                margin-left: 0;
                margin-top: 20px;

            }

        }
    </style>
</footer>


<div id="contact_modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title">@yield('contact_modal_title', 'Записаться на пробное занятие')</h2>
        @yield('contact_modal_body')
    </div>
</div>

<div id="vozd_modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title">@yield('contact_modal_title', 'ПОДОБРАТЬ УДОБНУЮ ГРУППУ')</h2>
        @yield('contact_modal_body')
    </div>
</div>

<div id="addr_modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title">Адреса</h2>

        <x-addr_grid/>
    </div>
</div>

<div id="pay_btns_modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h2 class="uk-modal-title">Перейти к оплате</h2>
        <div class="uk-margin-small-bottom">
            <a href="https://nebojump.ru/oplata-gruppovye-zanyatiya-ns/" target="_blank"
               class="uk-button uk-button-primary uk-width-1-1" rel="nofollow">Развивающие занятия</a>
        </div>
        <div>
            <a href="https://nebojump.ru/oplata-sportivnaya-shkola-ns/" target="_blank"
               class="uk-button uk-button-primary uk-width-1-1" rel="nofollow">Профессиональные занятия</a>
        </div>
    </div>
</div>

@if(!isset($hide_sendsay))
    <x-banner/>
    <x-sendsay-banner/>
@endif

<script src="/js/cookie.min.js"></script>

@yield('script')


<script>
    // отложенная загрузка google tag
    function google_tag() {
        document.getElementById('google_tag').innerHTML = `<noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KXCJFL5"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
        </noscript>`;
        (function (w, d, s, l, i) {
            console.log("google tag");
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-KXCJFL5');
    }

    setTimeout(google_tag, 3500);

</script>

<script>
    // Отложенная загрузка
    let fired = false;
    window.addEventListener('scroll', initExtJS, {passive: true});
    window.addEventListener('click', initExtJS, {passive: true});
    window.addEventListener('mousemove', initExtJS, {passive: true});
    window.addEventListener('touchstart', initExtJS, {passive: true});
    window.addEventListener('keydown', initExtJS, {passive: true});
    setTimeout(initExtJS, 7000);

    function initExtJS() {
        if (fired === false) {
            fired = true;
            setTimeout(() => {

                let Script2 = document.createElement("script");
                Script2.src = 'https://unpkg.com/simplebar@latest/dist/simplebar.min.js';
                Script2.async = false;
                document.getElementsByTagName('head')[0].appendChild(Script2);

                @if(request()->devmode != 'dev')
                let Script1 = document.createElement("script");
                Script1.src = '{{ asset('js/defer_script.js') }}';
                Script1.async = false;
                document.getElementsByTagName('head')[0].appendChild(Script1);
                @endif


                window.removeEventListener('scroll', initExtJS, false);
                window.removeEventListener('click', initExtJS, false);
                window.removeEventListener('mousemove', initExtJS, false);
                window.removeEventListener('touchstart', initExtJS, false);
                window.removeEventListener('keydown', initExtJS, false);
            }, 100);
        }
    } </script>


<script async src="{{ asset('js/uikit.min.js') }}"></script>

@if(!isset($switchoff))
    <script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"></script>

    <script src="{{ asset('js/inputmask.min.js') }}"></script>

    <script async src="{{ asset('js/script.js') }}?v={{ time() }}" defer></script>

    @yield('jquery_script')
@endif

@yield('script_map')


</body>
</html>


