"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Calendar, Clock, FileText, Grid, List, Plus, Search, Settings, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ROUTES } from "src/lib/routes"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  // Mock data for recent lesson plans
  const recentLessonPlans = [
    {
      id: 1,
      title: "Photosynthesis Process",
      subject: "Science",
      grade: "Grade 6",
      date: "2 days ago",
      status: "completed",
    },
    {
      id: 2,
      title: "Introduction to Fractions",
      subject: "Mathematics",
      grade: "Grade 3",
      date: "1 week ago",
      status: "completed",
    },
    {
      id: 3,
      title: "World War II Overview",
      subject: "History",
      grade: "Grade 8",
      date: "2 weeks ago",
      status: "draft",
    },
  ]

  // Mock data for upcoming lessons
  const upcomingLessons = [
    { id: 1, title: "Cell Structure and Function", date: "Tomorrow, 9:00 AM", class: "Biology 101" },
    { id: 2, title: "Algebraic Expressions", date: "Wed, 10:30 AM", class: "Math 202" },
  ]

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="mx-auto py-4 px-6 text-2xl font-bold">
          Home
        </div>
      </div>
      <main className="container mx-auto py-8 px-4">
        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-emerald-600" />
                  Lesson Plan
                </CardTitle>
                <CardDescription>Create detailed lesson plans with objectives and activities</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <Image src="/icons/lessonplan.svg" alt="Lesson Plan" width={100} height={100} className="opacity-90" />
              </CardContent>
              <CardFooter>
                <Link href={ROUTES.DASHBOARD_CREATE} className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Lesson Plan
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 hover:shadow-md transition-shadow opacity-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Worksheet
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full ml-2">Coming Soon</span>
                </CardTitle>
                <CardDescription>Generate custom worksheets and assessments</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <Image src="/icons/worksheet.svg" alt="Worksheet" width={100} height={100} className="opacity-90" />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" disabled>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Worksheet
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100 hover:shadow-md transition-shadow opacity-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Grid className="h-5 w-5 text-purple-600" />
                  Unit Plan
                  <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full ml-2">Coming Soon</span>
                </CardTitle>
                <CardDescription>Design comprehensive unit plans for your curriculum</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <Image src="/icons/unit-plan.svg" alt="Unit Plan" width={100} height={100} className="opacity-90" />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" disabled>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Unit Plan
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Dashboard Content */}
        <section>
          <Tabs defaultValue="recent" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-white">
                <TabsTrigger value="recent" className="data-[state=active]:bg-slate-100">
                  Recent Plans
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-slate-100">
                  Upcoming Lessons
                </TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-slate-100">
                  Stats
                </TabsTrigger>
              </TabsList>
              <div className="hidden md:flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <List className="mr-2 h-4 w-4" />
                  List
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Grid className="mr-2 h-4 w-4" />
                  Grid
                </Button>
              </div>
            </div>

            <TabsContent value="recent" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-bold text-sm text-slate-500">Title</th>
                        <th className="text-left py-3 px-4 font-bold text-sm text-slate-500">Subject</th>
                        <th className="text-left py-3 px-4 font-bold text-sm text-slate-500">Grade</th>
                        <th className="text-left py-3 px-4 font-bold text-sm text-slate-500">Created</th>
                        <th className="text-left py-3 px-4 font-bold text-sm text-slate-500">Status</th>
                        <th className="text-left py-3 px-4 font-bold text-sm text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLessonPlans.map((plan) => (
                        <tr key={plan.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-emerald-600" />
                              <span className="font-medium">{plan.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{plan.subject}</td>
                          <td className="py-3 px-4 text-sm">{plan.grade}</td>
                          <td className="py-3 px-4 text-sm text-slate-500">{plan.date}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                plan.status === "completed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {plan.status === "completed" ? "Completed" : "Draft"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Star className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="py-3 px-4 bg-slate-50 border-t flex justify-between items-center">
                  <span className="text-sm text-slate-500">Showing 3 of 3 lesson plans</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingLessons.map((lesson) => (
                  <Card key={lesson.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        {lesson.title}
                      </CardTitle>
                      <CardDescription>{lesson.class}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>{lesson.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        View Lesson
                      </Button>
                      <Button variant="outline" size="sm">
                        Mark Complete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                <Card className="border-dashed bg-slate-50">
                  <CardContent className="flex flex-col items-center justify-center h-40">
                    <p className="text-muted-foreground mb-4">No more upcoming lessons</p>
                    <Button variant="outline">
                      <Plus className="mr-2 h-4 w-4" />
                      Schedule Lesson
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Lesson Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">12</span>
                      <span className="text-sm text-emerald-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +3 this month
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Completed Lessons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">8</span>
                      <span className="text-sm text-emerald-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        75% completion rate
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Student Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">92%</span>
                      <span className="text-sm text-emerald-600 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +5% from last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Activity</CardTitle>
                  <CardDescription>Your lesson planning activity over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">Activity chart will appear here</p>
                    <Button variant="outline">Generate Report</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  )
}
