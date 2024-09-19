import React from "react";
import * as WebBrowser from "expo-web-browser";


export const useWarmpUpBrowser = () => {

    React.useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
}; 