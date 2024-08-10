import logo from "@/assets/logo.png"

export default function ApplicationLogo({className="h-5 w-5", ...props}) {
    return (
        <img src={logo} alt="brand" className={className} />
    );
}
