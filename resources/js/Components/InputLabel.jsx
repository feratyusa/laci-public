export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={"w-full " + className}>
            {value ? value : children}
        </label>
    );
}
