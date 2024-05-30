import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/material";
import { Seo } from "@presentation/components/ui/Seo";
import { LoginForm } from "@presentation/components/forms/Login/LoginForm";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AppRoute } from 'routes';

export const LoginPage = memo(() => {
    return <Fragment>
        <Seo title="MobyLab Web App | Login" />
        <WebsiteLayout>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <LoginForm />
            </Box>
            <Box sx={{ padding: "0px 50px 0px 50px", justifyItems: "center" }}>
                <Button color="inherit">  {/* If the user is not logged in show a button that redirects to the login page. */}
                    <Link style={{ color: 'Blue' }} to={AppRoute.SignUp}>
                        Sign Up
                    </Link>
                </Button>
            </Box>
        </WebsiteLayout>
    </Fragment>
});
