import { ContentResolver, FirstVisibleChildLayout } from 'cx/ui';
import { DocumentTitle, PureContainer, RedirectRoute, Route } from 'cx/widgets';
import About from './about';
import Widgets from './widgets';
import Pages from './pages';
import Dashboard from './dashboard';
import { CheckerLayout } from '../layout/CheckerLayout';
import SignIn from './pages/sign-in';
import { SandboxedRoute } from '../components/SandboxedRoute';
import InvoiceRoutes from './invoices';
import { PageNotImplemented } from '../components/PageNotImplemented';
import Diagram from "./diagram";

export default () => (
    <cx>
        <FirstVisibleChildLayout>
            <Route route="~/pages" url-bind="url" prefix>
                <Pages />
            </Route>

            <SignIn visible-expr="!{user}" />

            <RedirectRoute route="~/" redirect="~/diagram" url-bind="url" />

            <CheckerLayout>

                <SandboxedRoute route="~/diagram">
                    <Diagram />
                </SandboxedRoute>

                <SandboxedRoute route="~/dashboard">
                    <Dashboard />
                </SandboxedRoute>
                <Route route="~/customers" url-bind="url" prefix>
                    <PageNotImplemented />
                </Route>
                <Route route="~/settings" url-bind="url" prefix>
                    <PageNotImplemented />
                </Route>
                <Route route="~/users" url-bind="url" prefix>
                    <PageNotImplemented />
                </Route>
                {InvoiceRoutes}
                <Route route="~/widgets" url-bind="url" prefix>
                    <Widgets />
                </Route>
                <Route route="~/about" url-bind="url">
                    <About />
                </Route>
            </CheckerLayout>
        </FirstVisibleChildLayout>

        <ContentResolver
            visible-expr="!!{user}"
            params={1}
            onResolve={() => import(/* webpackChunkName: "user-routes" */ './user').then((x) => x.default)}
        />
        <ContentResolver
            params={1}
            onResolve={() => import(/* webpackChunkName: "overlays" */ '../overlays').then((x) => x.default)}
        />
        <DocumentTitle append text="Demo App" separator=" | " />
    </cx>
);
