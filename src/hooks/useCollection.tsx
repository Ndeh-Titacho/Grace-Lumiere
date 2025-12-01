import {useContext, createContext, useState, useEffect } from "react"
import axios from "axios"

export interface CollectionContextType {
    collections: CollectionsList[];          // changed: always array
    items: itemsType[];                      // changed: always array
    isLoading: boolean;
    error: string | null;
    bridalProducts: itemsType[];             // changed: always array
    boutiqueProducts: itemsType[];  
    bridalCollections: CollectionsList[];   // changed: always array
    boutiqueCollections: CollectionsList[]; // changed: always array
}

export interface CollectionsList {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    display_order: number;
    suite_id: string;
    suite_name: string;
    items: itemsType[];                      // changed: always array
    slug?: string;                            // added: readable URL slug
}

//items refers to the products
export interface itemsType {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    colors: string;
    sizes: string[];
    fabric: string;
    fabric_composition: string;
    category: string;
    collection_id: string;

}

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {

    const BASE_URL = import.meta.env.VITE_BASE_COLLECTION_URL;

    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    const [collections, setCollections] = useState<CollectionsList[]>([])    
    const [items, setItems] = useState<itemsType[]>([]);                   

    const bridalProducts = items.filter(item => item.category === 'bridal'); 
    const boutiqueProducts = items.filter(item => item.category === 'boutique');

    // Use case-insensitive `includes` to match "Bridal", "Bridal Suite", "bridal" etc.
    const bridalCollections = collections.filter(col => col.is_active && (col.suite_name ?? "").toLowerCase().includes("bridal"));
    const boutiqueCollections = collections.filter(col => col.is_active && (col.suite_name ?? "").toLowerCase().includes("boutique"));

    useEffect(() => {
        getCollections();
        getItems();
       
    }, []);

    const getCollections = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.1.162:8000/api/v1/collections/')
            // attach slug to each collection for routes
            const withSlugs: CollectionsList[] = (response.data || []).map((col: CollectionsList) => ({
              ...col,
              slug: slugify(col.name),
            }));
            setCollections(withSlugs);
            console.log("Collections\n", withSlugs);
            
        } catch (error: any) { 
            setError("Failed to fetch collections");
            console.error(error);
            
        }finally{
            setIsLoading(false);
        }

    }

    const getItems = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.1.162:8000/api/v1/items/')
            setItems(response.data);
            console.log("Items\n",response.data);
            
        } catch (error: any) {
            setError("Failed to fetch items");
            console.error(error);
            
        }finally{
            setIsLoading(false);
        }

    }

    const slugify = (s: string) =>
      s
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "") // remove non-word chars
        .replace(/\s+/g, "-"); // replace spaces with hyphens

return (
    <CollectionContext.Provider value={{ collections,items, bridalProducts, boutiqueProducts, bridalCollections, boutiqueCollections, isLoading, error }}>
        {children}
    </CollectionContext.Provider>
)
}

export const useCollection = () => {
    const context = useContext(CollectionContext);
    if (context === undefined) {
        throw new Error('useCollection must be used within a CollectionProvider');
    }
    return context;
}