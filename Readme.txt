->create a database named benefits_db
->create a table benefits like below:

    create table benefits( id int auto_increment primary key,benefit_name varchar(100),description varchar(100),
    eligibility_criteria varchar(30),coverage_amount float,start_date date,end_date date);

->insert values into it like below:

    insert into benefits values (1,'scholarship','you can get education scholarship','rank less that ten thousand',500000,'2024-09-17','2025-05-25'),
    (2,'free education','you can get free education','income less than one lakh',5000000,'2021-04-16','2026-06-5');

->connect your database and configurations like:
->const config = {
    host:'localhost',
    user:'root',
    password:'password',
    database:'benefits_db'
}
->test using postman
->for get,put,post,delete of benefits.
->While testing you have to set the request headers to 
    'Content-Type:application/json' and body to 'raw'
  for post and update.

->installations required are:
->npm init -y
->npm i express
->npm i mysql2
