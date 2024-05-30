import { useAppSelector } from "@application/store";
import {FacturiApi,FacturiDTOPagedResponse,FacturiAddDTO} from "../client"
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { Mutation } from "@tanstack/react-query";

/**
 * Use constants to identify mutations and queries.
 */
const getFacturiQueryKey = "getFacturiQuery";
const getFacturaCartQueryKey = "getFacturaCartQuery";
const addFacturaMutationKey = "addFacturaMutation";
const deleteFacturaMutationKey = "deleteFacturaMutationKey";
/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useFacturaApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getFactura = (id:string)=> new FacturiApi(config).apiFacturiGetByIdIdGet({id});
    const getUserFacturi = (page:FacturiDTOPagedResponse)=>new FacturiApi(config).apiFacturiGetFromUserIdGet(page);
    const addFactura = (factura:FacturiAddDTO)=>new FacturiApi(config).apiFacturiCreatePost({facturiAddDTO:factura});
    const deleteCart = (id: string) => new FacturiApi(config).apiFacturiCancelIdDelete({id});

    return {
        getFactura: { // Return the query object.
            key: getFacturiQueryKey, // Add the key to identify the query.
            query: getFactura // Add the query callback.
        },
        getUserFacturi: {
            key: getFacturaCartQueryKey,
            query: getUserFacturi
        },
        addFactura:{
            key: addFacturaMutationKey,
            mutation: addFactura
        },
        deleteCart: {
            key: deleteFacturaMutationKey,
            mutation: deleteCart
        }
    }
}