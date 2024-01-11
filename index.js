const http = require('http');
const { randomUUID } = require('crypto');

const server = http.createServer((request, response) => {
	const users = [];
	if(request.url === "/"){
		if(request.method === "GET"){
			return response.end('Chegamos ao usuário');
		}
	}

	if(request.url === "/users"){
		if(request.method === "POST"){
			request.on("data", (data) => {
				const dataUser = JSON.parse(data);
				const user = {
					id: randomUUID(),
					...dataUser
				}

				users.push(user);
			}).on("end", () => {
				return response.end(JSON.stringify(users));
			});
		}
	}
});

server.listen(3000, () => {
	console.log('O servidor está rodando na porta 3000!');
});