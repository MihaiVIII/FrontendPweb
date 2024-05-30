import { useAppSelector } from "@application/store";
import {ApiSCartGetPageGetRequest,SCartApi,ItemDTO} from "../client"
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { Mutation } from "@tanstack/react-query";

/**
 * Use constants to identify mutations and queries.
 */
const getCartQueryKey = "getCartQuery";
const getUserCartQueryKey = "getUserCartQuery";
const getCartItemsQuerryKey = "getCartItemsQuerry";
const addCartMutationKey = "addCartMutation";
const addTocartMutationKey = "addTocartMutation";
const removefromcartMutationKey = "removefromcartMutation";
const deleteCartMutationKey = "deleteCartMutationKey";
/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useCartApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getCart = (id:string)=> new SCartApi(config).apiSCartGetByIdIdGet({id});
    const getUserCart = (id:string)=>new SCartApi(config).apiSCartGetByUserIdIdGet({id});
    const getCartItems = (page:ApiSCartGetPageGetRequest)=>new SCartApi(config).apiSCartGetPageGet(page);
    const addCart = ()=>new SCartApi(config).apiSCartAddPost();
    const addTocart = (Item: ItemDTO)=> new SCartApi(config).apiSCartAddItemToCartPut({itemDTO:Item})
    const removefromcart = (Item: ItemDTO)=> new SCartApi(config).apiSCartRemoveItemToCartPut({itemDTO:Item})
    const deleteCart = (id: string) => new SCartApi(config).apiSCartDeleteIdDelete({id});

    return {
        getCart: { // Return the query object.
            key: getCartQueryKey, // Add the key to identify the query.
            query: getCart // Add the query callback.
        },
        getUserCart: {
            key: getUserCartQueryKey,
            query: getUserCart
        },
        getCartItems: { // Return the mutation object.
            key: getCartItemsQuerryKey, // Add the key to identify the mutation.
            query: getCartItems // Add the mutation callback.
        },
        addCart:{
            key: addCartMutationKey,
            mutation: addCart
        },
        addTocart: {
            key: addTocartMutationKey,
            mutation: addTocart
        },
        removefromcart: {
            key: removefromcartMutationKey,
            mutation: removefromcart
        }
    }
}