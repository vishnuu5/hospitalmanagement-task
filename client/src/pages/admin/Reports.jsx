
import { useState } from "react"
import DashboardShell from "../../components/DashboardShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Activity, Download, Printer } from "lucide-react"

function ReportsPage() {
    const [timeRange, setTimeRange] = useState("month")

    return (
        <DashboardShell userType="admin">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <div className="flex items-center gap-2">
                    <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="week">Last Week</SelectItem>
                            <SelectItem value="month">Last Month</SelectItem>
                            <SelectItem value="quarter">Last Quarter</SelectItem>
                            <SelectItem value="year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            <div className="mt-4">
                <Tabs defaultValue="financial">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="financial">Financial</TabsTrigger>
                        <TabsTrigger value="patients">Patient Statistics</TabsTrigger>
                        <TabsTrigger value="staff">Staff Performance</TabsTrigger>
                        <TabsTrigger value="operations">Operations</TabsTrigger>
                    </TabsList>

                    <TabsContent value="financial" className="mt-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Revenue Overview</CardTitle>
                                    <CardDescription>Total revenue breakdown by department</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Revenue chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Top Revenue Sources</CardTitle>
                                    <CardDescription>Highest revenue generating services</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Revenue sources chart would be displayed here
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Expenses</CardTitle>
                                    <CardDescription>Monthly expenses breakdown</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Expenses chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Financial Trends</CardTitle>
                                    <CardDescription>Revenue vs Expenses over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Financial trends chart would be displayed here
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="patients" className="mt-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Patient Demographics</CardTitle>
                                    <CardDescription>Age and gender distribution of patients</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Demographics chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Admission Trends</CardTitle>
                                    <CardDescription>Patient admissions over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Admissions chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Common Conditions</CardTitle>
                                    <CardDescription>Most frequent patient conditions</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Conditions chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Patient Satisfaction</CardTitle>
                                    <CardDescription>Patient satisfaction scores by department</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Satisfaction chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="staff" className="mt-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Staff Performance</CardTitle>
                                    <CardDescription>Performance metrics by department</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Performance chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Staff Attendance</CardTitle>
                                    <CardDescription>Attendance and leave statistics</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Attendance chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Department Workload</CardTitle>
                                    <CardDescription>Patient to staff ratio by department</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Workload chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="operations" className="mt-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Bed Occupancy</CardTitle>
                                    <CardDescription>Bed occupancy rates by department</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Occupancy chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Average Length of Stay</CardTitle>
                                    <CardDescription>Average patient stay duration</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">Length of stay chart would be displayed here</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Resource Utilization</CardTitle>
                                    <CardDescription>Equipment and resource usage</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Resource utilization chart would be displayed here
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Procedure Efficiency</CardTitle>
                                    <CardDescription>Average time for common procedures</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] flex items-center justify-center">
                                        <div className="text-center">
                                            <Activity className="mx-auto h-16 w-16 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                Procedure efficiency chart would be displayed here
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardShell>
    )
}

export default ReportsPage

