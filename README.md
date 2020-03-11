# React Items List Api
## Opis zadania
W załączniku znajdziesz plik yaml z opisem bardzo prostego API. Twoim zadaniem jest implementacja dwóch stron. Pierwsza to infinite scroll dla ofert - prosimy abyś w tym wypadku nie korzystał z gotowej biblioteki. Na listę mają trafić wyłącznie oferty ze statusem 'published'. Oferta na liście musi posiadać link do wejścia w jej szczegóły. Drugą strona to szczegóły oferty - musi ona posiadać przycisk wstecz, który zainicjalizuje powrót na listę w miejscu zbliżonym do tego, z którego użytkownik się tu dostał. Możesz całkowicie pominąć kwestie graficzne i kwestie autoryzacji opisanej w yaml'u. Możesz użyć dowolnego frameworku js. Przydatnym narzędziem może okazać się Prism: https://github.com/stoplightio/prism ( https://github.com/stoplightio/prism ) oraz swagger editor:https://editor.swagger.io/ ( https://editor.swagger.io/ )


## Steps to run the project:
1. npm install -g @stoplight/prism-cli
2. npm install
3. In first terminal: prism mock -d .\travelist.yaml
3. In second terminal: yarn start


-------------------
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
