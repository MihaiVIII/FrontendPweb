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

export type ItemAddFormModel = {
    name: string;
    price: number;
    quantity: number;
};

export type ItemAddFormState = {
    errors: FieldErrorsImpl<DeepRequired<ItemAddFormModel>>;
};

export type ItemAddFormActions = {
    register: UseFormRegister<ItemAddFormModel>;
    watch: UseFormWatch<ItemAddFormModel>;
    handleSubmit: UseFormHandleSubmit<ItemAddFormModel>;
    submit: (body: ItemAddFormModel) => void;
};
export type ItemAddFormComputed = {
    defaultValues: ItemAddFormModel,
    isSubmitting: boolean
};

export type ItemAddFormController = FormController<ItemAddFormState, ItemAddFormActions, ItemAddFormComputed>;