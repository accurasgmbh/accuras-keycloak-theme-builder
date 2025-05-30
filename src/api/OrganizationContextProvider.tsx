import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { KcContext } from "keycloakify/login/KcContext";
import { OrganizationLoginContext } from "../login/custom/Login.tsx";
import { Flex, Loader, MantineColorsTuple, MantineProvider } from "@mantine/core";
import { AppTheme } from "../MantineTheme.ts";
import { generateColorsMap } from "@mantine/colors-generator";
import { AccurasClient, Organization } from "@accurasgmbh/client";
import Color, { ColorInstance } from "color";
import { MantineColorShade } from "@mantine/core";

const OrganizationContext = createContext<OrganizationLoginContext>({} as OrganizationLoginContext);

export const useOrganizationContext: () => OrganizationLoginContext = () => {
    const context = useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error("useOrganizationContext must be used within a OrganizationProvider");
    }
    return context;
};

const accuras = new AccurasClient({
    basePaths: {
        links: "https://links.accuras.io",
        iam: "https://iam.accuras.io"
    }
});

export const OrganizationContextProvider = (props: {
    children: ReactNode,
    kcContext: KcContext.Login
}) => {

    const [organization, setOrganization] = useState<Organization | null | undefined>(undefined);
    const [colorMap, setColorMap] = useState<{
        baseColorIndex: number;
        colors: ColorInstance[];
    }>({
        baseColorIndex: 5,
        colors: AppTheme.colors!.accuras!.map(color => Color(color))
    });

    useEffect(() => {
        if (props.kcContext.client.attributes["organizationId"]) {
            accuras.iam.organizations
                .getOrganizationById(props.kcContext.client.attributes["organizationId"])
                .then(response => response.data)
                .then(setOrganization)
                .catch(() => setOrganization(null));
        } else {
            setOrganization(null);
        }

    }, [props.kcContext]);

    useEffect(() => {
        if (organization) {
            setColorMap(generateColorsMap(organization.theme?.palette?.primary?.main ?? AppTheme.colors!.accuras![9]));

        } else {
            setColorMap({
                baseColorIndex: 5,
                colors: AppTheme.colors!.accuras!.map(color => Color(color))
            });
        }
    }, [organization]);

    return <MantineProvider
        defaultColorScheme={organization?.theme?.defaultMode ?? "light"}
        theme={{
            ...AppTheme,
            primaryShade: colorMap.baseColorIndex as MantineColorShade,
            colors: {
                ...AppTheme.colors,
                accuras: colorMap.colors.map(color => color.hex()) as unknown as MantineColorsTuple
            }
            // TODO custom color swatch based on organization's primary color
        }}>
        {
            organization === undefined ? <Flex align={"center"}
                                               h={"100vh"}
                                               style={{
                                                   // backdropFilter: "blur(4px)"
                                               }}
                                               justify={"center"}>
                    <Loader type={"dots"} />
                </Flex> :
                <OrganizationContext.Provider value={{ ...props.kcContext, organization }}>
                    {props.children}
                </OrganizationContext.Provider>
        }
    </MantineProvider>;

};