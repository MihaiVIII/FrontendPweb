import { useAppSelector } from "@application/store";
import { ApiItemsGetPageGetRequest, ItemAddDTO,ItemAdminAddDTO, ItemsApi, ItemUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { Mutation } from "@tanstack/react-query";

/**
 * Use constants to identify mutations and queries.
 */
const getItemsQueryKey = "getItemsQuery";
const getItemQueryKey = "getItemQuery";
const addItemMutationKey = "addItemMutation";
const deleteItemMutationKey = "deleteItemMutation";
const AdminaddItemMutationKey = "AdminaddItemMutationKey";
const updateItemMutationKey = "updateItemMutationKey";
/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useProdApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getItems = (page: ApiItemsGetPageGetRequest) => new ItemsApi(config).apiItemsGetPageGet(page); // Use the generated client code and adapt it.
    const getItem = (id: string) => new ItemsApi(config).apiItemsGetByIdIdGet({ id });
    const addItem = (Item: ItemAddDTO) => new ItemsApi(config).apiItemsAddPost({ itemAddDTO: Item });
    const AdminaddItem = (Item: ItemAdminAddDTO) => new ItemsApi(config).apiItemsAddAdminPost({ itemAdminAddDTO: Item });
    const deleteItem = (id: string) => new ItemsApi(config).apiItemsDeleteIdDelete({ id });
    const updateItem = (item:ItemUpdateDTO) =>new ItemsApi(config).apiItemsUpdatePut({itemUpdateDTO:item})

    return {
        getItems: { // Return the query object.
            key: getItemsQueryKey, // Add the key to identify the query.
            queryItems: getItems // Add the query callback.
        },
        getItem: {
            key: getItemQueryKey,
            queryItems: getItem
        },
        addItem: { // Return the mutation object.
            key: addItemMutationKey, // Add the key to identify the mutation.
            mutation: addItem // Add the mutation callback.
        },
        AdminaddItem:{
            key: AdminaddItemMutationKey,
            mutation: AdminaddItem
        },
        deleteItem: {
            key: deleteItemMutationKey,
            mutation: deleteItem
        },
        updateItem: {
            key: updateItemMutationKey,
            mutation: updateItem
        }
    }
}