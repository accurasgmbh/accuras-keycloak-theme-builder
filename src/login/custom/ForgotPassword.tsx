import {Anchor} from "@mantine/core";
import {KcContext} from "keycloakify/login/KcContext";
import {useI18n} from "../i18n.ts";


export const ForgotPassword = (props: {
    context: KcContext.Login
}) => {

    const {i18n} = useI18n({kcContext: props.context})

    return <>

        {props.context.realm.resetPasswordAllowed ? <Anchor

            mt={"sm"}
            mb={"md"}
            href={props.context.url.loginResetCredentialsUrl} size={"sm"}>
            {i18n.msg("doForgotPassword")}
        </Anchor> : null}
    </>
}