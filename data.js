var app = new Vue({
    el: '#app',
    data: {
        diary: [
            {
                id: 0,
                title: "Enjoy time",
                date: "2022-08-21",
                image: 'https://cdn.wallpapersafari.com/21/58/FRetIc.jpg',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 1,
                title: "Enjoy with dog",
                date: "2022-08-22",
                image: 'https://swall.teahub.io/photos/small/200-2008148_360-x-400-pixels.jpg',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 2,
                title: "Eat all around",
                date: "2022-09-11",
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTszTyg3HCkUM68GIVP6Wqpp67IEjh1fcHuOA&usqp=CAU',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 3,
                title: "Enjoy to world",
                date: "2022-12-25",
                image: 'https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/rabbit-wallpaper-for-chromebook.jpg',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 4,
                title: "Bad Day",
                date: "2023-02-14",
                image: 'https://cdn.wallpapersafari.com/68/75/Bd0zb1.jpg',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 5,
                title: "Go To my world",
                date: "2022-04-28",
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcBCewEiFmXUWiXeeD0ksxRUchp8FabuPYlg&usqp=CAU',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            }
        ],
        task: [
            {
                "id": 1,
                "task_name": "Do homework",
                "start_date": "2023-01-01",
                "status": false,
                "due_date": "2023-01-02"
            },
            {
                "id": 2,
                "task_name": "Clean my room",
                "start_date": "2023-01-05",
                "status": false,
                "due_date": "2023-01-05"
            },
            {
                "id": 3,
                "task_name": "Read for exam",
                "start_date": "2023-01-02",
                "status": false,
                "due_date": "2023-01-10"
            },
            {
                "id": 4,
                "task_name": "Go to cafe",
                "start_date": "2023-01-05",
                "status": false,
                "due_date": "2023-01-06"
            },
            {
                "id": 5,
                "task_name": "Do project",
                "start_date": "2023-02-14",
                "status": false,
                "due_date": "2023-03-01"
            },
            {
                "id": 6,
                "task_name": "Clean restroom",
                "start_date": "2023-02-26",
                "status": false,
                "due_date": "2023-03-02"
            }
        ],
        task_done: [
            {
                "id": 1,
                "task_name": "Do homework",
                "start_date": "2022-12-12",
                "status": true,
                "due_date": "2022-12-13"
            },
            {
                "id": 2,
                "task_name": "Clean my room",
                "start_date": "2022-12-20",
                "status": true,
                "due_date": "2022-12-22"
            },
            {
                "id": 3,
                "task_name": "Read for exam",
                "start_date": "2022-11-11",
                "status": true,
                "due_date": "2022-12-28"
            }
        ],
        status1: false,
        status2: false,
        show_modal: false,
        show_modal_card: false,
        content_card: [],
        task_name: '',
        due_date: '',
        date: '',
        name_id: '',
        num_id: 0,
        name_note: '',
        date_note: '',
        data_note: '',
        img: '',

    },
    created(){
        // this.task = this.task
        // this.task_done = this.task_done
        // this.diary = this.diary
        const task = JSON.parse(localStorage.getItem("task"));
        const taskdone = JSON.parse(localStorage.getItem("taskdone"));
        const diarylist = JSON.parse(localStorage.getItem("diary"));
        console.log(task)
        if (task !== null){
            this.task = task
        }
        if(taskdone !== null){
            this.task_done = taskdone
        }
        if(diarylist !== null){
            this.diary = diarylist
        }
        
    },
    methods: {
        openmodal(index) {
            this.content_card = [];
            for (let i = 0; i < this.diary.length; i++) {
                if (index == this.diary[i].id) {
                    this.content_card.push(this.diary[i])
                }
            }
            console.log(this.content_card)
            this.show_modal_card = !this.show_modal_card;
        },
        addTask() {
            console.log(this.task);
            // console.log(this.task_name)
            this.date = new Date()
            this.numid = this.task.length
            if (this.task_name === '' || this.due_date === ''){
                alert("Please enter all inputs")
                return
            }
            this.task.push({
                "id": this.numid + 1, "task_name": this.task_name, "start_date": this.date.getFullYear() + '-' + ((this.date.getMonth() + 1) < 10 ? '0' : '') + (this.date.getMonth() + 1) + '-' + (this.date.getDate() < 10 ? '0' : '') + this.date.getDate()
                , "status": false, "due_date": this.due_date
            })
            const taskList = this.task
            const taskDone = this.task_done
            localStorage.setItem("task", JSON.stringify(taskList))
            localStorage.setItem("taskdone", JSON.stringify(taskDone))
            this.show_modal = !this.show_modal
            this.task_name = ''
            this.due_date = ''
        },
        addCheck() {
            this.name_id = '';
            for (let i = 0; i < this.task.length; i++) {
                this.name_id = 'checkbox' + i;
                if (document.getElementById(this.name_id).checked) {
                    this.task_done.push(this.task[i])
                    this.task.splice(i, 1);
                    document.getElementById(this.name_id).checked = false
                }
            }
            const taskList = this.task
            const taskDone = this.task_done
            localStorage.setItem("task", JSON.stringify(taskList))
            localStorage.setItem("taskdone", JSON.stringify(taskDone))
        },
        addCheckND() {
            this.name_id = '';
            for (let i = 0; i < this.task_done.length; i++) {
                this.name_id = 'checkboxD' + i;
                if (document.getElementById(this.name_id).checked == false) {
                    this.task.push(this.task_done[i])
                    this.task_done.splice(i, 1);
                    document.getElementById(this.name_id).checked = true
                }
            }
            const taskList = this.task
            const taskDone = this.task_done
            localStorage.setItem("task", JSON.stringify(taskList))
            localStorage.setItem("taskdone", JSON.stringify(taskDone))
        },
        addNote() {
            this.numid = this.diary.length
            if (this.name_note === '' || this.date_note === '' || this.img === '' || this.data_note === ''){
                alert("Please Enter all inputs")
                return
            }
            this.diary.push({ 'id': this.numid++, 'title': this.name_note, 'date': this.date_note, 'image': this.img, 'content': this.data_note })
            console.log(this.diary);
            // console.log(this.task_name)
            const diaryList = this.diary
            localStorage.setItem("diary", JSON.stringify(diaryList))
            this.show_modal = !this.show_modal
            this.name_note = ''
            this.date_note = ''
            this.data_note = ''
            this.image_note = ''
        },
        upImage(event) {
            this.img = ''
            const file = event.target.files[0]
            this.img = URL.createObjectURL(file)
        },
    }
})

