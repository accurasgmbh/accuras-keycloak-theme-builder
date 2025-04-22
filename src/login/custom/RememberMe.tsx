import {KcContext} from "keycloakify/login/KcContext";
import {Checkbox} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {useI18n} from "../i18n.ts";

export const RememberMe = (props: {
    form: UseFormReturnType<any>
    context: KcContext.Login
}) => {

    const {i18n} = useI18n({kcContext: props.context})

    return <>
        {props.context.realm.rememberMe ?
            <Checkbox
                mt={"sm"}
                mb={"md"}
                style={{
                    visibility: props.context.realm.rememberMe ? "visible" : "hidden"
                }}
                id={"rememberMe"}
                name={"rememberMe"}
                defaultChecked={false}
                {...props.form.getInputProps('rememberMe')}
                label={i18n.msg("rememberMe")}/> : null}

    </>

}