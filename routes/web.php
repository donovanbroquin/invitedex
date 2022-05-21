<?php

use App\Http\Resources\GuestResource;
use App\Models\Guest;
use Illuminate\Support\Facades\{Http, Route};

Route::get('/', function () {
    return view('app');
});

Route::get('guests', function () {
    $res = Http::withToken(config('services.notion.token'))
        ->withHeaders([
            'Notion-Version' => '2021-08-16'
        ])
        ->post('https://api.notion.com/v1/databases/' . config('services.notion.project') . '/query', ['page_size' => 300])
        ->json();

    return GuestResource::collection(
        collect($res['results'])
            ->sortBy('properties.order.number')
            ->map(fn ($guest) => new Guest(array_merge($guest, ['id' => data_get($guest, 'properties.order.number')])))
    );
});
