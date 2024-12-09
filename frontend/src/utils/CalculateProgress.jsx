export const calculateProgress = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;

  const doneTasks = tasks.filter(task => task.status === "Done");
  const progress = (doneTasks.length / tasks.length) * 100;

  return Math.round(progress);
};
