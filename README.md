<h1 align="center">
  ## Web#Scraping#Correios
</h1>

<blockquote align="center">“Algod e errado não tá certo”!</blockquote>

<p align="center">
  <img alt="challenge" src="https://img.shields.io/badge/challenge-%2304D361">

  <a href="https://github.com/carvalhoviniciusluiz">
    <img alt="Made by Vinicius Carvalho" src="https://img.shields.io/badge/made%20by-Vinicius%20Carvalho-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#loop-link-do-desafio">Link do desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o projeto

Seu desafio é criar um Backend para consultar através do cep e encontrar o endereço do local no portal dos correios.

- O backend usa Express.js para publicar a api padrão http://localhost:3000/v1/cep/[numero-cep/casa].
- O Scraping é feito usando puppeteer no endpoing https://buscacepinter.correios.com.br/app/endereco/index.php?t dos correios.
- Apesar de bem simples, foi feito um arquivo express standalone para facilitar o deploy em plataformas como a vercel.

### Preview ###

<p align="center">
  <img src="https://user-images.githubusercontent.com/22005684/118384747-10419500-b5df-11eb-8fb1-78c34ac953b9.gif" alt="Preview" height="600" />
</p>

## :loop: Link do desafio

https://devchallenge.com.br/challenges/5fb84592ad5609002194ff76/details

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
