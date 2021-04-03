const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    save(req, res) {
        const jobs = Job.get()
        
        const lastId = jobs[jobs.length - 1]?.id || 0;

        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body['daily-hours'],
            'total-hours': req.body['total-hours'],
            created_at: Date.now() // atribuindo data de hoje
        })

        return res.redirect('/')
    },

    create(req, res) {
        return res.render("job")
    },

    show(req, res) {
        jobs = Job.get()
        profile = Profile.get()

        const jobId = req.params.id

        const job = jobs.find((job) => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send("Job not found!")
        }

        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render("job-edit", { job })
    },

    update(req, res) {
        const jobs = Job.get()

        const jobId = req.params.id

        const job = jobs.find((job) => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send("Job not found!")
        }

        const updatedJob = {
            ...job, name: req.body.name, "total-hours": req.body['total-hours'],
            "daily-hours": req.body['daily-hours']
        }

        const newjobs = jobs.map((job) => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }

            return job
        })

        Job.update(newjobs)

        res.redirect('/job/' + jobId)
    },

    delete(req, res) {
        const jobId = req.params.id

        Job.delete(jobId)

        return res.redirect('/')
    }
}