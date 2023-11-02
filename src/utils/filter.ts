import { BrandConfigs, Brands } from "../types";
// import { FormItem } from "components/FormRenderer/types";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
// import { FormRenderSettings } from "utils/schemas/types";

export const validSubDomains = [
  'www',
  'beta'
];

export const wrapTags = (content: string, dynamicText: any) => {
  var finalString = content;
  var current = 0;
  current = content?.indexOf("#");
  while (current < content?.length) {
    var next = content.indexOf("#", current + 1);
    if (next == -1) return finalString;

    var tokenValue = "";
    var token = content.substring(current + 1, next);
    switch (token) {
      case "domain_name":
        tokenValue = dynamicText.domain_name;
        break;

      case "user_email":
        tokenValue = dynamicText.user_email;
        break;

      case "support_email":
        tokenValue = dynamicText.support_email;
        break;

      case "support_number":
        tokenValue = dynamicText.support_number;
        break;

      case "domain":
        tokenValue = dynamicText.domain;
        break;

      case "trial_days":
        tokenValue = dynamicText.trial_days;
        break;

      case "trial_amount":
        tokenValue = dynamicText.trial_amount;
        break;

      case "membership_days":
        tokenValue = dynamicText.membership_days;
        break;

      case "membership_amount":
        tokenValue = dynamicText.membership_amount;
        break;

      case "fallback_days":
        tokenValue = dynamicText.fallback_days;
        break;

      case "fallback_amount":
        tokenValue = dynamicText.fallback_amount;
        break;

      case "currency":
        tokenValue = dynamicText.currency;
        break;

      case "currencySymbol":
        tokenValue = dynamicText.currencySymbol;
        break;
        
      case "address":
          tokenValue = dynamicText.brand.attributes.address;
        break;
      default:
        break;
    }
    if (tokenValue != "") {
      finalString = finalString.replace("#" + token + "#", tokenValue);
    }
    current = next;
  }
  return finalString;
};

const removeSubdomains = (hostName: string, brandConfigs: BrandConfigs) => {
  // @ts-ignore
  const countryCodes = brandConfigs.map(item => item.attributes.country_code);
  // @ts-ignore
  const allSubdomains = [...new Set([...validSubDomains, ...countryCodes])];
  
  for (const subdomain of allSubdomains) {
    hostName = hostName.replace(subdomain + ".", "");
  }
  return hostName;
};

const filterBrandsByHostName = (brands: Brands, hostName: string, brandConfigs: BrandConfigs) => {
  const finalHostName = removeSubdomains(hostName, brandConfigs);
  
  return brands.data.filter((brand) => {
    if (brand.attributes.domainName === finalHostName) {
      return true;
    } else if (finalHostName === "localhost:3000" || finalHostName === "localhost") {
      return brand.attributes.domainName === process.env.NEXT_PUBLIC_LOCAL_DOMAIN;
    }
    return false;
  });
};

export const getTemplate = (brands: Brands, hostName: string, brandConfigs: BrandConfigs) => {
  const matchingBrands = filterBrandsByHostName(brands, hostName, brandConfigs);

  return matchingBrands[0]?.attributes.template;
};

export const getBrand = (brands: Brands, hostName: string, brandConfigs: BrandConfigs) => {
  const matchingBrands = filterBrandsByHostName(brands, hostName, brandConfigs);

  return matchingBrands[0];
};

export const generateFormElements = (
  fields: any,
  register: UseFormRegister<any>,
  settings?: any
): any => {
  const elements: {
    fieldName: string;
    input: UseFormRegisterReturn<string>;
    fieldRule: { label: string; type: any; minLength?: any; maxLength?: any };
  }[] = [];

  const subElements: {
    fieldName: string;
    input: UseFormRegisterReturn<string>;
    fieldRule: { label: string; type: any; minLength: any; maxLength: any };
  }[] = [];
  fields.map((field: string) => {
    if (Array.isArray(field)) {
      {
        field.map((field, index) => {
          subElements.push({
            fieldName: field.item,
            input: register(field.item),
            fieldRule: {
              label: field,
              type: settings[field.item]?.type || "text",
              minLength: settings[field.item]?.minLength,
              maxLength: settings[field.item]?.maxLength,
            },
          });
        }),
          //@ts-ignore
          elements.push(subElements);
      }
    } else if (field === "checkbox1" || field === "checkbox2") {
      elements.push({
        fieldName: field,
        input: register(field),
        fieldRule: {
          label: field,
          type: settings[field]?.type,
        },
      });
    } else {
      elements.push({
        fieldName: field,
        input: register(field),
        fieldRule: {
          label: field,
          type: settings[field]?.type || "text",
          minLength: settings[field]?.minLength,
          maxLength: settings[field]?.maxLength,
        },
      });
    }
  });
  return elements;
};
