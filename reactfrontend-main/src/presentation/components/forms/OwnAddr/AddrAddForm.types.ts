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

export type AddrAddFormModel = {
    city: string;
    street: string;
    sNumber: number;
    scara: number | null;
    bloc:number | null;
    apartament:number | null;
    description:string | null;
};

export type AddrAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<AddrAddFormModel>>;
};

export type AddrAddFormActions = {
    register: UseFormRegister<AddrAddFormModel>;
    watch: UseFormWatch<AddrAddFormModel>;
    handleSubmit: UseFormHandleSubmit<AddrAddFormModel>;
    submit: (body: AddrAddFormModel) => void;
};
export type AddrAddFormComputed = {
    defaultValues: AddrAddFormModel,
    isSubmitting: boolean
};

export type AddrAddFormController = FormController<AddrAddFormState, AddrAddFormActions, AddrAddFormComputed>;