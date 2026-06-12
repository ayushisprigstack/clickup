const express = require("express");

const cors = require("cors");

const prisma = require("./prismaClient");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend running",
  });
});
app.get("/projects", async (req, res) => {

  const projects =
    await prisma.project.findMany({

      include: {
        tasks: true,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

  res.json(projects);

});

app.post("/projects", async (req, res) => {
  const project =
    await prisma.project.create({
      data: {
        name: req.body.name,
      },
    });

  res.json(project);
});

app.put("/projects/:id", async (req, res) => {
  const id = Number(req.params.id);

  const updatedProject =
    await prisma.project.update({
      where: {
        id,
      },

      data: {
        name: req.body.name,
      },
    });

  res.json(updatedProject);
});

app.delete("/projects/:id", async (req, res) => {
  const id = Number(req.params.id);

  const deletedProject =
    await prisma.project.delete({
      where: {
        id,
      },
    });

  res.json(deletedProject);
});

app.get("/projects/search", async (req, res) => {

  const name = req.query.name || "";

  const sort = req.query.sort || "latest";

  let orderBy = {};

  // Sorting Logic
  if (sort === "a-z") {
    orderBy = {
      name: "asc",
    };
  }

  else if (sort === "z-a") {
    orderBy = {
      name: "desc",
    };
  }

  else if (sort === "latest") {
    orderBy = {
      createdAt: "desc",
    };
  }

  else if (sort === "oldest") {
    orderBy = {
      createdAt: "asc",
    };
  }

  const searchedProjects =
    await prisma.project.findMany({

      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },

      orderBy,

    });

  res.json(searchedProjects);

});

app.post("/tasks", async (req, res) => {

  try {

    const {
      title,
      description,
      startDate,
      endDate,
      priority,
      status,
      assignedTo,
      progress,
      projectId,
    } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        priority,
        status,
        assignedTo,
        progress,

        project: {
          connect: {
            id: Number(projectId),
          },
        },
      },
    });

    res.json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to create task",
    });
  }
});

app.get(
  "/projects/:id/tasks",
  async (req, res) => {

    const id =
      Number(req.params.id);

    const tasks =
      await prisma.task.findMany({

        where: {
          projectId: id,
        },

      });

    res.json(tasks);

  }
);

app.get("/tasks", async (req, res) => {
  const { projectId } = req.query;
  const where = projectId ? { projectId: Number(projectId) } : undefined;
  const tasks = await prisma.task.findMany({ where });
  res.json(tasks);
});

// Get a single task with its project and comments
app.get("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);
  const task = await prisma.task.findUnique({
    where: { id },
    include: { project: true, comments: true },
  });
  res.json(task);
});



app.get("/tasks/search", async (req, res) => {

  const name = req.query.name || "";

  const tasks = await prisma.task.findMany({

    where: {

      OR: [

        {
          title: {
            contains: name,
            mode: "insensitive",
          },
        },

        {
          assignedTo: {
            contains: name,
            mode: "insensitive",
          },
        },

        {
          priority: {
            contains: name,
            mode: "insensitive",
          },
        },

        {
          status: {
            contains: name,
            mode: "insensitive",
          },
        },

        {
          startDate: {
            contains: name,
          },
        },

        {
          endDate: {
            contains: name,
          },
        },

      ],

    },

    orderBy: {
      id: "desc",
    },

  });

  res.json(tasks);

});

// GET Single Task
app.get("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

  const task = await prisma.task.findUnique({
    where: {
      id,
    },

    include: {
      comments: {
        orderBy: {
          createdAt: "asc", // Oldest comments first
        },
      },
    },
  });

  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  res.json(task);
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const updatedTask = await prisma.task.update({
      where: { id },
      data: req.body,
    });

    res.json(updatedTask);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update task",
    });
  }
});


app.post("/comments", async (req, res) => {

  try {

    const {
      message,
      taskId,
    } = req.body;

    const comment = await prisma.comment.create({
      data: {
        message,
        taskId: Number(taskId),
      },
    });

    res.json(comment);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to create comment",
    });
  }
});



app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});