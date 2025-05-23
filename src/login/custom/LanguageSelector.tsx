import {useI18n} from "../i18n.ts";
import {Button} from "@mantine/core";
import {KcContext} from "keycloakify/login/KcContext";

import {IconCaretDownFilled} from '@tabler/icons-react';
import {AppTheme} from "../../MantineTheme.ts";

export const LanguageSelector = (props: {
    kcContext: KcContext
}) => {

    const {i18n} = useI18n({kcContext: props.kcContext})

    return <Button
        color={"rgba(0,0,0,0.5)"}
        leftSection={<IconCaretDownFilled size={AppTheme.spacing!.md}/>}
        variant={"subtle"}
        onClick={() => {
            i18n.currentLanguage = i18n.enabledLanguages
                .find(lng => lng.languageTag = (i18n.currentLanguage.languageTag === "de" ? "en" : "de"))!
        }}>
        {i18n.currentLanguage.label}
    </Button>

}