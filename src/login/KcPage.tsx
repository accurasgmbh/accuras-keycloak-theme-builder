import {Suspense, lazy} from "react";
import type {ClassKey} from "keycloakify/login";
import {useI18n} from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import {Login} from "./custom/Login.tsx";
import {MantineProvider} from "@mantine/core";
import {KcContext} from "keycloakify/login/KcContext";
import {AppTheme} from "../MantineTheme.ts";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

// core styles are required for all packages
import '@mantine/core/styles.css';
import {OrganizationContextProvider} from "../api/OrganizationContextProvider.tsx";
import {MapBackground} from "./custom/MapBackground.tsx";

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const {kcContext} = props;

    const {i18n} = useI18n({kcContext});

    return <>
        <MapBackground/>
        <MantineProvider theme={AppTheme}>
            <OrganizationContextProvider kcContext={kcContext as KcContext.Login}>

                <Suspense>
                    {(() => {
                        switch (kcContext.pageId) {
                            case "login.ftl":
                                return <Login/>
                            default:
                                return (
                                    <DefaultPage
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classes}
                                        Template={Template}
                                        doUseDefaultCss={true}
                                        UserProfileFormFields={UserProfileFormFields}
                                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                    />
                                );
                        }
                    })()}
                </Suspense>
            </OrganizationContextProvider>

        </MantineProvider>
    </>
}

const classes = {} satisfies { [key in ClassKey]?: string };
