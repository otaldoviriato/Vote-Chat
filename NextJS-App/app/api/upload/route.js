import { writeFile } from 'fs/promises'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { connectMongoDB } from '../../../lib/mongodb'
import Fotos from "../../../models/fotos";



export async function POST(request) {
  const session = await getServerSession(authOptions)
  const id = session?.user?.id

  const data = await request.formData()
  const file = data.get('file')
  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const directory = `./public`

  const pathMongoDB = `/fotos/${Date.now()+file.name}`
  const path = directory + pathMongoDB

  await writeFile(path, buffer)

  await connectMongoDB()
  await Fotos.create({ path: pathMongoDB, user: id, active: true })
  
  return NextResponse.json({"message": "file uploaded", success: true })
}