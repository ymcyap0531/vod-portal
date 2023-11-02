import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export const requireAuthentication = (gssp: GetServerSideProps) => {
  return async (context: GetServerSidePropsContext) => {
    const jwt = parseCookies(context).jwt;
    const valid = parseCookies(context).valid;
    const myHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    };

    var tokens = jwt.split(".");
    const { id, iat, exp } = JSON.parse(atob(tokens[1]));

    const expDate = parseInt(valid) - 1 * 2 * 60 * 1000 < Date.now();
    if (!jwt) {
      return {
        redirect: {
          permanent: false,
          destination: "/SignInForm",
        },
      };
    } else if (typeof valid === "undefined" || expDate) {
      setCookie(context, "valid", `${Date.now() + 2 * 60 * 60 * 1000}`, {
        maxAge: 60 * 60,
        path: "/",
      });
      const userDetails = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users?filters[id][$eq]=${id}`,
        {
          headers: myHeaders,
        }
      );
      if (userDetails.data[0].blocked) {
        destroyCookie(context, jwt);
        return {
          redirect: {
            permanent: false,
            destination: "/SignInForm",
          },
        };
      }
    }

    return await gssp(context);
  };
};
