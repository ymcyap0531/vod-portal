This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## How to add and run new template

The templating system is built as dynamic as possible.

- Add a new folder in src/templates. I recommomend to duplicate an existing watchclassicsvod template.

- Name the folder exactly the same as the `brand.attributes.template` property.

- Run in port 3000(http://localhost:3000) to see the result of templates.

- Copy `.local-env-example` to `.env` and change the values of NEXT_PUBLIC_LOCAL_DOMAIN to `brand.attributes.domainName` of corresponding template.

## Steps creating new site for VOD 

0. cdn must be set up first on Daniel's end
1. Duplicate existing folder from portal\src\templates & rename it to the new domain
2. Update .env file NEXT_PUBLIC_LOCAL_DOMAIN to the new domain (ex: superclassics.tv)
3. C:\LPX\vod-portal\src\pages\SignUpForm\index.page.tsx -> add else if for new domain to configure product & campaign id
find this:
else if (hostName.endsWith("superclassics.tv") || hostName.startsWith("localhost")) {.....
4. adding new domain name in CMS ContentManager/Brand by pressing create new entry button, & edit the domain name, support email, metakeys, etc accordingly, save then publish button
5. adding images in AWS (classico-vod-all-media/img/(new domain folder)/..)
6. adding fetched images domain name in next.config.js (ex:"cdn.superclassics.tv")
7. in CMS > User, edit the domain of test userNR8CPz so it can enter the portal
8. in CMS > Special Category, add 3 new entries for Home page displayed movies (ex: Superclassics Popular)
9. To be able to see the displayed movies, AWS imgs, & beta.[domain name] Daniel needs to add the domain records at his end