// @ts-nocheck
import React, { useEffect } from "react";

const QuantCast = () => {
  useEffect(() => {
    const r = document.getElementById("quantcast");
    const sfl1 = document.createElement("script");
    sfl1.type = "text/javascript";
    sfl1.charset = "ISO-8859-1";
    sfl1.src =
      (document.location.protocol == "https:"
        ? "https://secure"
        : "http://edge") + ".quantserve.com/quant.js";
    sfl1.id = "script";
    if (r?.parentElement?.children.length === 1) {
      r?.parentElement?.insertBefore(sfl1, r.nextSibling);
    }
  }, []);

  let objcnt = 0;
  const flto = setInterval(function () {
    objcnt++;

    if (typeof document.getElementById("script") !== "undefined") {
      window._qevents?.push({
        qacct: "p-3ePDUSL_L-Bhc",
        uid: "__INSERT_EMAIL_HERE__",
      });
      clearInterval(flto);
    }
    if (objcnt > 4) {
      clearInterval(flto);
    }
  }, 400);

  return (
    <div>
      <div id="quantcast" className="hidden"></div>
    </div>
  );
};

export default QuantCast;
