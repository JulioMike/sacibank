# SaciBank

![Logo (1)](https://user-images.githubusercontent.com/42989794/143376853-21972cb6-028b-4f6a-b28b-8f1f0448ccde.png)
![sacibank__4_-removebg-preview 2](https://user-images.githubusercontent.com/42989794/143376765-fe05ae3b-63e0-4a6b-aa4a-015b7b5b3880.png)
<br>

<h1>Introdução</h1>
<br>
Aplicação API REST que tem como objetivo ser um banco online no qual possibilita aos usuários cadastrados disfrutarem das funções bancárias e 
terem um controle maior em sua vida financeira.

<h1> Objetivo </h1>
<br>
Ser um banco online, no qual possibilita as seguintes funções bancárias: SAQUE, DEPOSITO, PAGAMENTO, TRANSFERENCIA, SALDO, EXTRATO.


<h1> Sobre a API REST, foi desenvolvida utilizando: </h1>
<br>
 <ul>
    <li>NodeJS</li>
    <li>JavaScript</li>
    <li>Banco de Dados: MongoDB(mongoose)</li>
    <li>Framework: express</li>
    <li>Frontend: Foi desenvolvido as telas de como seria o rosto da app, porém com imprevisto acabei não foi concluindo</li>
 </ul>


<h1>Requisitos Funcionais</h1>
<br>
<ul>
    <li>Abertura de Conta</li>
    <li>Autenticação de Usuários</li>
    <li>Saque</li>
    <li>Consulta de saldo</li>
    <li>Geração de Extrato</li>
 </ul>
<h1> Hierarquia de usuarios</h1>
<br>
<ol>
 <li> Cliente: Permissão de realizar movimentações bancarias.</li>
 <li> Gerente(Admin): Permissão de gerencia todos os clientes (CRUD) e Permissão de realizar movimentações bancarias.</li>
</ol>

<h1>Passos para rodar a API REST (Backend + Insomnia)</h1>
<br>
<ol>
 <li>
  <h3> Importar arquivos do GitHub. </h3>
  <p>git clone https://github.com/JulioMike/sacibank.git</p>
 </li>
<li>
  <h3> Navegue para dentro da pasta backend e realize o donwload das dependências do projeto. </h3>
  <p> cd sacibank && cd backend && yarn add . </p>
 </li>
<li>
  <h3> Aplicação aptar a rodar. </h3>
  <p> yarn start. </p>
 </li>
<li>
  <h3> Import o arquivo do Insomnia. </h3>
  <p> Abre o Insomnia, navegue configurações -> data -> import data -> select Insomnia_2021-11-25.json  </p>
 </li>
</ol>

<h1>Telas Desenvolvidas para o Frontend</h1>
<br>

![Tela Inicial (7)](https://user-images.githubusercontent.com/42989794/143377538-3e45ea09-bbfa-4f5d-b1e6-aec4bd00ae11.png)

![Tela Login](https://user-images.githubusercontent.com/42989794/143377644-5feba22b-39bd-4b26-84e3-22471eacfc87.png)

![Tela Principal](https://user-images.githubusercontent.com/42989794/143377817-38429784-f57b-40b0-8410-e3e0a5e86f37.png)




