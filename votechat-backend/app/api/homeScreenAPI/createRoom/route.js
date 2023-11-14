import { connectMongoDB } from "../../../../lib/mongodb"
import Salas from "../../../../models/salas"
import { NextResponse } from "next/server"

export async function POST(req) {
    const authorizationHeader = req.headers.get('authorization');

    const res = verifyToken(authorizationHeader)

    try {
        const { roomName, roomDescription } = await req.json()
        await connectMongoDB()
        const createdRoom = await Salas.create({ name: roomName, description: roomDescription, members: { id_user: res.id } })
        return NextResponse.json({ message: "Sala registrada.", data: createdRoom }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { message: "Ocorreu um erro ao registrar a sala." },
            { status: 500 }
        )
    }
}