import { WebsiteLayout } from "presentation/layouts/WebsiteLayout";
import { Fragment, memo } from "react";
import { Box } from "@mui/system";
import { Seo } from "@presentation/components/ui/Seo";
import { ContentCard } from "@presentation/components/ui/ContentCard";
import { ProductsTable3 } from "@presentation/components/ui/Tables/ProductsTable";

export const CartPage = memo(() => {
  return <Fragment>
    <Seo title="MobyLab Web App | Users" />
    <WebsiteLayout>
      <Box sx={{ padding: "0px 50px 00px 50px", justifyItems: "center" }}>
        <ContentCard>
          <ProductsTable3 />
        </ContentCard>
      </Box>
    </WebsiteLayout>
  </Fragment>
});
