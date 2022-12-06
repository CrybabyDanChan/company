const getRandomInteger = (min, max) => Math.floor(Math.random () * (max - min + 1)) + min;
const getRandomIteration = (min, max, callback) => Array(getRandomInteger(min, max))
    .fill('')
    .forEach(callback);

const TYPE_SPECIALIZATION = ['backend', 'frontend'];
const DEVELOPERS_RANG = ['junior', 'middle', 'senior'];

class Task {
    id;
    inProgress = false;
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
    inProgress = false;
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
        getRandomIteration(1, 10, (_, index) => {
            this.createTask(index + 1);
        });
    }
}

class Developer {
    tasksList = [];

    constructor(id) {
        this.id = id;
        this.specialization = TYPE_SPECIALIZATION[getRandomInteger(0, 1)];
        this.rang = getRandomInteger(1, 3);
        this.rate = DEVELOPERS_RANG.findIndex((item) => item === this.rang);
    }

    get specializationRang() {
        return DEVELOPERS_RANG[this.rang - 1];
    }

    get workPercent() {
        return this.rang / DEVELOPERS_RANG.length;
    }

    setTask = (task) => {
        task.inProgress = true;
        this.tasksList.push(task);
    }

    startWorking = () => {
        if (!this.tasksList.length) {
            console.warn(`${this.rang} рабочий свободен`);

            return;
        }

        const currentTask = this.tasksList[0];

        currentTask.limit = currentTask.limit - this.workPercent;

        if (currentTask.limit <= 0) {
            currentTask.inProgress = false;
            currentTask.completed = true;
            this.tasksList = [];
        }
    }
}

class Firma {
    employees = [];
    projects = [];

    constructor() {
        this.setEmployees();
        this.sendProjects();
    }

    setEmployees = () => {
        getRandomIteration(1, 2, (_, index) => {
            const employee = new Developer(index + 1);

            this.employees.push(employee);
        });
    }

    sendProjects = () => {
        getRandomIteration(1, 1, (_, index) => {
            const project = new Project(index + 1);

            this.projects.push(project);
        });
    }

    startWorking = () => {
        const notCompletedProjects = this.projects.filter((project) => !project.completed);
        const currentProject = notCompletedProjects[0];

        currentProject.tasks.forEach((task) => {
            const freeEmployee = this.employees.filter(
                employee => employee.specialization === task.type && !employee.tasksList.length
            )[0];

            if (!task.inProgress && !task.completed && freeEmployee) {
                freeEmployee.setTask(task);
            }
        })

        this.employees.forEach(employee => employee.startWorking());

        currentProject.completed = currentProject.tasks.every(task => !!task.completed);

        if (currentProject.completed) {
            console.error(` текущий проект выполнен!`)
        }
    }
}

const firma = new Firma();
