import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//
import { contactValidation } from "./common";

const returnObject = (schema = {}, defaultValues = {}) => {
    return {
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    };
};

export const enquiryFormSchema = (values) => {
    const schema = yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email().required("Email is required"),
        contact: yup.string().test("Contact is invalid", contactValidation),
        enquiry: yup.string().required("Enquiry is required"),
        consent: yup.boolean().oneOf([true], "Consent is required"),
    });

    return returnObject(schema, values);
};
