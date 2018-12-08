const shell = require('shelljs')

async function installDeps(packager,{pickedLibraries,
  pickedDevLibraries},name){

  if(!shell.which(packager.name)){
    console.log(`${packager.name} is not installed, please install it!`)
    return null
  }

  if(!shell.which('create-react-app')){
    console.log('dont have create-react-app, we need to install it')
    shell.exec(`${packager.name} ${packager.save} create-react-app ${packager.global}`)
  }

  shell.exec(`create-react-app ${name.toLowerCase()}`)

  shell.cd(name.toLowerCase());

  if(pickedLibraries.length !== 0){
    const depsInString = pickedLibraries.reduce(
      (total,item)=>{return total+=' '+item},"")
    shell.exec(`${packager.name} ${packager.install} ${depsInString} ${packager.saveToJson}`)
  }
  if(pickedDevLibraries.length !== 0){
    const depsInString = pickedDevLibraries.reduce((total,item)=>{return total+=' '+item},"")
    shell.exec(`${packager.name} ${packager.install} ${depsInString} ${packager.saveToJson} ${packager.dev}`)
  }

  shell.cd('..');
}

exports.installDeps=installDeps
