import mongodb from "mongodb"; 
import dotenv from "dotenv";
import MoviesDAO from './DAO/moviesDAO.js';
import ReviewsDAO from "./DAO/reviewsDAO.js";

async function main() { 
    dotenv.config();
    const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);
    const port = process.env.PORT || 8000;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await MoviesDAO.injectDB(client)
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
        console.log('Server is running on port:' + port);
        });
        } 
    catch (e) { console.error(e); process.exit(1);
}}

main().catch(console.error);
import app from "./server.js"; 