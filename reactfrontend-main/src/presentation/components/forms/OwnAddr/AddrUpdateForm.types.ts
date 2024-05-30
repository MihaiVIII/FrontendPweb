import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { UserDTOPagedResponse } from "@infrastructure/apis/client";

export type AddrUpdateFormModel = {
    city: string | null;
    street: string | null;
    sNumber: number | null;
    scara: number | null;
    bloc:number | null;
    apartament:number | null;
    description:string | null;
};

export type AddrUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<AddrUpdateFormModel>>;
};

export type AddrUpdateFormActions = {
    register: UseFormRegister<AddrUpdateFormModel>;
    watch: UseFormWatch<AddrUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<AddrUpdateFormModel>;
    submit: (body: AddrUpdateFormModel) => void;
};
export type AddrUpdateFormComputed = {
    defaultValues: AddrUpdateFormModel,
    isSubmitting: boolean
};

export type AddrUpdateFormController = FormController<AddrUpdateFormState, AddrUpdateFormActions, AddrUpdateFormComputed>;