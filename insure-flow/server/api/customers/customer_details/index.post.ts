import { INewCustomer } from "~~/server/types/customers/customer_profile.types"





export default defineEventHandler(async (event)=>{
    try{

        const body = await readBody(event) as INewCustomer


// customer details service need to create 






    }catch(err:unknown){
        if(err instanceof Error){
            const statusCode = "statusCode" in err ? Number(err.statusCode):500

            return handleErrorCatch(statusCode , err.message)
        }
    }


    return handleErrorCatch(500 , "Internal Server Error")
})