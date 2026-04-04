# Laravel scaffolding

- `cd /var/www`
    - laravel new lrvl-13-essentials
    - No starter kit
    - Pest
    - No AI
    - PostgreSQL
    - No migration {aplicar depois de configurar o banco}
    - No npm install
- `cd lrvl-13-essentials`
- `npm install`

# DB

  ``` sql
  CREATE ROLE lrvl_13_essentials_user LOGIN PASSWORD 'senha' SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION;
  
  CREATE DATABASE lrvl_13_essentials
  WITH OWNER = lrvl_13_essentials_user
  ENCODING = 'UTF8'
  TABLESPACE = pg_default
  LC_COLLATE = 'C'
  LC_CTYPE = 'pt_BR.UTF-8'
  CONNECTION LIMIT = -1
  TEMPLATE template0;
  ```

- {edit} `.env`
  ```
  DB_DATABASE=lrvl_13_essentials
  DB_USERNAME=lrvl_13_essentials_user
  DB_PASSWORD=senha
  ```

- `php artisan migrate`

- `composer run dev` {se ok, commit}
  ```
  git init; \
  git add .; \
  git commit -m "Laravel scaffolding + db";
  ```

# ReactJS + IntertiaJS

#### Setup Inertia server side: https://inertiajs.com/server-side-setup
- `composer require inertiajs/inertia-laravel`
- `git mv resources/views/welcome.blade.php resources/views/app.blade.php`
- {edit} `resources/views/app.blade.php`
    - {replace content from link: Root template}
- `php artisan inertia:middleware`
- {edit and replace content from link section: Register middleware} `bootstrap/app.php`

#### Setup Inertia client side: https://inertiajs.com/client-side-setup
- `npm install react react-dom @inertiajs/react`
- `npm install @vitejs/plugin-react @inertiajs/vite --save-dev`
- {edit} `vite.config.js`
  ``` js
  // add on imports
  import inertia from '@inertiajs/vite';
  import react from '@vitejs/plugin-react';
  ```
  ``` js
  input: ['resources/js/app.js'], // replace
  ```
  ``` js
  // add on plugins
  react(),
  inertia(),
  ```

- {edit and add content from link: Initialize the Inertia app} `resources/js/app.js`
  ```
  mkdir -p resources/js/pages; \
  echo "export default () => <div>oi</div>;" > resources/js/pages/Home.jsx;
  ```
- {edit} `routes/web.php`
  ``` php
  return inertia('Home'); // replace
  ```

#### Complementary
- {edit} `resources/views/app.blade.php`
  ``` php
  @viteReactRefresh // add before @vite
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup ReactJS + InertiaJS";
  ```

# TypeScript
- `npm install --save-dev typescript @types/react @types/react-dom`
- `curl -L https://gist.githubusercontent.com/cristianocarlos/20dc8172ac6618942a71339a558e23d3/raw/5eaffe6396ff67fcec3e477942c2fd89291b4e96/tsconfig.json -o tsconfig.json`
- {edit and replace text} `resources/views/app.blade.php` js>ts
- {edit and replace text} `vite.config.js` js>ts
- ```
  git mv resources/js/pages/Home.jsx resources/js/pages/Home.tsx; \
  git mv resources/js/app.js resources/js/app.ts;
  ```
- {edit and add line on `script`} `package.json`
  ```
  "tcheck": "tsc",
  ```

#### Complementary

- ```
  mkdir -p resources/js/types; \
  curl -L https://gist.githubusercontent.com/cristianocarlos/a590208feee63fdd43d29eed449b26ad/raw/fe8d735bc9ae5d71e616ff93762e59e3d74c4802/vite-env.d.ts -o resources/js/types/vite-env.d.ts; \
  curl -L https://gist.githubusercontent.com/cristianocarlos/f6cf38d5b7c5bbf57093a74ecb70e0a6/raw/e635cb6d3edde74406d45423e78175d7ea466afa/page.ts -o resources/js/types/page.ts; \
  curl -L https://gist.githubusercontent.com/cristianocarlos/43feeb386592589c0d8b5f55ab8ea575/raw/15ddaebb1618347df6a002c0bcc4c5a11bf5a8f6/global.ts -o resources/js/types/global.ts;
  ```
