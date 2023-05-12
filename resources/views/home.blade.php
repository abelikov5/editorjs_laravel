@extends('layouts.app')

@section('content')
    <div class="container">
        <div id="editorjs"></div>
    </div>

@endsection
<script>
    let pageId      = {!! json_encode($pageId, JSON_HEX_TAG) !!};
    let editorData  = {!! json_encode($editorData, JSON_HEX_TAG) !!};
</script>

@section('script')
    <script src="{{ asset('js/app.js') }}?v=60"></script>
@endsection
