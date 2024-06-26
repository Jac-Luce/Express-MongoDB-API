/** Middleware che comunicherà la richieste effettutate all'API */

const logger = (req, res, next) => {

    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`);

    next();
};

export default logger;