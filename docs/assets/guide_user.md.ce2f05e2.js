import{_ as s,c as n,o,b as e,d as t}from"./app.f2cd33ff.js";var a="/doatask/assets/task-create.475fd6b1.png",i="/doatask/assets/task-create-md1.bb2b6605.png",l="/doatask/assets/task-create-md2.40578a16.png",r="/doatask/assets/task-solve-mc.50693acb.png",h="/doatask/assets/assignment-create.42ce94b0.png",d="/doatask/assets/tasks-choose.d0d3f2fd.png",u="/doatask/assets/tasks-order.78a0649f.png",c="/doatask/assets/assignment-solve.f2ee368e.png",g="/doatask/assets/external-tool-1.24efe73d.png",_="/doatask/assets/external-tool-2.b3830c6b.png",p="/doatask/assets/external-tool-3.f530722c.png";const Ae='{"title":"User guide","description":"","frontmatter":{},"headers":[{"level":2,"title":"User","slug":"user"},{"level":2,"title":"Domains","slug":"domains"},{"level":2,"title":"Task","slug":"task"},{"level":2,"title":"Assignment","slug":"assignment"},{"level":2,"title":"Practice","slug":"practice"},{"level":2,"title":"Ratings","slug":"ratings"},{"level":2,"title":"Submission","slug":"submission"},{"level":2,"title":"Moodle integration","slug":"moodle-integration"}],"relativePath":"guide/user.md","lastUpdated":1634648836540}',m={},f=e("h1",{id:"user-guide",tabindex:"-1"},[t("User guide "),e("a",{class:"header-anchor",href:"#user-guide","aria-hidden":"true"},"#")],-1),k=e("h2",{id:"user",tabindex:"-1"},[t("User "),e("a",{class:"header-anchor",href:"#user","aria-hidden":"true"},"#")],-1),b=e("p",null,"In order to use Doatask, one needs a user. Either one registers directly in the system and can then log in in the future, or the login is done via an LTI platform such as Moodle, which then forwards the user into Doatask.",-1),v=e("p",null,"There are three types (roles) of users:",-1),y=e("ul",null,[e("li",null,"student"),e("li",null,"teacher"),e("li",null,"admin")],-1),w=e("p",null,"When logging in through an LTI platform like Moodle, the role (student or teacher) is taken from the platform. If you register directly in Doatask, you have the student role by default.",-1),T=e("p",null,"Only an admin user can change the role of a user.",-1),x=e("h2",{id:"domains",tabindex:"-1"},[t("Domains "),e("a",{class:"header-anchor",href:"#domains","aria-hidden":"true"},"#")],-1),I=e("p",null,"New domains are created by an admin user or created on the fly when importing tasks.",-1),D=e("h2",{id:"task",tabindex:"-1"},[t("Task "),e("a",{class:"header-anchor",href:"#task","aria-hidden":"true"},"#")],-1),S=e("p",null,"All tasks have properties that are always present.",-1),A=e("p",null,"If you create a new task you have first to select the plugin. A plugin offers certain plugin specific task types. Then you fill in the values for the following properties:",-1),C=e("table",null,[e("thead",null,[e("tr",null,[e("th",null,"Field name"),e("th",null,"Value")])]),e("tbody",null,[e("tr",null,[e("td",null,"Domain"),e("td",null,"knowledge domain")]),e("tr",null,[e("td",null,"Title"),e("td",null,"title of the task")]),e("tr",null,[e("td",null,"Tags"),e("td",null,"tags that can be used to classify tasks")]),e("tr",null,[e("td",null,"public"),e("td",null,"if checked the task is visible for all users")]),e("tr",null,[e("td",null,"Description"),e("td",null,"description of the task")]),e("tr",null,[e("td",null,"plugin specific fields"),e("td",null,"see the documentation of the plugin")])])],-1),F=e("p",null,"Then you can save the task.",-1),L=e("p",null,[e("img",{src:a,alt:"Create Task"})],-1),M=e("p",null,[t("In some plugins (e.g. multiple choice) the text of the description can be "),e("a",{href:"https://markdown-it.github.io/",target:"_blank",rel:"noopener noreferrer"},"markdown-it"),t(". You can also use LaTeX via "),e("a",{href:"https://katex.org/",target:"_blank",rel:"noopener noreferrer"},"KaTeX"),t(".")],-1),E=e("p",null,[e("img",{src:i,alt:"Create Task"}),e("img",{src:l,alt:"Create Task"})],-1),P=e("p",null,"On the left you enter a text in Markdown format with optional LaTeX formulas and on the right you see the rendering of this text.",-1),Y=e("p",null,"The task is presented to the student as follows:",-1),B=e("p",null,[e("img",{src:r,alt:"Solve task"})],-1),N=e("h2",{id:"assignment",tabindex:"-1"},[t("Assignment "),e("a",{class:"header-anchor",href:"#assignment","aria-hidden":"true"},"#")],-1),U=e("p",null,"When creating a new assignment, you must first fill in the following fields:",-1),O=e("table",null,[e("thead",null,[e("tr",null,[e("th",null,"Field name"),e("th",null,"Value")])]),e("tbody",null,[e("tr",null,[e("td",null,"Title"),e("td",null,"title of the assignment")]),e("tr",null,[e("td",null,"Description"),e("td",null,"description of the assignment")]),e("tr",null,[e("td",null,"public"),e("td",null,"if checked the assignment is visible for all users")]),e("tr",null,[e("td",null,"Due date"),e("td",null,"the date when the assignment is due")])])],-1),V=e("p",null,[e("img",{src:h,alt:"Create assignment"})],-1),$=e("p",null,"Then you can save the assignment. The assignment is created but does not have any tasks yet. The next step is to add tasks to the assignment. The tasks can be selected from all the tasks that the teacher has created or that are public.",-1),R=e("p",null,[e("img",{src:d,alt:"Choose tasks"})],-1),W=e("p",null,"The order of tasks can be changed by dragging a task by its hamburger menu (three horizontal lines) to the desired position.",-1),X=e("p",null,[e("img",{src:u,alt:"Order tasks"})],-1),j=e("p",null,"Within an assignment, each task has a weight and an optional time limit.",-1),q=e("p",null,"The default weight is 10. You can change it by clicking on the field and entering a new value.",-1),z=e("p",null,"The optional time limit is specified in seconds. If the student selects a task with a time limit from an assignment, the task is displayed and the time starts to run. It is not possible to switch to another task when the time is running.",-1),G=e("p",null,"To set a time limit, click the field and specify the time in seconds.",-1),H=e("p",null,"The assignment is presented to the student as follows:",-1),K=e("p",null,[e("img",{src:c,alt:"Solve assignment"})],-1),J=e("p",null,"Students can choose the order in which they complete the tasks. They can also switch back and forth between tasks as long as they do not have a time limit.",-1),Q=e("h2",{id:"practice",tabindex:"-1"},[t("Practice "),e("a",{class:"header-anchor",href:"#practice","aria-hidden":"true"},"#")],-1),Z=e("p",null,"Students can practice tasks freely. Here, the tasks that are public are available. The students can determine the level of difficulty (task evaluation) of the tasks themselves.",-1),ee=e("h2",{id:"ratings",tabindex:"-1"},[t("Ratings "),e("a",{class:"header-anchor",href:"#ratings","aria-hidden":"true"},"#")],-1),te=e("p",null,"Students can view the evolution of their rating number for any knowledge domain as a curve. They can also see a list of students with the best rating numbers.",-1),se=e("h2",{id:"submission",tabindex:"-1"},[t("Submission "),e("a",{class:"header-anchor",href:"#submission","aria-hidden":"true"},"#")],-1),ne=e("p",null,"The student, after entering their solution to a task, can submit that solution. The solution is then evaluated. In order to submit an assignment, all tasks for that assignment should have been submitted first. If the student has logged in through an LTI platform such as Moodle, the grade for assignment will be reported to that platform.",-1),oe=e("h2",{id:"moodle-integration",tabindex:"-1"},[t("Moodle integration "),e("a",{class:"header-anchor",href:"#moodle-integration","aria-hidden":"true"},"#")],-1),ae=e("p",null,'In order to use the tool in Moodle, choose a course and then "Add an activity or resource". Choose "External tool".',-1),ie=e("p",null,'You get a form "Adding a new External tool to LTI" like this:',-1),le=e("p",null,[e("img",{src:g,alt:"Form"})],-1),re=e("p",null,'Fill in the field "Activity name" and click on the plus sign behind "Preconfigured tool".',-1),he=e("p",null,[t('A new form "External tool configuration" opens. First choose the LTI version: LTI 1.3. Fill in the other fields according the following example. Replace "'),e("a",{href:"http://tool.server.org",target:"_blank",rel:"noopener noreferrer"},"tool.server.org"),t('" by the name of your server.')],-1),de=e("p",null,[e("img",{src:_,alt:"Form"})],-1),ue=e("p",null,'Normally you want to grade the solutions of the students and report the grades from the tool back to Moodle. Then choose the following settings for "Services" and "Privacy".',-1),ce=e("p",null,[e("img",{src:p,alt:"Form"})],-1),ge=e("p",null,'Finally click on "Save changes". You get back to the form "Adding a new External tool to LTI". Note that in the field "Preconfigured tool" the name of your tool ("MyTool") appears. Click on the gear icon behind the plus sign. The form "External tool configuration" reopens but there is a new read-only field "Client ID" with a content like e.g. "3O2qlBuB52T4kYx". This string identifies the newly created instance of the tool. The client ID must be registered in the tool by an admin.',-1),_e=e("p",null,"After saving the activity can be used.",-1),pe=e("p",null,'You can add more activities based on this tool. Simply add a new activity by choosing "External tool" and and in the "Preconfigured tool" field select the name that you have previously given to the tool.',-1),me=e("p",null,[t('If you want the students to get a specific assignment via this activity, click on "Show more..." under "General" when defining the activity and write for example the entry '),e("code",null,"assignmentsolve=5"),t(' in the "Custom parameters" field. This will show the assignment with ID 5 to the students.')],-1),fe=e("p",null,"The grade for this assignment will show up in the grade book under the assignment title.",-1),ke=e("p",null,[t("Instead of "),e("code",null,"assignmentsolve=5"),t(", you can also write "),e("code",null,"as=5"),t(" for short.")],-1),be=[f,k,b,v,y,w,T,x,I,D,S,A,C,F,L,M,E,P,Y,B,N,U,O,V,$,R,W,X,j,q,z,G,H,K,J,Q,Z,ee,te,se,ne,oe,ae,ie,le,re,he,de,ue,ce,ge,_e,pe,me,fe,ke];function ve(ye,we,Te,xe,Ie,De){return o(),n("div",null,be)}var Ce=s(m,[["render",ve]]);export{Ae as __pageData,Ce as default};
