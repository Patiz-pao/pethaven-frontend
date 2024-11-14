import { Suspense } from 'react'
import EditProductForm from './EditProductForm'

interface PageProps {
  params: Promise<{ rowid: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <EditProductForm rowId={resolvedParams.rowid} />
    </Suspense>
  )
}