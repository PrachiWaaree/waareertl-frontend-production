export const contactValidation = (value) => {
    const numberOnlyRegex = /^\d+$/;

    if (
        !numberOnlyRegex.test(value) ||
        value?.length > 10 ||
        value?.length <= 0
    ) {
        return false;
    }

    return true;
};
