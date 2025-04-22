import {KcContext} from "keycloakify/login/KcContext";
import {Anchor, Flex, Text} from "@mantine/core";
import {useI18n} from "../i18n.ts";


export const Registration = (props: { context: KcContext.Login }) => {

    const {i18n} = useI18n({
        kcContext: props.context
    })

    return props.context.realm.registrationAllowed ?
        <Flex justify={"center"} gap={"xs"} mt={"md"}>
            <Text size={"sm"}>
                {i18n.msg("noAccount")}
            </Text>
            <Anchor
                size={"sm"}
                href={props.context.url.registrationUrl}>
                {i18n.msg("doRegister")}
            </Anchor>
        </Flex> : null
}