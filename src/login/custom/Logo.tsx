import {useOrganizationContext} from "../../api/OrganizationContextProvider.tsx";


const LOGO_URL = "https://cdn.prod.website-files.com/64070f604bcb37e0f7c95578/640a377dece1be7881e21133_accuras-Logo_2023-p-500.png"

export const Logo = () => {

    const context = useOrganizationContext()

    return <img style={{maxWidth: 180}}
                src={context.organization !== null ? context.organization.theme.logo.default : LOGO_URL}
                alt="Logo"/>
}