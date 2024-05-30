import { useTableController } from "../Table.controller";
import { useAddressesApi,useCartApi,useFacturaApi } from "@infrastructure/apis/api-management";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { usePaginationController } from "../Pagination.controller";
import { useAppSelector } from "@application/store";
import { useRouteId } from "react-router/dist/lib/hooks";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";

/**
 * This is controller hook manages the table state including the pagination and data retrieval from the backend.
 */
export const useUserTableController = () => {
    const { userId: ownUserId } = useAppSelector(x => x.profileReducer);
    const { getAddresesbyid: { key: queryKey, query }, deleteAddress: { key: deleteAddressKey, mutation: deleteAddress } } = useAddressesApi(); // Use the API hook.
    const queryClient = useQueryClient(); // Get the query client.
    const { page, pageSize, setPagination } = usePaginationController(); // Get the pagination state.
    const { data, isError, isLoading } = useQuery({
        queryKey: [queryKey, page, pageSize],
        queryFn: () => query({search:String(ownUserId) ,page, pageSize },)
    }); // Retrieve the table page from the backend via the query hook.
    const { mutateAsync: deleteMutation } = useMutation({
        mutationKey: [deleteAddressKey],
        mutationFn: deleteAddress
    }); // Use a mutation to remove an entry.
    const remove = useCallback(
        (id: string) => deleteMutation(id).then(() => queryClient.invalidateQueries({ queryKey: [queryKey] })),
        [queryClient, deleteMutation, queryKey]); // Create the callback to remove an entry.

    const tryReload = useCallback(
        () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
        [queryClient, queryKey]); // Create a callback to try reloading the data for the table via query invalidation.

    const tableController = useTableController(setPagination, data?.response?.pageSize); // Adapt the pagination for the table.
    
    const { getUserCart: { key: queryKey2, query:getUserCart } } = useCartApi(); // Use the API hook.
    const {data:dataCart} = useQuery({
        queryKey: [queryKey2, page, pageSize],
        queryFn: () => getUserCart(String(ownUserId))
    });
    
    const { addFactura: { key: addFacturaMutationKey, mutation:addFacturaMutation } } = useFacturaApi(); // Use the API hook.
    
    const { mutateAsync: CreateFacturaMutation } = useMutation({
        mutationKey: [addFacturaMutationKey],
        mutationFn: addFacturaMutation
    });
    const { redirectToHome } = useAppRouter();

    const AddFactura = useCallback(
        (id:String) => CreateFacturaMutation({idAdd:String(id),cartId:dataCart?.response?.id,userId:String(ownUserId)})
        .then(()=>redirectToHome()),
        [CreateFacturaMutation,dataCart,ownUserId,redirectToHome]); 

    return { // Return the controller state and actions.
        ...tableController,
        tryReload,
        pagedData: data?.response,
        isError,
        isLoading,
        remove,
        AddFactura
    };
}