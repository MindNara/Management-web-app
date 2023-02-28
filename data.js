var app = new Vue({
    el: '#app',
    data: {
        diary: [
            {
                id: 0,
                title: "Enjoy time",
                date: "2022-08-21",
                image: 'https://cdn.discordapp.com/attachments/867056877895286806/1074956970878050314/sketchbook_1.png',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 1,
                title: "Enjoy Me",
                date: "2022-08-31",
                image: 'https://cdn.discordapp.com/attachments/867056877895286806/1077235421966245958/shopper.png',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 2,
                title: "Enjoy Eiei",
                date: "2022-02-21",
                image: 'https://cdn.discordapp.com/attachments/867056877895286806/1074962380917854228/notebook.png',
                content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa sint possimus qui non beatae dolores eligendi porro cum recusandae alias esse, veritatis quasi fugiat, voluptas, mollitia et? Itaque, dignissimos repellendus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eligendi asperiores illum quod numquam tenetur aut animi accusantium, id modi nam veritatis et. Necessitatibus fuga ut magni, iure reiciendis aspernatur?Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquam eius atque molestias laboriosam cum architecto voluptate accusantium deserunt eum fugit assumenda ipsum id obcaecati ducimus odit est dolore doloribus?"
            },
            {
                id: 3,
                title: "Enjoy Eat",
                date: "2022-02-21",
                image: 'https://cdn.discordapp.com/attachments/867056877895286806/1074962297073696798/diary_1.png',
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
        show_modal_card: false
    },
})