let LawItemRouter = [
    {
        name: '法律法规库',
        id: '1',
        path: 'Law-library',
        icon: '',
    }, 
    {
        name: '法律法规入库',
        path: '',
        icon: '',
        id: '2',
        children: [{
            name: '法律法规录入',
            id: '2-1',
            path: 'Law-container',
        },{
            name: '法律法规核对',
            id: '2-2',
            path: 'Law-container1',
        },{
            name: '法律法规审批',
            id: '2-3',
            path: 'Law-container2',
        },{
            name: '法律法规入库',
            id: '2-4',
            path: 'Law-container3',
        }]
    }]

export default LawItemRouter