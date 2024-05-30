import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    OutlinedInput,
    Select,
    MenuItem,
    TextareaAutosize
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useAddrmUpdateFormController } from "./AddrUpdateForm.controller";
import { isEmpty, isUndefined } from "lodash";
import { UserRoleEnum } from "@infrastructure/apis/client";

/**
 * Here we declare the user add form component.
 * This form may be used in modals so the onSubmit callback could close the modal on completion.
 */
export const AddrUpdateForm = (props: { onSubmit?: () => void,pid:String }) => {
    const { formatMessage } = useIntl();
    const { state, actions, computed } = useAddrmUpdateFormController(props.pid,props.onSubmit); // Use the address form controller

    return (
        <form onSubmit={actions.handleSubmit(actions.submit)}> {/* Wrap your form into a form tag and use the handle submit callback to validate the form and call the data submission. */}
            <Stack spacing={4} style={{ width: "100%" }}>
                <div>
                    <Grid container item direction="row" xs={12} columnSpacing={4}>
                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.city)}
                            >
                                <FormLabel >
                                    <FormattedMessage id="globals.city" />
                                </FormLabel>
                                <OutlinedInput
                                    {...actions.register("city")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.city",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText hidden={isUndefined(state.errors.city)}>
                                    {state.errors.city?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.street)}
                            >
                                <FormLabel >
                                    <FormattedMessage id="globals.street" />
                                </FormLabel>
                                <OutlinedInput
                                    {...actions.register("street")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.street",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText hidden={isUndefined(state.errors.street)}>
                                    {state.errors.street?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.sNumber)}
                            >
                                <FormLabel >
                                    <FormattedMessage id="globals.sNumber" />
                                </FormLabel>
                                <OutlinedInput
                                    type="number"
                                    {...actions.register("sNumber")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.sNumber",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText hidden={isUndefined(state.errors.sNumber)}>
                                    {state.errors.sNumber?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.scara)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.scara" />
                                </FormLabel>
                                <OutlinedInput
                                    type="number"
                                    {...actions.register("scara")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.scara",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText hidden={isUndefined(state.errors.scara)}>
                                    {state.errors.scara?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.bloc)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.bloc" />
                                </FormLabel>
                                <OutlinedInput
                                    type="number"
                                    {...actions.register("bloc")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.bloc",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText hidden={isUndefined(state.errors.bloc)}>
                                    {state.errors.bloc?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item direction="column" xs={6} md={6}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.apartament)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.appartament" />
                                </FormLabel>
                                <OutlinedInput
                                    type="number"
                                    {...actions.register("apartament")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.appartament",
                                            }),
                                        })}
                                    autoComplete="none"
                                />
                                <FormHelperText hidden={isUndefined(state.errors.apartament)}>
                                    {state.errors.apartament?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid container item direction="column" xs={12}>
                            <FormControl
                                fullWidth
                                error={!isUndefined(state.errors.description)}
                            >
                                <FormLabel>
                                    <FormattedMessage id="globals.description" />
                                </FormLabel>
                                <TextareaAutosize
                                    {...actions.register("description")}
                                    placeholder={formatMessage(
                                        { id: "globals.placeholders.textInput" },
                                        {
                                            fieldName: formatMessage({
                                                id: "globals.description",
                                            }),
                                        })}
                                    minRows={3}
                                    maxRows={5}
                                    style={{ width: "100%" }}
                                    maxLength={100} // Limit the input to 100 characters
                                />
                                <FormHelperText hidden={isUndefined(state.errors.description)}>
                                    {state.errors.description?.message}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row" xs={12} className="padding-top-sm">
                        <Grid container item direction="column" xs={12} md={7}></Grid>
                        <Grid container item direction="column" xs={5}>
                            <Button type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
                                {!computed.isSubmitting && <FormattedMessage id="globals.submit" />}
                                {computed.isSubmitting && <CircularProgress />}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Stack>
        </form>
    );
};