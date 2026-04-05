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
  echo "export default () => <div>oi</div>;" > resources/js/pages/Home.tsx;
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
  git commit -m "Setup typescript";
  ```

# Prettier + Pint

- `npm install --save-dev prettier;`
- ```
  curl -L https://gist.githubusercontent.com/cristianocarlos/978aba3851bc43a36bc6bab48919723c/raw/b4c9a8ec485e59b193ed83927b3a12558bf85031/.prettierrc.json -o .prettierrc.json; \
  curl -L https://gist.githubusercontent.com/cristianocarlos/1c9454b5f29bc0d829a9bece5f3c2b43/raw/008df2b9b2bc4a9777c8d1aa704fe3982f100ae7/pint.json -o pint.json;
  ```
- {edit and add lines on `scripts`} package.json
  ```
  "pint": "./vendor/bin/pint --test -v",
  "pifix": "./vendor/bin/pint",
  "prfix": "npm run prettier -- --write",
  "prettier": "npx prettier resources/js --check",
  ```
- {edit} `routes/web.php`
  ```
  // add
  [*.{js,jsx,ts,tsx}]
  indent_size = 2
  ```
- `npm run pint` (emular alguns erros manualmente, se apareceu erros, deu bom)
- `npm run prettier` (emular alguns erros manualmente, se apareceu erros, deu bom)
- `npm run pifix` (corrige os erros)
- `npm run prfix` (corrige os erros)
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup+fix prettier+pint";
  ```
  
# Eslint

{alguns pacotes do eslint estão com problema de peer dependency}
- ```
  curl -L https://gist.githubusercontent.com/cristianocarlos/f9a66a9319d2b8d4747871664cf1e3ca/raw/18ae8bdba01849b606ee4eaae46b069aa8f38643/.npmrc -o .npmrc;
  ```
- `npm install --save-dev eslint@^9 @eslint/js eslint-config-prettier eslint-plugin-react eslint-plugin-import typescript-eslint eslint-plugin-react-refresh eslint-plugin-react-hooks eslint-plugin-unused-imports;`
- ```
  curl -L https://gist.githubusercontent.com/cristianocarlos/84c801dc27deda227967132542aac444/raw/6e8a3b5d14e942af2a1ae2875910dcc354ca548f/eslint.config.js -o eslint.config.js;
  ```
- {edit and add lines on `scripts`} package.json
  ```
  "lint": "npx eslint resources/js",
  "lifix": "npm run lint -- --fix",
  ```
- `npm run lint` (emular alguns erros manualmente, se apareceu erros, deu bom)
- `npm run lifix` (corrige os erros)
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup+fix eslint";
  ```

# Aliases

### Prepare
- ``` 
  echo "export default () => <div>AnotherComponent</div>;" > resources/js/pages/AnotherComponent.tsx; \
  mkdir -p resources/phpgen; \
  echo "export default {misc: (v: string) => v};" > resources/phpgen/yii-lang.ts; \
  curl -L https://gist.githubusercontent.com/cristianocarlos/30c37d4046d6cf5dd78fb46256679627/raw/9a2e6913639860aaef3e7d83d2b456152a72003a/Home.tsx -o resources/js/pages/Home.tsx;
  ```

### Setup
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

### Fix

- {edit} resources/js/pages/Home.tsx;

    - `import Internal from './AnotherComponent';` > `import Internal from '@/pages/AnotherComponent';`
    - `import type {PageProps} from '../types/page';` > `import type {PageProps} from '@/types/page';`
    - `import YiiLang from '../../phpgen/yii-lang';` > `import YiiLang from '~/phpgen/yii-lang';`

- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup aliases";
  ```

# TailwindCSS
https://tailwindcss.com/docs/installation/framework-guides/laravel/vite
- {edit} `resources/js/app.ts`
  ``` js
  import '~/css/app.css'; // add
  ```
- {replace file} `echo "export default () => <div className=\"bg-amber-500\">AnotherComponent</div>;" > resources/js/pages/AnotherComponent.tsx;`
- `composer run dev` {se ok, commit}
  ```
  git add .; \
  git commit -m "Setup TailwindCSS";
  ```
