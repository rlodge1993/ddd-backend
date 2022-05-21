type GuardResult = string | null

export class Guard {
    static againstNullOrUndefined(input: any, inputType = 'Value'): GuardResult {
        if ((input === null) || (input === undefined)) {
            return `${inputType} is null or undefined`
        }
        return null
    }
}
