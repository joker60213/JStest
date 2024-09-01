


export class Search {

    setCurrentPage (pageNumber) {
        this.currentPage = pageNumber;
    }

    setUsersCount (count) {
        this.usersCount = count;
    }

    constructor (view, api, log) {
        this.view = view;
        this.api = api;
        this.log = log;


        this.view.searchInput.addEventListener ('keyup', this.debounce(this.loadUsers.bind(this), 500));
        this.view.loadMoreBtn.addEventListener ('click', this.loadMoreUsers.bind(this));
        this.currentPage = 1;
        this.usersCount = 0;
    }

     loadUsers() {
        this.setCurrentPage(1);
        this.view.setCounterMessage('');
        if(this.view.searchInput.value) {
            this.clearUsers();
            this.usersRequest(this.view.searchInput.value);
        } else {
            this.clearUsers();
            this.view.toggleLoadMoreBtn(false);
        }
    }

    loadMoreUsers () {
        this.setCurrentPage (this.currentPage + 1);
        this.usersRequest(this.view.searchInput.value);
    }

    async usersRequest(searchValue) {
        let totalCount;
        let users;
        let message;

        //проверка на пустую строку
        if (!searchValue.trim()) {
            alert ('Поисковый запрос не может быть пустым');
            return;
        }

        //обновил без then
        try {
            const res = await this.api.loadUsers(searchValue, this.currentPage);
            const data = await res.json();
    
            users = data.items;
            totalCount = data.total_count;
            message = this.log.counterMessage(totalCount);

            this.setUsersCount(this.usersCount + data.items.length);
            this.view.setCounterMessage(message);
            this.view.toggleLoadMoreBtn(totalCount > 5 && this.usersCount !== totalCount);
            users.forEach(user => this.view.createUsers(user));
        } catch (e) {
            console.log('Ошибка при запросе к API GitHub: ' + e);
        }
    }

    clearUsers () {
        this.view.usersList.innerHTML = '';
    }

debounce (func, wait, immediate) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout (later, wait);
        if (callNow) func.apply(context, args);
    };
}

}