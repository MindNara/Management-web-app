var login = new Vue({
    el: '#login',
    data: {
        username: '',
        password: ''

        },
    methods: {
        checkLogin() {
            if(this.username == "" || this.password == ""){
                alert('Please enter all inputs')
                return
            }
            console.log("yes")
            window.location.replace("/Dashboard");
        }
    }
})