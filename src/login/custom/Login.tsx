import {em, Flex, LoadingOverlay, Paper} from "@mantine/core"
import {LanguageSelector} from "./LanguageSelector.tsx";
import {useState} from "react";
import {useForm, UseFormReturnType} from "@mantine/form";
import {AppTheme} from "../../MantineTheme.ts";
import {KcContext} from "keycloakify/login/KcContext";

import 'mapbox-gl/dist/mapbox-gl.css';
import {Registration} from "./Registration.tsx";
import {Message} from "./Message.tsx";
import {RememberMe} from "./RememberMe.tsx";
import {ForgotPassword} from "./ForgotPassword.tsx";
import {SignInButton} from "./SignInButton.tsx";
import {PasswordInput} from "./PasswordInput.tsx";
import {UsernameInput} from "./UsernameInput.tsx";
import {Logo} from "./Logo.tsx";
import {useMediaQuery} from "@mantine/hooks";
import {Organization} from "../../api/organizations.ts";
import {useOrganizationContext} from "../../api/OrganizationContextProvider.tsx";

export interface OrganizationLoginContext extends KcContext.Login {
    organization: Organization | null
}

export const MobileLogin = (props: {
    loading: boolean,
    setLoading: (value: boolean) => void,
    context: OrganizationLoginContext,
    form: UseFormReturnType<any>
}) => {


    return <Flex direction={"column"}
                 p={"sm"}
                 style={{
                     backgroundColor: "white",
                     borderBottom: "1x solid rgba(0,0,0,0.1)"
                 }}
                 pb={2 * Number.parseFloat(AppTheme.spacing!.xl!)}
                 align={"stretch"}>


        <Flex justify={"end"} mb={"xl"}>
            <LanguageSelector kcContext={props.context}/>
        </Flex>

        <Flex justify={"center"}>
            <Logo/>
        </Flex>
        <Flex p={"lg"} justify={"center"} direction={"column"}>
            <form
                method={"post"}
                action={props.context.url.loginAction}
                onSubmit={props.form.onSubmit(() => {
                    props.setLoading(true);
                })}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: AppTheme.spacing!.sm,
                }}>

                <UsernameInput context={props.context} form={props.form}/>

                <PasswordInput context={props.context} form={props.form}/>

                <Flex justify={"space-between"}>
                    <RememberMe form={props.form} context={props.context}/>
                    <ForgotPassword context={props.context}/>
                </Flex>

                <Message context={props.context}/>

                <SignInButton context={props.context}/>

            </form>

        </Flex>

        <Registration context={props.context}/>


    </Flex>

}

export const DesktopLogin = (props: {
    loading: boolean,
    setLoading: (value: boolean) => void,
    context: OrganizationLoginContext,
    form: UseFormReturnType<any>
}) => {

    return <>
        <div
            style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                height: "100vh",
                width: "100vw",
                backdropFilter: "blur(5px)"
            }}>


            <div style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2,
            }}>
                <LanguageSelector kcContext={props.context}/>
            </div>

            <Paper
                pos={"relative"}
                radius={"sm"}
                w={360}
                p={"xl"}
                style={{
                    zIndex: 2,
                }}
                shadow={"xl"}>
                <LoadingOverlay
                    loaderProps={{
                        type: "dots"
                    }}
                    visible={props.loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>


                <Flex justify={"center"} mb={"xl"}>
                    <Logo/>
                </Flex>
                <form
                    method={"post"}
                    action={props.context.url.loginAction}
                    onSubmit={props.form.onSubmit(() => {
                        props.setLoading(true);
                    })}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: AppTheme.spacing!.sm,
                    }}>

                    <UsernameInput context={props.context} form={props.form}/>

                    <PasswordInput context={props.context} form={props.form}/>

                    <Flex justify={"space-between"}>
                        <RememberMe form={props.form} context={props.context}/>
                        <ForgotPassword context={props.context}/>
                    </Flex>

                    <Message context={props.context}/>

                    <SignInButton context={props.context}/>

                </form>

                <Registration context={props.context}/>

            </Paper>

        </div>

    </>

}

export const Login = () => {

    const context = useOrganizationContext();
    const [loading, setLoading] = useState(false);
    const isMobile = useMediaQuery(`(max-width: ${em(400)})`);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: context.login.username ?? "",
            email: context.login.username ?? "",
            password: '',
            rememberMe: false,
        },
        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            // Passwords requires some basic criteria
            password: (value: string) => {
                if (value.length < 8) {
                    return "Password is at least 8 characters long"
                }
                return null;
            }
        },
    });


    return isMobile ? <MobileLogin
            loading={loading}
            setLoading={setLoading}
            form={form}
            context={context}/>
        : <DesktopLogin
            loading={loading}
            setLoading={setLoading}
            form={form}
            context={context}/>
}