# gorila-front

gorila-front é uma aplicação desenvolvida com base nas tecnologias Javascript, Vuejs, Bootastrap e e seguindo os bons padroes de clean code, identação e modularização. Ela tem por finalidade realizar e concluir o [desafio](https://www.notion.so/Teste-Gorila-Full-Stack-J-nior-e-Pleno-d5e1b497ff64430ab6bb50aa988e2429) da Gorila invest de criar uma carteira de investimentos simplificada.

# Features!
  - SignUp API: Cadastro de usuarios consumindo a gorila-api
  - Login simples, moderno e rapido
  - Cadastro de ativos de renda fixa e variavel (podendo selecionar um conjunto de ações)
  - Analize de grafico de pizza
  - Exclusão de ativos da carteira
  
  
### Tech

gorila-front usa:

* [NodeJs]
* [VueJs]
* [Javascript]
* [Jest]
* [Vuex]
* [Eslint]
* [bootstrap]

Codigo publicado no GitHub

### Installation

gorila-front precisa de [Node.js](https://nodejs.org/) v10+ para rodar.
npm para o gerenciamento e download das dependencias

Com essas depencias instaladas, basta clonar o repositorio do git, navegar até a pasta raiz da aplicação e rodar os seguintes comandos:

```sh
$ npm install
$ npm run serve //rodar em modo de desenvolvedor
$ npm run build //gerar a pasta dist para rodar em produção
$ npm run start //rodar a api em modo de produção
```

A gorila-front está hospedada no heroku versão free dyno, por isso quando não utilizada o heroku a desliga até a proxima requisição, por isso pode demorar um pouco para a primeira resposta.

Link da api: https://gorila-front.herokuapp.com/
