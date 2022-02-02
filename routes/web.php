<?php

use App\Http\Resources\GuestResource;
use App\Models\Guest;
use Illuminate\Support\Facades\{Cache, Http, Route};

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $res = Cache::remember('guests', 30, fn () => Http::withToken(config('services.notion.token'))
        ->withHeaders([
            'Notion-Version' => '2021-08-16'
        ])
        ->post('https://api.notion.com/v1/databases/' . config('services.notion.project') . '/query', ['page_size' => 300])
        ->json());

    $guests = GuestResource::collection(collect($res['results'])
        ->map(fn ($guest, $idx) => new Guest(array_merge($guest, ['id' => $idx + 1]))));

    return view('app', ['guests' => json_encode($guests->resolve())]);
});
