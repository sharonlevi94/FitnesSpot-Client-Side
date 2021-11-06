export default {
    users: state =>{
        let usersFiltered = state.users.filter(user => user.id != window.user.uid)
        return usersFiltered
    }
}