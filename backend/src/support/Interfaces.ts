/** Interfaces
 * For example:
 * export interface <name> {}
 */


export interface response_meme {
    joke: string;
    image: string;

}

export interface query_joke_availablity {
    joke: string;
    image: string;
    jokeAvailable: boolean

}


// Input (Query Common language => If sad then return Joke)
