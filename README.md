# Desafio de visualização de dados

 Desenvolva uma animação para web a partir de uma planilha de dados.

 Crie um fork desse projeto e, quando concluído, faça um pull request dele para esse repositório.

 ---

## Critérios obrigatórios que a animação precisará ter

- Comparação animada entre o tempo de todos os medalhistas dos 100m rasos nas Olimpíadas masculino ou feminino, mas não os dois
- A informação deve ser precisa e de acordo com a planilha de dados nesse repositório
- Controles de animação: iniciar, pausar e reiniciar
- Utilizar preprocessadores de HTML, CSS e JS (Webpack ou Gulp preferencialmente)
- JS de controle da animação deve ser em ES6

Essas são as regras, fora isso tudo é válido. Utilize as bibliotecas que quiser, as técnicas que achar mais interessante. Se quiser incrementar a proposta, ótimo.

---

## Recursos

### Animação

Como referência utilize o [vídeo](./animation/animation.mp4) encontrado na pasta `animation`. Você pode estilizar seu vídeo como desejar.

![animation](./animation/animation.png)

### Dados

Na pasta `data/data.tsv` existe uma planilha separada por tabs. Utilize os valores nela contida para gerar a animação

## Instruções

As instruções a seguir utilizam o [Yarn](https://yarnpkg.com/) como gerenciador de dependência, mas é possível executar todos os comandos usando npm

Para instalar as dependências, utilize
```shell
yarn
```

Para rodar o modo de desenvolvimento, use
```shell
yarn start
```

## Demo

O gif abaixo foi gravado no Firefox Quantum 59.0.2 (64-bit)

https://brunocalou.github.io/desafio-dataviz/

![demo](https://user-images.githubusercontent.com/5948318/39319051-463fa186-4956-11e8-8005-7b5a61da45b2.gif)
