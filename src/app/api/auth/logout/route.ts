import { NextResponse } from 'next/server'
import { clearSession } from '@/lib/auth'
import { logAudit, AuditActions } from '@/lib/audit'

export async function POST() {
  await clearSession()

  await logAudit({
    action: AuditActions.LOGOUT,
    path: '/api/auth/logout',
    ip: 'server-side',
    success: true,
  })

  return NextResponse.json({ success: true })
}
