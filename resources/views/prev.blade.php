@extends('layouts.prev')

@section('content')
    <div class="seo_container">
        @foreach (json_decode($editorData, true) as $el)
            @switch($el)
                @case($el["type"] === 'image')
                <div>
                    <img src="{{$el['data']['file']['url']}}" alt="">
                </div>
                @break
                @case($el["type"] === 'paragraph')
                <p>
                    @php echo $el['data']['text']@endphp
                </p>
                @break
                @case($el["type"] === 'header')
                <h{{$el["data"]["level"]}}>
                    @php echo $el['data']['text']@endphp
                </h{{$el["data"]["level"]}}>
                @break

            @endswitch

            {{--            <div class="label label-primary">{{ $el['type'] }}</div>--}}
        @endforeach
    </div>

@endsection

@section('script')
    <script src="{{ asset('js/app.js') }}?v=60"></script>
@endsection
