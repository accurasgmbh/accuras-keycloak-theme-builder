import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";

const MOBILE_WIDTH_THRESHOLD_EM = 460;

export const useIsMobile = () => useMediaQuery(`(max-width: ${em(MOBILE_WIDTH_THRESHOLD_EM)})`);