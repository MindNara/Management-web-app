var signup = new Vue({
    el: '#signup',
    data: {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        username: '',
        password: ''

        },
    methods: {
        checkSignup() {
            if(this.fname === "" || this.lname === "" || this.email === "" || this.phone === "" ||this.username === "" || this.password === ""){
                alert('Please enter all inputs');
                return
            }
            console.log("yes")
            window.location.replace("./Dashboard.html");
        }
    }
})