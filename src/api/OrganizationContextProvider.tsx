import {createContext, useContext, useEffect, useState} from "react";
import {Organization, organizations} from "./organizations.ts";
import {KcContext} from "keycloakify/login/KcContext";
import {OrganizationLoginContext} from "../login/custom/Login.tsx";
import {Flex, Loader} from "@mantine/core";


const OrganizationContext = createContext<OrganizationLoginContext>({} as OrganizationLoginContext)

export const useOrganizationContext: () => OrganizationLoginContext = () => {
    const context = useContext(OrganizationContext)
    if (context === undefined) {
        throw new Error("useOrganizationContext must be used within a OrganizationProvider")
    }
    return context
}

export const OrganizationContextProvider = (props: {
    children: any,
    kcContext: KcContext.Login
}) => {

    const [organization, setOrganization] = useState<Organization | null | undefined>(undefined)

    useEffect(() => {
        if (props.kcContext.client.attributes["organizationId"]) {
            console.log("getOrganization", props.kcContext.client.attributes["organizationId"])
            organizations.api.getOrganization(props.kcContext.client.attributes["organizationId"])
                .then(setOrganization)
                .catch(() => setOrganization(null))
        } else {
            setOrganization(null)
        }

    }, [props.kcContext]);

    return organization === undefined ? <Flex align={"center"}
                                              h={"100vh"}
                                              style={{
                                                  backdropFilter: "blur(4px)"
                                              }}
                                              justify={"center"}>
        <Loader type={"dots"}/>
    </Flex> : <OrganizationContext.Provider value={{...props.kcContext, organization}}>
        {props.children}
    </OrganizationContext.Provider>

}