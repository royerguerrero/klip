export type Country = {
  code: string;
  name: string;
  flag: string;
  prefix: string;
  documentTypes: {
    value: string;
    label: string;
  }[];
}

export const countries = new Map<string, Country>([
  [
    "AR",
    {
      code: "AR",
      name: "Argentina",
      flag: "https://flagcdn.com/ar.svg",
      prefix: "+54",
      documentTypes: [
        { value: "dni", label: "DNI" },
        { value: "passport", label: "Pasaporte" },
        { value: "le", label: "Libreta de Enrolamiento" },
        { value: "lc", label: "Libreta Cívica" },
      ],
    },
  ],
  [
    "BO",
    {
      code: "BO",
      name: "Bolivia",
      flag: "https://flagcdn.com/bo.svg",
      prefix: "+591",
      documentTypes: [
        { value: "ci", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "CL",
    {
      code: "CL",
      name: "Chile",
      flag: "https://flagcdn.com/cl.svg",
      prefix: "+56",
      documentTypes: [
        { value: "rut", label: "RUT" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "CO",
    {
      code: "CO",
      name: "Colombia",
      flag: "https://flagcdn.com/co.svg",
      prefix: "+57",
      documentTypes: [
        { value: "cc", label: "Cédula de Ciudadanía" },
        { value: "ce", label: "Cédula de Extranjería" },
        { value: "passport", label: "Pasaporte" },
        { value: "ti", label: "Tarjeta de Identidad" },
      ],
    },
  ],
  [
    "CR",
    {
      code: "CR",
      name: "Costa Rica",
      flag: "https://flagcdn.com/cr.svg",
      prefix: "+506",
      documentTypes: [
        { value: "dni", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "CU",
    {
      code: "CU",
      name: "Cuba",
      flag: "https://flagcdn.com/cu.svg",
      prefix: "+53",
      documentTypes: [
        { value: "ci", label: "Carné de Identidad" },
        { value: "passport", label: "Pasaporte" },
      ],
    },
  ],
  [
    "DO",
    {
      code: "DO",
      name: "República Dominicana",
      flag: "https://flagcdn.com/do.svg",
      prefix: "+1",
      documentTypes: [
        { value: "cedula", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "EC",
    {
      code: "EC",
      name: "Ecuador",
      flag: "https://flagcdn.com/ec.svg",
      prefix: "+593",
      documentTypes: [
        { value: "cedula", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "SV",
    {
      code: "SV",
      name: "El Salvador",
      flag: "https://flagcdn.com/sv.svg",
      prefix: "+503",
      documentTypes: [
        { value: "dui", label: "DUI" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "ES",
    {
      code: "ES",
      name: "España",
      flag: "https://flagcdn.com/es.svg",
      prefix: "+34",
      documentTypes: [
        { value: "dni", label: "DNI" },
        { value: "nie", label: "NIE" },
        { value: "passport", label: "Pasaporte" },
      ],
    },
  ],
  [
    "GT",
    {
      code: "GT",
      name: "Guatemala",
      flag: "https://flagcdn.com/gt.svg",
      prefix: "+502",
      documentTypes: [
        { value: "dpi", label: "DPI" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "HN",
    {
      code: "HN",
      name: "Honduras",
      flag: "https://flagcdn.com/hn.svg",
      prefix: "+504",
      documentTypes: [
        { value: "dni", label: "DNI" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "MX",
    {
      code: "MX",
      name: "México",
      flag: "https://flagcdn.com/mx.svg",
      prefix: "+52",
      documentTypes: [
        { value: "ine", label: "INE/IFE" },
        { value: "passport", label: "Pasaporte" },
        { value: "curp", label: "CURP" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "NI",
    {
      code: "NI",
      name: "Nicaragua",
      flag: "https://flagcdn.com/ni.svg",
      prefix: "+505",
      documentTypes: [
        { value: "cedula", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "PA",
    {
      code: "PA",
      name: "Panamá",
      flag: "https://flagcdn.com/pa.svg",
      prefix: "+507",
      documentTypes: [
        { value: "cedula", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "PY",
    {
      code: "PY",
      name: "Paraguay",
      flag: "https://flagcdn.com/py.svg",
      prefix: "+595",
      documentTypes: [
        { value: "ci", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "PE",
    {
      code: "PE",
      name: "Perú",
      flag: "https://flagcdn.com/pe.svg",
      prefix: "+51",
      documentTypes: [
        { value: "dni", label: "DNI" },
        { value: "ce", label: "Carné de Extranjería" },
        { value: "passport", label: "Pasaporte" },
        { value: "ruc", label: "RUC" },
      ],
    },
  ],
  [
    "PR",
    {
      code: "PR",
      name: "Puerto Rico",
      flag: "https://flagcdn.com/pr.svg",
      prefix: "+1",
      documentTypes: [
        { value: "ssn", label: "Social Security Number" },
        { value: "passport", label: "Pasaporte" },
        { value: "drivers_license", label: "Licencia de Conducir" },
      ],
    },
  ],
  [
    "UY",
    {
      code: "UY",
      name: "Uruguay",
      flag: "https://flagcdn.com/uy.svg",
      prefix: "+598",
      documentTypes: [
        { value: "ci", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "VE",
    {
      code: "VE",
      name: "Venezuela",
      flag: "https://flagcdn.com/ve.svg",
      prefix: "+58",
      documentTypes: [
        { value: "cedula", label: "Cédula de Identidad" },
        { value: "passport", label: "Pasaporte" },
        { value: "ce", label: "Carné de Extranjería" },
      ],
    },
  ],
  [
    "US",
    {
      code: "US",
      name: "Estados Unidos",
      flag: "https://flagcdn.com/us.svg",
      prefix: "+1",
      documentTypes: [
        { value: "ssn", label: "Social Security Number" },
        { value: "passport", label: "Pasaporte" },
        { value: "drivers_license", label: "Licencia de Conducir" },
        { value: "state_id", label: "Identificación Estatal" },
      ],
    },
  ],
]);