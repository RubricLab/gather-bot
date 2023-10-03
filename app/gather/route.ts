import {kv} from '@vercel/kv'
import {NextResponse} from 'next/server'

export async function GET() {
	const dbUsers = await kv.get('users')

	console.log(dbUsers)

	const gatherUsers = await fetch(`https://api.gather.town/api/v2/spaces/${env.GATHER_SPACE_ID}/users`)

	console.log(gatherUsers)

	return new NextResponse('ok')
}
