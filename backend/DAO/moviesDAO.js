var movies;

export default class MoviesDAO {
  static async injectDB(conn) {
    if (movies) {
      return;
    }
    try {
      movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies");
      console.log(await movies.find({ '$text': { '$search': 'dragon' } }).toArray())
    } catch (e) {
      console.error("unable to connect in MoviesDAO:${e}");
    }
  }


static async getMovies({// default filter
    filters = null,
    page = 0,
    moviesPerPage = 20, // will only get 20 movies at once
    } = {}){
    let query;
    if(filters){
    if("title" in filters){
    query = { $text: { $search: filters['title']}}
    console.log(query)
    }else if("rated" in filters){
    query = {"rated": { $eq: filters['rated']}}
    console.log('hello')
    }
    }
    let cursor;
    console.log(movies)
    try{
    cursor = await movies.find(query);
    const moviesList = await cursor.toArray();
    const totalNumMovies = await movies.countDocuments(query);
    return {moviesList, totalNumMovies};
    }
    catch(e){
    console.error(`Unable to issue find command, ${e}`);
    return {moviesList:[], totalNumMovies: 0};
    }
    }
  }