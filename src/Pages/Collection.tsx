import { ProductCard } from "@/Components/ProductCard"
import { useParams } from "react-router-dom"
import { useCollection } from "@/hooks/useCollection"

export const Collection = () => {

   const {  bridalProducts, boutiqueProducts, bridalCollections, boutiqueCollections, isLoading } = useCollection();

    const { category, collectionName } = useParams<{ category: string; collectionName: string }>()

    const products = category === "bridal" ? bridalProducts : boutiqueProducts
    const collections = category === "bridal" ? bridalCollections : boutiqueCollections

    // local slugify to mirror hook's behavior
    const slugify = (s: string) =>
      s
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // remove non-word chars
        .replace(/\s+/g, "-"); // replace spaces with hyphens

    // normalize incoming param so it matches slug/id/name forms
    const paramRaw = collectionName ?? ""
    const paramDecoded = decodeURIComponent(paramRaw)
    const paramNormalized = paramDecoded.toString().toLowerCase()

    const collection = collections.find((col) => {
      // match by id (raw), slug, or normalized name
      if (!col) return false
      const slug = col.slug ?? slugify(col.name)
      return (
        col.id === paramRaw || // id match
        slug === paramNormalized || // slug match
        col.name.toLowerCase() === paramNormalized || // name match
        slugify(col.name) === paramNormalized // slugify(name) match (redundant, safe)
      )
    })

    const collectionProducts = collection ? products.filter((product) => product.collection_id === collection.id) : []

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    }

    if(!collection){
        return (
            <div  className="min-h-screen">
                <div className="cointainer mx-auto px-4 py-40 text-center">
                    <h1 className="text-3xl font-serif font-semibold">Collection not found!</h1>
                </div>
            </div>
        )
    }

  return (
    <div className="min-h-screen">

        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-5xl font-serif font-bold mb-4 animate-fade-in">
                    {collection.name}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
                    {collection.description}
                </p>
            </div>
        </section>

        {/* Product Grid */}
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {collectionProducts.length > 0 ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 m x-4">
                     {collectionProducts.map((product) => (
                    <ProductCard key={product.id} item={product} />
                ))}
                </div>
                ) : (
                    <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                No products available in this collection yet. Check back soon!
              </p>
            </div>
                )
                
                }
               
               
            </div>
        </section>
    </div>
  )
}
