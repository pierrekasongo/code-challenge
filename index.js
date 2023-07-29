const axios = require('axios')

const COMPONENT_URL = "https://herocoders.atlassian.net/rest/api/3/project/SP/components"
const PROJECT_URL = "https://herocoders.atlassian.net/rest/api/3/search?jql=project%20%3D%20SP%20"

/**
 * get SP project components
 * @returns a promise
 */
const getComponents = async () => {
    try{
        return await axios.get(COMPONENT_URL)
    }catch(error) {
        console.error(error)
    }
}

/**
 * get SP project issues
 * @returns a promise
 */
const getProjectIssues = async () => {
    try{
        return await axios.get(PROJECT_URL)
    }catch(error) {
        console.error(error)
    }
}

// function calls

// Calling getComponents
getComponents().then((components) =>{
    console.log("COMPONENTS WITHOUT LEAD")
    console.log("-----------------------")
    components.data.forEach((component) =>{
        if (!component.lead){// only component without lead
            // writing to console
            console.log("Name: ", component.name, "Project: ", component.project, "Assignee Type: ", component.assigneeType)
        }
    })
})

// calling getProjectIssues
getProjectIssues().then((project) => {
    
    console.log("ISSUES FOR SAMPLE PROJECT")
    console.log("--------------------------")
    project.data.issues.forEach((issue) => {
        // getting all fields
        fields = issue.fields

        // extractin data
        creator = fields.creator
        project = fields.project
        progress = fields.progress
        votes = fields.votes
        summary = fields.summary
        // writing to console
        console.log("Creator: ",creator.displayName, "Summary: ", summary, "Project: ",project.name, "Progress: ",progress.progress, "Votes: ",votes.votes, )
    })
})
