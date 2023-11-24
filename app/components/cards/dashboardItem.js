export default function DashboardItem ({ children, title, details, className }) {
    return (
        <div className={className+' flex gap-2 shadow-md p-2'}>
            {children}
            <div className="">
                <p className="text-md">{title.toUpperCase()}</p>
                <p className="font-bold">{details}</p>
            </div>
        </div>
    )
}