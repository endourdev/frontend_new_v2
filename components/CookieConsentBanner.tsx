import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="cookieConsent"
      style={{ background: "#2B373B", color: "#FFF" }}
      buttonStyle={{ backgroundColor: "#4CAF50", color: "#FFF", fontSize: "14px" }}
      declineButtonStyle={{ backgroundColor: "#f44336", color: "#FFF", fontSize: "14px" }}
      expires={365}
      onAccept={() => {
        console.log("Cookies accepted");
      }}
      onDecline={() => {
        console.log("Cookies declined");
      }}
    >
    </CookieConsent>
  );
};

export default CookieConsentBanner;