-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "useremail" TEXT NOT NULL,
    "taskname" TEXT NOT NULL,
    "taskdatetime" TIMESTAMP(3) NOT NULL,
    "taskcolor" TEXT NOT NULL,
    "taskdescription" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
