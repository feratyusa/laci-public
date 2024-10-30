export default function LinkWord({route, children, className=''}){
    return(
        <a href={route} className={`capitalize underline text-red-500 ${className}`}>{children}</a>
    )
}