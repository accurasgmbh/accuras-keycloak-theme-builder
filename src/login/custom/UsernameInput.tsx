import {TextInput} from "@mantine/core";
import {KcContext} from "keycloakify/login/KcContext";
import {useI18n} from "../i18n.ts";
import {UseFormReturnType} from "@mantine/form";


export const UsernameInput = (props: {
    context: KcContext.Login,
    form: UseFormReturnType<any>
}) => {
    const {i18n} = useI18n({kcContext: props.context})

    return <>
        {props.context.realm.loginWithEmailAllowed ?
            <TextInput
                id={"username"}
                name={"username"}
                {...props.form.getInputProps('email')}
                type={"email"}
                label={i18n.msg("email")}
                placeholder={i18n.msgStr("email")}/>
            :
            <TextInput
                id={"username"}
                name={"username"}
                {...props.form.getInputProps('username')}
                label={i18n.msg("username")}
                placeholder={i18n.msgStr("username")}/>}
    </>
}