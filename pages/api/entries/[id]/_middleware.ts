import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose';

export function middleware(req: NextRequest, ev: NextFetchEvent){
    const id = req.page.params?.id
    if(!mongoose.isValidObjectId(req.page.params?.id)){
        return new Response(
            JSON.stringify({message: 'El id no es valido ' + id}),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
    return NextResponse.next();
}