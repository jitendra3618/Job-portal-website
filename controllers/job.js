const nodemailer=require('nodemailer')
const jobModel = require('../models/job');
const transporter = nodemailer.createTransport({
 service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

exports.getAllJobs = (req, res) => {
  const jobs = jobModel.getAllJobs();
  res.render('jobs', { jobs });
};

exports.getJob = (req, res) => {
  const job = jobModel.findJobById(req.params.id);
  res.render('job', { job });
};

exports.createJob = (req, res) => {
  const { title, description, location, salary } = req.body;
  const job = {
    id: Date.now(),
    title,
    description,
    location,
    salary,
    applicants: [],
  };
  jobModel.createJob(job);
  res.redirect('/jobs');
};

exports.updateJob = (req, res) => {
  const { title, description, location, salary } = req.body;
  jobModel.updateJob(req.params.id, { title, description, location, salary });
  res.redirect(`/jobs/${req.params.id}`);
};

exports.applyToJob = (req, res) => {
  const { name, email, resume } = req.body;
  const applicant = { name, email, resume };
  jobModel.addApplicantToJob(req.params.id, applicant);

  // Send confirmation email
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Job Application Confirmation',
    text: `Hello ${name},\n\nThank you for applying to the job posting. We have received your application and will review it shortly.\n\nBest regards,\nThe Job Portal Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });

  res.redirect(`/jobs/${req.params.id}`);
};

exports.getJobApplicants = (req, res) => {
  const applicants = jobModel.getJobApplicants(req.params.id);
  res.render('applicants', { applicants });
};

exports.deleteJob = (req, res) => {
  jobModel.deleteJob(req.params.id);
  res.redirect('/jobs');
};