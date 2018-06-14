;(function () {
   "use strict";
    
    var $form_add_task = $(".add-task")
      , $delete_task
      //, new_task = {}
      , task_list = {}
      ;

    init();

    $form_add_task.on("submit", on_add_task_form_submit);

    function on_add_task_form_submit(e) {
    	var new_task = {}, $input;
    	/* 禁用默认行为 */
    	e.preventDefault();
    	/* 获取新Task的值 */
    	$input = $(this).find('input[name=content]');
    	new_task.content = $input.val();
    	/* 如果新Task的值为空 则直接返回 否则继续执行 */
    	if (!new_task.content) return;
    	/* 存入新Task */
    	if (add_task(new_task)) {
    		// render_task_list();
    		$input.val(null);
    	}
    }
     
     /* 查找并监听所有删除按钮的点击事件 */
     function Listion_task_delete() {
     	$delete_task.on("click", function () {
        var $this = $(this);
        /* 找到删除按钮所在的task元素 */
        var $item = $this.parent().parent();
        var index = $item.data("index");
        /* 确认删除 */
        var tmp = confirm("确定删除?");
        tmp ? delete_task(index) : null;
       })
     }

    function add_task(new_task) {
    	/* 将新Task推入task_list */
       task_list.push(new_task);
       /* 更新localStorage*/
       refresh_task_list();
       return true;
    }
    
    /* 刷新LocalStorage数据并渲染模板 */
    function refresh_task_list() {
        store.set("task_list", task_list); 
        render_task_list();
    }
    
    /* 删除一条Task */
    function delete_task(index) {
    	/* 如果没有index 或者index不存在则直接返回 */
    	if (index === undefined || !task_list[index]) return;

    	delete task_list[index];
    	console.log("task_list", task_list);

    	/*更新LocalStorage*/
    	refresh_task_list();

    }

    function init() {
       task_list = store.get("task_list") || [];
       if (task_list.length) {
       	  render_task_list();
       	  Listion_task_delete();
       }
    }
    
    /* 渲染所有的Task模版 */
    function render_task_list() {
    	var $task_list = $(".task-list");
    	$task_list.html("");
    	for (var i = 0; i < task_list.length; i++) {
    		var $task = render_task_item(task_list[i], i);
    		$task_list.append($task);
    	}

    	$delete_task = $(".action.delete");
    	Listion_task_delete();
    }
    
    /* 渲染单条Task模板 */
    function render_task_item(data, index) {
       if (!data || !index) return;
       var list_item_tpl = 
       ' <div class="task-item" data-index="' + index +'">'+
       '<span><input type="checkbox"></span>' +
       '<span class="task-content">'+ data.content +'</span>' + 
       '<span class="fr">'+
       '<span class="action delete"> 删除</span>' + 
       '<span class="action"> 详细</span>' +
       '</span>'+
       '</div>';
     return $(list_item_tpl);
    }
})();