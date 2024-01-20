import {useEffect, useState} from "react";


export  function useHttpState<T>(process : Array<() => Promise<void | T>>) {
   let [loading, setLoading] = useState(false)

    useEffect(() => {
        http()
    }, [])

    async function http() {

        setLoading(true)

        await Promise.all(process.map(async (item) => await item()))

        setLoading(false)
    }



    return {
         loading,
        http
    }
}