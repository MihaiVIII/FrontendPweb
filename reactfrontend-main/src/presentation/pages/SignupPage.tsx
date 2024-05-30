import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { UserAddForm } from "@presentation/components/forms/Register/UserRegisterForm";

export const SignupPage = memo(() => {
    return <Fragment>
        <Seo title="MobyLab Web App | Sign Up" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <UserAddForm/>
            </Box>
        </WebsiteLayout>
    </Fragment>
});
