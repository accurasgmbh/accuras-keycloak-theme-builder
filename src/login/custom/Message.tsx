import {KcContext} from "keycloakify/login/KcContext";
import {Flex, Text} from "@mantine/core";


export const Message = (props : {context: KcContext.Login}) => {


    return <>

        {(props.context.messagesPerField.existsError("username")
                || props.context.messagesPerField.existsError("password")) &&
            <Flex justify={"center"}>
                <Text c={"red"} size={"sm"}>
                    {props.context.messagesPerField.getFirstError("username", "password")}
                </Text>
            </Flex>}

    </>
}