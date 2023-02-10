import { rest } from 'msw'
import { accounts } from './data'

export const handlers = [
  rest.get('https://base.api/user/:email', (req, res, ctx) => {
    const email = req.params.email as string
    const account = accounts.find((account) => account.email.toLowerCase() === email.toLowerCase())


    if (!account) {
      return res(ctx.delay(), ctx.status(404))
    }

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        id: account.id,
        email: account.email,
        active: "1",
        scope: "guest",
        registration_date: new Date().toISOString(),
      }))

  }),


  rest.get('https://base.api/user', (req, res, ctx) => {

    const page = Number(req.url.searchParams.get('page')) || 1
    const searchParams = req.url.searchParams.get('q') as string
    const results = searchParams ? accounts.filter((item) => item.email.toLowerCase().includes(searchParams.toLowerCase())) : accounts

    const start = (page - 1) * 40
    const end = start + 40
    const pageResults = results.slice(start, end)

    return res(
      ctx.delay(),
      ctx.status(200),
      ctx.json({
        max_results: results.length,
        accounts: pageResults,
      }),
    )

  })
]
