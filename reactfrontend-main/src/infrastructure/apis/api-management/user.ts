import { useAppSelector } from "@application/store";
import { ApiUserGetPageGetRequest, instanceOfUserDTORequestResponse, UserAddDTO, UserApi, UserUpdateDTO } from "../client";
import { getAuthenticationConfiguration } from "@infrastructure/utils/userUtils";
import { multiply } from "lodash";

/**
 * Use constants to identify mutations and queries.
 */
const getUsersQueryKey = "getUsersQuery";
const getUserQueryKey = "getUserQuery";
const addUserMutationKey = "addUserMutation";
const deleteUserMutationKey = "deleteUserMutation";
const updateUserMutationKey = "updateUserMutation";

/**
 * Returns the an object with the callbacks that can be used for the React Query API, in this case to manage the user API.
 */
export const useUserApi = () => {
    const { token } = useAppSelector(x => x.profileReducer); // You can use the data form the Redux storage. 
    const config = getAuthenticationConfiguration(token); // Use the token to configure the authentication header.

    const getUsers = (page: ApiUserGetPageGetRequest) => new UserApi(config).apiUserGetPageGet(page); // Use the generated client code and adapt it.
    const getUser = (id: string) => new UserApi(config).apiUserGetByIdIdGet({ id });
    const addUser = (user: UserAddDTO) => new UserApi(config).apiUserAddPost({ userAddDTO: user });
    const deleteUser = (id: string) => new UserApi(config).apiUserDeleteIdDelete({ id });
    const updateUser = (user: UserUpdateDTO) => new UserApi(config).apiUserUpdatePut({userUpdateDTO:user})

    return {
        getUsers: { // Return the query object.
            key: getUsersQueryKey, // Add the key to identify the query.
            query: getUsers // Add the query callback.
        },
        getUser: {
            key: getUserQueryKey,
            query: getUser
        },
        addUser: { // Return the mutation object.
            key: addUserMutationKey, // Add the key to identify the mutation.
            mutation: addUser // Add the mutation callback.
        },
        deleteUser: {
            key: deleteUserMutationKey,
            mutation: deleteUser
        },
        updateUser:{
            key: updateUserMutationKey,
            mutation: updateUser
        }
    }
}