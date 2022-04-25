# Web3 Event Consumer


Web3 Event Consumer is a node js backend application which does two things.

 1. Consume events from the Ethereum node provider, i.e. Infura.
 2. Exposes an API to fetch these events in a paginated manner.

Here is the API [URL](http://web3eventconsumer-env.eba-ccsbb3xk.eu-west-3.elasticbeanstalk.com/v1/events) of the server.

Below is the list of components of this application

## Event Consumer

The Event consumer subscribes to events from the Infura node and stores them in the events table in MYSQL Database. 
The block number processed so far and handled will be stored in the database. This block number is used as an offset to start consuming events from this point, avoiding duplicate consumption.

## Database


**MYSQL** is the database used for this project hosted on **AWS**.

There are a couple of tables used in this project
1. events (stores the event data)
2. blocknumbers   (stores the block number processed so far)

Below are the schemas of these tables

**events**

    CREATE TABLE IF NOT EXISTS events
      (
         id              INT NOT NULL auto_increment,
         event           JSON NOT NULL,
         transactionhash VARCHAR(255) NOT NULL,
         eventtype       VARCHAR(255) NOT NULL,
         createdat       DATETIME NOT NULL,
         updatedat       DATETIME NOT NULL,
         PRIMARY KEY (id)
      )
    engine=innodb; 

**blocknumbers**

    CREATE TABLE IF NOT EXISTS blocknumbers
      (
         eventtype          VARCHAR(255) NOT NULL,
         currentblocknumber BIGINT NOT NULL,
         createdat          DATETIME NOT NULL,
         updatedat          DATETIME NOT NULL,
         PRIMARY KEY (eventtype)
      )
    engine=innodb; 

## Get Events API

The Get events API is the Rest API which returns the events in descending order of their consumption. This API supports pagination, and the default page size is 10.

Here is the API [URL](http://web3eventconsumer-env.eba-ccsbb3xk.eu-west-3.elasticbeanstalk.com/v1/events?page=1&size=10).

## Node Packages


 - chai
 - chai-http
 - dotenv
 - express 
 - http-errors 
 - mocha 
 - morgan 
 - mysql2 
 - sequelize 
 - web3 
 - winston
 - nodemon

## Deployment Process

The node application is hosted on AWS. I leveraged AWS Code Pipeline, which has integrated with this repository on the Github. Upon every push to the master branch, the code gets deployed to AWS Elasticbean Stalk via AWS Code Pipeline.

Below are some of the screenshots
![AWS Code Pipeline Architecture](https://www.linkpicture.com/q/Screenshot-2022-04-25-at-12.20.40-PM.png)
![AWS Code Pipeline](https://www.linkpicture.com/q/Screenshot-2022-04-25-at-12.24.02-PM.png)


## Future Scope

1. Authentication Layer
2. More Unit test cases
3. Decouple Event consumer and API components

## References

 1. [Node Udemy Course](https://www.udemy.com/course/nodejs-getting-started/)
 2. [Infura, Web3 Node Example](https://codeforgeek.com/configure-infura-with-web3-and-node-js/)
 3. [Web3Js Docs](https://web3js.readthedocs.io/en/v1.7.3/web3-eth-contract.html#events-allevents)
 4. [Pagination with Sequelize](https://www.youtube.com/watch?v=QoI_F_Fj8Lo&ab_channel=ProgrammingwithBasar)
 5. [NodeJs AWS Deployment](https://www.youtube.com/watch?v=b0g-FJ5Zbb8&ab_channel=CalebCurry)
 6. [Test Rest API in NodeJs](Test%20Rest%20API%20in%20NodeJs)
