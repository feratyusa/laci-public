export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={"w-ful " + className}>
            {value ? value : children}
        </label>
    );
}
