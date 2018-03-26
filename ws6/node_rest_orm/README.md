*** README ***

This is a ES6 REST-backend using
- NodeJS as basis ...
- .. the Express framework for routing etc.
- .. the TypeORM framework for ORM (library database)

Datatables will be created if not existing
NOTE not same names for tables and columns as in Java (difference in case)
So possible have to tear down the tables.

# NodeJS doesn't support ES6 modules
- Have to transpile, see files package.json and .babelrc
- Transpiled output is in /dist

# Dir layout
- dist/ is where the transpiled sources ends up
- src/entiry is the model
- src/rest is the resource
app.js is the start of the application
ormconfig.json is database configuration
.babelrc is for transpiling with babel

# Install dependencies
npm install

# Start development (not live reload)
npm start

Live reload is a must. Have tried 2 different, but non worked
see package.json startFAIL1 and startFAIL2.
There are many more options (or just back to using ES5 server side,
then possible the Sequelize ORM is simpler to use,
see http://docs.sequelizejs.com/ )