- `npm run tcheck` {emular alguns erros manualmente, se apareceu erros, deu bom}
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup TypeScript";
  ```

# TailwindCSS
https://tailwindcss.com/docs/installation/framework-guides/laravel/vite
- {edit} `resources/js/app.js`
  ``` js
  import '../css/app.css'; // add
  ```
- {replace file} `echo "export default () => <div className=\"bg-amber-500\">oi</div>;" > resources/js/pages/Home.jsx;`
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup TailwindCSS";
  ```

# Setup eslint + prettier

- `npm install --save-dev eslint prettier @eslint/js eslint-config-prettier eslint-plugin-react eslint-plugin-import typescript-eslint eslint-plugin-react-refresh eslint-plugin-react-hooks eslint-plugin-unused-imports;`
- ```
  curl -L https://gist.githubusercontent.com/cristianocarlos/84c801dc27deda227967132542aac444/raw/6e8a3b5d14e942af2a1ae2875910dcc354ca548f/eslint.config.js -o eslint.config.js; \
  curl -L https://gist.githubusercontent.com/cristianocarlos/978aba3851bc43a36bc6bab48919723c/raw/b4c9a8ec485e59b193ed83927b3a12558bf85031/.prettierrc.json -o .prettierrc.json;
  ```
- {edit and add lines on `scripts`} package.json
  ```
  "lifix": "npm run lint -- --fix",
  "lint": "npx eslint resources/js",
  "pifix": "npm run prettier -- --write",
  "prettier": "npx prettier resources/js --check",
  ```
- `yarn lint` (se apareceu erros, deu bom)
- `yarn prettier` (se apareceu erros, deu bom)
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup eslint + prettier";
  ```

# Fix eslint + prettier
- `yarn lifix`
- `yarn pifix`
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Fix eslint + prettier";
  ```

# Prepare to setup aliases
- ``` 
  echo "export default () => <div>Sibling</div>;" > resources/js/pages/Sibling.tsx; \
  echo "export default () => <div>Internal</div>;" > resources/js/pages/Internal.tsx; \
  mkdir -p resources/phpgen; \
  echo "export default {text: (v: string) => v};" > resources/phpgen/yii-lang.ts; \
  curl -L https://gist.githubusercontent.com/cristianocarlos/9a94ab0fb8cae56c1e6cc96c4f83c135/raw/e6225d86a6f4b8c51e5dab4732730d648aafab43/Home.jsx -o resources/js/pages/Home.tsx;
  ```
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Prepare to setup aliases";
  ```

# Setup aliases
- {edit and add lines on `compilerOptions`} `tsconfig.json`
  ```
  "paths": {
    "~/*": ["./resources/*"],
     "@/*": ["./resources/js/*"],
  },
  ```
- {edit} `vite.config.js`
  ```js
  import path from 'node:path'; // add
  ```
  ```js
  // add on .
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './resources'), 
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
  ```
- {edit} `eslint.config.js`
  ```js
  // add on `rules.'import/order'.pathGroups`
  {group: 'builtin', pattern: '~/phpgen/yii-*', position: 'before'},
  {group: 'internal', pattern: '@/**', position: 'before'},
  ```
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup aliases";
  ```

# Fix aliases

- {edit} resources/js/pages/Home.tsx;

    - `import Internal from './Internal';` > `import Internal from '@/pages/Internal';`
    - `import Internal from './Sibling';` > `import Sibling from '@/pages/Sibling';`
    - `import type {PageProps} from '../types/common';` > `import type {PageProps} from '@/types/common';`
    - `import YiiLang from '../../phpgen/yii-lang';` > `import YiiLang from '~/phpgen/yii-lang';`

