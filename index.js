const getRandomInteger = (min, max) => Math.floor(Math.random () * (max - min + 1)) + min;
const getRandomIteration = (min, max, callback) => Array(getRandomInteger(min, max))
    .fill('')
    .forEach(callback);

const TYPE_SPECIALIZATION = ['backend', 'frontend'];
const DEVELOPERS_RANG = ['junior', 'middle', 'senior'];

class Task {
    id;
    completed = false;

    constructor({
        limit = 1,
        type = TYPE_SPECIALIZATION[0],
        multi = false,
        project = null,
        id,
    }) {
        this.limit = limit;
        this.type = type;
        this.multi = multi;
        this.project = project;
        this.id = id;
    }
}

class Project {
    completed = false;
    tasks = [];

    constructor() {
        this.createTasks();
    }

    createTask = (index = 1) => {
        const task = new Task({
            id: index,
            limit: getRandomInteger(1, 10),
            type: TYPE_SPECIALIZATION[index % 2],
            multi: !!getRandomInteger(0, 1),
            project: this,
        })

        this.tasks.push(task);
    }

    createTasks = () => {
        getRandomIteration(1, 100, (_, index) => {
            this.createTask(index + 1);
        });
    }
}

class Developer {
    tasksList = [];

    constructor(id) {
        this.id = id;
        this.specialization = TYPE_SPECIALIZATION[getRandomInteger(0, 1)];
        this.rang = DEVELOPERS_RANG[getRandomInteger(0, 2)];
        this.rate = DEVELOPERS_RANG.findIndex((item) => item === this.rang);
    }
}

class Firma {
    employees = [];
    projects = [];

    constructor() {
        this.setEmployees();
        this.sendProjects();
        this.startWorking();
    }

    setEmployees = () => {
        getRandomIteration(1, 40, (_, index) => {
            const employee = new Developer(index + 1);

            this.employees.push(employee);
        });
    }

    sendProjects = () => {
        getRandomIteration(1, 10, (_, index) => {
            const project = new Project(index + 1);

            this.projects.push(project);
        });
    }

    startWorking = () => {
        getRandomIteration(1, 2, () => {
            const notCompletedProjects = this.projects.filter((project) => !project.completed);
            const currentProject = notCompletedProjects[0];

            currentProject.tasks.forEach((task) => {
                console.log(task)
            })
        })
    }
}

const firma = new Firma();
