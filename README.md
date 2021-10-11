# Conveyor

JS: Live conveyor line with arriving tasks and its handler (with visualisation)

###Task:

There is a stream of incoming tasks (conveyor line), each can take a different time to be done.
We should create a conveyor to operate tasks from queue with limitation put on in-progress quantity.

###Approach:

1) Create a queue with incoming tasks within some interval with a special prop, determining task operating time.
2) There should be a task going through the list and mark a task `in progress`, but not more then `max` quantity (provided as a param).
3) When the `operating time`'s out - mark finished task as `done` and start a new one from queue, but not more then a certain threshold.
4) Visualise the process

![](./conveyor.png)
- gray -- idle (waiting) tasks
- green -- tasks in progress
- black -- done tasks
- numbers inside blocks -- piece of work to perform the task (i.e. amount of time to finish task)
