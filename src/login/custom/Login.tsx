import {Anchor, Button, Checkbox, Flex, LoadingOverlay, Paper, Text, TextInput} from "@mantine/core"
import {useI18n} from "../i18n.ts";
import {LanguageSelector} from "./LanguageSelector.tsx";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {AppTheme} from "../../MantineTheme.ts";
import {KcContext} from "keycloakify/login/KcContext";

const LOGO_URL = "https://cdn.prod.website-files.com/64070f604bcb37e0f7c95578/640a377dece1be7881e21133_accuras-Logo_2023-p-500.png"

export const Login = (props: { context: KcContext.Login }) => {

    const {i18n} = useI18n({kcContext: props.context});

    const [loading, setLoading] = useState(false);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
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

    return <Flex
        align={"center"}
        justify={"center"}
        style={{
            backgroundColor: "#f1f1f1",
            height: "100vh",
            width: "100vw"
        }}>

         <Paper
             pos={"relative"}
            radius={"sm"}
            w={360}
            p={"xl"}
            shadow={"xl"}>
             <LoadingOverlay
                 loaderProps={{
                     type: "dots"
                 }}
                 visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <div style={{
                position: "absolute",
                top: 12,
                right: 12
            }}>
                <LanguageSelector kcContext={props.context}/>
            </div>

            <Flex justify={"center"} mb={"xl"}>
                <img style={{maxWidth: 180}}
                     src={LOGO_URL}
                     alt="Logo"/>
            </Flex>
            <form
                method={"post"}
                action={props.context.url.loginAction}
                onSubmit={form.onSubmit(() => {
                    setLoading(true);
                })}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: AppTheme.spacing!.sm,
                }}>
                <TextInput
                    id={"username"}
                    name={"username"}
                    {...form.getInputProps('email')}
                    type={"email"}
                    label={i18n.msg("email")}
                    placeholder={i18n.msgStr("email")}/>

                <TextInput
                    id={"password"}
                    name={"password"}
                    {...form.getInputProps('password')}
                    type={"password"}
                    label={i18n.msg("password")}
                    placeholder={i18n.msgStr("password")}/>

                <Flex mb={"md"} justify={"space-between"} mt={"sm"}>
                    <Checkbox
                        id={"rememberMe"}
                        name={"rememberMe"}
                        defaultChecked={false}
                        {...form.getInputProps('rememberMe')}
                        label={i18n.msg("rememberMe")}/>
                    <Anchor href={props.context.url.loginResetCredentialsUrl}>
                        {i18n.msg("doForgotPassword")}
                    </Anchor>
                </Flex>


                {(props.context.messagesPerField.existsError("username")
                        || props.context.messagesPerField.existsError("password")) &&
                    <Flex justify={"center"}>
                        <Text c={"red"}>
                            {props.context.messagesPerField.getFirstError("username", "password")}
                        </Text>
                    </Flex>}
                <Button type={"submit"} mt={"md"}>
                    {i18n.msg("doLogIn")}
                </Button>
            </form>

            <Flex justify={"center"} gap={"xs"} mt={"md"}>
                <Text>
                    {i18n.msg("noAccount")}
                </Text>
                <Anchor href={props.context.url.registrationUrl}>
                    {i18n.msg("doRegister")}
                </Anchor>
            </Flex>

        </Paper>

    </Flex>


}