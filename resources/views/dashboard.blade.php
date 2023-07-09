@extends('layouts.base')

@section('content')
    <div class="dash_container">
        <dash-board :role='@json($role)'/>
    </div>

@endsection

@section('script')
    <script>
        import DashBord from "../js/components/dashbord/DashBord";

        export default {
            components: {DashBord}
        }
    </script>
@endsection

