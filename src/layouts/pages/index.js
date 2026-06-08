"use client";
/* eslint-disable no-unused-vars */
import { CommonContextProvider } from "@/contexts";
import { CommonFooter, CommonHeader, WhatsAppFloat } from "@/components";

export const PagesLayout = ({
    sectionsData,
    headerData,
    footerData,
    children,
    otherData,
    whatssAppConfig,
}) => {
    const whatsappConfig = otherData?.whatsapp || {
        phoneNumber: "+918097155300",
        message: "Hello! I'm interested in your services.",
        position: "bottom-right",
        tooltip: "Chat With Us",
        enabled: true,
    };

    return (
        <>
            <CommonContextProvider {...otherData}>
                <CommonHeader data={headerData} />

                {children}

                <CommonFooter data={footerData} />

                {whatsappConfig.enabled && (
                    <WhatsAppFloat
                        // phoneNumber={whatsappConfig.phoneNumber}
                        // message={whatsappConfig.message}
                        // position={whatsappConfig.position}
                        // tooltip={whatsappConfig.tooltip}
                        whatssAppConfig={whatssAppConfig}
                    />
                )}
            </CommonContextProvider>
        </>
    );
};
