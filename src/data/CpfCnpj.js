/**
 * Brazilian CPF (National Person Registration Number) data.
 */
export default class CpfCnpj{
    /**
     * Checks if the given CPF is valid (mod 11 checksum). If all digits are the same
     * (g.e. 11111111111), then CPF is invalid.
     *
     * @param {string} cpf the CPF
     * @returns {boolean} true if the CPF is valid, false otherwise
     */
    static isValidCpf(cpf) {
        let weights = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        if (cpf.length !== 11 || areAllTheSameChar(cpf)) return false;
        const dig1 = mod11(weights.reduce((sum, weight, i) => sum + (cpf[i] * weight), 0));
        weights.unshift(11);
        const dig2 = mod11(weights.reduce((sum, weight, i) => sum + (cpf[i] * weight), 0));
        return cpf.slice(10, 12) === dig1.toString().concat(dig2.toString());
    };
    /**
     * Checks if the given CNPJ is valid (mod 11 checksum). If all digits are the same
     * (g.e. 1111111111111), then CNPJ is invalid.
     *
     * @param {string} cnpj the CNPJ
     * @returns {boolean} true if the CNPJ is valid, false otherwise
     */
    static isValidCnpj(cnpj) {
        let weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        if (cnpj.length !== 14 || areAllTheSameChar(cnpj)) return false;
        const dig1 = mod11(weights.reduce((sum, weight, i) => sum + (cnpj[i] * weight), 0));
        weights.unshift(6);
        const dig2 = mod11(weights.reduce((sum, weight, i) => sum + (cnpj[i] * weight), 0));
        return cnpj.slice(12, 14) === dig1.toString().concat(dig2.toString());
    };
}

/**
 * Checks if all the characters of the given string are the same.
 * @param {string} string the string to be tested
 * @returns {boolean} true is all the characters of the string are the same, false otherwise.
 */
const areAllTheSameChar = (string) => {
    return string == null ? false : string.split('').every(char => char === string[0]);
};

const mod11 = (total) => {
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
};