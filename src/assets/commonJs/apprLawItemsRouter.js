let apprLawItemsRouter = [
    {
        name: '通用目录入库',
        id: '1',
        path: '',
        icon: '',
        children: [{
            name: '事项录入',
            id: '1-1',
            path: 'ApprLawItems-container',
        }, {
            name: '事项审核',
            id: '1-2',
            path: 'ApprLawItems-container1',
        }, {
            name: '事项发布',
            id: '1-3',
            path: 'ApprLawItems-container2',
        }]
    }, 
    {
        name: '数据分析',
        path: '',
        icon: '',
        id: '2',
        children: [{
            name: '数据分析',
            id: '2-1',
            path: 'ApprLawItems-analysis',
        }]
    }]

export default apprLawItemsRouter