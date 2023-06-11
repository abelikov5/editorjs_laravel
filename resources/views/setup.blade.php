@extends('layouts.base')

@section('content')
    <div class="dash_container">

        <page-setup :data='@json($data)' :base='@json($url)' role="{{$role}}" />
    </div>
@endsection

@section('script')
    <script>
        import PageSetup from "../js/components/dashbord/PageSetup";

        export default {
            components: {PageSetup}
        }
    </script>
@endsection

