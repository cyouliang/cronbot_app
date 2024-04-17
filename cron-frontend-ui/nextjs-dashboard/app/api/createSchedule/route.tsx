import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const { name, username, email, date } = await req.json();
        console.log("serving_person: ", name);
        console.log("serving_username: ", username);
        console.log("email: ", email);
        console.log("date: ", date);
        const client = await clientPromise;
        const db = client.db("cronbot");
        const service_schedule = await db
            .collection("service_schedule")
            .insertOne({
                date: date,
                serving_person: name,
                serving_username: username,
                email: email,
            });
        return NextResponse.json(service_schedule);
    } catch (e) {
        console.error(e);
    }
}