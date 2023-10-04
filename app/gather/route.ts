import {WebClient} from '@slack/web-api'
import {kv} from '@vercel/kv'
import {NextResponse} from 'next/server'
import {env} from '../../env.mjs'

const slackClient = new WebClient(env.SLACK_BOT_TOKEN)

export async function GET() {
	const gatherUsersResponse = await fetch(`https://api.gather.town/api/v2/spaces/${env.GATHER_SPACE_ID}/users`, {
		headers: {
			Authorization: `Bearer ${env.GATHER_BEARER_TOKEN}`
		}
	})

	const now = Math.floor(Date.now() / 1000)

	if (gatherUsersResponse.status !== 200) {
		console.error(await gatherUsersResponse.text())
		return new NextResponse('error')
	}

	const gatherUsers = await gatherUsersResponse.json()

	const users = gatherUsers.map(user => ({
		name: user.name,
		online: now - user.lastVisited._seconds < 60 * 10
	}))

	console.log(users)

	const dbUsers = (await kv.get('users')) as {name: string; online: boolean}[]

	await kv.set('users', JSON.stringify(users))
	dbUsers.map(async user => {
		if (user.online !== users.find(u => u.name === user.name).online) {
			console.log(`@${user.name} is now ${users.find(u => u.name === user.name).online ? 'online' : 'offline'}`)
			await slackClient.chat.postMessage({
				channel: env.SLACK_CHANNEL_ID,
				text: `@${user.name} ${users.find(u => u.name === user.name).online ? 'just hopped on Rubric Island! :tada:' : 'just left Rubric Island :cry:'}`
			})
		}
	})

	return new NextResponse('ok')
}
