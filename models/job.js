const jobs = [];

function createJob(job) {
  jobs.push(job);
}

function getAllJobs() {
  return jobs;
}

function findJobById(id) {
  return jobs.find(job => job.id === id);
}

function updateJob(id, updatedJob) {
  const jobIndex = jobs.findIndex(job => job.id === id);
  jobs[jobIndex] = updatedJob;
}

function addApplicantToJob(id, applicant) {
  const job = findJobById(id);
  job.applicants.push(applicant);
}

function getJobApplicants(id) {
  return findJobById(id).applicants;
}

function deleteJob(id) {
  jobs = jobs.filter(job => job.id !== id);
}

module.exports = {
  createJob,
  getAllJobs,
  findJobById,
  updateJob,
  addApplicantToJob,
  getJobApplicants,
  deleteJob,
};