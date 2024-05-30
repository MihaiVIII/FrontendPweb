import { useAppSelector } from "@application/store";
import { ApiAddressFGetPageGetRequest, AddressAddDTO, AddressFApi, AddressUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { multiply } from "lodash";

/**
 * Use constants to identify mutations and queries.
 */
const getAddressesQueryKey = "getAddressesQuery";
const getAddressesbyIdQueryKey = "getAddressesbyIdQuery";
const getAddressQueryKey = "getAddressQuery";
const addAddressMutationKey = "addAddressMutation";
const deleteAddressMutationKey = "deleteAddressMutation";
const updateAddressMutationKey = "updateAddressMutation";

/**
 * Returns an object with the callbacks that can be used for the React Query API, in this case to manage the address API.
 */
export const useAddressesApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data from the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getAddresses = (page: ApiAddressFGetPageGetRequest) => new AddressFApi(config).apiAddressFGetPageGet(page); // Use the generated client code and adapt it.
    const getAddresesbyid = (page:ApiAddressFGetPageGetRequest) => new AddressFApi(config).apiAddressFGetByUserIdGet(page);
    const getAddress = (id: string) => new AddressFApi(config).apiAddressFGetByIdIdGet({ id });
    const addAddress = (address: AddressAddDTO) => new AddressFApi(config).apiAddressFAddPost({ addressAddDTO: address });
    const deleteAddress = (id: string) => new AddressFApi(config).apiAddressFDeleteIdDelete({ id });
    const updateAddress = (address: AddressUpdateDTO) => new AddressFApi(config).apiAddressFUpdatePut({ addressUpdateDTO: address });

    return {
        getAddresses: { // Return the query object.
            key: getAddressesQueryKey, // Add the key to identify the query.
            query: getAddresses // Add the query callback.
        },
        getAddress: {
            key: getAddressQueryKey,
            query: getAddress
        },
        addAddress: { // Return the mutation object.
            key: addAddressMutationKey, // Add the key to identify the mutation.
            mutation: addAddress // Add the mutation callback.
        },
        deleteAddress: {
            key: deleteAddressMutationKey,
            mutation: deleteAddress
        },
        updateAddress: {
            key: updateAddressMutationKey,
            mutation: updateAddress
        },
        getAddresesbyid: {
            key:  getAddressesbyIdQueryKey,
            query: getAddresesbyid
        }
    }
}