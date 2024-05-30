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

export type ItemUpdateFormModel = {
    name: string;
    price: number;
    quantity: number;
};

export type ItemUpdateFormState = {
    errors: FieldErrorsImpl<DeepRequired<ItemUpdateFormModel>>;
};

export type ItemUpdateFormActions = {
    register: UseFormRegister<ItemUpdateFormModel>;
    watch: UseFormWatch<ItemUpdateFormModel>;
    handleSubmit: UseFormHandleSubmit<ItemUpdateFormModel>;
    submit: (body: ItemUpdateFormModel) => void;
};
export type ItemUpdateFormComputed = {
    defaultValues: ItemUpdateFormModel,
    isSubmitting: boolean
};

export type ItemUpdateFormController = FormController<ItemUpdateFormState, ItemUpdateFormActions, ItemUpdateFormComputed>;