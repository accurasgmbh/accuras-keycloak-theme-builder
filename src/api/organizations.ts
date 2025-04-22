export interface Organization {
    id: string,
    theme: {
        primaryColor: string,
        defaultMode: "light" | "dark" | "system",
        logo: {
            default: string
        }
    }
}


export const organizations = {
    api: {
        getOrganization: async (organizationId: string): Promise<Organization> => {
            const response = await fetch("/api/organizations");
            if (!response.ok) {
                throw new Error("Failed to fetch organizations");
            }
            return await response.json() as Organization;
        }
    }
}