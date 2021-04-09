const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async save(req, res) {
        await Job.create({
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

    async show(req, res) {
        jobs = await Job.get()
        profile = await Profile.get()

        const jobId = req.params.id

        const job = jobs.find((job) => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send("Job not found!")
        }

        job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

        return res.render("job-edit", { job })
    },

    async update(req, res) {
       const jobId = req.params.id

        let updatedJob = {
            name: req.body.name, "total-hours": req.body['total-hours'],
            "daily-hours": req.body['daily-hours']
        }


        if(!req.body.hasOwnProperty('created_at')){

            await Job.update(updatedJob, jobId)
        } else {
            updatedJob.created_at = Date.parse("January 1, 1970");
            
            await Job.updateFull(updatedJob, jobId)
        }

        res.redirect('/job/' + jobId)
    },

    async delete(req, res) {
        const jobId = req.params.id

        await Job.delete(jobId)

        return res.redirect('/')
    }
}