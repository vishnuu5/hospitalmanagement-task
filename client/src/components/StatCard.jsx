import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function StatCard({ title, value, description, icon: Icon, trend }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
                {trend && (
                    <div className="mt-2 flex items-center text-xs">
                        <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                        </span>
                        <span className="ml-1 text-muted-foreground">from last month</span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

