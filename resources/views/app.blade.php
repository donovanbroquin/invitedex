<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}" />
    </head>
    <body>
      <div id="app">
        <div class="rounds">
          <div id="biper" class="round">
            <div id="biper__anime" class="round"></div>
          </div>
  
          <div class="indicators">
            <div class="round indicator red"></div>
            <div class="round indicator orange"></div>
            <div class="round indicator green"></div>
          </div>
        </div>
  
        <div class="screen__border">
          <div class="screen__container">
            <div class="screen__top">
              <div class="round top__led"></div>
              <div class="round top__led"></div>
            </div>
  
            <div id="screen">
              <div id="screen__content"></div>
            </div>
  
            <div class="screen__bottom">
              <div class="big__led__container">
                <div class="round big__led"></div>
              </div>
  
              <div class="speaker__container">
                <div class="speaker"></div>
                <div class="speaker"></div>
                <div class="speaker"></div>
                <div class="speaker"></div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="pad">
          <div>
            <button id="a-button" class="round random__round">A</button>
            <button id="b-button" class="round random__round">B</button>
          </div>
  
          <div class="center__pad">
            <div class="pills">
              <div class="pad_pill red"></div>
              <div class="pad_pill blue"></div>
            </div>
  
            <div class="second__screen">
              <div class="second__screen__content"></div>
            </div>
          </div>
  
          <div class="cross">
            <button id="top" class="control">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="pad__chevron"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
            <button id="left" class="control">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="pad__chevron"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div id="center" class="control control__center"></div>
            <button id="right" class="control">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="pad__chevron"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button id="bottom" class="control">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="pad__chevron"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="guests" class="hidden">{{ $guests }}</div>
      <img id="sprites" src="{{ mix('/assets/sprites.png') }}">    

      <script src="{{ mix('/js/manifest.js') }}"></script>
      <script src="{{ mix('/js/vendor.js') }}"></script>
      <script type="module" src="{{ mix('/js/app.js') }}"></script>
    </body>
</html>
