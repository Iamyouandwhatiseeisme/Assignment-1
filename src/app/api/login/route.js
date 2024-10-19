// app/api/login/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { username, password } = await request.json();
    console.log('sending request', 1)

    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.refreshToken) {
        const res = NextResponse.json(data);
        res.headers.set('Set-Cookie', `refreshToken=${data.refreshToken}; Path=/; HttpOnly; SameSite=Strict`);
        return res; 
    }

    return NextResponse.redirect('/'); 
}