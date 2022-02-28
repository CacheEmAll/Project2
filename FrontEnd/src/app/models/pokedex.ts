export class Pokedex {
    constructor(
    public user_id: String,
    public pokemon_id: [],
    ){}
  }
  

export class UserId {
        constructor(
        public user_id: number | null,
        public username: String | null
    ){}
}

export class Wishlist {
  constructor(
    public user_id: String,
    public pokemon_id: [],
  ){}
}