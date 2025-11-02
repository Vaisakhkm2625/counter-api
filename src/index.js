/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {

		const url = new URL(request.url);
		const params= url.searchParams;

		let return_value = {id:"", count:""};

		const id = params.get("id")

		console.log(request.method);
		console.log(params.get("id"));

		if(!params.get("id")) return new Response("require an id as query param", {status: 400});


		return_value = await fetch(env.TURSO_COUNT_DB_URL , {
			method: "POST",
			headers: {
				//Authorization: `Bearer ${authToken}`,
				Authorization: `Bearer ${env.TURSO_COUNT_DB_TOKEN}`,
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				requests: [
					{ type: "execute", stmt: {
						//sql: "insert into counters(id,value) values(?,1) on conflict(id) do update set value = value+1;",
						sql: "insert into counters(id,value) values(?,1) on conflict(id) do update set value = value+1 RETURNING id,value;",
						args: [{type: "text",value:id}]
					} },
					{ type: "close" },
				],
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				//console.log(JSON.stringify(data))
				//let rvalue = { id: data?.results[0]?.result?.rows[0]?.value, count: data?.results[0]?.result?.rows[1]?.value}
				let rvalue = { id: data.results[0].response.result.rows[0][0].value, count: data.results[0].response.result.rows[0][1].value}
				return rvalue;

			})
			.catch((err) => console.log(err));

		console.log(JSON.stringify(return_value));


		return new Response(JSON.stringify(return_value),{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",      // <- allow requests from any site
        "Access-Control-Allow-Methods": "GET",   // optional
      }
    });
	},
};
