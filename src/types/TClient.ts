export type TClientProduct = {
  id: string | number
  name: string
  img: string
  birth_date: string
  telephone: string
  product: {
    name: string
    price: number | null
    comment?: string
  }
}
