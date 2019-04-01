# McDonalds Geolocalisation
Geolocalisation : USA based Macdonalds  
# Getting Started
Small react application with backend created with node and express.

The application contains a search input , you have to type the USA state code and the result is a marker(s) of all McDonalds in this state , displayed on map
# how to run application 


         ----------- PROJECT ONE : WITH DATA BASE -----folder:with_data_base-----
          how the project works ---> the cv is converted to json 
          then json object is saved into a file 
          when the front application is launched it check if the database containes information 
          if the answer is no , the the JSON file will be saved in data base via post request
          after that all operation (research restaurant) will be handled via get request to the database 
          i also used redux to make data manipulation easy


          
          ----------- PROJECT TWO : NO DATA BASE -----folder:sipmle-----
          how the project works ---> the cv is converted to json 
          then json object is saved into a file 
          the front end get the reads the json file via axios 
          and then save it in a reducer
          all operation are based on the reducer and the cvs and json file
          
           


         
              ---------------PROJECT 1:  WITH DATA BASE-----------
1 - download project 

---> the project contain two folders:

         1) backend  
  
         2) frontend
        
2 - open folder backend and install npm backage (npm install) :

--> third party npm modules used for backend express | body-parser | nodemon | csvtojson

3 - open folder backend and install npm backage (npm install) :

--> third party npm modules used for frontend axios | react-redux | redux | react-google-maps | mongodb

4 - run backend: nodemon server.js

5 - run frontend: npm start
6 - run your mongo database

   

                  ---------------PROJECT 2: WITH NO DATA BASE-----------
                  
1 - download project 

---> the project contain two folders:

         1) backend  
  
         2) frontend
        
2 - open folder backend and install npm backage (npm install) :

--> third party npm modules used for backend express | body-parser | nodemon | csvtojson

3 - open folder backend and install npm backage (npm install) :

--> third party npm modules used for frontend axios | react-redux | redux | react-google-maps 

4 - run backend: nodemon server.js

5 - run frontend: npm start



  
