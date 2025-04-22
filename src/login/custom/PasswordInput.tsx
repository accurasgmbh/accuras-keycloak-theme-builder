import {TextInput} from "@mantine/core";
import {KcContext} from "keycloakify/login/KcContext";
import {useI18n} from "../i18n.ts";
import {UseFormReturnType} from "@mantine/form";


export const PasswordInput = (props: {
    context: KcContext.Login,
    form: UseFormReturnType<any>
}) => {
    const {i18n} = useI18n({kcContext: props.context})
    return <TextInput
        id={"password"}
        name={"password"}
        {...props.form.getInputProps('password')}
        type={"password"}
        label={i18n.msg("password")}
        placeholder={i18n.msgStr("password")}/>
}