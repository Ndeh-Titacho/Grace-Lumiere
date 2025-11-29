import { useContext,createContext, useState, useEffect } from "react"
import axios from "axios"

interface CollectionContextType {
    collections: CollectionsList | undefined;
    isLoading: boolean;
    error: string | null;
}

interface CollectionsList {
    id: string;
    name: string;
    description: string;
    image: string;
    is_active: boolean;
    display_order: number;
}

export const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {

    const BASE_URL = import.meta.env.VITE_BASE_COLLECTION_URL;

    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    const [collections, setCollections] = useState<CollectionsList | undefined>(undefined)

    useEffect(() => {
        getCollections();
    }, []);

    const getCollections = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.1.159:8000/api/v1/collections/')
            setCollections(response.data);
            console.log(response.data);
            
        } catch (error: any) {
            setError("Failed to fetch collections");
            console.error(error);
            
        }finally{
            setIsLoading(false);
        }

    }
 
return (
    <CollectionContext.Provider value={{ collections, isLoading, error }}>
        {children}
    </CollectionContext.Provider>
)
}
