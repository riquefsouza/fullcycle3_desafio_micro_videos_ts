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
