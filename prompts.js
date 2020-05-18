'use strict'

module.exports ={
    manager : [
        {
            type:`input`,
            name: `managerName`,
            message: `What is your manager's name?`
        
        },
        {
            type:`input`,
            name:`managerId`,
            message:`What is your manager's ID?` 
        },
        {
            type:`input`,
            name:`managerEmail`,
            message:`What is your manager's email?`
        },
        {
            type:`input`,
            name:`managerOfficeNumber`,
            message:`What is your manager's office number?`
        
        },
    ],
    engineer : [
        {
            type:`input`,
            name:`engineerName`,
            message:`What is your engineer's name?`
        },
        {
            type:`input`,
            name:`engineerId`,
            message:`What is your engineer's ID?`
        },
        {
            type:`input`,
            name:`engineerEmail`,
            message:`What is your engineer's email?`

        },
        {   type:`input`,
            name:`engineerGithub`,
            type:`What is your engineer's GitHub?`
        }
            
    ],
    intern : [
        {
            type:`input`,
            name:`internName`,
            message:`What is your intern's name?`
        },
        {
            type:`input`,
            name:`internId`,
            message:`What is your intern's ID?`,
        },
        {
            type:`input`,
            name:`internEmail`,
            message:`What is your intern's email?`
        },
        {
            type:`input`,
            name:`internSchool`,
            message:"What school does your intern attend?"
        }
    ],
    newMember : [
        {
            type:`list`,
            name:`newMember`,
            message:`What would you like to do?`,
            choices: [
                `Add Engineer`,
                `Add Intern`,
                `Finish building team`
            ]
        }
    ] 
};