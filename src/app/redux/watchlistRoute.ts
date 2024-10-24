// Define the Movie type or interface
interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    release_date: string;
  }
  
  // Use the Movie type for the watchlist array
  let watchlist: Movie[] = [];
  
  // Example of an API handler using this typed watchlist
  export async function POST(request: Request) {
    const body = await request.json();
    watchlist.push(body.movie as Movie); // Ensure the movie added matches the Movie type
    return new Response(JSON.stringify({ status: "Movie added to watchlist" }), {
      status: 200,
    });
  }
  
  export async function DELETE(request: Request) {
    const body = await request.json();
    watchlist = watchlist.filter((movie) => movie.id !== body.id);
    return new Response(JSON.stringify({ status: "Movie removed from watchlist" }), {
      status: 200,
    });
  }
  
  export async function GET() {
    return new Response(JSON.stringify(watchlist), { status: 200 });
  }
  