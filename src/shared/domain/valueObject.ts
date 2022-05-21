export abstract class ValueObject<T> {
    props: T

    protected constructor(props: T) {
        this.props = props
        Object.freeze(props)
    }

    equals(value: ValueObject<T>) {
        return JSON.stringify(this.props) === JSON.stringify(value.props)
    }
}
