import { AddrUpdateFormController, AddrUpdateFormModel } from "./AddrUpdateForm.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { isUndefined } from "lodash";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query";
import { useAddressesApi } from "@infrastructure/apis/api-management";
import { useCallback } from "react";
import { UserRoleEnum } from "@infrastructure/apis/client";
import { SelectChangeEvent } from "@mui/material";
import { usePaginationController } from "../../ui/Tables/Pagination.controller";
/**
 * Use a function to return the default values of the form and the validation schema.
 * You can add other values as the default, for example when populating the form with data to update an entity in the backend.
 */
const getDefaultValues = (initialData?: AddrUpdateFormModel) => {
    const defaultValues = {
        city: null,
        street: null,
        sNumber: null,
        scara: null,
        bloc: null,
        apartament:null,
        description:null
    };

    if (!isUndefined(initialData)) {
        return {
            ...defaultValues,
            ...initialData,
        };
    }

    return defaultValues;
};

/**
 * Create a hook to get the validation schema.
 */
const useInitAddrUpdateForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object().shape({
        city: yup.string().nullable().default(defaultValues.city).transform((value, originalValue) => originalValue === "" ? null : value),
        street: yup.string().nullable().default(defaultValues.street).transform((value, originalValue) => originalValue === "" ? null : value),
        sNumber: yup.number().nullable().default(defaultValues.sNumber).transform((value, originalValue) => originalValue === "" ? null : value),
        scara: yup.number().nullable().default(defaultValues.scara).transform((value, originalValue) => originalValue === "" ? null : value),
        bloc: yup.number().nullable().default(defaultValues.bloc).transform((value, originalValue) => originalValue === "" ? null : value),
        apartament: yup.number().nullable().default(defaultValues.apartament).transform((value, originalValue) => originalValue === "" ? null : value),
        description: yup.string().nullable().default(defaultValues.description).transform((value, originalValue) => originalValue === "" ? null : value),
    });

    const resolver = yupResolver(schema);

    return { defaultValues, resolver };
}

/**
 * Create a controller hook for the form and return any data that is necessary for the form.
 */
export const useAddrmUpdateFormController = (pid:String,onSubmit?: () => void): AddrUpdateFormController => {
    const { defaultValues, resolver } = useInitAddrUpdateForm();
    const { updateAddress: { mutation, key: mutationKey }, getAddresesbyid: { key: queryKey } } = useAddressesApi();
   
    const { mutateAsync: update, status } = useMutation({
        mutationKey: [mutationKey], 
        mutationFn: mutation
    });
    const queryClient = useQueryClient();
    const submit = useCallback((data: AddrUpdateFormModel) => // Create a submit callback to send the form data to the backend.
        update({id:String(pid),...data}).then(() => {
            queryClient.invalidateQueries({ queryKey: [queryKey] }); // If the form submission succeeds then some other queries need to be refresh so invalidate them to do a refresh.

            if (onSubmit) {
                onSubmit();
            }
        }), [update, queryClient, queryKey]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<AddrUpdateFormModel>({ // Use the useForm hook to get callbacks and variables to work with the form.
        defaultValues, // Initialize the form with the default values.
        resolver // Add the validation resolver.
    });


    return {
        actions: { // Return any callbacks needed to interact with the form.
            handleSubmit, // Add the form submit handle.
            submit, // Add the submit handle that needs to be passed to the submit handle.
            register, // Add the variable register to bind the form fields in the UI with the form variables.
            watch, // Add a watch on the variables, this function can be used to watch changes on variables if it is needed in some locations.
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending" // Return if the form is still submitting or nit.
        },
        state: {
            errors // Return what errors have occurred when validating the form input.
        },
    }
}