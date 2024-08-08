import { XCircleIcon } from "@heroicons/react/24/outline";

export default function InputError({ message, textSize="text-sm", iconSize="5", color="red-900", className = '', ...props }) {
    return message ? (
        <div {...props} className={"flex flex-row gap-1 items-center " + className}>
            <XCircleIcon className={"h-"+iconSize+" w-"+iconSize+" text-"+color}/>
            <p className={"text-"+textSize+" text-"+color}>
                {message}
            </p>
        </div>
    ) : null;
}
