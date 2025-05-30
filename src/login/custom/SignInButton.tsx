import {Button} from "@mantine/core";
import {useI18n} from "../i18n.ts";
import {KcContext} from "keycloakify/login/KcContext";


export const SignInButton = (props: {
    context: KcContext.Login
}) => {
    const {i18n} = useI18n({kcContext: props.context})
    return<Button type={"submit"} mt={"md"} color={"accuras"}>
        {i18n.msg("doLogIn")}
    </Button>
}