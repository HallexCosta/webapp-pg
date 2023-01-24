## Postgre Web App

This project has purpose in manipulate database PostgreSQL using a webapp like client database.

#### Description
The project's initiative is due to the depreciation of the use of Database Drivers in Android Studio with Java, as an alternative, I uploaded a WebApp that receives queries in the body of its request that can be accessed through a REST route, and this query is injected into the postgre driver of Node.js, and I return this data in JSON format, and I receive this data on android using the Volley library. Along with the request, an encrypted JWT token is passed with the data to which bank the service must connect

## Techs
- Node (v17.5.0)
- PostgreSQL Driver
- Typescript

