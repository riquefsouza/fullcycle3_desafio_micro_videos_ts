# fullcycle3_desafio_micro_videos_ts
# Montagem do ambiente de desenvolvimento (Docker e IDE)
# Criar uma aplicação Node.js + TypeScript
# Criar entidade de Categoria
# Criar testes usando JEST
# Criar Casos de Uso e Repositório
# Criar testes usando JEST

# Repetir para as outras entidades Genre, Cast Member, Video

# Nest.js - Criação de API Rest
# Integração com RabbitMQ e Encoder de vídeo
# Testes E2E (End-to-End)

docker-compose up --build
docker-compose exec app bash

# dentro da imagem docker

npm init -y
npm view @types/node
npm install typescript ts-node @types/node@14.14.31 --save-dev
npm run ts-node

npx tsc --init

npm install jest @types/jest --save-dev
npx jest --init

npm install @swc/core @swc/jest --save-dev
npm install @types/lodash --save-dev
npm install uuid 
npm install @types/uuid --save-dev
npm install class-validator
npm install regenerator-runtime --save-dev

# alterar o arquivo tsconfig.json

"incremental": true,
"target": "es2017",
"baseUrl": "./src",
"strictNullChecks": false,

    },
    "include": ["src/"]
}

# no terminal
git init
git add .
gh repo create codeedu/micro-videos-typescript
git commit -m "first commit"
git push origin main

# alterar o arquivo jest.config.ts
rootDir: "src",
testRegex: ".*\\..*spec\\.ts$",
transform: {
    "^.+\\.ts?$": ["@swc/jest"],
}

# https://github.com/romkatv/powerlevel10k#oh-my-zsh

# git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

npm run test -- --coverage
npm run tsc -- --noEmit

# npm install -D typescript-transform-paths
# npm install -D ttypescript

npm install create-ts-index --save-dev

# node_modules/.bin/cti ./src/category/domain

npm run cti:@core

# apos rebuild depois de colocar no dockerfile o run do nestjs, abrir o terminal
nest new nestjs
cd nestjs
npm run start:dev
http://localhost:3000

# npm install axios --workspace micro-videos
# npm install axios -w @fc/micro-videos
# npm run test --workspaces

npm run build -w @fc/micro-videos

cd src/nestjs
nest g resource 
# --> categories
# --> REST API
# --> Yes

npm run test -- --projects src/@core
npm run test -- --projects src/nestjs

npm install @swc/jest --save-dev -w nestjs
npm install @swc/core --save-dev -w nestjs

npm install sequelize sequelize-typescript -w @fc/micro-videos
npm install sqlite3 -w @fc/micro-videos
npm install chance -w @fc/micro-videos
npm install @types/chance -w @fc/micro-videos --save-dev

npm run test:cov -w @fc/micro-videos

npm install -w @fc/micro-videos dotenv

npm install @nestjs/config -w nestjs

cd src/nestjs
nest g module config

npm install joi -w nestjs

npm run cti:make -w @fc/micro-videos
npm run build -w @fc/micro-videos
rpm run start:dev

cd src/nestjs
nest g module database
npm install @nestjs/sequelize -w nestjs

npm install mysql2 -w @fc/micro-videos

npm install class-transformer -w nestjs

