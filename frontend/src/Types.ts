export type Product = {
    id:string
    name:string
    price:number
    imageUrl:string
    description:string
    category: ProductCategory
}
export type NewProduct = {
    name:string
    price:number
    imageUrl:string
    description:string
    category: ProductCategory
}
export type ProductCategory = "LAPTOPS" | "SMARTPHONES" | "SMARTWATCHES" | "UNKNOWN" | "OTHER"