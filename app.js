const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// 加载所有事件监听
loadEventListener();

function loadEventListener(){
    // 添加任务
    form.addEventListener("submit",addTask);
    // 清除单个任务
    taskList.addEventListener("click",removeTask);
    // 清除所有任务
    clearBtn.addEventListener("click",clearTasks);
    // 查找
    filter.addEventListener("keyup",filterTasks);
    //DOM内容加载完毕执行(当刷新时页面加载完成后会执行)
    document.addEventListener("DOMContentLoaded",getTask);
}

function getTask(){
    //获取本地存储
    let tasks;
    if(localStorage.getItem("tasks") == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));//获取到上一次的本地存储
        // console.log(JSON.stringify(localStorage.getItem("tasks")));
        
    }
    tasks.forEach(function(task){
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerHTML = task;
        const link = document.createElement("a");
        link.className = "detele-item secondary-content";
        link.innerHTML = "<i class='fa fa-times'></i>";
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function addTask(e){
    // if(taskInput.value === ""){
    //     alert("请添加任务");
    // }else{
    //     //创建li
    //     const li = document.createElement("li");
    //     //添加li类名
    //     li.className = "collection-item";
    //     // 创建文本结点，插入li中
    //     li.appendChild(document.createTextNode(taskInput.value));
    //     //创建a标签
    //     const link = document.createElement("a");
    //     link.className = "detele-item secondary-content";
    //     // 添加字体图标
    //     link.innerHTML = "<i class='fa fa-times'></i>";
    //     li.appendChild(link);
    //     taskList.appendChild(li);
    //     // 添加添加后清楚input中的内容
    //     taskInput.value = "";
    //     e.preventDefault()
    // }

    if(taskInput.value === ""){
        alert("请添加任务");
    }else{
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerHTML = taskInput.value;
        // li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement("a");
        link.className = "detele-item secondary-content";
        link.innerHTML = "<i class='fa fa-times'></i>";
        li.appendChild(link);
        taskList.appendChild(li);

        //本地存储
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = "";
    }
    e.preventDefault();//阻止点击事件浏览器默认行为会紧接着触发form表单提交事件,防止跳转
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));//获取到上一次的本地存储
    }
    //每一次只能存储一个，所以要把上一次的插入到新数组中
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function removeTask(e){
    // console.log(e.target);//被点击的那一个li或者是被点击的叉叉
    if(e.target.parentElement.classList.contains("detele-item")){//如果点击的是a标签
        confirm("是否删除") ? (e.target.parentElement.parentElement.remove()) : "";//删除li
        
        //删除本地存储
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(taskItem){
    // 获取本地存储
    let tasks;
    if(localStorage.getItem("tasks") == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));//获取到上一次的本地存储
    }
    tasks.forEach(function(task,index){
        if(task === taskItem.textContent){//本地存储的值与点击删除对应的li的值相等
            tasks.splice(index,1);
        }
        
    });
    console.log(tasks);
    localStorage.setItem("tasks",JSON.stringify(tasks));//更新本地存储
}

function clearTasks(){
    //方法一
    // taskList.innerHTML = "";

    //方法二(更快)
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //删除本地存储
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.textContent;//任务中的值
        console.log(item.toLowerCase().indexOf(text));
        
        if(item.toLowerCase().indexOf(text) != -1){//是否与搜索框匹配
            //如果匹配，那么对应的li显示  空字符串也返回0
            task.style.display = "block";
        }else{
            //不匹配对应的li不显示
            task.style.display = "none";
        }
    });
    
    
}

