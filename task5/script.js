let projects = JSON.parse(localStorage.getItem("projects")) || [];

function addProject(){

let title = document.getElementById("title").value;
let budget = document.getElementById("budget").value;
let description = document.getElementById("description").value;

if(title === "" || budget === "" || description === ""){
alert("Please fill all fields");
return;
}

let project = {
title:title,
budget:budget,
description:description,
proposals:[]
};

projects.push(project);

localStorage.setItem("projects", JSON.stringify(projects));

displayProjects();

document.getElementById("title").value="";
document.getElementById("budget").value="";
document.getElementById("description").value="";
}

function displayProjects(){

let projectList = document.getElementById("projectList");

projectList.innerHTML="";

projects.forEach((project,index)=>{

let div = document.createElement("div");
div.className="project-card";

div.innerHTML = `
<h3>${project.title}</h3>
<p>${project.description}</p>
<p><b>Budget:</b> ${project.budget}</p>

<div class="proposal">
<input type="text" placeholder="Your proposal..." id="proposal-${index}">
<button onclick="submitProposal(${index})">Submit</button>
</div>

<div>
${project.proposals.map(p=>`<p>Freelancer: ${p}</p>`).join("")}
</div>
`;

projectList.appendChild(div);

});

}

function submitProposal(index){

let input = document.getElementById(`proposal-${index}`);

if(input.value==="") return;

projects[index].proposals.push(input.value);

localStorage.setItem("projects", JSON.stringify(projects));

displayProjects();
}

displayProjects();

document.getElementById("search").addEventListener("keyup", function(){

let keyword = this.value.toLowerCase();

let filtered = projects.filter(p => p.title.toLowerCase().includes(keyword));

let projectList = document.getElementById("projectList");

projectList.innerHTML="";

filtered.forEach(project=>{

let div = document.createElement("div");

div.className="project-card";

div.innerHTML = `
<h3>${project.title}</h3>
<p>${project.description}</p>
<p><b>Budget:</b> ${project.budget}</p>
`;

projectList.appendChild(div);

});

});