- {edit} resources/js/pages/Home.module.css;
    - `@reference "../../css/app.css";` > `@reference "~/css/app.css";`

- {edit} resources/js/app.tsx;
    - `import '../css/app.css';` > `import '~/css/app.css';`


- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Fix aliases";
  ```
# Setup SSR
https://inertiajs.com/server-side-rendering
- {edit} `vite.config.js`
  ```js
  ssr: ['resources/js/ssr.tsx'], // add on plugins laravel
  ```
- {edit} `resources/js/app.tsx`, add block: if (import.meta.env.SSR) {...}
  ```js
  // replace
  import {createRoot, hydrateRoot} from 'react-dom/client';
  ```
  ```js
  // add before createRoot
  if (import.meta.env.SSR) {
    hydrateRoot(el, <App {...props} />);
    return;
  }
  ```
- {edit and replace line} `package.json`
  ```
  "build": "vite build && vite build --ssr",
  ```
- `touch resources/js/ssr.tsx`
- {edit} `resources/js/ssr.tsx`
    - {replace content from link: Add server entry-point}
    - {edit: resolvePageComponent (aka app.tsx), jsx>tsx}
- `yarn build`
- `php artisan inertia:start-ssr`
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup SSR";
  ```

# Setup navigation + routes (PHP server)
- `composer require tightenco/ziggy`
- `yarn add @types/ziggy-js --dev`
- {edit} `app/Http/Middleware/HandleInertiaRequests.php`
  ```php
  // add after ...parent::share($request),
  'ziggy' => fn () => [
    ...(new \Tighten\Ziggy\Ziggy)->toArray(),
    'location' => $request->url(),
  ],
  ```
- {edit} `routes/web.php`
  ```php
  // add
  Route::get('/link-test', function () {return inertia('Home');})->name('link-test-name');
  Route::get('/button-test', function () {return inertia('Home');})->name('button-test-name');
  ```
- {edit} `resources/view/app.blade.php`
  ```php
  // add after @inertiaHead
  @routes
  ```
- {edit and add lines} `resources/js/pages/Home.tsx`
  ```ts
  import {Link, router} from '@inertiajs/react';
  ```
  ```js
  // before {YiiLang.text('Banana')}
  <header className="flex gap-4 flex-col bg-white text-blue-600">
    <h1 className="text-xl">{props.ziggy.location}</h1>
    <Link href="/">Home</Link>
    <Link href="/link-test">Link test raw</Link>
    <Link href={route('link-test-name')}>Link test with route</Link>
    <button onClick={() => router.visit('/button-test')}>Button test raw</button>
    <button onClick={() => router.visit(route('button-test-name'))}>Button test with route</button>
  </header>
  ```
- {edit and add line on compilerOptions.paths} `tsconfig.json`
  ```
  "ziggy-js": ["./vendor/tightenco/ziggy"],
  ```
- {edit and replace content} `resources/js/types/common.ts`
  ```ts
  import type {Config} from 'ziggy-js';

  export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    ziggy: Config & {location: string};
  };
  ```
- {edit and add lines} `resources/js/types/global.ts`
  ```ts
  import type {route as ziggyRoute} from 'ziggy-js';
  ```
  ```ts
  // inside declare global
  let route: typeof ziggyRoute;
  ```
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup navigation + routes (PHP server)";
  ```

# Setup navigation + routes (SSR)

- {edit and replace content} `resources/js/ssr.tsx`
  ```ts
  import {route} from '../../vendor/tightenco/ziggy';

  import type {RouteName} from 'ziggy-js';
  ```
  ```ts
  // add after setup: (
  /* eslint-disable */
  // @ts-expect-error
  global.route<RouteName> = (name, params, absolute) =>
    route(name, params as any, absolute, {
      ...page.props.ziggy,
      location: new URL(page.props.ziggy.location),
    });
  /* eslint-enable */
  ```

- `yarn build`
- `php artisan inertia:start-ssr`
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup navigation + routes (SSR)";
  ```
