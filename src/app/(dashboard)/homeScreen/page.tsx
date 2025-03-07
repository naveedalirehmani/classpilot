import React from 'react'

import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/dashboard/app-sidebar'
type Props = {}

function page({}: Props) {
  return (
    <div>

<SidebarProvider>
      <AppSidebar />
    </SidebarProvider>

    </div>
  )
}

export default page