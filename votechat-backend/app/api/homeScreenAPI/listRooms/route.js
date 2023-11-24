import { connectMongoDB } from "../../../../lib/mongodb";
import Salas from "../../../../models/salas";
import { NextResponse } from "next/server";
import verifyToken from "../../verifyTokenFunction"

export async function POST(req) {
    try {
        //Descriptografa o Token
        const res = await verifyToken(req.headers.get('authorization'))

        //Busca os dados no MongoDB
        await connectMongoDB()
        const salasUsuario = await Salas.find({ 'members.id_user': res.id.id_user }).exec()

        //Devolve as informações como resposta da requisição
        return NextResponse.json(salasUsuario)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false });
    }
}