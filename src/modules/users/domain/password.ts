interface Password {
    value(): string
    matches(password: Password): Promise<boolean>
}
