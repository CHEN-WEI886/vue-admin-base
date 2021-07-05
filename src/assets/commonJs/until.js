
import store from '../../store/store';
import mutations from '../../store/mutations'
import { Message } from 'element-ui'

/**
 * 吧父子节点转换为节点树
 * @param { Array } json 传进来的数组对象
 */
export function toTree(json){
  // 得到没有父节点的节点 pId为空
  let parentArr = json.filter(item=> !item.pId )
  // 得到有父节点的节点 pId不为空
  let childrenArr = json.filter(item=> item.pId  )

  // 是这个循环的方法 add 
  let add = (parentArr,childrenArr)=>{
    parentArr.forEach( parent => {
      childrenArr.forEach(children =>{
        if(parent.id == children.pId){
          // 判断有没有这个节点，有就插入进去，没有就创建这个节点
          parent.children?parent.children.push(children):parent.children = [children]
          // 让当前的循环的子节点作为父节点去查找 childrenArr 下的对于子节点
          add([children],childrenArr)
        }
      })
    })
    
  }
  // 启动这个循环
  add(parentArr,childrenArr)
  return parentArr
}


/**
 * 通知组件
 * @param {boolean} type 是否是成功的通知 true就是success，false就是error
 * @param {string} message 通知的内容
 */
export function message(type,message){
  if(type){
    Message({
      message,
      type: 'success'
    });
  }else{
    Message.error({message});
  }
}

/**
*设锚点跳转
*@param domId 传进来的要跳转的id
*/
export function jump(domId){
    let anchorElement = document.getElementById(domId);
    if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
*设置div元素距离顶部的距离
*@param arr 传进来的数组对象
*/
export function initRightNav(arr){
    arr.forEach(item=>{
      item.offsetTop = document.getElementById(item.target).offsetTop - 66
    })
}

/**
*@param fn 传进来的方法
*@param delay 延迟时间
*/
export function debounce(fn,delay){
  var timeout = null;
    return ()=>{
        if(timeout){
          clearTimeout(timeout);                      
        }
        timeout = setTimeout(fn,delay)
    }
}

/**
*改变锚点跳转的right的样式
*@param index 传进来的第几个索引
*@param arr 传进来的数组对象
*/
export function changStyle(index, arr){ 
    arr.forEach((item, indx) => {
      if (index === indx) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
  }

//打开弹窗
export function openLoad(){
    setTimeout(() => {
        mutations.openShow()
    }, 500)
    mutations.openShow()
}
