import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
//import { UserFilesPage } from "@presentation/pages/UserFilesPage";
import {ProductsPageAll } from "@presentation/pages/ProductsPageAll"
import { UsersPage } from "@presentation/pages/UsersPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";
import { SignupPage} from "presentation/pages/SignupPage";
import {ProducerProductsPage} from "@presentation/pages/ProducerProductsPage";
import {ProductsPage } from "@presentation/pages/ProductsPage"
import {CartPage} from "@presentation/pages/CartPage"
import {AdressesPage} from "@presentation/pages/AddresesPage"
import {FacturiPage} from "@presentation/pages/FacturiPage"

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const isProducer = useOwnUserHasRole(UserRoleEnum.Producer);
  const isClient = useOwnUserHasRole(UserRoleEnum.Client);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {/*isAdmin && <Route path={AppRoute.UserFiles} element={<UserFilesPage />} />*/}
        {isAdmin && <Route path={AppRoute.Products} element={<ProductsPageAll />} /> }
        <Route path={AppRoute.SignUp} element={<SignupPage />} />
        {isProducer && <Route path={AppRoute.PrucerProducts} element={<ProducerProductsPage/>} /> }
        {isClient && <Route path={AppRoute.ProductsStore} element={<ProductsPage/>} /> }
        {isClient && <Route path={AppRoute.Cart} element={<CartPage/>} /> }
        {isClient && <Route path={AppRoute.Addreses} element={<AdressesPage/>} /> }
        {isClient && <Route path={AppRoute.Facturi} element={<FacturiPage/>} /> }
      </Routes>
    </AppIntlProvider>
}
