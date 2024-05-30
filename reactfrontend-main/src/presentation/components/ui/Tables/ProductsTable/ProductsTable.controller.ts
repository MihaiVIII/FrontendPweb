import { useTableController } from "../Table.controller";
import { useProdApi,useUserApi,useCartApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";
import { useAppSelector } from "@application/store";
import { ItemDTO } from "@infrastructure/apis/client";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useProdTableController = () => {
    const { getItems: { key: queryKey, queryItems }, deleteItem: { key: deleteProdKey, mutation: deleteItem } } = useProdApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize],
        queryFn: () => queryItems({ page, pageSize })
    }); // Retrieve the table page from the backend via the query hook.
    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteProdKey],
        mutationFn: deleteItem
    }); // Use a mutation to remove an entry.
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    const tableController = useTableController(setPagination, data?.response?.pageSize); // Adapt the pagination for the table.
    
    const { getUsers: { key: queryKey2, query }} = useUserApi(); 
    const { data:Userdata} = useQuery({
        queryKey: [queryKey2, page, pageSize],
        queryFn: () => query({ page, pageSize })
    }); // Retrieve the table page from the backend via the query hook.

    const combinedData = data?.response?.data?.map(
        x=> {
            const y = Userdata?.response?.data?.find(y=>y.id === x.userId);

            return {...x,producerName:y?String(y.name):""};
        } )

    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove,
        userData:Userdata?.response,
        combinedData
    };
}

export const useCartController = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const{getUserCart:{key: queryKey,query},addTocart:{key: addTocartMutationKey,mutation: addTocart },
    getCartItems:{key:getCartItemsQuerryKey,query:getCartItems},removefromcart:{key:removefromcartMutationKey,mutation:removefromcart}} = useCartApi();    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data} = useQuery({
        queryKey: [queryKey, page, pageSize],
        queryFn: () => query(String(ownUserId))
    }); // Retrieve the table page from the backend via the query hook.

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); 
    
    const { mutateAsync: addItemmutation } = useMutation({
            mutationKey: [addTocartMutationKey],
            mutationFn: addTocart
    });

    const { mutateAsync: removeItemmutation } = useMutation({
        mutationKey: [removefromcartMutationKey],
        mutationFn: removefromcart
});

    const { getItems: { key: queryKey2, queryItems }} = useProdApi(); 

    const Add = useCallback(
        (item: ItemDTO) => addItemmutation(item).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })
        .then(() => queryClient.invalidateQueries({ queryKey: [queryKey2] }))
        .then(() => queryClient.invalidateQueries({ queryKey: [getCartItemsQuerryKey] }))),
        [queryClient, addItemmutation, queryKey,queryKey2]); 

    const Remove = useCallback(
        (item: ItemDTO) => removeItemmutation(item).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })
        .then(() => queryClient.invalidateQueries({ queryKey: [queryKey2] }))
        .then(() => queryClient.invalidateQueries({ queryKey: [getCartItemsQuerryKey] }))),
        [queryClient, removeItemmutation, queryKey,queryKey2]); 


    const { data:ItemsData, isError, isLoading } = useQuery({
            queryKey: [getCartItemsQuerryKey, page, pageSize],
            queryFn: () => getCartItems({ page, pageSize })
        });
    const tableController = useTableController(setPagination, ItemsData?.response?.pageSize); // Adapt the pagination for the table.

    const { getUsers: { key: queryKey3, query:GetUsers }} = useUserApi(); 
    const { data:Userdata} = useQuery({
        queryKey: [queryKey3, page, pageSize],
        queryFn: () => GetUsers({ page, pageSize })
    }); // Retrieve the table page from the backend via the query hook.

    const combinedData = ItemsData?.response?.data?.map(
        x=> {
            const y = Userdata?.response?.data?.find(y=>y.id === x.userId);

            return {...x,producerName:y?String(y.name):""};
        } )

    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        Add,
        Remove,
        ItemsData: ItemsData?.response,
        combinedData
    };
}
