export interface Order {
    id: number,
    userId: string,
    client: string,
    products: [
      {
        qty: number,
        product: {
          id: number,
          name: string,
          price: number,
          image: string,
          type: string,
          dateEntry: string,
        }
      }
    ],  
  }