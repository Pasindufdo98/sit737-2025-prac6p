const express = require("express");
const res = require("express/lib/response");
const app = express();
const fs = require('fs');
const winston = require('winston');

// Logger Configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'add-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}


// Math Operations
const calculateAddition = (n1, n2) => n1 + n2;
const calculateSubtraction = (n1, n2) => n1 - n2;
const calculateMultiplication = (n1, n2) => n1 * n2;
const calculateDivision = (n1, n2) => {
    if (n2 === 0) throw new Error("Division by zero is not allowed");
    return n1 / n2;
};
const calculateExponentiation = (n1, n2) => Math.pow(n1, n2);
const calculateSquareRoot = (n) => {
    if (n < 0) throw new Error("Cannot compute square root of a negative number");
    return Math.sqrt(n);
};
const calculateModulo = (n1, n2) => {
    if (n2 === 0) throw new Error("Modulo by zero is not allowed");
    return n1 % n2;
};

// handle mathematical operations
const handleMathOperation = (operation, req, res) => {
    try {
        const num1 = parseFloat(req.query.n1);
        const num2 = req.query.n2 !== undefined ? parseFloat(req.query.n2) : null;

        if (isNaN(num1) || (num2 !== null && isNaN(num2))) {
            logger.error("Invalid input parameters",{ service: `${operation}-service` });
            throw new Error("Invalid input: All parameters must be valid numbers");
        }

        logger.info(`Received parameters: ${num1}${num2 !== null ? ", " + num2 : ""} for ${operation}`,{ service: `${operation}-service` });
        let result;

        switch (operation) {
            case 'addition': result = calculateAddition(num1, num2); break;
            case 'subtraction': result = calculateSubtraction(num1, num2); break;
            case 'multiplication': result = calculateMultiplication(num1, num2); break;
            case 'division': result = calculateDivision(num1, num2); break;
            case 'exponentiation': result = calculateExponentiation(num1, num2); break;
            case 'square-root': result = calculateSquareRoot(num1); break;
            case 'modulo': result = calculateModulo(num1, num2); break;
            default: throw new Error("Invalid operation");
        }

        res.status(200).json({ statusCode: 200, result });
    } catch (error) {
        logger.error(error.message,{ service: `${operation}-service` });
        res.status(400).json({ statusCode: 400, error: error.message });
    }
};


// API Endpoints

app.get('/', (req,res)=> {
    res.send('hello world');
});


app.get("/addition", (req, res) => handleMathOperation('addition', req, res));
app.get("/subtraction", (req, res) => handleMathOperation('subtraction', req, res));
app.get("/multiplication", (req, res) => handleMathOperation('multiplication', req, res));
app.get("/division", (req, res) => handleMathOperation('division', req, res));
app.get("/exponentiation", (req, res) => handleMathOperation('exponentiation', req, res));
app.get("/square-root", (req, res) => handleMathOperation('square-root', req, res));
app.get("/modulo", (req, res) => handleMathOperation('modulo', req, res));

const port = 3000;
app.listen(port, ()=>{
    console.log("hello im listening to port"+port);
})