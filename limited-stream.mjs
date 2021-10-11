export class Conveyor {
  constructor(el, tasksLimit = 3) {
    this.tasksInProgressTheshold = tasksLimit;
    this.shouldStopPolling = false;
    this.taskInterval = 1000;
    this.inProgressCounter = 0;
    this.el = el;
    this.line = [];
  }

  startConveyor(inputLimit = 10) {
    this.initInputTasksQueue(inputLimit);
  }

  initInputTasksQueue(inputLimit) {
    let limitCounter = 0;
    const counter = setInterval(() => {
      this.addTaskToQueue(limitCounter);
      limitCounter++;
      if (limitCounter >= inputLimit) {
        clearInterval(counter);
        this.startPolling();
      }
      this.visualize();
    }, this.taskInterval / 5);
  }

  startPolling(interval = 100) {
    const tick = setInterval(() => {
      if (this.shouldStopPolling) {
        clearInterval(tick);
      }
      this.doCheck();
      this.visualize();
    }, interval);
  }

  doCheck() {
    let allDone = true;
    if (this.line.length) {
      this.line.forEach((task) => {
        if (
          !task.finished &&
          !task.inWork &&
          this.inProgressCounter < this.tasksInProgressTheshold
        ) {
          this.inProgressCounter++;
          task.inWork = true;
          task.startWork();
        }
        allDone = allDone && task.finished;
      });

      this.shouldStopPolling = allDone;
    }
  }

  addTaskToQueue(id) {
    const task = {
      id,
      workToDo: Math.floor(Math.random() * 10) + 1,
      inWork: false,
      finished: false,
      startWork: () => {
        if (!task.finished) {
          const starter = setInterval(() => {
            if (task.workToDo > 0) {
              task.workToDo--;
            } else {
              task.inWork = false;
              task.finished = true;
              this.inProgressCounter--;
              clearInterval(starter);
            }
          }, this.taskInterval);
        }
      },
    };

    this.line.push(task);
  }

  visualize() {
    if (this.el) {
      const items = this.line
        .map((item) => {
          const progressClass = item.inWork
            ? " inWork"
            : item.finished
              ? " finished"
              : " idle";
          return `<div class="item${progressClass}">${item.workToDo}</div>`;
        })
        .join("");

      this.el.innerHTML = `<div>${items}</div>`;
    }
  }
}
