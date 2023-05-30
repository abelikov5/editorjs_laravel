@extends('layouts.base')

@section('content')
    <div class="dash_container">
        <dash-board :data='@json($data)' :base='@json($url)'/>
    </div>

    <div>
        {{ $data->links() }}
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

