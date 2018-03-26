#!/bin/bash
# This is (should be) an executable script (bash script)
# to test some database functionality

# (Re)create database 
#curl -v http://localhost:8080/ws4/rest/db

# Options (used by CORS preflight)
curl -v -X OPTIONS http://localhost:8080/

# Get all notes 
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/author 

# Get single note
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/author/FF

# Get primitive type (number of notes)
curl -v -H "Accept: application/json" http://localhost:8080/ws4/rest/author/count

# Create new (NOTE: exception if run more times ... use delete) Using form parameters
curl -v -X POST  http://localhost:8080/ws4/rest/author --data "id=QQ&firstName=Qbert&lastName=Qson&email=qson@mail"

# Create new (NOTE: exception if run more times ... use delete) Using JSON
curl -v -X POST -H "Content-Type: application/json"\
http://localhost:8080/ws4/rest/author --data '{"id":"XX", "firstName": "Xbert", "lastName": "Xson", "email":"xson@mail, "address" : ""}'

# Update a note
curl -v -X PUT http://localhost:8080/ws4/rest/author --data '{"id":"XX", "firstName": "NEWbert", "lastName": "NEWson", "email":"NEW@mail, "address" : ""}'

# Delete (last part of URL is id)
curl -v -X DELETE http://localhost:8080/ws4/rest/author/XX 



