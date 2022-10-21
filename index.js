const inquirer = require('inquirer');
const fs = require('fs');
const licenses = require('./licences')

const questions = [
{
    type: 'input',
    name: 'title',
    message: 'Project Title: ',
    validate(input) {
        if (!input) {
            throw Error('Project title is required. Please enter the title.');
        } return true;
      },
},
{
    type: 'input',
    name: 'description',
    message: 'Project Description: ',
    validate(input) {
        if (!input) {
            throw Error('Description is required.');
        } return true;
      },
},
{
    type: 'input',
    name: 'github',
    message: 'GitHub Username: ',
    validate(input) {
        if (!input) {
            throw Error('Github username is required.');
        } return true;
      }
},
{
    type: 'input',
    name: 'email',
    message: 'Email Address: ',
    validate(input) {
        if (!input) {
            throw Error('Email address is required.');
        } return true;
      }
},
{
    type: 'input',
    name: 'install',
    message: 'Installation Instruction: '
},
{
    type: 'input',
    name: 'usage',
    message: 'Usage Information: '
},
{
    type: 'input',
    name: 'contibute',
    message: 'Contribution Guidelines: '
},
{
    type: 'input',
    name: 'test',
    message: 'Test Instructions: '
},
{
    type: 'list',
    name: 'license',
    message: 'Choose a license for your app',
    choices: [
        'Apache 2.0 License', 
        'GNU GPL v3', 
        'MIT License', 
        'ISC License',
    ]
}];



const createReadMe =  function (ansObj) {
    // get license info with name
    const licenseInfo = licenses.find(({name}) => name===ansObj.license);
    const readmeStr = 
`
${licenseInfo.badge}

# ${ansObj.title}

## Description

${ansObj.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${ansObj.install ? ansObj.install : 'N/A'}

## Usage

${ansObj.usage ? ansObj.usage : 'N/A'}

## License

${licenseInfo.notice}

## Contributing

${ansObj.contibute ? ansObj.contibute : 'N/A'}

## Tests

${ansObj.test ? ansObj.test : 'N/A'}

## Questions

If you have any questions, please contact me ${ansObj.email}  
GitHub  profile: [${ansObj.github}](https://github.com/${ansObj.github})`  ;

fs.writeFile(`./output/README.md`, readmeStr, 
(err)=> err ? console.error(err) : console.log("./output/README.md created!"));

} 


const init = () => {
    inquirer.prompt(questions)
    .then(ans => {
        createReadMe(ans);
    })
}

init();