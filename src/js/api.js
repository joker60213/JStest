const URL = 'https://api.github.com/';
const USER_PER_PAGE = 5;

export class Api {
    
async loadUsers (value, page) {
   return await fetch (`${URL}search/users?q=${value}&per_page=${USER_PER_PAGE}&page=${page}`)

}
}


//не знаю как подключить 

/* const URL = 'https://api.github.com/';
const USER_PER_PAGE = 5;

export class Api {
    
    async loadUsers (value, page) {
        const response = await fetch(`${URL}search/users?q=${value}&per_page=${USER_PER_PAGE}&page=${page}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    }
} */