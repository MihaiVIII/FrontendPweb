import { UserRoleEnum } from "@infrastructure/apis/client";
import { FormController } from "../FormController";
import {
    UseFormHandleSubmit,
    UseFormRegister,
    FieldErrorsImpl,
    DeepRequired,
    UseFormWatch
} from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";

export type UserRegisterFormModel = {
    name: string;
    email: string;
    password: string;
    password2: string
    role: UserRoleEnum;
};

export type UserRegisterFormState = {
    errors: FieldErrorsImpl<DeepRequired<UserRegisterFormModel>>;
};

export type UserRegisterFormActions = {
    register: UseFormRegister<UserRegisterFormModel>;
    watch: UseFormWatch<UserRegisterFormModel>;
    handleSubmit: UseFormHandleSubmit<UserRegisterFormModel>;
    submit: (body: UserRegisterFormModel) => void;
    selectRole: (value: SelectChangeEvent<UserRoleEnum>) => void;
};
export type UserRegisterFormComputed = {
    defaultValues: UserRegisterFormModel,
    isSubmitting: boolean
};

export type UserRegisterFormController = FormController<UserRegisterFormState, UserRegisterFormActions, UserRegisterFormComputed>;