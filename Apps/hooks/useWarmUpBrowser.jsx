import React from "react";
import * as WebBroswer from "expo-web-browser";


export const useWarmpUpBrowser = () => {

    React.useEffect(() => {
        void WebBroswer.warmUpAsync();
        return () => {
            void WebBroswer.coolDownAsync();
        };
    }, []);
}; 