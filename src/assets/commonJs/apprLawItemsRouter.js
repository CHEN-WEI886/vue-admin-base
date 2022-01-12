let apprLawItemsRouter = [
    {
        name: '房间信息',
        id: '1',
        path: 'ApprLawItems-container',
        icon: '',
        children: [{
            name: '房间列表',
            id: '1-1',
            path: 'ApprLawItems-container',
        },{
            name: '修改房间信息',
            id: '1-2',
            path: 'room-password',
        },{
            name: '订单记录',
            id: '1-3',
            path: 'order-list',
        }
    ]
    }, 
    // {
    //     name: '数据分析',
    //     path: '',
    //     icon: '',
    //     id: '2',
    //     children: [{
    //         name: '数据分析',
    //         id: '2-1',
    //         path: 'ApprLawItems-analysis',
    //     }]
    // }
]

export default apprLawItemsRouter