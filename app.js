'use strict';
const inquirer = require(`inquirer`)
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const prompts = require (`./prompts`);
const fs = require(`fs`);
const path = require('path');





const team= [];


const output = path.resolve(__dirname, `output`, `team.html`);

async function init(){
    console.log("Build your team!")
    const answers = await inquirer.prompt(prompts.manager)

    const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
    );

    team.push(manager);
    
    await makeTeam()

}

async function addEngineer(){
    const answers = await inquirer.prompt(prompts.engineer)

    const engineer = new Engineer (
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithub,
    );
    
    team.push(engineer);
    makeTeam();

};

async function addIntern(){
    const answers = await inquirer.prompt(prompts.intern)

    const intern = new Intern (
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
    )

    team.push(intern);
    makeTeam();
}

async function makeTeam(){
    try {
        for (let i = 0; i <team.length; i++){
            console.log(team[i].name + " is in your team" )
        }
        const userChoice = await inquirer.prompt(prompts.newMember)
        switch (userChoice.newMember){
            case `Add Engineer`:
                await addEngineer();
                break;
            case `Add Intern`:
                await addIntern();
                break;
            case `Finish building team`:
                finishedTeam();
        }
    }catch (err){
        console.error(err)
    }
}

function makeCard(employee) {
    const name = employee.getName();
    const id = employee.getId();
    const role = employee.getRole();
    const email = employee.getEmail();
    let lastItem = "";
    let lastLabel = "";
    if (role === "Intern") {
        lastLabel = "School";
        lastItem = employee.getSchool();
      } else if (role === "Engineer") {
        lastLabel = "GitHub";
        lastItem = employee.getGithub();
      } else {
        lastLabel = "Office Number";
        lastItem = employee.getOfficeNumber();
      }

      return cardProps({
          name:name,
          role:role,
          id:id,
          email:email,
          lastItem:lastItem,
          lastLabel:lastLabel
      });

}
let header = [ 
 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
    
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron" style="background-color: cornflowerblue;">
                    <h1 class="text-center">My team </h1>
                </div>
            </div>
            <div class="row">`
            
];
function cardProps(properties){
    const{
        name,
        role,
        id,
        email,
        lastItem,
        lastLabel,
    } = properties;
    return `
    <div class="card mx-auto" style="margin:5px;">
    <div class="card  mb-3" style="width: 18rem;">
        <div class="card-header mb-3">
        ${name}
        <div>${role}</div>
        </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${id}</li>
         <li class="list-group-item">Email: ${email}</li>
        <li class="list-group-item">${lastLabel}: ${lastItem}</li>
    </ul>
    </div>
    </div>
`;
} 

let closeHeader = [ `
                
        </div>
    </div>
</body>
</html>`
]
function finishedTeam(){
    const htmlBody = team.map(employee => makeCard(employee))

    const builtHtml= [
        header,
        ...htmlBody,
        closeHeader,
    ].join('');
   
  
    // console.log ("please?" + builtHtml)

    fs.writeFile(output, builtHtml, err => {
        if (err) {
          console.error(err);
        } else {
          console.log('Finished building team!');
        }
      });
}
init();