Para dar setup no site você precisa

1- Dar cd em ambas as pastas para trocar o diretorio
2- coloque o comando 'npm i' para instalar as dependencias de ambas as pastas
3- Crie um schema no MYSQL WORKBENCH com o nome de quizdb
4- Crie um arquivo .env dentro do diretorio do quizback
5- Dentro do .env coloque esse template
    JWT_SECRET=mysecretkey
    JWT_EXPIRES_IN=3600s
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=root
    DB_DATABASE=database


6- Altere as informações dentro do arquivo .env caso seja necessario
    *Altere DB_PASSWORD="SENHA DA SUA CONEXÃO NO WORKBENCH"
    *Altere DB_USERNAME="USUARIO DO SEU WORKBENCH"
    *Altere DB_DATABASE="NOME DO SCHEMA RECÉM CRIADO NO WORKBENCH"

    Exemplo para os computadores do IFPE Campus Jaboatão dos guararapes
    JWT_SECRET=mysecretkey
    JWT_EXPIRES_IN=3600s
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=aluno
    DB_PASSWORD=ifpecjbg
    DB_DATABASE=quizdb


7- apos as instalação das dependencias você colocará 'npm start' no front e 'npm run start:dev' no back



Caso queira parar o programa aperte Ctrl C no terminal dele.
